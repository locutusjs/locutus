*[Ates Goral]()* on 2008-01-23 18:35:44  
stripslashes() unescapes octal and hexadecimal ASCII code sequences as well. So we should have instead:

```
return str.replace(/\\([&quot;'\\])/g, &quot;$1&quot;).replace(/(\\(?:[0-7]{1,3}|x[\dA-Fa-f]{1-2}))/g, function(code) { return String.fromCharCode(code); });
```

Additional test:
```
    // *     example 2: stripslashes(&quot;Hello\x20World\41&quot;);
    // *     returns 2: &quot;Hello World!&quot;
```
---------------------------------------
*[Kevin van Zonneveld](http://kevin.vanzonneveld.net)* on 2008-01-23 20:25:53  
@ Ates Goral: Nicely crafted.
---------------------------------------
*[Ates Goral]()* on 2008-01-23 21:09:44  
Thanks Kevin! Err... I want my credits in the function comments (I'm keen on keeping the two medals, at least for a while) ;)
---------------------------------------
*[Kevin van Zonneveld](http://kevin.vanzonneveld.net)* on 2008-01-23 21:45:01  
@ Ates Goral: Obviously!
---------------------------------------
*[Mickael9]()* on 2008-01-27 17:56:26  
Hello,

Ates Goral, you're totally wrong !
stripslashes only removes \ it DOES NOT unescapes octal and hexadecimal code sequences, you are experimenting in a wrong way, remember, when you call stripslashes('\x20'), PHP ITSELFS turns \x20 in a space, not your function, read the addslashes manual, it onlty turns ' into \', &quot; into \&quot;, \ into \\ and NULL into \0.

Here is the fixedfunction :
```function stripslashes (str)
{
    // http://kevin.vanzonneveld.net
    // +   improved by: Ates Goral (http://magnetiq.com)
    // +   fixed by: Mick@el
    // *     example : stripslashes(&quot;Kevin\\\\'s code&quot;);
    // *     returns : 'Kevin\'s code'
    return str.replace(/\\0/g, '\0').replace(/\\(.)/g, '$1')
}
```
---------------------------------------
*[Mickael9]()* on 2008-01-27 17:59:49  
Huh, sorry, I meant stripslashes(&quot;\x20&quot;), not stripslashes('\x20')
---------------------------------------
*[Kevin van Zonneveld](http://kevin.vanzonneveld.net)* on 2008-01-29 20:52:23  
@ Mickael9: Thanks for your input!
---------------------------------------
*[Onno Marsman]()* on 2008-10-04 17:11:20  
stripslashes(6) won't work. Fix:

```
function stripslashes( str ) {
    return (str+'').replace('/\0/g', '0').replace('/\(.)/g', '$1');
}
```
---------------------------------------
*[Kevin van Zonneveld](http://kevin.vanzonneveld.net)* on 2008-10-06 12:02:05  
@ Onno Marsmann: Fixed, thank you!
---------------------------------------
*[rezna](http://rezna.info)* on 2008-12-15 15:26:17  
stripslashes doesn't work, the implementation should be this

```
return (str+'').replace(/\0/g, '0').replace(/\\([\\'&quot;])/g, '$1');
```

and your sample code should be
```
stripslashes('Kevins\\\'s code')
```
---------------------------------------
*[Kevin van Zonneveld](http://kevin.vanzonneveld.net)* on 2008-12-17 13:25:10  
@ rezna: Ok as I see it your code only replaces  either \ or ' or &quot;, and not any other character that is escaped. Fair enough. But are you sure the previous function didn't work? It didn't give issues in the test suite. Not even with the old implementation and your new sample code.
---------------------------------------
*[Dave Baldwin](http://www.dibsplace.com)* on 2009-05-29 04:18:28  
I just had to use this to get rid of a slash "\'" because the single quote was really the htmlentity "&#39;":

```
str=str.replace(/\\&#39;/g,"'");
```

---------------------------------------
*[Rick Waldron]()* on 2009-06-03 22:26:56  
Just out of curiousity... how come you didn't write these functions as methods of an object?
example:
```
String.prototype.stripslashes = function() {
  return this.replace('/\0/g', '0').replace('/\(.)/g', '$1')
}
```

that way you dont have to force it into a string, it can now also be chained... like...

```
var str = "that's everything folks";
str.stripslashes().replace('everything', 'all');
```



note... i used the corrected version posted by Onno Marsman below.

---------------------------------------
*[Rick]()* on 2009-06-03 23:02:08  
I posted that with a bit of haste...

some corrections:
```
String.prototype.stripslashes = function() {
  return  this.replace(/\\'/g,'\'')
                .replace(/\\"/g,'"')
                  .replace(/\\\\/g,'\\')
                    .replace(/\\0/g,'\0');
}
// that can also be added to for htmlentity support. but thats not the point i'm trying to make.

var str = "that\'s everything folks";
str.stripslashes().replace('everything', 'all');
// stripslashes, then demonstrates chainability
```

---------------------------------------
*[Brett Zamir](http://bahai-library.com)* on 2009-06-04 01:46:57  
Hi Rick,

It turns out stripslashes doesn't only strip those next to quotation works, even though addslashes only adds them this way. But it does preserve double-backslashed items and does convert the NULL character. I've optimized the handling to avoid going over the same characters again as well as handled removing backslashes at the end.

As far as string conversion, it seems PHP does convert first to a string (at least with integers), so I think we're ok there.

As far as chaining via the prototype, though that can definitely be convenient, for larger scripts, there is a potential for a clash of implementations (e.g., someone may later override the prototype with their own function, say stripslashes() which say only strips slashes next to quotes). These are kind of like globals and really are to be avoided at least for library projects. 

We could still conceivably get chaining of methods, such as jQuery does, by first making our string into an object, for example:

```var newStr = $PJ(str).addslashes().str_replace('stuff', '').exit();```

...but this would require making a version of PHP.JS where each function returned "this", and we'd need to define the constructor and exit methods. Not sure how popular that would be either, though it could be done.
---------------------------------------
*[Kevin van Zonneveld](http://kevin.vanzonneveld.net)* on 2009-06-10 14:49:55  
@ Rick & Brett Zamir: Well for one thing it isn't part of PHP functions. And that's what we're providing here. If people want to take that functionality and wrap it in something that does provide chaining, they are free to do so, and the namespaced version of php.js would probably be easiest to extend on.

That said, I've seen rumours that PHP6 does support chaining so by the time that it's stable we may have to support it after all :)
---------------------------------------
*[Robert Hollencamp](http://power-user-tools.no-ip.org)* on 2009-12-29 21:25:05  
Line 19 (return '\u000';) causes parse errors in safari and IE; adding an extra 0 (return '\u0000';) seems to fix the problem
---------------------------------------
*[Brett Zamir](http://brett-zamir.me)* on 2009-12-30 07:00:23  
@Robert Hollencamp: yes, thanks, you are correct. Previously fixed in Git, but not yet making it to the site here.
---------------------------------------
*[technomixx](http://www.technomixx.com)* on 2011-09-02 11:48:37  
Great, nice script, I have used it working well thanks.
---------------------------------------
*[Baijun]()* on 2012-09-12 08:45:35  
Thanks bro... its really helpful to me....
---------------------------------------
