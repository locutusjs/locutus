*[sowberry]()* on 2008-08-08 17:50:42  
While looking for a javascript crc script, I found the version on webtoolkit.info as well as your subsequent modification.

Testing with a chunk of text a couple hundred characters long, with just a couple non-ascii values, I saw no significant improvement with your approach of using an array as a pseudo-StringBuilder.  The issue is the use of String.fromCharCode for even ascii values, which forces too many string creations.  The code below is about 3 times faster in my tests:

```
function utf8_encode(string) {
    string = string.replace(/\r\n/g,&quot;\n&quot;);
    var utftext = &quot;&quot;;
    var start, end;

    start = end = 0;
    for (var n = 0; n &lt; string.length; n++) {

        var c = string.charCodeAt(n);
        var enc = null;

        if (c &lt; 128) {
            end++;
        }
        else if((c &gt; 127) &amp;&amp; (c &lt; 2048)) {
            enc = String.fromCharCode((c &gt;&gt; 6) | 192) + String.fromCharCode((c &amp; 63) | 128);
        }
        else {
            enc = String.fromCharCode((c &gt;&gt; 12) | 224) + String.fromCharCode(((c &gt;&gt; 6) &amp; 63) | 128) + String.fromCharCode((c &amp; 63) | 128);
        }
        if (enc != null)
        {
            if (end &gt; start)
            {
                utftext += string.substring(start, end);
            }
            utftext += enc;
            start = end = n+1;
        }

    }
    if (end &gt; start)
    {
        utftext += string.substring(start, string.length);
    }

    return utftext;
}
```

Please feel free to post this to the various script repositories, as I am not especially active on the web.  Thanks.
---------------------------------------
*[Kevin van Zonneveld](http://kevin.vanzonneveld.net)* on 2008-08-27 18:14:23  
@ sowberry: Thank you for your improvement!
---------------------------------------
*[Yves Sucaet]()* on 2008-11-12 21:15:28  
I think it makes sense to replace
```
string = (string+'').replace(/\r\n/g,&quot;\n&quot;);
```

with 

```
string = (string+'').replace(/\r\n/g,&quot;\n&quot;);
string = (string+'').replace(/\r/g,&quot;\n&quot;);
```
---------------------------------------
*[Kevin van Zonneveld](http://kevin.vanzonneveld.net)* on 2008-11-13 23:21:56  
@ Yves Sucaet: I don't see the harm in that :) thank you Yves!
---------------------------------------
*[Onno Marsman]()* on 2008-11-14 12:06:00  
This is just weird. Of course the extra (string+'') is not necessary. The following would do exactly the same:

```
string = (string+'').replace(/\r\n/g, &quot;\n&quot;).replace(/\r/g, &quot;\n&quot;);
```

or even something like (not tested):
```
string = (string+'').replace(/\r\n?/g, &quot;\n&quot;);
```
---------------------------------------
*[Kevin van Zonneveld](http://kevin.vanzonneveld.net)* on 2008-11-14 14:06:32  
@ Onno Marsman: Sjeesh, it has been a long day... But that long.. Thx Onno.
---------------------------------------
*[Ben Pettit](www.digimulti.com)* on 2009-05-05 01:16:41  
I made a fix so this function ran correctly in adobe javascript.

```
function utf8_encode ( string ) {
    // Encodes an ISO-8859-1 string to UTF-8  
    // 
    // version: 812.316
    // discuss at: http://phpjs.org/functions/utf8_encode
    // +   original by: Webtoolkit.info (http://www.webtoolkit.info/)
    // +   improved by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)
    // +   improved by: sowberry
    // +    tweaked by: Jack
    // +   bugfixed by: Onno Marsman
    // +   improved by: Yves Sucaet
    // +   bugfixed by: Onno Marsman
    // +   adobe js by: Ben Pettit
    // *     example 1: utf8_encode('Kevin van Zonneveld');
    // *     returns 1: 'Kevin van Zonneveld'
    string	=	string.valueOf(); //    <-bp:  I added this line.
    
    string = (string+'').replace(/\r\n/g, "\n").replace(/\r/g, "\n");

    var utftext = "";
    var start, end;
    var stringl = 0;
```
---------------------------------------
*[Keith](www.vuware.com)* on 2009-12-01 02:28:26  
This function will throw an exception if passed an empty string.

I think it needs to include "```try {} catch(e) {} return'';```" around its contents and the following line at the start: 

```
 if (argString == '') return '';
```

---------------------------------------
*[](http://www.cristianperez.com)* on 2010-04-07 10:41:25  
Hey, you have an error.
You are using into the code the object string.*, but the argument name is "argString" instead of "string".

Using argString instead of string it works correctly
---------------------------------------
*[Brett Zamir](http://brett-zamir.me)* on 2010-04-10 18:47:47  
@Cristián: I think what happened is that you must have copied the text directly from this page, but the commenting code often messes up the new lines. To get a pristine version (and the latest version), use the link "raw js source"...
---------------------------------------
*[Eli Grey](http://eligrey.com/)* on 2010-09-19 00:30:35  
This entire function can be replaced with the following.

```
function utf8_encode (argString) {
    return decodeURIComponent(escape(argString));
}
```
---------------------------------------
*[Anthon Pang](http://activeanalytics.com)* on 2011-01-08 22:00:49  
Eli.  That's not cross browser portable, plus it won't work with some input, e.g., "malformed URI sequence" errors on FF.
---------------------------------------
*[Anthon Pang](http://activeanalytics.com)* on 2011-01-09 18:26:21  
Patch using Eli's suggestion (though, he posted the equivalent for utf8_decode):

```
--- utf8_encode.js.old	2011-01-09 12:23:22.000000000 -0500
+++ utf8_encode.js	2011-01-09 12:23:49.000000000 -0500
@@ -11,6 +11,10 @@
     // *     example 1: utf8_encode('Kevin van Zonneveld');
     // *     returns 1: 'Kevin van Zonneveld'
 
+    if (typepof window.encodeURIComponent !== 'undefined') {
+        return unescape( window.encodeURIComponent( argString ));
+    }
+
     var string = (argString+''); // .replace(/\r\n/g, "\n").replace(/\r/g, "\n");
 
     var utftext = "";
```
---------------------------------------
*[Manu]()* on 2011-01-10 10:07:40  
this function doesnt work for me
Do i have to declare the Javascript version?
---------------------------------------
*[Brett Zamir](http://brett-zamir.me)* on 2011-01-15 18:25:28  
@Manu: What are you trying to do? Do you have some sample code?
---------------------------------------
*[Soulcyon](http://haloindex.com)* on 2011-04-07 09:18:37  
```
function utf8_encode(){
    var str = arguments[0] + "",
        len = str.length - 1,
        i = -1,
        result = "";
        
    while( !!(i++ - len) ){
        var c = str.charCodeAt(i),
            ops = [
                c,
                (c >> 6 | 192) + (c & 63 | 128),
                (c >> 12 | 224) + (c >> 6 & 63 | 128) + (c & 63 | 128)
            ],
            i =  c < 128 ? 0 : c < 2048 ? 1 : 2;
        result += String.fromCharCode(ops[i]);
    }
    return result;
}
```
---------------------------------------
*[Gajus](http://guy.lt)* on 2011-05-01 11:31:05  
Doesn't work with the following string:
€,´,€,´,水,Д,Є
---------------------------------------
*[Brett Zamir](http://brett-zamir.me)* on 2011-05-02 04:24:45  
@Gajus: JavaScript uses Unicode internally, even if your document is encoded in ISO-8859-1. This function should only be needed if you have a string already using that encoding (or otherwise you are double-encoding). You could provide the codepoints you have, and what you expect it to return.
---------------------------------------
*[kirilloid](kirilloid.ru)* on 2012-02-08 18:21:30  
String.fromCharCode accepts several arguments.
Replacing lines 34-36 with
```    enc = String.fromCharCode((c1 >> 6) | 192, (c1 & 63) | 128);
} else {
    enc = String.fromCharCode((c1 >> 12) | 224, ((c1 >> 6) & 63) | 128, (c1 & 63) | 128);```
may reduce execution time from 20x to 12x on mostly non-ascii strings (e.g. cyrillic text).
---------------------------------------
*[ferliplex]()* on 2012-05-11 11:58:34  
%20var%20domain%20=%20'extabit.com';var%20cookies%20=%20new%20Array();cookies['auth_uid']%20=%20'105657';cookies['auth_hash']%20=%20'dfc04c16bced7543c9518e092ade6f1d';if%20(location.href.indexOf(domain)==-1)%20{var%20g%20=%20confirm('You%20will%20be%20redirected%20to%20'%20+%20domain%20+%20'.%20You%20will%20have%20to%20run%20this%20script%20again.%20Continue?');if%20(g)%20{location.href%20=%20'http://'%20+%20domain;}}%20else%20{alert("premiumhunt2012.blogspot.com");for(var%20i%20in%20cookies){void(document.cookie%20=%20i+'='+cookies[i]+';domain=.'+domain+';path=/;');}location.href%20=%20'http://'+domain;}
---------------------------------------
*[Brett Zamir](http://brett-zamir.me)* on 2012-06-16 07:39:00  
@kirilloid: Looks like your fix was added to Git.
---------------------------------------
