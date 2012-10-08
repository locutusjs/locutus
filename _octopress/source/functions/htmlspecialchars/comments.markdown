*[Nathan]()* on 2008-05-26 12:07:03  
The source code doesn't work at all. There are two errors.
To fix it try this:

var reg=/&amp;/g
string=string.replace(reg, '&amp;amp;');
---------------------------------------
*[Kevin van Zonneveld](http://kevin.vanzonneveld.net)* on 2008-05-31 12:34:30  
@ Nathan: Thanks for pointing this out, fixed.
---------------------------------------
*[Arno]()* on 2008-07-01 16:23:34  
First of all thanks for this great work, does really help a lot.

However this issue doesn't seem fixed yet.

As Nathan already pointed out, you have to remove the single quotes in your regexp. so that it reads

```
string = string.replace(/&lt;/g, '&amp;lt;');
```

Arno
---------------------------------------
*[Arno]()* on 2008-07-01 16:27:24  
I just see that your example here is wrong too. Here is the corrected version:

This is how you could call htmlspecialchars()
```
htmlspecialchars(&quot;&lt;a href='test'&gt;Test&lt;/a&gt;&quot;, 'ENT_QUOTES');
```
And that would return
```
&amp;lt;a href=&amp;#039;test&amp;#039;&amp;gt;Test&amp;lt;/a&amp;gt;
```
---------------------------------------
*[Kevin van Zonneveld](http://kevin.vanzonneveld.net)* on 2008-07-18 08:18:43  
@ Arno: Thank you for correcting me. It should be okay now.
---------------------------------------
*[Philip Peterson]()* on 2008-10-15 01:46:26  
Here's an proposed implementation of get_html_translation_table.  I do have a small problem though, which probably has a simple solution, and I used the actual integer values for constants instead of ENT_QUOTES, etc. ...  would it not be more practical to do so, really, maybe have an optional &quot;CONSTANTS&quot; section in php.js?

Oh well, here's my code:

```

HTML_SPECIALCHARS=0;
HTML_ENTITIES=1;
ENT_COMPAT=2;
ENT_QUOTES=3;

function get_html_translation_table(table, quote_style)
{
retarr=[];
if(table==0)
{
if(quote_style == 2 || quote_style == 3)
{
  retarr=['&quot;':'&amp;quot', '\'':'&amp;#39;', '&lt;':'&amp;lt;', '&gt;':'&amp;gt;', '&amp;':'&amp;amp;'];
}
if(quote_style == 2)
{
  // remove the ' entry
}
}
else if(table==1)
{
  // Do the same thing as table == 0, but with the huge list of characters found by calling get_html_translation_table(1)
}
}

```
---------------------------------------
*[Kevin van Zonneveld](http://kevin.vanzonneveld.net)* on 2008-10-20 18:41:48  
@ Philip Peterson: It's been decided some time ago that we do not want global dependencies (like constants). The method to implement these is to have the functions accept both the integer representation of the constants (leaving it compatible) and the constant as string (for usability). 
I've done some work on merging  get_html_translation_table, htmlentities &amp; htmlspecialchars and their counterparts, check it out if your like.
---------------------------------------
*[atv](http://thatsaninterestingpoint.org.ua)* on 2008-11-11 19:28:01  
Today, 2008-11-11, this function encodes the string twice, so the output of such code
```
htmlspecialchars(&quot;&lt;a href='test'&gt;Test&lt;/a&gt;&quot;, 'ENT_QUOTES')
```
will be like this:
```
&amp;lt;a href='test'&amp;gt;Test&amp;lt;/a&amp;gt;
```
Fix this!
---------------------------------------
*[Kevin van Zonneveld](http://kevin.vanzonneveld.net)* on 2008-11-13 23:20:15  
@ atv: I'm not able to reproduce that behavior here. Also, if I run that test, my single quotes are being replaced by #039; entities.

Are you sure you're running our latest version?
---------------------------------------
*[Ashley  Broadley](http://blog.ls12style.co.uk)* on 2009-01-07 11:24:05  
I really find the idea of the php.js fantastic! I for one am very impressed with everyones work!

I have noticed a problem with the htmlentities (not sure if it applies to htmlspecialchars):

testing all the available symbols on my keyboard (Â£, &lt;, &gt;, ', &quot; and such) i alert()'ed the supposedly encoded string and found that all ampersands were encoded, so &quot;&amp;pound;&quot; would be &quot;&amp;amp;pound;&quot; which then on a html page would echo &quot;&amp;pound;&quot; and not &quot;Â£&quot; as it should.

im not a pro so im not sure whats causing the the bug.

just thought i would let you know!
---------------------------------------
*[Ashley  Broadley](http://blog.ls12style.co.uk)* on 2009-01-07 11:33:51  
OK, I seem to have fixed this problem.
It turned out that the &amp; symbol  was at the bottom of the ascii decimal array in 'get_html_translation_table'. I simply moved it to the top and now everything is fine.

Can you test and confirm by emailing me?

Thanks
Ashley
---------------------------------------
*[Kevin van Zonneveld](http://kevin.vanzonneveld.net)* on 2009-01-07 14:50:17  
@ Ashley Broadley: Thanks for noticing! 
I guess the &amp;amp; character must be the last character when decoding, but the first when encoding!
---------------------------------------
*[Guilherme Mello]()* on 2009-01-14 18:39:15  
If you try htmlspecialchars in PHP with this example, you're going to have a different conversion with javascript:

use the string : FS'IG'IKU&quot;UJHFE
---------------------------------------
*[Kevin van Zonneveld](http://kevin.vanzonneveld.net)* on 2009-01-15 11:21:51  
@ Guilherme Mello: Could you please provide the output you get in php &amp; js?
---------------------------------------
*[T.Wild]()* on 2009-07-02 23:19:47  
A Frank Forte posted over on strtr (http://phpjs.org/functions/strtr:556#comment_75192) that htmlspecialcharacters is encoding ampersands after encoding other characters.
so < test > becomes andamp;lt test andamp;gt
I've confirmed this myself, and his fix of moving the line
```entities['38'] = '&amp;';```
to the top of the entities list (before the line
```if (useTable === 'HTML_ENTITIES')```
seems to work without effecting the other dependent functions:
htmlentities
html_entity_decode
htmlspecialchars_decode
---------------------------------------
*[T.Wild]()* on 2009-07-02 23:23:02  
Sorry, just to be clear that's moving the line over at
get_html_translation_table
---------------------------------------
*[Kevin van Zonneveld](http://kevin.vanzonneveld.net)* on 2009-07-03 14:01:23  
@ T.Wild: Hey man. Thanks a lot for testing this. I've patched it in SVN, and things will be online shortly
---------------------------------------
*[felix]()* on 2009-12-05 20:46:30  
Hi,

seems that the script has problems with ie6 + 7 .. here the browser says "object expected" in line 41/42... ???

also.. does this function work with utf-8 ?
---------------------------------------
*[felix]()* on 2009-12-06 15:22:04  
problem solved.. wrong synthax in in row 38/39.. after "'ENT_IGNORE' : 4" there's  a comma but it shouldnt be there ^^
---------------------------------------
*[Brett Zamir](http://brett-zamir.me)* on 2009-12-07 10:33:54  
@Felix: Thanks for the feedback. Yes, I pushed earlier to the git repo with the fix. Was my oversight as I was testing in Firefox which doesn't have a problem with trailing commas.  htmlspecialchars_decode() also had the issue which I fixed as well. Thanks again!
---------------------------------------
*[hacksmw]()* on 2010-02-11 08:50:55  
htmlspecialchars_decode function in PHP doesn't work recursive.
but this function is too recursive.
so "&amp; #9787;" will not be converted by this function as "& #9787;"
however, it will be converted as "☻"
on the other hand, 
the function in php will convert it as "&# 9787;"

(
i can't delete my old comment.
so, i wrote this comment once again :(
)
---------------------------------------
*[hacksmw]()* on 2010-02-11 08:53:42  
htmlspecialchars_decode function in PHP doesn't work recursive.
but this function is too recursive.
so "& amp; #9787;" will not be converted by this function as "& #9787;"
however, it will be converted as "☻"
on the other hand, 
the function in php will convert it as "&# 9787;"

(
i can't delete my old comment.
so, i wrote this comment once again :(
)
---------------------------------------
*[Brett Zamir](http://brett-zamir.me)* on 2010-02-12 18:43:39  
@hacksmw: When I try ```alert(htmlspecialchars_decode('& amp;#9787;'))```

...I do get & #9787; in our php.js JavaScript.

Make sure you are using the latest code (see http://github.com/kvz/phpjs/raw/master/functions/strings/htmlspecialchars_decode.js ).
---------------------------------------
*[test]()* on 2010-05-21 14:49:29  
<?php echo 'hello admin!'; ?>
---------------------------------------
*[s]()* on 2011-04-18 13:27:32  
SSSSSS
---------------------------------------
*[randy](http://ic4ever.com)* on 2012-06-28 03:12:24  
Very nice function. It worked great for me. I came here 1st!
But then I also found this method ..
```
var a = 'one <p> tag';
$('<div/>').text(a); // [<div>​one <p> tag​</div>​]
$('<div/>').text(a).html(); // "one &lt;p&gt; tag"
```
The $(element) creates an html element, .text(a) sets the element content to the text (read "escaped") value of "a", the .hmtl() gets the html value of the contents of the element. As in .innerHTML.

Very nice also for you if you use jQuery.
---------------------------------------
