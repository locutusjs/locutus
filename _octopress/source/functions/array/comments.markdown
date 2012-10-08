*[thinsoldier]()* on 2008-06-19 17:13:13  
what about associative arrays?
var Divs = array(); // array of divs that I want to sort
Divs['amelie'] = divHtmlElement3;
Divs['randolph'] = divHtmlElement1;
Divs['judy'] = divHtmlElement9;

asort(Divs);

showDivArray(Divs);
---------------------------------------
*[Kevin van Zonneveld](http://kevin.vanzonneveld.net)* on 2008-06-19 18:29:16  
@ thinsoldier: What about them? Judging by your comment I would think you mean that our asort doesn't support them.. But it appears we don't have an asort yet ;)
JavaScript does support them in general. But they're called objects to be strict.
But I guess I don't fully understand your question.
---------------------------------------
*[covings](http://www.cornicescentre.co.uk)* on 2008-09-09 18:15:57  
VERY INTERESTING AND REALLY USEFUL INFORMATIONS! THX SO MUTCH
---------------------------------------
*[thinsoldier]()* on 2008-10-05 10:08:55  
what about

array('first'=&gt;'Kevin', 'last'=&gt;'Zonnevelt')
---------------------------------------
*[Kevin van Zonneveld](http://kevin.vanzonneveld.net)* on 2008-10-06 12:09:36  
@ thinsoldier: Yes that would be very nice, but I don't see how we could implement that unfortunately :( Here we run against the hard wall of language differences.
---------------------------------------
*[Sean]()* on 2008-11-29 20:59:46  
@Kevin: Could you not do:

```
array(&quot; 'first' =&gt; 'kevin' &quot;, &quot; 'last' =&gt; 'Zonnevelt' &quot; );
```

It's not quite the same as php, but at least this way you could create hash arrays
---------------------------------------
*[Onno Marsman]()* on 2008-11-30 08:53:16  
@Sean: We already can create associative arrays with JS:
```
{
    'first': 'kevin',
    'last': 'Zonnevelt' //I don't know why this is with a T ;)
}
```
Technically this is not an array but an object, but your proposal wouldn't return anything different. So we already have a syntax that is &quot;not quite the same as php&quot; and it does exactly the same.

Also think of using variables:
```
{ a: b, c: d}
```
Your alternative would result in something like this, because proper escaping is needed:
```
array(&quot; '&quot;+addslashes(a)+&quot;' =&gt; '&quot;+addslashes(b)+&quot;' &quot;, &quot; '&quot;+addslashes(c)+&quot;' =&gt; '&quot;+addslashes(d)+&quot;' &quot; );
```
I hope I didn't make any typo's, but I think my point is clear.
---------------------------------------
*[Kevin van Zonneveld](http://kevin.vanzonneveld.net)* on 2008-12-01 09:31:43  
@ Sean &amp; Onno Marsman: I totally agree with Onno. If we can't get it right, and people have to learn a different notation anyway, let's just stick with JavaScript.
---------------------------------------
*[Ates Goral](http://magnetiq.com)* on 2008-12-05 06:19:53  
function each(arr) {
    // Return the current key and value pair from an array and advance the array cursor

    // +   original by: Ates Goral (http://magnetiq.com)
    // *     example 1: each([42,43]);
    // *     returns 1: {0: 0, 1: 42, key: 0, value: 42}
    // *     example 2: each({a:&quot;apple&quot;,b:&quot;balloon&quot;});
    // *     returns 2: {0:&quot;a&quot;,1:&quot;apple&quot;,key:&quot;a&quot;,value:&quot;apple&quot;}
    if (!(arr instanceof Object) || (arr._keys &amp;&amp; !arr._keys.length)) {
        return false;
    }

    if (!arr._keys) {
        arr._keys = [];
        
        for (var k in arr) {
            if (k != &quot;_keys&quot;) {
                arr._keys.push(k);
            }
        }
    }
    
    var k = arr._keys.shift();
    var v = arr[k];
    
    return {
        0: k,
        1: v,
        key: k,
        value: v
    };
}
---------------------------------------
*[Ates Goral](http://magnetiq.com)* on 2008-12-05 06:22:48  
I apologize for the earlier, unformatted post :)

```
function each(arr) {
    // Return the current key and value pair from an array and advance the array cursor

    // +   original by: Ates Goral (http://magnetiq.com)
    // *     example 1: each([42,43]);
    // *     returns 1: {0: 0, 1: 42, key: 0, value: 42}
    // *     example 2: each({a:&quot;apple&quot;,b:&quot;balloon&quot;});
    // *     returns 2: {0:&quot;a&quot;,1:&quot;apple&quot;,key:&quot;a&quot;,value:&quot;apple&quot;}
    if (!(arr instanceof Object) || (arr._keys &amp;&amp; !arr._keys.length)) {
        return false;
    }

    if (!arr._keys) {
        arr._keys = [];
        
        for (var k in arr) {
            if (k != &quot;_keys&quot;) {
                arr._keys.push(k);
            }
        }
    }
    
    var k = arr._keys.shift();
    var v = arr[k];
    
    return {
        0: k,
        1: v,
        key: k,
        value: v
    };
}
```
---------------------------------------
*[Ates Goral](http://magnetiq.com)* on 2008-12-05 06:27:32  
Perhaps the each() implementation I have below is a hasty one. It won't play nice with reset(), next() and previous(). It can be improved by actually storing the cursor position instead of consuming the key array with the shift(). I'll try to improve it and provide reset/next/prev if I find the time.
---------------------------------------
*[Kevin van Zonneveld](http://kevin.vanzonneveld.net)* on 2008-12-10 17:22:44  
@ Ates Goral: Wow thanks a lot Ates! We'll leave it open for improvement then! Though I don't really like the idea of global variables, I believe the include_once functions also already work like that so we may be able to do that here as well. What do you think?
---------------------------------------
*[baterie s?oneczne](http://www.actionenergy.pl)* on 2010-09-05 16:56:38  
Wow! it seems that someone did really great stuff here! Lovely!
---------------------------------------
*[aaa]()* on 2011-08-27 21:18:20  
ewewe
---------------------------------------
*[????? ????](http://an3m1.com/)* on 2012-04-17 15:33:14  
If I might —perhaps you should consider adding a few images. I don’t mean to disrespect what you’ve said ; its very enlightening, indeed. However, I think would respond to it more positively if they could be something tangible to your ideas 

---------------------------------------
