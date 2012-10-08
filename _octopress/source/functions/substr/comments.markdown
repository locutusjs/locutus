*[T.Wild]()* on 2008-09-03 00:46:31  
Had a bit of difficulty when this function was passed an integer instead of a string since ```.substring``` isn't an integer function.

I fixed the error thusly:
```
return (&quot;&quot;+f_string).substring(f_start, f_length);
```
instead of:
```
return f_string.substring(f_start, f_length);
```
forcing f_string to be a string, since this is how the PHP version treats the first parameter.
```
substr(1234,2,1) = 3;
```

hope this helps.
---------------------------------------
*[Kevin van Zonneveld](http://kevin.vanzonneveld.net)* on 2008-09-05 21:25:01  
@ T.Wild: Sure does, thank you for your bugfix. I've also added a testcase for this situation so it cannot happen again.
---------------------------------------
*[Val Che](http://chupakabr.ru)* on 2010-04-05 14:49:10  
This one workd fine for me too :-) Thanks guys
---------------------------------------
*[dazz]()* on 2010-05-27 18:15:31  
wtF?? This Function is veryyy looooong
---------------------------------------
*[Brett Zamir](http://brett-zamir.me)* on 2010-05-28 03:06:31  
@dazz: Most of the code length (which is code which is only run if you type ```ini_set('unicode.semantics',  'on');
``` before running substr) is for those who need to support Unicode 100%. 

Unicode was invented to allow one to display any written character from any language on the same page at the same time, and JavaScript supports this. In the past, one could only use one or a few language scripts on the same page (e.g., ASCII for English, Latin-1 for European languages, etc.).

Each character in Unicode is represented abstractly by a number, so even if you can't see it (or if the current font doesn't support it), we can talk about a given character.

However, given all of the other written scripts being used in Unicode (i.e., all living scripts and even for many dead written languages), there were so many that once the more common characters of human languages were assigned to slots representable by a single character in JavaScript (2 bytes), there weren't any more slots left, so for some rarely used characters (like some ancient Chinese characters) it became necessary to represent them by 2 reserved characters (4 bytes) combined together (individually called "surrogates", the first in the pair being a "high surrogate" and the second a "low surrogate") which are not display characters by themselves but as far as memory and JavaScript functions are normally concerned (e.g., string length), they are like 2 full characters.

For example, try this in JavaScript (I recommend "Extension Developer's Extension" for Firefox, so you don't need to save a file but can just test JavaScript immediately from the toolbar; I like its XUL Editor for this as it evaluates the JavaScript immediately):

```alert('槪'.length);```

Although the above is only one character as far as appearance and cutting-and-pasting, the code will actually alert "2"!

And if you use ```alert('槪'.charAt(0));``` to find out what the first "character" inside that character is (or ```alert('槪'.charAt(1));``` to find out what the second one is), you'll see a weird number in a box be displayed (at least in Firefox) which means it is a character not supported by one's font, and in this case that is because the "character" is not even a character so your font is not going to display this like a character anyways.

So, substr (as it will be in international-friendly PHP6), when in Unicode mode (set by ini_set()) should not mistreat these in a count as though they were 2 characters (it should treat the surrogate pairs as though a single whole character), nor should it potentially cut these characters in half leading to a non-readable character being left over.  Hope that helps explain it a little... 

Not all of our functions are Unicode friendly in this way (and probably few if any other JavaScript libraries even take this into account in any of their functions) but we should support this for users who wish to use it (especially given that PHP6 is potentially supporting such characters).

@others: Sorry, I hope to get to your comments/patches soon... Been busy with work deadlines...
---------------------------------------
*[Brett Zamir](http://brett-zamir.me)* on 2010-05-28 03:17:27  
@dazz: By the way, in addition to my comments just now, be aware that if you try to use some of these 4-byte characters on the web, they could actually cause problems for sites. For example, MySQL will not even store these unless the field is defined as binary. Some sites like Wikipedia are geared to support these characters (and our site because we prepared for it), but they are not yet universally supported in databases, server-side languages (PHP, like JS, can handle them, but does not treat them properly until PHP6), nor text editors, etc. (even some regular 2-byte characters are not displayable in some environments though probably usually due to font support issues, since even if the technology supports Unicode, the font must also support it in order to display it; if you agree that fonts would be ideally auto-downloaded in order to give automatic full coverage of any character without developers needing to use CSS' @font-face property ( https://developer.mozilla.org/index.php?title=En/CSS/%40font-face ), automatically providing fonts to the browser when the user visits a page requiring support of certain characters, add your vote to the bug report at https://bugzilla.mozilla.org/show_bug.cgi?id=512619 ).
---------------------------------------
