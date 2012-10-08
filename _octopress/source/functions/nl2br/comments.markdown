*[Philip Peterson]()* on 2008-04-15 02:41:13  
There are a few inconsistencies here:

first off, the replacement text should be &quot;&lt;br /&gt;\n&quot; (with the space before the backslash in &lt;br /&gt; and including the newline).  Also, I don't have time to do this, but you may want to check out how PHP handles \r\n and \r in this function, as it may be useful to implement support for if the PHP function does it.
---------------------------------------
*[Kevin van Zonneveld](http://kevin.vanzonneveld.net)* on 2008-04-15 08:18:18  
@ Philip Peterson: I've updated the function with your suggestions. Thank you!
---------------------------------------
*[Joshua]()* on 2008-05-21 11:13:42  
Nice piece of js code, very usefull :) I'm not using the whole package but just little pieces of code, great work!
---------------------------------------
*[Kevin van Zonneveld](http://kevin.vanzonneveld.net)* on 2008-05-21 12:57:12  
@ Joshua: Thank you, we're still working on a tool to customize &amp; save your own php.js version, maybe that would be something for you then!
---------------------------------------
*[Music Russia](http://darussia.com)* on 2008-09-06 21:28:33  
Do not work in my case.
---------------------------------------
*[Kevin van Zonneveld](http://kevin.vanzonneveld.net)* on 2008-09-08 00:22:17  
@ Music Russia: Please be more specific, can you for example provide the code how you call it? And explain what breaks? Thanks a lot!
---------------------------------------
*[Music Russia](http://darussia.com)* on 2008-09-08 03:10:20  
Sorry, Kevin, that's just my stupid mistake, i confused one var with another. I spend about 15 minutes until figured it out.

Here's the part of my code and it 100% works now:

```
var nfull = document.getElementById('full').value;
nfull = nfull.replace(/([^&gt;])\\n/g, '$1&lt;br /&gt;');
document.getElementById('txtpr').innerHTML = nfull;
```

Thank you for the hint!
---------------------------------------
*[Onno Marsman]()* on 2008-09-26 13:33:57  
To make sure it's a string i.e. nl2br(6):

```
function nl2br( str ) {
     return (str+'').replace(/([^&gt;])\n/g, '$1&lt;br /&gt;\n');
}
```
---------------------------------------
*[Onno marsman]()* on 2008-09-26 13:37:35  
I guess html is not escaped correctly, I meant:
```
function nl2br( str ) {
    return (str+'').replace(/([^&gt;])\n/g, '$1&amp;lt;br /&amp;gt;\n');
}
```
---------------------------------------
*[Onno Marsman]()* on 2008-09-26 13:39:59  
lol, still no good. Kevin: you know what I mean. I've only added (str+'')
---------------------------------------
*[Kevin van Zonneveld](http://kevin.vanzonneveld.net)* on 2008-09-29 12:37:00  
@ Onno Marsman: Nice :) Function has been updated according to your proposal!
---------------------------------------
*[Atli Þór](http://atli.advefir.com)* on 2008-10-10 18:39:20  
Hi.

There seems to be a minor flaw in the function for strings that start with a line-breaks, or have multiple consecutive line-breaks.

Using this:
```nl2br(&quot;\nOne\nTwo\n\nThree\n&quot;)```
it leaves out the first new-line and replaces the two new-lines between &quot;Two&quot; and &quot;Three&quot; with a single break.

Making the regex non-greedy seems to fix this tho:
```
return (str + '').replace(/([^&gt;]?)\n/g, '$1&lt;br /&gt;\n');
```

Additionally,  PHP 5.3 will accept a second parameter, indicating whether the break should be XHTML compliant or not.

This would allow for that as well:
```
function nl2br( str, is_xhtml ) {
    breakTag = &quot;&lt;br /&gt;&quot;;
    if(typeof is_xhtml == &quot;boolean&quot; || is_xhtml == false) {
        breakTag = &quot;&lt;br&gt;&quot;;
    }
    return (str + '').replace(/([^&gt;]?)\n/g, '$1'+ breakTag +'\n');
}
```
---------------------------------------
*[Atli Þór](atli.advefir.com)* on 2008-10-10 18:44:23  
Not sure why my last post got messed up like that.
If it was bad formatting on my part I apologize.
---------------------------------------
*[Kevin van Zonneveld](http://kevin.vanzonneveld.net)* on 2008-10-13 11:25:57  
@ Atli ÃžÃ³r: That's a Great contribution Atli ÃžÃ³r. I wish I could give your more credit, than the current system can give you. Thanks man.
---------------------------------------
*[John Peterson](http://www.phpontrax.com)* on 2009-01-14 07:56:20  
Why not just do this so much simplier...

String.prototype.nl2br = function() {  
    var breakTag = '&lt;br /&gt;';    
    return (this + '').replace(/([^&gt;]?)\n/g, '$1'+ breakTag +'\n');  
}

then you can just do:

mystring.nl2br()
---------------------------------------
*[Brett Zamir](http://bahai-library.com)* on 2009-01-14 09:53:21  
HI John,

I think concerns on this range from &quot;What happens if a standard version gets implemented later?&quot; to &quot;Will this interfere with other implementations added to the prototype (as a kind of &quot;global&quot; problem?&quot;), etc.. However, I personally think this could be very convenient for those willing to take the risk (or who reset the prototype after their code is done with it). 

Maybe when we get the string functions done ( ;) ), we can make one version of the PHP-JS package which adds to the prototype (also for Array, Object, Number, or maybe Function or Boolean if you can think of a reason!), as I'm hoping we can see a configurable version made at some point (as an independent project, if not through Kevin's official version).
---------------------------------------
*[Brett Zamir](http://bahai-library.com)* on 2009-01-14 10:00:20  
I should add the extra qualification that overloading the Object or Array prototype would probably be quite objectionable to many and need some serious revising of the PHP-JS functions (which I'm thinking should probably be revised regardless) to check for hasOwnProperty in each iterating for loop.
---------------------------------------
*[Kevin van Zonneveld](http://kevin.vanzonneveld.net)* on 2009-01-14 12:03:30  
@ John Peterson: Of course: that's not at all like PHP. And that's what we're trying to recreate here: So the main version should be as is it right now.

However. Just like there's a namespaced version of PHP.JS, I think it should be possible for us to generate prototype versions with the compiler. 

Currently this is a low priority for me and I would first like to create a public interface to the compiler on the phpjs.org site.

But I will keep this in mind as a future feature!
---------------------------------------
*[Maximusya]()* on 2009-11-13 15:49:44  
Taking into account different newline combinations (\r\n, \r, \n), function should return
```
return (str + '').replace(/([^>\r\n]?)(\r\n|\n\r|\r|\n)/g, '$1'+ breakTag +'$2');
```
---------------------------------------
*[Brett Zamir](http://brett-zamir.me)* on 2009-11-14 00:14:01  
@Maximusya: Good catch--fixed in http://github.com/kvz/phpjs/commit/cc8835a98b175ad7038fcd64c85936f3bea8bdbb
---------------------------------------
*[Atttze]()* on 2010-02-17 16:32:32  
According to the PHP docs it should be:

```
var breakTag = (is_xhtml || typeof is_xhtml === 'undefined') ? '<br />' : '<br>';
```

Not:
```
var breakTag = (is_xhtml || typeof is_xhtml === 'undefined') ? '' : '<br>';
```
---------------------------------------
*[Atttze]()* on 2010-02-17 16:34:35  
In Firefox (maybe more browsers) the <br /> in the code block above at line 22 is 'hidden'...
---------------------------------------
*[Dj]()* on 2011-07-28 04:29:02  
Why not use first regex instead the second one? (without [^>\r\n]?)
```
return (str + '').replace(/(\r\n|\n\r|\r|\n)/g, breakTag + '$1');
```
```
return (str + '').replace(/([^>\r\n]?)(\r\n|\n\r|\r|\n)/g, '$1' + breakTag + '$2');
```
---------------------------------------
*[PJ Brunet](http://tomakefast.com)* on 2011-09-04 11:00:13  
I'm voting for ```<br />``` vs. "br" 
---------------------------------------
*[Brett Zamir](http://brett-zamir.me)* on 2011-09-05 08:59:37  
@PJ Brunet: Just avoid the 2nd argument (or pass true) (it's not showing in the syntax highlighter, but it's there if you look at the source). That's the PHP way too, which we try to stick to here...
---------------------------------------
*[PJ Brunet](http://tomakefast.com)* on 2011-09-06 08:19:31  
Thanks for the clarification, indeed I was looking at the syntax highlighter version.  

I'm about to try this function to workaround some .innerHTML issue I'm having.  
---------------------------------------
*[Thomas]()* on 2012-01-04 19:15:13  
The breakTag variable doesn't display correctly.
---------------------------------------
*[Alvin]()* on 2012-05-11 08:05:05  
```
var breakTag = (is_xhtml || typeof is_xhtml === 'undefined') ? '' : '<br>';
```

that line is wrong, it should be:

```
var breakTag = (is_xhtml || typeof is_xhtml === 'undefined') ? '<br />' : '<br>';
```
---------------------------------------
*[Brett Zamir](http://brett-zamir.me)* on 2012-06-16 07:09:49  
@Alvin, Thomas: It is ok in Git, but not in the display. Click "raw js source" to see. However, I also changed the source to split up the line break so that it will hopefully display correctly once the cache of the site is reset.
---------------------------------------
*[ee]()* on 2012-09-24 09:31:54  
กดหกดหกด
ำำำำ
แแแแแแ
---------------------------------------
*[Rene Springmann](http://rene-springmann.de)* on 2012-10-04 13:00:24  
Thank u for that great function
---------------------------------------
