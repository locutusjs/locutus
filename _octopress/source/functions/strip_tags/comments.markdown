*[Rauan]()* on 2008-05-23 23:04:13  
Ok, that's great... But where is exception in regex for allowed_tags?
---------------------------------------
*[Kevin van Zonneveld](http://kevin.vanzonneveld.net)* on 2008-05-31 12:33:05  
@ Rauan: PHP.JS is by no means a full PHP implementation in Javascript. But thanks for pointing this out, I've added the functionality
---------------------------------------
*[Rauan]()* on 2008-06-01 21:32:46  
Wow. Thanks, Kevin. That's the very important feature. :)
---------------------------------------
*[Mohammed]()* on 2008-06-20 06:17:43  
Thanks!
---------------------------------------
*[Steven Richards]()* on 2008-07-09 03:23:59  
The strip_tags() function appears to be broken in IE7. Upon detecting an opening tag, it completely removes ALL output. The same behavior appears on the test page on this site. It appears that in IE, the match() function returns a copy of the input string and a couple other extraneous values on a successful match, causing the entire string to be replaced by the first matched key (the original input).

To fix, I added this ugly piece of work inside the key loop:
```
if (key == '0' || Number(key.toString()))
{
// replacement
}
```
---------------------------------------
*[Kevin van Zonneveld](http://kevin.vanzonneveld.net)* on 2008-07-18 09:29:26  
@ Steven Richards: I've made what I think is the right change. Does this work okay?
---------------------------------------
*[Pul]()* on 2008-09-15 15:44:15  
try
```
strip_tags(&quot;&lt;a href='index.html'&gt;test&lt;/a&gt;&quot;, &quot;&lt;a&gt;&quot;);
```

please fix.. :P
---------------------------------------
*[Kevin van Zonneveld](http://kevin.vanzonneveld.net)* on 2008-09-17 13:06:23  
@ Pul: Thank you for pointing that out. I've fixed the code and added your usage example so it will be tested in the future as well.
---------------------------------------
*[Alex](http://deliciousdemon.com)* on 2008-10-20 21:02:54  
It looks like there's a small difference in your JS implementation of strip_tags from PHP's implementation:

PHP declares multiple allowable tags like this: strip_tags('&lt;p&gt;&lt;b&gt;text&lt;/b&gt;&lt;/p&gt;', '&lt;p&gt;&lt;b&gt;')

The JS version is like this:
strip_tags('&lt;p&gt;&lt;b&gt;text&lt;/b&gt;&lt;/p&gt;', '&lt;p&gt;,&lt;b&gt;')

Note the comma separation in the JS version between the allowable tags. It's not a big deal, but I thought I'd point it out, as it tripped me up for a while (and I thought you'd want to know since you're attempting to make these functions work syntactically the same as their PHP equivalents). Thanks!
---------------------------------------
*[Kevin van Zonneveld](http://kevin.vanzonneveld.net)* on 2008-10-21 10:07:37  
@ Alex: I wasn't aware of this implementation. And, you're right: it is our objective to mimic php as much as reasonably possible. Thanks for sharing, I've updated the function and credited you accordingly.
---------------------------------------
*[Marc Palau](http://www.nbsp.es)* on 2008-11-18 10:50:12  
Why is defined allowed_keys??

```var allowed_keys = {};```
---------------------------------------
*[Kevin van Zonneveld](http://kevin.vanzonneveld.net)* on 2008-11-18 12:27:39  
@ Marc Palau: That was a bit of legacy you spotted there, removed it. thx!
---------------------------------------
*[Computerzworld](http://computerzworld.com)* on 2009-01-24 06:36:43  
You have a great collection of  PHP equivalent javascript functions. This is really helpful to develpers. Thanks for sharing.
---------------------------------------
*[Eric Nagel](http://www.ericnagel.com/)* on 2009-02-27 22:05:14  
Thanks for the function.  I added:
```
var k = '', i = 0;
```

in your variable declarations, as I was using k and i outside the function, which put things into a nasty loop.  Hope this helps someone.
---------------------------------------
*[Kevin van Zonneveld](http://kevin.vanzonneveld.net)* on 2009-03-02 14:39:39  
@ Eric Nagel: Great, thanks for pointing that out!
---------------------------------------
*[Michael Grier]()* on 2009-03-04 20:46:13  
what does !! do here? validate? convert int to bool? 

array unique is using this function internally, but array_unique is not working for me (it returns undefined), and I'm trying to figure out why.
---------------------------------------
*[Kevin van Zonneveld](http://kevin.vanzonneveld.net)* on 2009-03-22 18:55:32  
@ Bobby Drake: Thanks for pointing that out. I fixed the bug and added your testcase to prevent future bugs. Thanks!
---------------------------------------
*[Tomasz Wesolowski]()* on 2009-07-22 15:37:14  
That's some useful code. :)

Unfortunately it seems to fail on header tags <h1>..<h7>. I have probably fixed that by changing the line 42:

// Build allowes tags associative array
```if (allowed_tags) {
    allowed_array = allowed_tags.match(/([a-zA-Z]+)/gi);
}```

to 

```allowed_array = allowed_tags.match(/([a-zA-Z0-9]+)/gi);```
---------------------------------------
*[Tomasz Wesolowski]()* on 2009-07-22 15:39:08  
Oops, no HTML escaping in posts? Here's a cleaner repost:
---

That's some useful code. :)

Unfortunately it seems to fail on header tags h1..h7. I have probably fixed that by changing the line 42:

```// Build allowes tags associative array
if (allowed_tags) {
    allowed_array = allowed_tags.match(/([a-zA-Z]+)/gi);
}```

to 

```allowed_array = allowed_tags.match(/([a-zA-Z0-9]+)/gi);```
---------------------------------------
*[Kevin van Zonneveld](http://kevin.vanzonneveld.net)* on 2009-07-24 12:29:04  
@ Tomasz Wesolowski: Very kind of you to provide the fix! I've added it to SVN along with the credits.

PS: oops indeed! fixed the comment issue
---------------------------------------
*[Brett Zamir](http://brett-zamir.me)* on 2009-07-29 03:06:44  
@Kevin: Thanks for the security fix, and sorry I'm too busy to look into it myself at the moment, but now the code snippets are showing less-than signs, etc. in entity form...
---------------------------------------
*[Kevin van Zonneveld](http://kevin.vanzonneveld.net)* on 2009-08-04 12:30:14  
@ Brett Zamir: Ok provided an additional fix. After comment caches clear we should be able to review the results.
---------------------------------------
*[Chris]()* on 2010-07-14 10:18:52  
Hey,
I have a slight problem with html comments. See this example:
```<h2 class="error">Ooops, das hätte nicht passieren dürfen!</h2>

<div class="graybox">
Die angegebene Adresse ist mit Ihren Benutzerrechten nicht erreichbar.<br />
<!--Sie werden in <strong id="cnt">&nbsp;</strong> Sekunden zur Startseite weitergeleitet...-->
</div>```

JS result:
```Ooops, das hätte nicht passieren dürfen! Die angegebene Adresse ist mit Ihren Benutzerrechten nicht erreichbar. &nbsp; Sekunden zur Startseite weitergeleitet...-->```

See missing "Sie werden in" and additional "-->" in the JS result.
---------------------------------------
*[Rafa? Kukawski](http://blog.kukawski.pl)* on 2010-07-15 08:39:26  
Maybe sth like this?

```function strip_tags(input, allowed){
   allowed = (((allowed || "") + "")
      .toLowerCase()
      .match(/<[a-z][a-z0-9]*>/g) || [])
      .join(''); // making sure the allowed arg is a string containing only tags in lowercase (<a><b><c>)
   var reg = /(<\/?([a-z][a-z0-9]*)\b[^>]*>)/gi;
   return input.replace(reg, function($0, $1, $2){
      return allowed.indexOf('<' + $2.toLowerCase() + '>') > -1 ? $0 : '';
   });
}```
---------------------------------------
*[Rafa? Kukawski](http://blog.kukawski.pl)* on 2010-07-15 12:02:30  
I extended my previous solution with removing comments and php tags. May not be perfect, but should work for most cases

```function strip_tags(input, allowed){
   allowed = (((allowed || "") + "")
      .toLowerCase()
      .match(/<[a-z][a-z0-9]*>/g) || [])
      .join(''); // making sure the allowed arg is a string containing only tags in lowercase (<a><b><c>)
   var tags = /<\/?([a-z][a-z0-9]*)\b[^>]*>/gi,
       commentsAndPhpTags = /<!--[\s\S]*?-->|<\?(?:php)?[\s\S]*?\?>/gi;
   return input.replace(commentsAndPhpTags, '').replace(tags, function($0, $1){
      return allowed.indexOf('<' + $1.toLowerCase() + '>') > -1 ? $0 : '';
   });
}```
---------------------------------------
*[Evertjan Garretsen]()* on 2010-09-07 23:14:41  
I discovered that when i allow br, this wil not allow the xhtml closed br like: <br/>. Maybe the following line should be added?
```
if (i != 0) { i = html.toLowerCase().indexOf('<'+allowed_tag+'/>');}
```

---------------------------------------
*[Kevin van Zonneveld](http://kevin.vanzonneveld.net)* on 2010-09-08 20:06:17  
@ Chris: Sorry, if the comment system is letting you down here, could you try pasting to pastebin.org?

@ Evertjan Garretsen: Looks like the PHP version needs you to explicitly put br/ in the list of allowed tags

@ Rafał Kukawski: Sublime man. In fact your creation's so good that it's better than PHP's version. Have a look at example 6 and you will see that PHP (5.3.2) will require you to explicitly name br/ in the allow list.

I'm still including your version in php.js, though, as I don't think this will cause bad bugs for people (seems like if you're whitelisting br you intend to whitelist br/ as well) so we can fix it later on.

https://github.com/kvz/phpjs/commit/526ac02243899b12cd0929c0a25133304525c0e8

---------------------------------------
*[sacdmn sda.m,c nads,.cn n65467289376541248321908643218694321](jkhvkjb)* on 2011-03-31 09:29:16  
!@#$%^&*())(*&^%$#@
---------------------------------------
*[Roger]()* on 2012-03-28 05:16:43  
Awesome & thanks!
---------------------------------------
*[????? ?????? ? ?????](http://an3m1.com/)* on 2012-04-04 14:33:20  
I wonder how you got so good. HaHa ! This is really a fascinating blog, lots of stuff that I can get into. One thing I just want to say is that your design is so perfect ! You certainly know how to get a girls attention ! I’m glad that you’re here. I feel like I’ve learned something new by being here 

---------------------------------------
