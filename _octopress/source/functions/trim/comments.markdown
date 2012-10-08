*[Erkekjetter]()* on 2008-02-19 19:36:38  
The trim() function for PHP is described as
string trim  ( string $str  [, string $charlist  ] )

In your trim(), rtrim() and ltrim() functions the second parameter charlist is missing. You might change that to have a equivalent function.
---------------------------------------
*[Kevin van Zonneveld](http://kevin.vanzonneveld.net)* on 2008-02-21 12:17:27  
@ Erkekjetter: Hi Erkekjetter, thanks for your input. I've found the time to recode the functions and  updated php.js accordingly.
---------------------------------------
*[DxGx]()* on 2008-03-20 12:47:21  
```
function trim (str) {
	var whitespace = ' \n\r\t\f\x0b\xa0\u2000\u2001\u2002\u2003\u2004\u2005\u2006\u2007\u2008\u2009\u200a\u200b\u2028\u2029\u3000';
	for (var i = 0; i &lt; str.length; i++) {
		if (whitespace.indexOf(str.charAt(i)) === -1) {
			str = str.substring(i);
			break;
		}
	}
	for (i = str.length - 1; i &gt;= 0; i--) {
		if (whitespace.indexOf(str.charAt(i)) === -1) {
			str = str.substring(0, i + 1);
			break;
		}
	}
	return whitespace.indexOf(str.charAt(0)) === -1 ? str : '';
}
```

Replace trim function by this code. Acoding to this site: it is faster: http://blog.stevenlevithan.com/archives/faster-trim-javascript
---------------------------------------
*[0x0]()* on 2008-08-07 02:06:14  
If you also have rtrim and ltrim, you could just do this:
```
function trim(str, charlist) {
    return ltrim(rtrim(str, charlist), charlist);
}
```
---------------------------------------
*[Jack]()* on 2008-08-21 16:21:58  
we can avoid unnecessary string length computations by changing the &quot;for&quot; loop from

```
for (var i = 0; i &lt; str.length; i++) 
```

to 

```
for (var i = 0, l=str.length; i &lt; l; i++) 
```

```
function trim( str, charlist ) {
   
 
    var whitespace;
    
    if (!charlist) {
        whitespace = ' \n\r\t\f\x0b\xa0\u2000\u2001\u2002\u2003\u2004\u2005\u2006\u2007\u2008\u2009\u200a\u200b\u2028\u2029\u3000';
    } else {
        whitespace = charlist.replace(/([\[\]\(\)\.\?\/\*\{\}\+\$\^\:])/g, '\$1');
    }
  
    for (var i = 0, l=str.length; i &lt; l; i++) {
        if (whitespace.indexOf(str.charAt(i)) === -1) {
            str = str.substring(i);
            break;
        }
    }
    for (i = str.length - 1; i &gt;= 0; i--) {
        if (whitespace.indexOf(str.charAt(i)) === -1) {
            str = str.substring(0, i + 1);
            break;
        }
    }
    return whitespace.indexOf(str.charAt(0)) === -1 ? str : '';
}
```
---------------------------------------
*[Ben W]()* on 2008-08-27 15:08:26  
Wouldn't it be better to use regex? Like one of these:

http://blog.stevenlevithan.com/archives/faster-trim-javascript
---------------------------------------
*[Kevin van Zonneveld](http://kevin.vanzonneveld.net)* on 2008-08-27 17:08:04  
@ 0x0: That's definitely something to pounder about. We did not in the first place, because one of the project goals is to keep functions as standalone as reasonably possible. This duplication seemed reasonable for a standalone trim.
---------------------------------------
*[Kevin van Zonneveld](http://kevin.vanzonneveld.net)* on 2008-08-27 17:16:01  
@ Jack: That's a good idea, thank you, I've implemented it and credited you accordingly.

@ Ben W: I will have to study on that, thanks for the input
---------------------------------------
*[Onno Marsman]()* on 2008-10-04 17:08:42  
Something like trim(16,1) does not work correctly.

Fix:
Add the following lines of code to the beginning of the function:
```
str += '';
charlist += '';
```
---------------------------------------
*[Kevin van Zonneveld](http://kevin.vanzonneveld.net)* on 2008-10-06 12:01:05  
@ Onno Marsmann: Fixed, thank you!
---------------------------------------
*[zeroneta]()* on 2010-01-05 17:28:30  
```
_.trim = function( a, s )
{
	s = s == un ? '\s\n\r\t\f\x0b\xa0\u2000\u2001\u2002\u2003\u2004\u2005\u2006\u2007\u2008\u2009\u200a\u200b\u2028\u2029\u3000' : real( s );
	return ( a + '' ).replace( new _._.RegExp( '(^[' + s + ']*)|([' + s + ']*$)', 'g' ), '' );
}
```

```
$.real = function( a )
{
	return ( a + '' ).replace( /(\$|\^|\*|\(|\)|\-|\+|\||\\|\{|\[|\}|\]|\,|\.|\?|\/)/g, '\\$1' );
}
```
---------------------------------------
*[zeroneta]()* on 2010-01-05 22:11:57  
http://bgscript.com/jscore/script/core.js
---------------------------------------
