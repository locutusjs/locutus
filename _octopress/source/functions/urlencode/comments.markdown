*[Philip Peterson]()* on 2008-04-18 02:16:28  
Just so you know, in phpjs_tester, the examples for urlencode and nl2br are both wrong (they don't just not work).  ;-)
---------------------------------------
*[Philip Peterson]()* on 2008-04-18 03:24:35  
Woah... strike that, apparently it's because you replaced escape with encodeURIComponent?  They function a little bit differently, and escape() is the most similar to PHP's functionality.
---------------------------------------
*[Kevin van Zonneveld](http://kevin.vanzonneveld.net)* on 2008-04-18 09:14:30  
Yeah I did it because Michael reached the conclusion that encodeURIComponent had better PHP compatibility.

I guess the tester doesn't work because in it current form it fails to handle \n characters, and maybe the exclamation mark gets translated twice, I have to double check that.

Discussion on encodeURIComponent vs escape can be found here:
http://kevin.vanzonneveld.net/techblog/article/javascript_equivalent_for_phps_http_build_query/#comment_1071

If you reach a different conclusion, please let me know ok?
---------------------------------------
*[johnrembo]()* on 2008-08-27 17:07:38  
```
function urlencode (str) {
    return encodeURIComponent(str);
}
```
---------------------------------------
*[Kevin van Zonneveld](http://kevin.vanzonneveld.net)* on 2008-08-27 19:31:24  
@ johnrembo: Hi John, thanks for your input again. We had some discussion about it earlier. It doesn't mimic PHP behaviour enough. Differences between JavaScript's encoding functionalities can be found here: http://xkr.us/articles/javascript/encode-compare/
---------------------------------------
*[AJ](http://www.tiredangel.com)* on 2008-08-28 23:27:41  
It's a good function, but the it needs to encode the forward slash character also. I'd recommend adding the following line before the return statement:

```
ret = ret.replace(/\//g,'%2F');
```

Short of going into the PHP source, this seems to work reasonably similarly.
---------------------------------------
*[Kevin van Zonneveld](http://kevin.vanzonneveld.net)* on 2008-08-29 12:18:27  
@ AJ: I've rewritten the urlencoding functions, should be a great improvement! Thanks for your input.
---------------------------------------
*[bukura]()* on 2008-10-09 14:08:26  
```
function urlencode (str) {
	var res=&quot;&quot;;
	for (i=0;i&lt;str.length;i++) {
		if(str[i]==' ') {
			res+='+';
		}else {
			res+=escape(str[i]);
		}
	}
	return res;
}
```
---------------------------------------
*[Kevin van Zonneveld](http://kevin.vanzonneveld.net)* on 2008-10-10 14:55:10  
@ bukura: Unfortunately we have some bad experiences with escape, as it does not provide PHP compatible output. Please also see the link we refer to in the script.
---------------------------------------
*[Martin Allchin](http://www.mallchin.in)* on 2009-06-18 11:00:42  
The UK pound sign (£) encodes with multiple escape sequences giving:

```
%C2%A3
```

rather than

```
%A3
```

This is due to conversion into UTF-8. I suggest adding the following into the histogram array as a simple fix:

```
histogram['%C2%A3'] = '%A3';
```

---------------------------------------
*[Brett Zamir](http://bahai-library.com)* on 2009-06-18 13:04:12  
Thanks, Martin. Can you explain why we don't want UTF-8 though? I see when I test this with PHP, if the file is encoded in UTF-8, I get the same results. Given the tide turning toward UTF-8, not to mention its compatibility with all languages, I think it's best to try for that, no? 

I guess we could add a custom "phpjs." configuration option (triggered through our ini_set() which allowed for other character sets), but we'd probably want to use some generic algorithm to translate assuming Latin-1 input (or whatever) rather than adding character conversions case by case. What do you think?
---------------------------------------
*[Brett Zamir](http://bahai-library.com)* on 2009-06-18 13:07:26  
@Martin, to add to my comment just now, I see escape() would do the trick, but that is deprecated, again because it assumes Latin-1.
---------------------------------------
*[Donovan Walker](http://donovanwalker.com)* on 2009-10-13 21:48:39  
Have to love this:
http://phpjs.org/functions/urlencode:573#comment_1090
---------------------------------------
*[Brett Zamir](http://brett-zamir.me)* on 2009-10-14 02:15:36  
@Donovan Walker: Yeah, except that that's not perfectly equivalent to what urlencode() does.
---------------------------------------
*[Brett Zamir](http://brett-zamir.me)* on 2009-10-28 02:28:55  
Ok, 

I've updated in git (at http://github.com/kvz/phpjs/commit/2691be636ea1d3f8d035bfbe11fb2e05657b48da ) to a simpler (and faster) implementation based on encodeURIComponent (for all the urlencode/decode functions), but fully adjusting to how PHP is SUPPOSED to become as of PHP 5.3/6.0 (though I didn't see news of it yet). If you want PHP how it is now, to the encode functions you should add (since encodeURIComponent() doesn't do it) an additional:

```.replace(/~/g, '%7E');```

...since PHP at present outdatedly encodes the tilde, while later RFC's have let it be unencoded.

(The decode functions in PHP already can decode the tilde ok, so no need to "correct" here.)

Two other lessons learned (I hope) from RFC3986 (at http://labs.apache.org/webarch/uri/rfc/rfc3986.html ):
1) The reason why "!", "'", "(", ")", and "*" are now reserved (though not by the time encodeURIComponent was added to  JavaScript, thus it is outdated and has to be corrected), even though they have no special official URI delimiting function, is because as characters normally usable for other purposes, it helps indicate that the other items in the group to which they belong (e.g., as with "&", "=", etc.) are generally not safe to be used as is without escaping. I guess it also allows them to be used for unofficial purposes.
2) Although there are no PHP analogues to encodeURI() in JavaScript (as urlencode() and rawurlencode() pretty much are for encodeURIComponent), so we don't have to worry about it as far as PHP.JS here, another way in which JavaScript is a little behind the times is in encodeURI() as far as how it should stop escaping square brackets, as they have been made reserved in order to be usable with IPv6 (delimiters for an IP literal in the 'host'). One might thus "fix" encodeURI thus (but NOT encodeURIComponent which is SUPPOSED to escape delimiters like '/' and now '['):

```function fixedEncodeURI () {
    return encodeURI(str).replace(/%5B/g, '[').replace(/%5D/g, ']');
}```

For the record, we can do all of the straight replaces above because UTF-8 only uses bytes 0x00 to 0x7F for single-byte ASCII--these bytes can therefore be safely replaced back-and-forth from their escaped form to their unescaped form without fear that it is being used as part of a multi-byte sequence.

Again, folks, be very careful before submitting patches that you realize that our encoding/decoding is done here assuming UTF-8; you have to serve your PHP pages with a UTF-8 header (as you should) if you want comparable behavior on the PHP side.

Below is the old version, just for easy reference (e.g., if you happen to want to know how to make your own UTF-8 octets):

```function urlencode (str) {
    // http://kevin.vanzonneveld.net
    // +   original by: Philip Peterson
    // +   improved by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)
    // +      input by: AJ
    // +   improved by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)
    // +   improved by: Brett Zamir (http://brett-zamir.me)
    // +   bugfixed by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)
    // +      input by: travc
    // +      input by: Brett Zamir (http://brett-zamir.me)
    // +   bugfixed by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)
    // +   improved by: Lars Fischer
    // +      input by: Ratheous
    // +      reimplemented by: Brett Zamir (http://brett-zamir.me)
    // +   bugfixed by: Joris
    // %          note 1: This reflects PHP 5.3/6.0+ behavior
    // *     example 1: urlencode('Kevin van Zonneveld!');
    // *     returns 1: 'Kevin+van+Zonneveld%21'
    // *     example 2: urlencode('http://kevin.vanzonneveld.net/');
    // *     returns 2: 'http%3A%2F%2Fkevin.vanzonneveld.net%2F'
    // *     example 3: urlencode('http://www.google.nl/search?q=php.js&ie=utf-8&oe=utf-8&aq=t&rls=com.ubuntu:en-US:unofficial&client=firefox-a');
    // *     returns 3: 'http%3A%2F%2Fwww.google.nl%2Fsearch%3Fq%3Dphp.js%26ie%3Dutf-8%26oe%3Dutf-8%26aq%3Dt%26rls%3Dcom.ubuntu%3Aen-US%3Aunofficial%26client%3Dfirefox-a'

    var hexStr = function (dec) {
        return '%' + (dec < 16 ? '0' : '') + dec.toString(16).toUpperCase();
    };

    var ret = '',
            unreserved = /[\w.-]/; // A-Za-z0-9_.- // Tilde is not here for historical reasons; to preserve it, use rawurlencode instead
    str = (str+'').toString();

    for (var i = 0, dl = str.length; i < dl; i++) {
        var ch = str.charAt(i);
        if (unreserved.test(ch)) {
            ret += ch;
        }
        else {
            var code = str.charCodeAt(i);
            if (0xD800 <= code && code <= 0xDBFF) { // High surrogate (could change last hex to 0xDB7F to treat high private surrogates as single characters); https://developer.mozilla.org/index.php?title=en/Core_JavaScript_1.5_Reference/Global_Objects/String/charCodeAt
                ret += ((code - 0xD800) * 0x400) + (str.charCodeAt(i+1) - 0xDC00) + 0x10000;
                i++; // skip the next one as we just retrieved it as a low surrogate
            }
            // We never come across a low surrogate because we skip them, unless invalid
            // Reserved assumed to be in UTF-8, as in PHP
            else if (code === 32) {
                ret += '+'; // %20 in rawurlencode
            }
            else if (code < 128) { // 1 byte
                ret += hexStr(code);
            }
            else if (code >= 128 && code < 2048) { // 2 bytes
                ret += hexStr((code >> 6) | 0xC0);
                ret += hexStr((code & 0x3F) | 0x80);
            }
            else if (code >= 2048) { // 3 bytes (code < 65536)
                ret += hexStr((code >> 12) | 0xE0);
                ret += hexStr(((code >> 6) & 0x3F) | 0x80);
                ret += hexStr((code & 0x3F) | 0x80);
            }
        }
    }
    return ret;
}```
---------------------------------------
*[Kevin van Zonneveld](http://kevin.vanzonneveld.net)* on 2009-11-07 18:32:19  
Brett, thanks so much for your research. This stuff is rocking so hard.. : ) you make me proud man!
---------------------------------------
*[Mohsen Haeri](http://www.tabatabaiyazdi.com)* on 2009-11-19 19:29:30  
Thank you very much...

---------------------------------------
*[Pavani]()* on 2011-01-04 09:54:39  
Thanks a lot for the help. You saved me.
---------------------------------------
*[Demon](http://demon.tw)* on 2011-06-24 07:15:35  
```
str = (str + '').toString();
```
This seems unnecessary because encodeURIComponent will call toString method internally
---------------------------------------
*[Kolink](http://pokefarm.org/)* on 2011-08-04 11:00:29  
My I suggest, intead of
```return encodeURIComponent(str).replace(/!/g, '%21').replace(/'/g, '%27').replace(/\(/g, '%28').
    replace(/\)/g, '%29').replace(/\*/g, '%2A').replace(/%20/g, '+');```
The simpler:
```return encodeURIComponent(str).replace(/[!'\(\)\*]/g, function(a) {return '%'+a.charCodeAt(0).toString(16);}).replace(/%20/g, '+');```
be used instead?
---------------------------------------
*[Brett Zamir](http://brett-zamir.me)* on 2011-08-09 06:11:45  
@Kolink: I like the elegance of your code, but since it is not that much shorter, and in my tests on Firefox anyways, it is slower, I think we ought to stick with what we have. The way it is now is also more readable. Btw, you don't need backslashes inside a character class except for other backslashes, initial caret, and medial right brackets or hyphens (medial here meaning non-initial, non-terminal, and not-immediately-following-an-initial-caret).
---------------------------------------
*[Robert Eisele](http://www.xarg.org/)* on 2011-09-03 13:29:54  
The urlencode function can be optimized by reducing all .replace() calls to one call with a callback like this:

```
function urlencode (str) {

	return encodeURIComponent(str).replace(/!|'|\(|\)|\*|%20/g, function(x) {

		return {
			"!":	"%21",
			"'":	"%27",
			"(":	"%28",
			")":	"%29",
			"*":	"%2A",
			"%20":	"+"
		}[x];
	});
}
```

The reason for this change is performance. I've added a test on jsperf: http://jsperf.com/url-encode
---------------------------------------
*[Ruslan](http://tftm.org.ua/)* on 2011-09-29 09:34:09  
Thanks, article was really helpful.
---------------------------------------
*[meera](web development india)* on 2011-11-18 11:39:49  

This is very help for me, thanks for your sharing informations

Thanks
<a href="htttp://www.pluskb.com">web development india
bangalore</a>
---------------------------------------
*[]()* on 2012-04-09 16:37:17  
it only worked for me if instead of 
```urlencode('Kevin van Zonneveld!');```
i used
```urlencode(escape('Kevin van Zonneveld!'));```

an alternative (that i used) is instead of
```return encodeURIComponent(str).replace(/!/g, '%21').replace(/'/g, '%27').replace(/\(/g, '%28').
    replace(/\)/g, '%29').replace(/\*/g, '%2A').replace(/%20/g, '+');```

add the escape becoming
```return encodeURIComponent(escape(str)).replace(/!/g, '%21').replace(/'/g, '%27').replace(/\(/g, '%28').
    replace(/\)/g, '%29').replace(/\*/g, '%2A').replace(/%20/g, '+');```
---------------------------------------
