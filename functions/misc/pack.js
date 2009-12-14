function pack(format) {
    // http://kevin.vanzonneveld.net
    // +   original by: Tim de Koning (http://www.kingsquare.nl)
    // +      parts by: Jonas Raoni Soares Silva (http://www.jsfromhell.com)
    // %        note 1: Float encoding by: Jonas Raoni Soares Silva (http://jsfromhell.com/classes/binary-parser)
    // %        note 2: Home: http://www.kingsquare.nl/blog/12-12-2009/13507444/New-phpjs-function-pack
    // %        note 3: Feedback: phpjs-pack@kingsquare.nl
    // %        note 4: 'machine dependant byte order and size' aren't applicable for javascript
    // %        note 4: pack works as on a 32bit, little endian machine
    // *     example 1: pack("nvc*", 0x1234, 0x5678, 65, 66);
    // *     returns 1: '4xVAB'

    var formatPointer, argumentPointer, result, instruction, quantifier, word, nibble;

    formatPointer = 0;
    argumentPointer = 1;
    result = '';

    while (formatPointer < format.length) {
        instruction = format[formatPointer];
        quantifier = '';
        formatPointer++;
        while((formatPointer < format.length) && (format[formatPointer].match(/[0-9\*]/) != null)) {
            quantifier += format[formatPointer];
            formatPointer++;
        }
        if (quantifier == '') quantifier = 1;
        //now pack variables: 'quantifier' times 'instruction'
        switch(instruction) {
            case 'A': //NUL-padded string
            case 'a': //SPACE-padded string
                if (typeof arguments[argumentPointer] == 'undefined') throw new Error('Warning:  pack() Type '+instruction+': not enough arguments');
                else argument = arguments[argumentPointer];
                if (quantifier=='*') quantifier = argument.length;
                for (var i=0; i<quantifier; i++) {
                    if (typeof argument[i] == 'undefined') {
                        if (instruction == 'a') result += "\0";
                        else result += " ";
                    }
                    else result += argument[i];
                }
                argumentPointer++;
                break;

            case 'h': //Hex string, low nibble first
            case 'H': //Hex string, high nibble first
                if (typeof arguments[argumentPointer] == 'undefined')  throw new Error( 'Warning:  pack() Type '+instruction+': not enough arguments');
                else argument = arguments[argumentPointer];
                if (quantifier=='*') quantifier = argument.length;
                if (quantifier > argument.length) throw new Error('Warning: pack() Type '+instruction+': not enough characters in string');
                for (var i=0; i<quantifier; i+=2) {
                    //always get per 2 bytes...
                    word = argument[i];
                    if (((i+1) >= quantifier) || typeof(argument[i+1])=='undefined') { word += "0"; }
                    else word += argument[i+1];
                    //the fastest way to reverse?
                    if (instruction == 'h') word = word[1]+word[0];
                    result += String.fromCharCode(parseInt(word, 16));
                }
                argumentPointer++;
                break;

            case 'c': //signed char
            case 'C': //unsigned char
                //c and C is the same in pack
                if (quantifier=='*') quantifier = arguments.length - argumentPointer;
                if (quantifier > (arguments.length - argumentPointer))  throw new Error('Warning:  pack() Type '+instruction+': too few arguments');

                for (var i=0; i<quantifier; i++) {
                    result += String.fromCharCode(arguments[argumentPointer]);
                    argumentPointer++
                }
                break;

             case 's': // signed short (always 16 bit, machine byte order)
             case 'S': // signed short (always 16 bit, machine byte order)
             case 'v':
                //s and S is the same in pack
                //but can machine byte order be retrieved in javascript?
                //this is default byte order anywayz...
                if (quantifier=='*') quantifier = arguments.length - argumentPointer;
                if (quantifier > (arguments.length - argumentPointer))  throw new Error('Warning:  pack() Type '+instruction+': too few arguments');

                for (var i=0; i<quantifier; i++) {
                    result += String.fromCharCode(arguments[argumentPointer]&0xFF);
                    result += String.fromCharCode(arguments[argumentPointer]>>8&0xFF);
                    argumentPointer++;
                }
                break;

             case 'n': // unsigned short (always 16 bit, big endian byte order)
                if (quantifier=='*') quantifier = arguments.length - argumentPointer;
                if (quantifier > (arguments.length - argumentPointer))  throw new Error('Warning:  pack() Type '+instruction+': too few arguments');

                for (var i=0; i<quantifier; i++) {
                    result += String.fromCharCode(arguments[argumentPointer]>>8&0xFF);
                    result += String.fromCharCode(arguments[argumentPointer]&0xFF);
                    argumentPointer++;
                }
                break;

             case 'i': // signed integer (machine dependent size and byte order)
             case 'I': // unsigned integer (machine dependent size and byte order)
             case 'l': // signed long (always 32 bit, machine byte order)
             case 'L': // unsigned long (always 32 bit, machine byte order)
             case 'V': // unsigned long (always 32 bit, little endian byte order)
                if (quantifier=='*') quantifier = arguments.length - argumentPointer;
                if (quantifier > (arguments.length - argumentPointer))  throw new Error('Warning:  pack() Type '+instruction+': too few arguments');

                for (var i=0; i<quantifier; i++) {
                    result += String.fromCharCode(arguments[argumentPointer]&0xFF);
                    result += String.fromCharCode(arguments[argumentPointer]>>8&0xFF);
                    result += String.fromCharCode(arguments[argumentPointer]>>16&0xFF);
                    result += String.fromCharCode(arguments[argumentPointer]>>24&0xFF);
                    argumentPointer++;
                }

                break;
             case 'N': // unsigned long (always 32 bit, big endian byte order)
                if (quantifier=='*') quantifier = arguments.length - argumentPointer;
                if (quantifier > (arguments.length - argumentPointer))  throw new Error('Warning:  pack() Type '+instruction+': too few arguments');

                for (var i=0; i<quantifier; i++) {
                    result += String.fromCharCode(arguments[argumentPointer]>>24&0xFF);
                    result += String.fromCharCode(arguments[argumentPointer]>>16&0xFF);
                    result += String.fromCharCode(arguments[argumentPointer]>>8&0xFF);
                    result += String.fromCharCode(arguments[argumentPointer]&0xFF);
                    argumentPointer++;
                }
                break;

             case 'f': // float (machine dependent size and representation)
             case 'd': // double (machine dependent size and representation)
                //version based on IEEE754y

                var precisionBits = 23, exponentBits = 8;
                if (instruction=='d') {
                    precisionBits = 52 ;
                    exponentBits = 11;
                }

                if (quantifier=='*') quantifier = arguments.length - argumentPointer;
                if (quantifier > (arguments.length - argumentPointer))  throw new Error('Warning:  pack() Type '+instruction+': too few arguments');
                for (var i=0; i<quantifier; i++) {

                    var number = arguments[argumentPointer], bias = Math.pow(2, exponentBits - 1) - 1, minExp = -bias + 1, maxExp = bias, minUnnormExp = minExp - precisionBits, status = isNaN(n = parseFloat(number)) || n == -Infinity || n == +Infinity ? n : 0, exp = 0, len = 2 * bias + 1 + precisionBits + 3, bin = new Array(len), signal = (n = status !== 0 ? 0 : n) < 0, n = Math.abs(n), intPart = Math.floor(n), floatPart = n - intPart, i, lastBit, rounded, j, tmpResult;
                for(i = len; i; bin[--i] = 0);
                for(i = bias + 2; intPart && i; bin[--i] = intPart % 2, intPart = Math.floor(intPart / 2));
                for(i = bias + 1; floatPart > 0 && i; (bin[++i] = ((floatPart *= 2) >= 1) - 0) && --floatPart);
                for(i = -1; ++i < len && !bin[i];);
                if(bin[(lastBit = precisionBits - 1 + (i = (exp = bias + 1 - i) >= minExp && exp <= maxExp ? i + 1 : bias + 1 - (exp = minExp - 1))) + 1]){
                    if(!(rounded = bin[lastBit])) {
                    for(j = lastBit + 2; !rounded && j < len; rounded = bin[j++]);
                    }
                    for(j = lastBit + 1; rounded && --j >= 0; (bin[j] = !bin[j] - 0) && (rounded = 0));
                }
                for(i = i - 2 < 0 ? -1 : i - 3; ++i < len && !bin[i];);
                (exp = bias + 1 - i) >= minExp && exp <= maxExp ? ++i : exp < minExp && (exp != bias + 1 - len && exp < minUnnormExp, i = bias + 1 - (exp = minExp - 1));
                (intPart || status !== 0) && (1, exp = maxExp + 1, i = bias + 2, status == -Infinity ? signal = 1 : isNaN(status) && (bin[i] = 1));
                for(n = Math.abs(exp + bias), j = exponentBits + 1, tmpResult = ""; --j; tmpResult = (n % 2) + tmpResult, n = n >>= 1);
                for(n = 0, j = 0, i = (tmpResult = (signal ? "1" : "0") + tmpResult + bin.slice(i, i + precisionBits).join("")).length, r = []; i; n += (1 << j) * tmpResult.charAt(--i), j == 7 && (r[r.length] = String.fromCharCode(n), n = 0), j = (j + 1) % 8);
                r[r.length] = n ? String.fromCharCode(n) : "";
                result += r.join('');
                    argumentPointer++;
                }
                break;

            case 'x': //NUL byte
                if (quantifier=='*') throw new Error('Warning: pack(): Type x: \'*\' ignored');
                for (var i=0; i<quantifier; i++) {
                    result += "\0";
                }
                break;

            case 'X': //Back up one byte
                if (quantifier=='*') throw new Error('Warning: pack(): Type X: \'*\' ignored');
                for (var i=0; i<quantifier; i++) {
                    if (result.length==0) {
                         throw new Error('Warning: pack(): Type X: outside of string');
                    } else {
                        result = result.substring(0, result.length - 1);
                    }
                }
                break;

            case '@': //NUL-fill to absolute position
                if (quantifier=='*') throw new Error('Warning: pack(): Type X: \'*\' ignored');
                if (quantifier>result.length) {
                    var extraNullCount = quantifier - result.length;
                    for (var i=0; i<extraNullCount; i++) {
                        result += "\0";
                    }
                }
                if (quantifier<result.length) {
                    result = result.substring(0, quantifier);
                }
                break;

            default:
                throw new Error('Warning:  pack() Type '+instruction+': unknown format code')
        }
    }
    if (argumentPointer < arguments.length) throw new Error('Warning: pack(): '+( arguments.length - argumentPointer)+' arguments unused');
    return result;
}