*[Michael Grier]()* on 2009-04-21 06:09:56  
Not encoding spaces is not the behavior of rawurlencode or urlencode, for that matter.

urlencode and rawurlencode both encode anything that is not "A to Z", "a to z", "0 to 9", "-", "_" or "." ... the only difference between them is how spaces are encoded... urlencode encodes spaces as "+" and rawurlencode encodes spaces as "%20".
---------------------------------------
*[Brett Zamir](http://bahai-library.com)* on 2009-04-21 08:43:35  
Good catch!  I'm not sure how that happened, but it is now fixed in SVN. I've actually been meaning to review these functions, as I'm not 100% sure now that the recent changes to the histogram have all been correct, at least for all functions...
---------------------------------------
*[Me]()* on 2009-06-01 23:15:34  
Isn't this simpler and achieving the same result:
```escape(str);```
---------------------------------------
*[Kankrelune](http://www.webfaktory.info/)* on 2009-06-02 00:01:39  
it's not exactly the same chars list in escape and rawurlencode... .. .

The escape and unescape functions do not work properly for non-ASCII characters and have been deprecated. In JavaScript 1.5 and later, use encodeURI or encodeURIComponent... .. . ;o)

@ tchaOo°
---------------------------------------
*[Brett Zamir](http://bahai-library.com)* on 2009-06-02 02:46:00  
Even encodeURIComponent differs. See http://www.devpro.it/examples/php_js_escaping.php
---------------------------------------
*[Joris]()* on 2009-09-09 15:15:51  
This function does not work properly for 4 byte unicode characters. Browsers use UTF-16 for strings. That means any unicode character above 65536 is split up into two surrogates values.

So "code >= 65536" is NEVER true.
Oh and PHP always makes sure a percentage value is composed of two hex numbers.
Here is a version that does urlencode as if the string were really UTF-8:

```
var hexStr = function (dec) {
    return '%' + (dec < 16 ? '0' : '') + dec.toString(16).toUpperCase();
};

var ret = '',
        unreserved = /[\w.~-]/; // A-Za-z0-9_.~-
str = (str+'').toString();

for (var i = 0, dl = str.length; i < dl; i++) {
    var ch = str.charAt(i);
    if (unreserved.test(ch)) {
        ret += ch;
    }
    else {
        var code = str.charCodeAt(i);
        if (0xD800 <= code && code <= 0xDBFF) // High surrogate (could change last hex to 0xDB7F to treat high private surrogates as single characters); https://developer.mozilla.org/index.php?title=en/Core_JavaScript_1.5_Reference/Global_Objects/String/charCodeAt&revision=39
        {
            code = ((code - 0xD800) * 0x400) + (str.charCodeAt(i+1) - 0xDC00) + 0x10000;
            i++; // skip the next one
        }
        // We never come across a low surrogate because we skip them
        
        // Reserved assumed to be in UTF-8, as in PHP
        if (code < 128) { // 1 byte
            ret += hexStr(code);
        }
        else if (code >= 128 && code < 2048) { // 2 bytes
            ret += hexStr((code >> 6) | 0xC0);
            ret += hexStr((code & 0x3F) | 0x80);
        }
        else if (code >= 2048 && code < 65536) { // 3 bytes
            ret += hexStr((code >> 12) | 0xE0);
            ret += hexStr(((code >> 6) & 0x3F) | 0x80);
            ret += hexStr((code & 0x3F) | 0x80);
        }
        else if (code >= 65536) { // 4 bytes
            ret += hexStr((code >> 18) | 0xF0);
            ret += hexStr(((code >> 12) & 0x3F) | 0x80);
            ret += hexStr(((code >> 6) & 0x3F) | 0x80);
            ret += hexStr((code & 0x3F) | 0x80);
        }
    }
}
return ret;
```

Gr. Joris
---------------------------------------
*[Brett Zamir](http://brett-zamir.me)* on 2009-09-10 04:12:09  
@Joris: Good catch about the non-BMP code points; ironic you caught me making the mistake, since I was the one who edited the article you cited for the correction to point this problem out! :)  That's what I get for adapting someone else's pattern without thinking... Anyways, your addition is good, except that it should not assign to "code" but instead to "ret" and then do a "continue" after the "i++" or ensure we are in a continuous else/else-if block (I chose the latter). Also, thanks for the catch on the hex needing two chars min... Fixed in git...
---------------------------------------
*[Joris van der Wel]()* on 2009-09-29 16:06:36  
heh :)

Well, if a high surrogate is found, the i++; is just there so we do not loop over the low surrogate the next time.
It then goes all the way to ```if (code >= 65536) { // 4 byte``` to turn it into utf-8

That just me accounting for the remote possibility the specification changes (aka charCodeAt returning something bigger then 65535)

Funny thing is, I actually wrote my own rawurlencode function before finding this one and it was nearly identical. 
---------------------------------------
