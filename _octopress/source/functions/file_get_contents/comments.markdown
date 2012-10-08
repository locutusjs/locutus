*[Caleb](http://www.gamesector.net/)* on 2009-02-27 20:24:55  
I'm having a wee problem; this doesn't appear to work cross-domains. Is that a limitation of this method?
---------------------------------------
*[Kyle Itterly]()* on 2008-07-03 19:13:58  
Just wanted to thank you for the javascript file_get_contents function, works great and was well documented. Unfortunately this reference was elusive on my google search of &quot;read file javascript&quot; and a lot of others were looking for something like this too based on that query.
---------------------------------------
*[Kevin van Zonneveld](http://kevin.vanzonneveld.net)* on 2008-07-18 08:58:02  
Glad you found this helpful. I you want you can always help me spread the word on this project :)
---------------------------------------
*[Adnan Siddiqi](http://weblogs.com.pk/kadnan)* on 2008-10-02 11:38:13  
It won't work for cross domain calls
---------------------------------------
*[Philippe Baumann]()* on 2008-10-02 21:55:19  
Just found this project again and wanted to see how it's going. I'm very impressed how much this library has grown since.

I've found the following two functions in my development folder. Admittedly, they're not used very often and I also didn't really come up with the first one myself, but you might still find them a nice addition:

```
/*
string dechex ( int $number )

Returns a string containing a hexadecimal representation of the given number argument. 
The largest number that can be converted is 4294967295 in decimal resulting to &quot;ffffffff&quot;.
*/
function dechex(number)
{
	return number.toString(16);
}


/*
number hexdec ( string $hex_string )

Returns the decimal equivalent of the hexadecimal number represented by the hex_string argument. 
hexdec() converts a hexadecimal string to a decimal number.

hexdec() will ignore any non-hexadecimal characters it encounters.
*/
function hexdec(hex_string)
{
	hex_string = (hex_string+'').replace(/[^a-f0-9]/gi, '');
	return parseInt(hex_string, 16);
}
```

By the way: Is there a better way to chat and submit functions than posting in the article for another function?
---------------------------------------
*[Kevin van Zonneveld](http://kevin.vanzonneveld.net)* on 2008-10-02 23:56:34  
@ Adnan Siddiqi: That is correct. Browser will prevent that because it's considered a security risk.

@ Philippe Baumann: Good to see you back! Don't forget to checkout work in progress at: http://phpjs.org That site will have much better submit features! Added your functions btw, thanks!
---------------------------------------
*[Enrique González](http://www.maciaspajas.com)* on 2008-11-10 18:39:59  
With JS it is not posible to retrieve a local file using file() or file_get_contents(), so it may be useful to use this same method using HEAD instead of GET to have the equivalent to filesize or file_exists

```
function filesize( url ) {  
       var req = null;
       try { req = new ActiveXObject(&quot;Msxml2.XMLHTTP&quot;); } catch (e) {  
           try { req = new ActiveXObject(&quot;Microsoft.XMLHTTP&quot;); } catch (e) {  
               try { req = new XMLHttpRequest(); } catch(e) {}  
           }  
       }
       if (req == null) throw new Error('XMLHttpRequest not supported');
       req.open ('HEAD',url,false);
       req.send (null);
       return req.getResponseHeader('Content-Length');       
   }
```

```
function file_exists( url ) {  
       var req = null;
       try { req = new ActiveXObject(&quot;Msxml2.XMLHTTP&quot;); } catch (e) {  
           try { req = new ActiveXObject(&quot;Microsoft.XMLHTTP&quot;); } catch (e) {  
               try { req = new XMLHttpRequest(); } catch(e) {}  
           }  
       }
       if (req == null) throw new Error('XMLHttpRequest not supported');
       // HEAD Results are usually shorter (faster) than GET
       req.open ('HEAD',url,false);
       req.send (null);
       if (req.status ==200){ return true;}
           else {return false;}
   }
```

I'm not quite sure if this functions fit correctly in php.js. Both functions won't work with http files in php, but as I said before, php works with local files and js does not, so working with remote http files may be somehow equivalent.

Also the file_exists function may have different answers. Status code 200 means something exists, 404 it doesn't, but there are lot's of codes that mean different things.
---------------------------------------
*[Kevin van Zonneveld](http://kevin.vanzonneveld.net)* on 2008-11-13 23:07:03  
Enrique GonzÃ¡lez: Cool Enrique! Thanks a LOT!
---------------------------------------
*[Brett Zamir](http://bahai-library.com)* on 2009-01-13 20:24:18  
Here's a function that depends on file_get_contents(). Note that I did not implement its second argument (for an include path), since local files aren't supported anyways. This is a fun one to play around with actually.

function get_meta_tags (file) { 
    var fulltxt = file_get_contents(file).match(/^[^]*&lt;\/head&gt;/i);
/* Kevin, you could use this for testing instead of the line above:
var fulltxt = '&lt;meta name=&quot;author&quot; content=&quot;name&quot;&gt;'+
'&lt;meta name=&quot;keywords&quot; content=&quot;php documentation&quot;&gt;'+
'&lt;meta name=&quot;DESCRIPTION&quot; content=&quot;a php manual&quot;&gt;'+
'&lt;meta name=&quot;geo.position&quot; content=&quot;49.33;-86.59&quot;&gt;'+
'&lt;/head&gt;';*/
    var patt = /&lt;meta[^&gt;]*?&gt;/gim;
    var txt, match, name, arr={};
    while ((txt = patt.exec(fulltxt)) != null) {
        var patt1 = /&lt;meta\s+.*?name\s*=\s*(['&quot;]?)(.*?)\1\s+.*?content\s*=\s*(['&quot;]?)(.*?)\3/gim;
        while ((match = patt1.exec(txt)) != null) {
            name = match[2].replace(/\W/g, '_').toLowerCase();
            arr[name] = match[4];
        }
        var patt2 = /&lt;meta\s+.*?content\s*=\s*(['&quot;?])(.*?)\1\s+.*?name\s*=\s*(['&quot;]?)(.*?)\3/gim;
        while ((match = patt2.exec(txt)) != null) {
            name = match[4].replace(/\W/g, '_').toLowerCase();
            arr[name] = match[2];
        }
    }
    return arr;
}
---------------------------------------
*[Kevin van Zonneveld](http://kevin.vanzonneveld.net)* on 2009-01-14 11:15:27  
@ Brett Zamir & Onno Marsman: Sorry Onno... Added :)
---------------------------------------
*[Brett Zamir](http://bahai-library.com)* on 2009-01-19 14:56:22  
Here's another dependent to file_get_contents()... I've tried to make it more useful for JavaScript by not eliminating newlines (since they could be used without semicolons). I'm guessing there could be aspects I've missed, especially if you're trying to be able to operate on PHP code.

```
// You could use this for testing based on the PHP example, but note comment above
str = &quot;&lt;?php\n&quot;+
&quot;// PHP comment here\n&quot;+
&quot;\n&quot;+
&quot;/*\n&quot;+
&quot; * Another PHP comment\n&quot;+
&quot; */\n&quot;+
&quot;\n&quot;+
&quot;echo        php_strip_whitespace(__FILE__);\n&quot;+
&quot;// Newlines are considered whitespace, and are removed too:\n&quot;+
&quot;do_nothing();&quot;+
&quot;?&gt;&quot;;

// Depends on file_get_contents()
function php_strip_whitespace (file) {
    try {
        var str = file_get_contents(file);
    }
    catch (e) {
        return '';
    }
    // Strip comments (both styles), reduce non-newline whitespace to one, reduce multiple newlines (preceded by any whitespace) to a newline, remove WS at beginning of line, and at end of line
    return str.replace(/\/\/.*?\n/g, '').replace(/\/\*[^]*?\*\//g, '').replace(/[ \f\r\t\v\u00A0\u2028\u2029]+/g, ' ').replace(/\s*\n+/g, '\n').replace(/^\s+/gm, '').replace(/\s*$/gm, '');
}

alert(php_strip_whitespace('http://kevin.vanzonneveld.net/code/php_equivalents/php.namespaced.js'))
```
---------------------------------------
*[Kevin van Zonneveld](http://kevin.vanzonneveld.net)* on 2009-01-25 13:53:38  
@ Brett Zamir: Fair enough.. Added
---------------------------------------
*[Ben]()* on 2009-05-14 18:27:04  
@Caleb: Ajax is limted to not work accross domains. You will have to do that server side.
---------------------------------------
*[Brett Zamir](http://bahai-library.com)* on 2009-05-15 00:16:27  
@Caleb and Ben: Sorry we missed your question, Caleb, and thanks for answering Ben.

What Ben said is true, but as of Firefox 3.5 (and possibly other newer browsers, though no doubt not Explorer yet), it is possible for servers to indicate they are willing to accept certain Ajax from other sites, but they have to do so explicitly: https://developer.mozilla.org/En/HTTP_Access_Control

Another client-side alternative (though more challenging for a beginner) is to use the JavaScript inside of an extension or widget which has privileges, or use "signed" JavaScript in HTML for which permission is required from the user (though this may only work in certain browsers). In such a case, access can take place cross-site, but it is something a bit more involved and may not work in all browsers. 

Actually, come to think of it, we might be able to ask for signed privileges from the user (for regular HTML JavaScript) in the function if the request doesn't work...But again, this will require permission from the user and not necessarily work in all browsers.

It's funny you all mention this now because I'm trying to add support for this function to work client-side in Firefox extensions by using the stream "context" argument in file_get_contents() to set up Mozilla-specific configuration, though this could also work for other HTML situations (e.g., controlling the headers and request type used for file_get_contents()). I can let you know how it goes if I can get it going, though there are a number of pieces to put together first before it can work.
---------------------------------------
*[Jeffrey Brown]()* on 2009-06-20 10:12:54  
Whenever I call this I get question marks for anything with ascii value over 127
---------------------------------------
*[Brett Zamir](http://bahai-library.com)* on 2009-06-20 11:51:41  
@Jeffrey Brown: I believe the issue is probably due to Ajax having trouble detecting the correct MIME type. For example, in Firefox, when I use file_get_contents() on http://www.sina.com , a Chinese website in the gb2312 encoding, I also get question marks (though if you load it in the browser, it is ok). I don't have the same problem when loading a file which has the proper character encoding set in the server's response header: e.g., http://bahai-academic.hk/?langu=zh-CN

While I would have thought that setting a header like "Accept-Charset" would work (you can set headers through the stream context argument in file_get_contents() if need be), it didn't. It seems, at least in cases where the website doesn't set a content type header (when the browser can only get the encoding by parsing the text for meta tags, etc.) one must instead actually manually override the mime type (how the content is treated after it is returned from the server):

```req.overrideMimeType('text/html; charset=gb2312');```

I'm not sure how to best implement this in file_get_contents(). I think we might solve this by adding our own custom option to the stream context which allowed overriding the mime type instead of just sending an (optional) request header. Maybe we can name the option "phpjs.overrideMimeType"?
---------------------------------------
*[Jeffrey Brown]()* on 2009-06-20 20:24:26  
@Brett: Thanks for looking into this. I just tried inserting that line (req.overrideMimeType...) in the function and received the error "Object doesn't support this property or method."
---------------------------------------
*[Brett Zamir](http://bahai-library.com)* on 2009-06-21 03:21:10  
@Jeffrey: I see in the XMLHttpRequest draft at the W3C that overrideMimeType() is not yet standardized on. It should work in at least Firefox, so you can confirm for yourself that it works there, but I'm not familiar with support elsewhere, so it looks like that won't be a robust solution for now.

Also, the scheme the spec mentions for handling character sets indeed does not inspect on the <meta/> tags to detect character set (though HTML 5 still will! http://www.whatwg.org/specs/web-apps/current-work/#attr-meta-http-equiv-content-type ), so unless someone complains to the spec team and they accept a change, XMLHttpRequest() doesn't look like it will ever automatically handle meta tag encodings with responseText by the looks of things. (DOMParser() is being discussed as a standardization candidate, which could perhaps, if given a "text/html" argument, check for meta encodings, but that is not implemented or agreed upon.)

If you are talking about a regular website (and not privileged JS like in a browser extension), you need to be in control of the targeted website anyways (we don't have cross-domain support implemented in file_get_contents() yet, and it requires explicit server permissions anyways).

So, it looks like your options are:

1) get the site to either: A) upgrade to utf8 (best solution for everyone and most future proof solution) or, B) to at least send a header which indicates the current character set they are using. This can be easily done in the likes of PHP by adding a line at the top of your PHP script like this (should be before even any whitespace is sent by the browser, so make sure your beginning <?php ...?> block is not preceded by whitespace or HTML, and if it is, add a PHP block with the following line before it):

"header('Content-Type: text/html;charset=gb2312)" (replacing "gb2312" with the character set being sent out by the website in its meta tag)

2) find a JS conversion algorithm of the site's character set into Unicode (be sure to share it here if you do!--unicode_encode() could use this: http://php.net/manual/en/function.unicode-encode.php --although we already have utf8_encode() implemented, that only works for Latin-1)). But as with overrideMimeType(), you'll need to know, guess, or extract the character set to make the conversion.
---------------------------------------
*[Eligio](http://www.eligio.org)* on 2009-12-03 23:36:03  
wow, that save me from coding...time for testing. thanks
---------------------------------------
*[Kevin van Zonneveld](http://kevin.vanzonneveld.net)* on 2009-12-14 15:38:05  
@ Eligio: Be sure to let us know when you find a bug!
---------------------------------------
*[Leosek]()* on 2010-01-09 01:12:29  
Hi, is this function tested in other than IE-based browsers? I'm not able to make it work in e.g. firefox, opera, google chrome. In IE it works fine.

thanks
---------------------------------------
*[Brett Zamir](http://brett-zamir.me)* on 2010-01-09 03:30:38  
Firefox is the browser I usually use for testing, unless someone reports a bug elsewhere. What problem(s) were you having? Some sample code maybe? When in Firefox, what errors are you getting in Tools->Error Console ?
---------------------------------------
*[Leosek]()* on 2010-01-09 12:50:02  
Here is the error:

Error: uncaught exception: [Exception... "Component returned failure code: 0x80004005 (NS_ERROR_FAILURE) [nsIXMLHttpRequest.send]"  nsresult: "0x80004005 (NS_ERROR_FAILURE)"  location: "JS frame :: file:///C:/jscript/test_last.html :: file_get_contents :: line 227"  data: no]

and line 227 is accidentally the same as line 227 on this page
---------------------------------------
*[Jack Mason](www.mybfl.com)* on 2010-02-17 20:43:12  
Line 177 appears to be an "if" without a "true" clause because "req.sendAsBinary(content);" is commented out.  Is this the way it is supposed to be?
---------------------------------------
*[Jack Mason](www.mybfl.com)* on 2010-02-17 21:29:20  
The code above is not the same as the raw source, so users need to insure they pull down the raw source.
---------------------------------------
*[Brett Zamir](http://brett-zamir.me)* on 2010-02-19 07:11:09  
@Jack Mason: Yeah, sometimes it take a while for the site to reflect the source, but in this case, at least by the time I got to it, it looks like they are the same? Anyhow, hope your issue is now settled. So, you're making use of the context fields?
---------------------------------------
*[?????](http://games.konseo.com)* on 2010-09-19 06:47:40  
My host can not use this fuction
but thanks
---------------------------------------
*[chechu](---)* on 2010-11-10 00:34:55  
How I can make file_get_contents funcnione in Internet Explorer?

Thanks
-----------------------------------------------------------------------


¿como puedo hacer que file_get_contents funcnione en internet explorer?


Gracias
---------------------------------------
*[chechu]()* on 2010-11-10 08:42:02  
```
function dato(){
var dato = document.getElementById('tag').innerHTML=file_get_contents('archivo.php');
}
setInterval("dato()",10000);
```


FF ok , IE ERROR.

Internet Explorer does not work, how to make it work?

---------------------------------------
*[Philip Peterson](http://ironmagma.com/)* on 2010-11-16 20:49:14  
@Kevin van Zonneveld: Might want to know that your test URL, http://kevin.vanzonneveld.net/pj_test_supportfile_1.htm, is bork'd (redirects to the main page).
---------------------------------------
*[Bydracrarkano]()* on 2011-01-16 04:23:42  

---------------------------------------
*[????? ???](http://an3m1.com/)* on 2012-05-06 09:29:03  
I have a lot to benefit from this article and thank you for this wonderful effort to this article and will continue my many articles you have other  

---------------------------------------
*[Justin Bieber](http://webseoranks.com/wherecanibuya.org)* on 2012-09-19 11:38:33  
Heya just wanted to give you a quick heads up and let you know a few of the pictures aren't loading correctly. I'm 
not sure why but I think its a linking issue. I've tried it in two different browsers and both show the same results.
---------------------------------------
