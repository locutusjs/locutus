*[Greg Copenhaver]()* on 2008-05-09 17:40:19  
I attempted to use your bin2hex() function, but had a problem with it in my situation (Javascript LM hashes - http://gcopenhaver.com/node/94).  Some characters in the string that I was passing to were 0x0f and lower, and this function does not include the first '0' for any of those, causing problems if it's not at the beginning of the string.  Here's a function from http://tero.co.uk/des/code.php that will include the '0' if a byte is 0x0f or less.  In my use, I removed the '0x' prefix that was set in this function.  This is the code as copied from the des.js file.  I don't know anything about the licensing of this code.

```
function stringToHex (s) {
  var r = &quot;0x&quot;;
  var hexes = new Array (&quot;0&quot;,&quot;1&quot;,&quot;2&quot;,&quot;3&quot;,&quot;4&quot;,&quot;5&quot;,&quot;6&quot;,&quot;7&quot;,&quot;8&quot;,&quot;9&quot;,&quot;a&quot;,&quot;b&quot;,&quot;c&quot;,&quot;d&quot;,&quot;e&quot;,&quot;f&quot;);
  for (var i=0; i&lt;s.length; i++) {r += hexes [s.charCodeAt(i) &gt;&gt; 4] + hexes [s.charCodeAt(i) &amp; 0xf];}
  return r;
}
```
---------------------------------------
*[Linuxworld]()* on 2008-11-18 16:34:10  
Hello Kevin,

First, nice job and big thanks for sharing this kind of stuff: JS and PHP worth to be closer thanks to equivalents.

Before fixing your bin2hex function that were not working in my case, I have used one of http://www.paulschou.com/tools/xlate/ that works fine on php side but translated with your js equivalents gave a string with NaN and zeroes..

Your version of bin2hex is buggy and returns a shorter string length due to missing prepending zeroes for low bytes (ie those of value &lt; 0x10). Note that an user has provided a patched version of ord that seems to take this into acccount and with this one, Paul schou's bin2hex equivalent may work on the js side.

Here is the patched and commented version, Enjoy.                        Linuxworld

       /**
	*@name bin2hex
	*@brief  Convert binary data into hexadecimal representation
	*@version 2.0
	*@requires str_repeat 
	*@note 
	*	V1.0 - original by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)
	*	V1.1 - bugfixed by: Onno Marsman
	*	V2.0 (18.11.2008) 2 digits for low bytes fix by Linuxworld 
	*@see http://kevin.vanzonneveld.net/techblog/article/javascript_equivalent_for_phps_bin2hex/
	*@internal Similar to recursive ord or encodeuri without %. Be warned encodeuri or encodeuricomponent
	* are buggy on both JS/PHP sides. An attempt to reproduce encodeUri was made here  http://www.captain.at/howto-php-urlencode-javascript-decodeURIComponent.php but its encoding/decoding 
	*table is incomplete and thus not as much reliable than bin2hex.
	* For all escaping stuff to retrieve hex values: http://xkr.us/articles/javascript/encode-compare/
	*@example 
	*	example 1: bin2hex('Kev');
	*	 returns 1: '4b6576'
	*@param String s a binary string (ie one given after base64_decode call for sample)
	*@return String the hexadecimal representation of the given string.
	**/
	function bin2hex(s){
		
		var v,i, f = 0, a = [];
		s += '';
		f = s.length;
		for(i = 0; i&lt;f; i++){
                        v= s.charCodeAt(i).toString(16);
			a[i] =str_repeat(&quot;0&quot;, 2-v.toString().length)+v; //ensures 2 digit code for bytes!
		}
		return a.join('');
	}
---------------------------------------
*[Linuxworld]()* on 2008-11-18 16:34:54  
Hello Kevin,

First, nice job and big thanks for sharing this kind of stuff: JS and PHP worth to be closer thanks to equivalents.

Before fixing your bin2hex function that were not working in my case, I have used one of http://www.paulschou.com/tools/xlate/ that works fine on php side but translated with your js equivalents gave a string with NaN and zeroes..

Your version of bin2hex is buggy and returns a shorter string length due to missing prepending zeroes for low bytes (ie those of value &lt; 0x10). Note that an user has provided a patched version of ord that seems to take this into acccount and with this one, Paul schou's bin2hex equivalent may work on the js side.

Here is the patched and commented version, Enjoy.                        Linuxworld

       /**
	*@name bin2hex
	*@brief  Convert binary data into hexadecimal representation
	*@version 2.0
	*@requires str_repeat 
	*@note 
	*	V1.0 - original by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)
	*	V1.1 - bugfixed by: Onno Marsman
	*	V2.0 (18.11.2008) 2 digits for low bytes fix by Linuxworld 
	*@see http://kevin.vanzonneveld.net/techblog/article/javascript_equivalent_for_phps_bin2hex/
	*@internal Similar to recursive ord or encodeuri without %. Be warned encodeuri or encodeuricomponent
	* are buggy on both JS/PHP sides. An attempt to reproduce encodeUri was made here  http://www.captain.at/howto-php-urlencode-javascript-decodeURIComponent.php but its encoding/decoding 
	*table is incomplete and thus not as much reliable than bin2hex.
	* For all escaping stuff to retrieve hex values: http://xkr.us/articles/javascript/encode-compare/
	*@example 
	*	example 1: bin2hex('Kev');
	*	 returns 1: '4b6576'
	*@param String s a binary string (ie one given after base64_decode call for sample)
	*@return String the hexadecimal representation of the given string.
	**/
	function bin2hex(s){
		
		var v,i, f = 0, a = [];
		s += '';
		f = s.length;
		for(i = 0; i&lt;f; i++){
                        v= s.charCodeAt(i).toString(16);
			a[i] =str_repeat(&quot;0&quot;, 2-v.toString().length)+v; //ensures 2 digit code for bytes!
		}
		return a.join('');
	}
---------------------------------------
*[Linuxworld]()* on 2008-11-22 16:55:51  
Sorry for the previous duplicates, here is the optimized version (ie shorter, with no more str_repeat dependency):

```
function bin2hex(s){
		// http://kevin.vanzonneveld.net
		// +   original by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)
		// +   bugfixed by: Onno Marsman
		// +   bugfixed by:  Linuxworld (v2) 
		// *     example 1: bin2hex('Kev');
		// *     returns 1: '4b6576'
		
		var v,i, f = 0, a = [];
		s += '';
		f = s.length;
		for(i = 0; i&lt;f; i++){
                        a[i] = s.charCodeAt(i).toString(16).replace(/^(\d)$/,&quot;0$1&quot;);
		}
		return a.join('');
	}
```

    Now, alert(bin2hex(String.fromCharCode(0x00))) gives 00 which is the expected result.
---------------------------------------
*[Linuxworld]()* on 2008-11-22 19:07:49  
Hum, lacks a-f range in the previous snippet,
Hope this time is the good one.

```
function bin2hex(s){
		// http://kevin.vanzonneveld.net
		// +   original by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)
		// +   bugfixed by: Onno Marsman
		// +   bugfixed by:  Linuxworld (v2) 
		// *     example 1: bin2hex('Kev');
		// *     returns 1: '4b6576'
		
		var v,i, f = 0, a = [];
		s += '';
		f = s.length;
		for(i = 0; i&lt;f; i++){
                        a[i] = s.charCodeAt(i).toString(16).replace(/^([\da-f])$/,&quot;0$1&quot;);
		}
		return a.join('');
	} 
```
---------------------------------------
*[Kevin van Zonneveld](http://kevin.vanzonneveld.net)* on 2008-11-25 17:03:51  
@ Linuxworld: Thanks a lot for your thorough contribution!
---------------------------------------
*[Max]()* on 2010-04-12 23:47:06  
Hi all !

I think there is a bug with some characters in the bin2hex function.

For example, with this char : "Œ" i have the hex : "152"

and it should be "008c" ?
http://www.fileformat.info/info/unicode/char/008c/index.htm

"152" is not an hexadecimal code ?

And it's the same problem with these letters : Š š Ž ž Œ œ Ÿ

Thanks !
---------------------------------------
*[Brett Zamir](http://brett-zamir.me)* on 2010-04-13 04:35:24  
Hello Max! Actually, the character referred to on that page is in fact a control character, not the character that it shows. It appears that they may be rendered at that site with that appearance because Windows-1252 does define the character at that code point as in fact being that Latin ligature: http://en.wikipedia.org/wiki/Windows-1252#Codepage_layout . If you consult http://www.unicode.org/charts/PDF/U0080.pdf , you can confirm that the character is not supposed to be rendered the way it is on the page you have cited, while you can see at http://www.unicode.org/charts/PDF/U0100.pdf that U+152 is the one it is showing. 

However, if you go to their "browser test page", even though you can't see the character in Firefox, if you copy the hidden character there (minus the surrounding spaces and tabs) and use it in the bin2hex function, you'll see that it returns '8c'.

So the behavior of the function is correct. FYI, if you're using Firefox, my extension at https://addons.mozilla.org/en-US/firefox/addon/5235 will let you find the definitions of characters similar to that site and some of the other information it contains, with characters rendered as is, or also available with a transcluded image from the Unicode site itself so you can see how it is supposed to look. And if you are seeking for the real characters, you can use the extension to search by character name, e.g., to search for "oe", you'll turn up U+152 in the chart view.

Also, FYI, many people confuse Windows-1252 with Latin-1 (ISO-8859-1) to such an extent that even browsers do so, and now the HTML5 draft is purposely defining Latin-1 to map to Windows-1252: http://www.whatwg.org/specs/web-apps/current-work/multipage/parsing.html#character-encodings-0 ! To avoid the confusion and get all kinds of other benefits, always use Unicode...
---------------------------------------
*[Anonymous]()* on 2012-05-13 17:05:03  
Sorry but this not work for convert binaries numbers to hexadecimal numbers. WTF! Try convert "10100101"... your function return "3130313030313031" (but the correct answer is "A5").
---------------------------------------
*[ntoniazzi]()* on 2012-06-29 16:50:11  
This one is about 50% faster :
```
function bin2hex(s) {
    var i, m, o = "", n;
    
    for (i = 0, m = s.length; i< m; i++) {
        n = s.charCodeAt(i).toString(16)
        o += n.length < 2 ? "0" + n : n;
    }
    
    return o;
}
```
---------------------------------------
*[Rafa?]()* on 2012-06-29 23:38:44  
@ntoniazzi: thanks for the improvement. It's now on git (https://github.com/kvz/phpjs/commit/fe540ca0f15a4127204ba7615f64fcaafb33c81f). If you want to have something else than your nick (ntoniazzi) in the "credit" section, please contact me.
---------------------------------------
*[Brett Zamir](http://brett-zamir.me)* on 2012-07-04 16:56:02  
@Anonymous: Our function is returning what PHP also returns in your example. The PHP function is based on the byte value of the string--i.e., concatening the hex value of each character byte one byte at a time instead of treating the input string characters as individual bits.

Ours is also, though based on the value of each UTF-16 character as used by JavaScript (internally--as opposed to the character encoding of the page which can (and should) be UTF-8) rather than trying to treat JavaScript strings as UTF-8 multiple byte values as PHP treats them.

If you need the latter behavior, that can be achieved by:

```
function bin2hex (s) {
    return encodeURIComponent(s+'').replace(/%/g, '').toLowerCase();    
}
```

If you want your functionality in the PHP way (and thus php.js way), you can use:

```dechex(bindec('10100101'))```

which will give "a5" lower case (as in PHP).
---------------------------------------
