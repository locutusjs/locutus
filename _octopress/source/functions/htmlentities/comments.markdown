*[john]()* on 2008-03-15 06:20:53  
here is the reverse function 
(     html_entity_decode()    )

```
function html_entity_decode(str) {
	//jd-tech.net
	var	tarea=document.createElement('textarea');
		tarea.innerHTML = str; return tarea.value;
		tarea.parentNode.removeChild(tarea);
	}
```
---------------------------------------
*[Kevin van Zonneveld](http://kevin.vanzonneveld.net)* on 2008-03-15 11:54:04  
@ john: A new function, great! Thanks a lot john!
---------------------------------------
*[Nietzsche's Tears]()* on 2008-05-15 22:22:57  
Tested on Safari 3.1.1 and Firefox 2.0.0.14. Function fails to convert &quot;copyright&quot; and &quot;registered&quot; symbols to their equivalent HTML entities.
---------------------------------------
*[nobbler]()* on 2008-09-11 10:15:30  
using 'var i' instead of only 'i' in the for loop could prevent from overwriting global 'i', even though no one should use it. But well, i did, and found another error on that way, so it kinda helpt me :)
---------------------------------------
*[Kevin van Zonneveld](http://kevin.vanzonneveld.net)* on 2008-09-13 15:39:08  
@ nobbler: Haha, ok, well still adding the var. Thank you!
---------------------------------------
*[Bjorn Roesbeke](http://www.bjornroesbeke.be)* on 2009-03-04 21:53:40  
F.e. a single quote with entity &amp;#039; isn't converted correctly.
```htmlentities(&quot;foo'bar&quot;,&quot;ENT_QUOTES&quot;);```
will return foo&amp;amp;#039;
---------------------------------------
*[Kevin van Zonneveld](http://kevin.vanzonneveld.net)* on 2009-03-22 18:59:01  
@ Bjorn Roesbeke: I've added your testcase, but it succeeds. Are you sure you're running the latest version?
---------------------------------------
*[vikal](braindigit.com)* on 2009-08-24 13:16:29  
hi

i have used your code to convert <!----> into html entities..

but it does not work neither it return what i need.

i have used your code as it descripted in examples

like this


function htmlentities (string) {
    // Convert all applicable characters to HTML entities  
    // 
    // version: 907.503
    // discuss at: http://phpjs.org/functions/htmlentities
    // +   original by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)
    // +    revised by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)
    // +   improved by: nobbler
    // +    tweaked by: Jack
    // +   bugfixed by: Onno Marsman
    // +    revised by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)
    // +    bugfixed by: Brett Zamir (http://brett-zamir.me)
    // +      input by: Ratheous
    // -    depends on: get_html_translation_table
    // *     example 1: htmlentities('Kevin & van Zonneveld');
    // *     returns 1: 'Kevin &amp; van Zonneveld'
    // *     example 2: htmlentities("foo'bar","ENT_QUOTES");
    // *     returns 2: 'foo&#039;bar'
    var hash_map = {}, symbol = '', tmp_str = '', entity = '';
    tmp_str = string.toString();
    
    if (false === (hash_map = this.get_html_translation_table('HTML_ENTITIES', 'ENT_COMPAT'))) {
        return false;
    }
     for (symbol in hash_map) {
        entity = hash_map[symbol];
        tmp_str = tmp_str.split(symbol).join(entity);
    }
    
    return tmp_str;
}

including function get_html_translation_table() as it is

so would you mind telling how does it works

waiting for your response

best regards

vikal acharya
---------------------------------------
*[vikal](www.braindigit.com)* on 2009-08-26 07:50:05  
hi

Really good work that you people accomplished.

so useful and i am happy to use it.

thanks

best regards

vikal acharya

---------------------------------------
*[Brett Zamir](http://brett-zamir.me)* on 2009-08-26 07:57:47  
@vikal: Does that mean you figured out the problem with the function? If you are still having trouble, please give a precise example where you see the problem. Thanks...
---------------------------------------
*[vikal](braindigit.com)* on 2009-08-27 07:17:11  
hi

though your function 

htmlentities()

is good

but 

now we are having problem with this symbol \

do you have any idea how to convert it to the html entities

is there any solution so that i can change

\ to htmlentities

hoping best here

regards

vikal



---------------------------------------
*[Brett Zamir](http://brett-zamir.me)* on 2009-08-30 04:44:56  
@vikal: 1) Why do you want to convert it to an entity?  If you are trying to filter user input on the client-side, doing it this way is not a safe way to do it, since people can get around it. You should use your database's own escape mechanisms instead (e.g., mysql_real_escape_string for MySQL).  2) If you do really want the entity form, you can use &#92; or &#x5c; , but there is no need to escape it in HTML or XML like this since a backslash is not reserved there.
---------------------------------------
*[austin]()* on 2010-06-07 16:48:44  
Brett: i think its more for data coming FROM the server.
in my case its an email client and i want to send them html that might be in an email, but i want to convert it to source by encoding all the tags but allow a function to put it out as actual html if the user agrees to it. since i cant know what email IS and ISNT safe for them to view, and since its a browser based email its even more dangerous as it runs in the context of that page. i would just strip ALL html, but some i need (such as the html reports made by svnnotify, they just dont look the same when you strip the tags)

but you are correct, this should NOT be used for client-side sanitization. nothing from a client should be considered secure.
---------------------------------------
*[Gerry]()* on 2010-11-08 21:05:13  
Thanks. Great function.
---------------------------------------
*[Satya Prakash](http://www.satya-weblog.com)* on 2010-11-15 13:32:28  
hi
I feel this function has a bug. It cannot preserve single quote ('), when used ENT_NOQUOTES.

So, I need to use strtr() for that:

```
var tmpVal = html_entity_decode (txtAreaVal);

txtArea.value = htmlentities(tmpVal, "ENT_NOQUOTES");

// restore single quote
$trans = {'&#039;' : "'" };
txtArea.value = strtr(txtArea.value, $trans);
```
---------------------------------------
*[Jakub](http://blog.petrykowski.net)* on 2010-11-27 12:50:51  
Hi, very useful function, however, it seems to  be missing double_encode optional argument. htmlspecialchars has it. This argument is from PHP original functions.

I had an issue with current version of the htmlentities function in Chrome dev browser (but not in FF or IE 8):

when I run htmlentities('"') it doesn't return $quot; but &amp;quot; which is broken obviously. htmlspecialchars() returns &quot; as expected. 

PHP htmlentities('"') also returns &quot; 

IE or FF return what is expected. I don't know where the problem is, but it does look as if double encoding for amperand and quote takes place. I don't know why one browser interprets this code in a different way than others...
---------------------------------------
*[Aikar](http://aikar.co)* on 2011-01-25 04:53:18  
This code is extremely slow...
I did a benchmark before and after adding this to my strings

BEFORE:
>>> node benchmark.js
rendered 10000 times in 3192ms!

AFTER:
>>> node benchmark.js
rendered 10000 times in 42797ms!

Use with caution.
---------------------------------------
*[Aikar](http://aikar.co)* on 2011-01-25 04:53:38  
This code is extremely slow...
I did a benchmark before and after adding this to my strings

BEFORE:
>>> node benchmark.js
rendered 10000 times in 3192ms!

AFTER:
>>> node benchmark.js
rendered 10000 times in 42797ms!

Use with caution.
---------------------------------------
*[Aikar](http://aikar.co)* on 2011-01-25 05:17:08  
Follow up, changing tmp_str.split to tmp_str.replace(symbol, entity); sped it up by 22% (10s~)

Then I furthur fixed the entire thing and did it properly, so can someone who knows how to update these functions implement this:

https://gist.github.com/794497

Got my benchmark back down to where it was suppose to be with the above pasted versions:
>>> node benchmark.js
rendered 10000 times in 3200ms!
---------------------------------------
*[Aikar](http://aikar.co)* on 2011-01-25 05:31:18  
Grr I realize I messed up variable names when I was cutting out that code and it was essentially running nothing... But after fixing it it still got down to 9000ms which is an 80% performance gain, so it needs to be modified.
---------------------------------------
*[Rafa? Kukawski](http://blog.kukawski.pl)* on 2011-01-25 09:34:25  
@Aikar: Are you absolutely sure your fix is correct? Simple changing from .split() to .replace() won't work correctly, unless you pass a regular expression with 'g' flag to .replace. When doing str.replace('foo', 'bar'), JavaScript replaces only first occurrence of 'foo' (http://jsfiddle.net/8ydqr/). Creating a new instance of RegExp object for every character (and escaping the character if required) would also take longer time to execute. But yes, this functions needs some optimizations.
---------------------------------------
*[Shefik](http://www.allknightaccess.com/)* on 2011-05-01 09:30:30  
Will the parameter "double_encode" be added in future release of this function?
---------------------------------------
*[Rafa? Kukawski]()* on 2011-05-01 12:40:41  
@Shefik: function with double_encode support landed on git
---------------------------------------
*[](empowertheweb.com)* on 2011-06-29 18:21:30  
Minified
```
function htmlentities (s, qS, cS, dE)
{
    var h = {}, c = '', e = '', se=this;
    s += '';

    if (false === (h = se.get_html_translation_table('HTML_ENTITIES', qS)))
    {
        return false;
    }
    if (!!dE || dE == null)
    {
    	h["'"] = '&#039;';
        for (c in h) s = s.split(c).join(h[c]);
    }
    else
    {
        s = s.replace(/([\s\S]*?)(&(?:#\d+|#x[\da-f]+|[a-z][\da-z]*);|$)/g, function (i,t,e) {
            return se.htmlentities(t, qS, cS) + e;
        });
    }
    return s;
}
```

---------------------------------------
*[Dj]()* on 2011-07-28 03:05:33  
Note that you have a bug.
hash_map["'"] = '&#039;'; should only be added when quote_style is ENT_QUOTES, otherwise the single quote will be allways converted independent of the quote style specified
---------------------------------------
*[Dj]()* on 2011-07-28 03:31:08  
Here one optimized version.
Using recursion calling self.htmlentities() will cause to load the table again and check source values, which does not make sense because you are using the same table.
So instead of recursion, use a simple loop working in the same scope.

```
function htmlentities (string, quote_style, charset, double_encode) {
    string = string !== undefined ? string + '' : '';
    var hash_map = this.get_html_translation_table('HTML_ENTITIES', quote_style),
         char;

    if (hash_map === false) {
        return false;
    }

    if (quote_style && quote_style === 'ENT_QUOTES') {
        hash_map["'"] = '&#039;';
    }
    
    if (!!double_encode || double_encode == null) {
        for (char in hash_map) {
            string = string.split(char).join(hash_map[char]);
        }
        return string;

    } else {
        return string.replace(/([\s\S]*?)(&(?:#\d+|#x[\da-f]+|[a-z][\da-z]*);|$)/g, function (ignore, text, entity) {
            for (char in hash_map) {
               text = text.split(char).join(hash_map[char]);
            }
            return text + entity;
        });
    }
}
```
---------------------------------------
*[Dj]()* on 2011-07-29 21:12:38  
Note that the regex for double encode is not correct because it does not inglude html entities for uppercase characters, like &Ntilde;

replace [a-z][\da-z] with [a-zA-Z][\da-z]
---------------------------------------
*[Rafa? Kukawski]()* on 2011-07-30 12:32:43  
@Dj: thanks for your feedback. Changed the function according to your suggestions. You can see the changes on github.
---------------------------------------
*[Komal]()* on 2011-09-17 10:47:57  
Hi,
I am using ur code in one of my functionality but when I use "extend" word then its shwoing me some code as output instead of "extend"
e.g., 
```
var str = htmlentities("test extend","ENT_QUOTES");
```

// Output in am getting is 
test function(object) { return Object.extend.apply(this, [this, object]); }  

It means "extend" word is replaced by "function(object) { return Object.extend.apply(this, [this, object]); }"

Can someone please check on this.

Thanks in Advanced.
- Komal
---------------------------------------
*[Rafa? Kukawski]()* on 2011-09-17 16:16:22  
@Komal: try using new get_html_translation_table and htmlentities (depends on the first one) functions from git https://github.com/kvz/phpjs/commit/f9a42874e652d096245797c155f65a25a667b528
---------------------------------------
*[Komal]()* on 2011-09-20 09:32:24  
Thanks a lot @Rafał 

I update the function htmlentities() from github and it works fine... :)
---------------------------------------
*[Eu]()* on 2011-12-20 02:50:18  
<script>alert('hi')</script>
---------------------------------------
*[Hans Henrik]()* on 2012-02-29 19:36:49  
this code isn't even close to complete. 
like 
```
æ=&aelig;
ø=&oslash;
å=&aring;
Æ=&AElig;
Ø=&Oslash;
Å=&Aring;
```
and there's lots of others missing 2 :p
---------------------------------------
*[Max von Buelow]()* on 2012-07-25 16:08:45  
The Code from line 29 to line 31 is already provided by get_html_translation_table:
```
    if (useQuoteStyle === 'ENT_QUOTES') {
        entities['39'] = '&#39;';
    }
```
---------------------------------------
*[deepak](www.gooogle.com)* on 2012-08-06 18:54:10  
deepak sahu deepak sahu deepak sahu deepak sahu deepak sahu deepak sahu deepak sahu deepak sahu deepak sahu deepak sahu deepak sahu deepak sahu deepak sahu deepak sahu deepak sahu deepak sahu deepak sahu deepak sahu deepak sahu 
---------------------------------------
