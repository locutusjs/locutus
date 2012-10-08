*[Tim de Koning](http://www.kingsquare.nl/)* on 2009-12-21 20:41:21  
Hi guys,

I've resolved the JS lint issues and fixed some bugs. Thanks for the feedback. The new version:

```
function pack(format) {
    // http://kevin.vanzonneveld.net
    // +   original by: Tim de Koning (http://www.kingsquare.nl)
    // +      parts by: Jonas Raoni Soares Silva
    // +      http://www.jsfromhell.com
    // %        note 1: Float encoding by: Jonas Raoni Soares Silva
    // %        note 2: Home: http://www.kingsquare.nl/blog/12-12-2009/13507444
    // %        note 3: Feedback: phpjs-pack@kingsquare.nl
    // %        note 4: 'machine dependant byte order and size' aren't
    // %        note 5: applicable for JavaScript pack works as on a 32bit,
    // %        note 6: little endian machine
    // *     example 1: pack("nvc*", 0x1234, 0x5678, 65, 66);
    // *     returns 1: '<null>4xVAB'

    var formatPointer = 0,
        argumentPointer = 1,
        result = '',
        argument = '',
        i = 0,
        r = [],
        instruction, quantifier, word, precisionBits,
        exponentBits, extraNullCount;

    //vars used by float encoding
    var bias, minExp, maxExp, minUnnormExp, status, exp, len, bin,
        signal, n, intPart, floatPart, lastBit, rounded, j, k, tmpResult;

    while (formatPointer < format.length) {
        instruction = format[formatPointer];
        quantifier = '';
        formatPointer++;
        while ((formatPointer < format.length) &&
              (format[formatPointer].match(/[\d\*]/) !== null)) {
            quantifier += format[formatPointer];
            formatPointer++;
        }
        if (quantifier === '') {
            quantifier = '1';
        }
        
        //now pack variables: 'quantifier' times 'instruction'
        switch (instruction) {
        case 'a': //NUL-padded string            
        case 'A': //SPACE-padded string

            if (typeof arguments[argumentPointer] === 'undefined') {
                throw new Error('Warning:  pack() Type ' + instruction +
                       ': not enough arguments');
            } else {
                argument = String(arguments[argumentPointer]);
            }
            if (quantifier === '*') {
                quantifier = argument.length;
            }
            for (i = 0; i < quantifier; i ++) {
                if (typeof argument[i] === 'undefined') {
                    if (instruction === 'a') {
                        result += String.fromCharCode(0);
                    } else {
                        result += ' ';
                    }
                } else {
                    result += argument[i];
                }
            }
            argumentPointer++;
            break;
        case 'h': //Hex string, low nibble first
        case 'H': //Hex string, high nibble first
            if (typeof arguments[argumentPointer] === 'undefined') {
                throw new Error('Warning: pack() Type ' + instruction +
                        ': not enough arguments');
            } else {
                argument = arguments[argumentPointer];
            }
            if (quantifier === '*') {
                quantifier = argument.length;
            }
            if (quantifier > argument.length) {
                throw new Error('Warning: pack() Type ' + instruction +
                        ': not enough characters in string');
            }
            for (i = 0; i < quantifier; i += 2) {
                //always get per 2 bytes...
                word = argument[i];
                if (((i + 1) >= quantifier) ||
                        typeof(argument[i + 1]) === 'undefined') {
                    word += "0";
                } else {
                    word += argument[i + 1];
                }
                //the fastest way to reverse?
                if (instruction === 'h') {
                    word = word[1] + word[0];
                }
                result += String.fromCharCode(parseInt(word, 16));
            }
            argumentPointer++;
            break;

        case 'c': //signed char
        case 'C': //unsigned char
            //c and C is the same in pack
            if (quantifier === '*') {
                quantifier = arguments.length - argumentPointer;
            }
            if (quantifier > (arguments.length - argumentPointer)) {
                throw new Error('Warning:  pack() Type ' + instruction +
                        ': too few arguments');
            }

            for (i = 0; i < quantifier; i++) {
                result += String.fromCharCode(arguments[argumentPointer]);
                argumentPointer++;
            }
            break;

        case 's': // signed short (always 16 bit, machine byte order)
        case 'S': // signed short (always 16 bit, machine byte order)
        case 'v':
            //s and S is the same in pack
            //but can machine byte order be retrieved in javascript?
            //this is default byte order anywayz...
            if (quantifier === '*') {
                quantifier = arguments.length - argumentPointer;
            }
            if (quantifier > (arguments.length - argumentPointer)) {
                throw new Error('Warning:  pack() Type ' + instruction +
                        ': too few arguments');
            }

            for (i = 0; i < quantifier; i++) {
                result += String.fromCharCode(arguments[argumentPointer] &
                        0xFF);
                result += String.fromCharCode(arguments[argumentPointer] >>
                        8 & 0xFF);
                argumentPointer++;
            }
            break;

        case 'n': // unsigned short (always 16 bit, big endian byte order)
            if (quantifier === '*') {
                quantifier = arguments.length - argumentPointer;
            }
            if (quantifier > (arguments.length - argumentPointer)) {
                throw new Error('Warning:  pack() Type ' + instruction +
                        ': too few arguments');
            }

            for (i = 0; i < quantifier; i++) {
                result += String.fromCharCode(arguments[argumentPointer] >>
                        8 & 0xFF);
                result += String.fromCharCode(arguments[argumentPointer] &
                        0xFF);
                argumentPointer++;
            }
            break;

        case 'i': // signed integer (machine dependent size and byte order)
        case 'I': // unsigned integer (machine dependent size and byte order)
        case 'l': // signed long (always 32 bit, machine byte order)
        case 'L': // unsigned long (always 32 bit, machine byte order)
        case 'V': // unsigned long (always 32 bit, little endian byte order)
            if (quantifier === '*') {
                quantifier = arguments.length - argumentPointer;
            }
            if (quantifier > (arguments.length - argumentPointer)) {
                throw new Error('Warning:  pack() Type ' + instruction +
                        ': too few arguments');
            }

            for (i = 0; i < quantifier; i++) {
                result += String.fromCharCode(arguments[argumentPointer] &
                        0xFF);
                result += String.fromCharCode(arguments[argumentPointer] >>
                        8 & 0xFF);
                result += String.fromCharCode(arguments[argumentPointer] >>
                        16 & 0xFF);
                result += String.fromCharCode(arguments[argumentPointer] >>
                        24 & 0xFF);
                argumentPointer++;
            }

            break;
        case 'N': // unsigned long (always 32 bit, big endian byte order)
            if (quantifier === '*') {
                quantifier = arguments.length - argumentPointer;
            }
            if (quantifier > (arguments.length - argumentPointer)) {
                throw new Error('Warning:  pack() Type ' + instruction +
                        ': too few arguments');
            }

            for (i = 0; i < quantifier; i++) {
                result += String.fromCharCode(arguments[argumentPointer] >>
                        24 & 0xFF);
                result += String.fromCharCode(arguments[argumentPointer] >>
                        16 & 0xFF);
                result += String.fromCharCode(arguments[argumentPointer] >>
                        8 & 0xFF);
                result += String.fromCharCode(arguments[argumentPointer] &
                        0xFF);
                argumentPointer++;
            }
            break;

        case 'f': // float (machine dependent size and representation)
        case 'd': // double (machine dependent size and representation)
            //version based on IEEE754

            precisionBits = 23;
            exponentBits = 8;
            if (instruction === 'd') {
                precisionBits = 52;
                exponentBits = 11;
            }

            if (quantifier === '*') {
                quantifier = arguments.length - argumentPointer;
            }
            if (quantifier > (arguments.length - argumentPointer)) {
                throw new Error('Warning:  pack() Type ' + instruction +
                        ': too few arguments');
            }
            for (i = 0; i < quantifier; i++) {
                argument = arguments[argumentPointer];
                bias = Math.pow(2, exponentBits - 1) - 1;
                minExp = -bias + 1;
                maxExp = bias;
                minUnnormExp = minExp - precisionBits;
                status = isNaN(n = parseFloat(argument)) ||
                        n === -Infinity ||
                        n === +Infinity ? n : 0;
                exp = 0;
                len = 2 * bias + 1 + precisionBits + 3;
                bin = new Array(len);
                signal = (n = status !== 0 ? 0 : n) < 0;
                n = Math.abs(n);
                intPart = Math.floor(n);
                floatPart = n - intPart;
                 
                for (k = len; k;) {
                    bin[--k] = 0;
                }
                for (k = bias + 2; intPart && k;) {
                    bin[--k] = intPart % 2;
                    intPart = Math.floor(intPart / 2);
                }               
                for (k = bias + 1; floatPart > 0 && k; --floatPart) {
                    (bin[++k] = ((floatPart *= 2) >= 1) - 0);
                }
                for (k = -1; ++k < len && !bin[k];) {}
                
                if (bin[(lastBit = precisionBits - 1 +
                        (k = (exp = bias + 1 - k) >= minExp &&
                        exp <= maxExp ?
                            k + 1 :
                            bias + 1 - (exp = minExp - 1))
                        ) + 1]) {
                    if (!(rounded = bin[lastBit])) {
                        for (j = lastBit + 2;
                                !rounded &&
                                j < len; rounded = bin[j++]) {}
                    }
                    for (j = lastBit + 1; rounded && --j >= 0;
                            (bin[j] = !bin[j] - 0) && (rounded = 0)) {}
                }
                
                for (k = k - 2 < 0 ? -1 : k - 3; ++k < len && !bin[k];) {}
                
                if ((exp = bias + 1 - k) >= minExp && exp <= maxExp) {
                    ++k;
                } else {
                    if (exp < minExp) {
                        if (exp !== bias + 1 - len && exp < minUnnormExp) { 
                            /*"encodeFloat::float underflow" */
                        }
                        k = bias + 1 - (exp = minExp - 1);
                    }
                }       
                
                if (intPart || status !== 0) {
                    exp = maxExp + 1;
                    k = bias + 2;
                    if (status === -Infinity) {
                        signal = 1;
                    } else if (isNaN(status)) {
                        bin[k] = 1;
                    }
                }

                n = Math.abs(exp + bias);
                tmpResult = "";
                
                for (j = exponentBits + 1; --j;) {
                    tmpResult = (n % 2) + tmpResult;
                    n = n >>= 1;
                }
                
                n = 0;
                j = 0;
                k = (tmpResult = (signal ? "1" : "0") + tmpResult +
                        bin.slice(k, k + precisionBits).join("")).length;
                r = [];
                
                for (; k;) {
                    n += (1 << j) * tmpResult.charAt(--k);
                    if (j === 7) {
                        r[r.length] = String.fromCharCode(n);
                        n = 0;
                    }
                    j = (j + 1) % 8;
                }
                
                r[r.length] = n ? String.fromCharCode(n) : "";
                result += r.join('');
                argumentPointer++;
            }
            break;

        case 'x': //NUL byte
            if (quantifier === '*') {
                throw new Error('Warning: pack(): Type x: \'*\' ignored');
            }
            for (i = 0; i < quantifier; i ++) {
                result += String.fromCharCode(0);
            }
            break;

        case 'X': //Back up one byte
            if (quantifier === '*') {
                throw new Error('Warning: pack(): Type X: \'*\' ignored');
            }
            for (i = 0; i < quantifier; i ++) {
                if (result.length === 0) {
                    throw new Error('Warning: pack(): Type X:' +
                            ' outside of string');
                } else {
                    result = result.substring(0, result.length - 1);
                }
            }
            break;

        case '@': //NUL-fill to absolute position
            if (quantifier === '*') {
                throw new Error('Warning: pack(): Type X: \'*\' ignored');
            }
            if (quantifier > result.length) {
                extraNullCount = quantifier - result.length;
                for (i = 0; i < extraNullCount; i ++) {
                    result += String.fromCharCode(0);
                }
            }
            if (quantifier < result.length) {
                result = result.substring(0, quantifier);
            }
            break;

        default:
            throw new Error('Warning:  pack() Type ' + instruction +
                    ': unknown format code');
        }
    }
    if (argumentPointer < arguments.length) {
        throw new Error('Warning: pack(): ' +
                (arguments.length - argumentPointer) + ' arguments unused');
    }

    return result;
}
```

---------------------------------------
*[Brett Zamir](http://brett-zamir.me)* on 2009-12-22 03:06:19  
Applied in Git. Thanks very much! (I did a little fixing of the notes and also moved to single quotes as they are equivalent to double quotes in JS and I find they are less ambiguous.) If you have modifications, please use http://github.com/kvz/phpjs/blob/master/functions/misc/pack.js as the base... Thanks again!
---------------------------------------
*[]()* on 2010-01-02 08:13:26  
@Tim de Koning: Great job on this function. The only feedback I can give you is that if you were to convert the switch statement with all of its cases to an object of individual functions, similar to the PHP.JS date function (http://phpjs.org/functions/date), the speed of the function will increase, most likely threefold, not that I see the speed of this function to be a problem as is.
---------------------------------------
*[Topper Bowers](http://blog.toppingdesign.com)* on 2011-02-21 18:51:18  
Any chance that the reverse (unpack) has already been written?
---------------------------------------
*[Brett Zamir](http://brett-zamir.me)* on 2011-02-22 04:57:55  
@Topper Bowers: At the top of the function list, there is a link to our unported, not implementing, and workbench items, with unpack showing as being the latter. You can follow the link to see whether the code works for you, but most likely it is there because either a bug was found or the function simply hasn't been completed yet. It looks fairly fleshed out though so it might not be too complex to get it working (dunno): https://github.com/kvz/phpjs/blob/master/_workbench/misc/unpack.js
---------------------------------------
*[Igor Tykhyy]()* on 2011-09-30 00:45:39  
Hi guys! Great function and awesome library. The function works well.. however: for some reason using the php pack method and this php.js pack method doesn't result in the same string.

I've got this SHA1-String (it's the SHA1 code for "abcdef12"): d253e3bd69ce1e7ce6074345fd5faa1a3c2e89ef .
I use "H*" to pack this string - and I receive a result. However: according to my page I've got a few symbols in there which are not properly displayed (even on a page that uses utf-8).
As for the php pack() method: it returns a bunch of ? along with a few recognizable letters.

What I am trying to do is pack this SHA1-String using javascript and then transfer it to my servlet (I used php for testing purposes, I use Java MessageDigest with SHA-algorithm on my backend). But - compared to my servlet - the resulting Strings have slightly different chars (please see my screenshot: http://www.abload.de/img/little_wrong_packtuql.jpg), because it seems that the javascript pack() method creates an ISO-8859-1 string whereas MessageDigest creates an UTF-8 string.

Does anyone happen to know what I might need to check/change in order for the awesome javascript pack()-method to produce utf-8 strings? (without the question marks)

Thank you all in advance!
---------------------------------------
*[Edward]()* on 2011-11-02 20:15:03  
Everything is fine but I've problems in IE7 :S. Using jQuery:
```
$(".content").html(pack("H*", hexString));
```
The error message is: 'Undefined' is null or not an object.
---------------------------------------
*[????? ?????? ? ?????](http://an3m1.com/)* on 2012-05-06 09:32:59  
I wonder how you got so good. HaHa ! This is really a fascinating blog, lots of stuff that I can get into. One thing I just want to say is that your design is so perfect ! You certainly know how to get a girls attention ! I’m glad that you’re here. I feel like I’ve learned something new by being here 

---------------------------------------
*[Brett Zamir](http://brett-zamir.me)* on 2012-07-05 14:28:28  
@Edward: I have made fixes in Git (also for unpack() which is in the workbench). Please check "raw js source".

@Igor Tykhyy: I am just trying to give a quick answer now, but it looks like each character is examined in the data, with its Unicode value utilized, whereas in PHP, each byte is treated as a separate character. You might try toying around with the references to "fromCharCode" (or "charCodeAt" in unpack()) and instead use what I just posted to http://phpjs.org/functions/361:361#comment_179265 for another purpose:

```
function bin2hex (s) {
    return encodeURIComponent(s+'').replace(/%/g, '').toLowerCase();
}
```

This will convert a non-separated string of hex values for each UTF-8 byte. You may be able to adapt this for your needs.
---------------------------------------
*[Brett Zamir](http://brett-zamir.me)* on 2012-07-05 14:30:51  
@Igor Tykhyy: (I should have mentioned that the notes to the function also mention this.)
---------------------------------------
