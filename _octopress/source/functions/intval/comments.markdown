*[stensi]()* on 2008-05-14 04:27:38  
Just stumbled across your PHP.js library, awesome work Kevin :)

I think your intval could be improved a little to handle JavaScripts &quot;Infinity&quot; value better.

For example, using current PHP.js intval:
```
function intval( mixed_var, base ) {
    // http://kevin.vanzonneveld.net
    // +   original by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)
    // *     example 1: intval('Kevin van Zonneveld');
    // *     returns 1: 0
    // *     example 2: intval(4.2);
    // *     returns 2: 4
    // *     example 3: intval(42, 8);
    // *     returns 3: 42
 
    var tmp;
 
    if( typeof( mixed_var ) == 'string' ){
        tmp = parseInt(mixed_var);
        if(isNaN(tmp)){
            return 0;
        } else{
            return tmp.toString(base || 10);
        }
    } else if( typeof( mixed_var ) == 'number' ){
        return Math.floor(mixed_var);
    } else{
        return 0;
    }
}

// set num to: Infinity
var num = 1 / 0;

// using current PHP.js intval returns: Infinity
alert( intval(num) );

// Output: Infinity
```


Using modified intval to handle Infinity:
```
function intval( mixed_var, base ) {
    // http://kevin.vanzonneveld.net
    // +   original by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)
    // *     example 1: intval('Kevin van Zonneveld');
    // *     returns 1: 0
    // *     example 2: intval(4.2);
    // *     returns 2: 4
    // *     example 3: intval(42, 8);
    // *     returns 3: 42
 
    var tmp;
 
    if( typeof( mixed_var ) == 'string' ){
        tmp = parseInt(mixed_var);
        if(isNaN(tmp) || !isFinite(tmp)){
            return 0;
        } else{
            return tmp.toString(base || 10);
        }
    } else if( typeof( mixed_var ) == 'number' &amp;&amp; isFinite(mixed_var) ){
        return Math.floor(mixed_var);
    } else{
        return 0;
    }
}

// set num to: Infinity
var num = 1 / 0;

// using intval_modified to handle Infinity returns: 0
alert( intval_modified(num) );

// Output: 0
```

Basically, the changes are:
```if(isNaN(tmp)){```
to:
```if(isNaN(tmp) || !isFinite(tmp)){```

and...

```} else if( typeof( mixed_var ) == 'number' ){```
to:
```} else if( typeof( mixed_var ) == 'number' &amp;&amp; isFinite(mixed_var) ){```
---------------------------------------
*[stensi]()* on 2008-05-14 04:29:49  
Just stumbled across your PHP.js library, awesome work Kevin :)

I think your intval could be improved a little to handle JavaScripts &quot;Infinity&quot; value.

for example, using current PHP.js intval:
```
function intval( mixed_var, base ) {
    // http://kevin.vanzonneveld.net
    // +   original by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)
    // *     example 1: intval('Kevin van Zonneveld');
    // *     returns 1: 0
    // *     example 2: intval(4.2);
    // *     returns 2: 4
    // *     example 3: intval(42, 8);
    // *     returns 3: 42
 
    var tmp;
 
    if( typeof( mixed_var ) == 'string' ){
        tmp = parseInt(mixed_var);
        if(isNaN(tmp)){
            return 0;
        } else{
            return tmp.toString(base || 10);
        }
    } else if( typeof( mixed_var ) == 'number' ){
        return Math.floor(mixed_var);
    } else{
        return 0;
    }
}

// set num to: Infinity
var num = 1 / 0;

// using current PHP.js intval returns: Infinity
alert( intval(num) );

// Output: Infinity
```


Using modified intval to handle Infinity:
```
function intval( mixed_var, base ) {
    // http://kevin.vanzonneveld.net
    // +   original by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)
    // *     example 1: intval('Kevin van Zonneveld');
    // *     returns 1: 0
    // *     example 2: intval(4.2);
    // *     returns 2: 4
    // *     example 3: intval(42, 8);
    // *     returns 3: 42
 
    var tmp;
 
    if( typeof( mixed_var ) == 'string' ){
        tmp = parseInt(mixed_var);
        if(isNaN(tmp) || !isFinite(tmp)){
            return 0;
        } else{
            return tmp.toString(base || 10);
        }
    } else if( typeof( mixed_var ) == 'number' &amp;&amp; isFinite(mixed_var) ){
        return Math.floor(mixed_var);
    } else{
        return 0;
    }
}

// set num to: Infinity
var num = 1 / 0;

// using intval_modified to handle Infinity returns: 0
alert( intval_modified(num) );

// Output: 0
```

Basically, the changes are:
```if(isNaN(tmp)){```
to:
```if(isNaN(tmp) || !isFinite(tmp)){```

and...

```} else if( typeof( mixed_var ) == 'number' ){```
to:
```} else if( typeof( mixed_var ) == 'number' &amp;&amp; isFinite(mixed_var) ){```
---------------------------------------
*[stensi]()* on 2008-05-14 04:33:39  
Sorry for double post.  I didn't give the correct code syntax highlighting first time round.

I noticed I the example I gave had an incorrect call:

```
alert( intval_modified(num) );
```

Should of course be:


```
alert( intval(num) );
```
---------------------------------------
*[Kevin van Zonneveld](http://kevin.vanzonneveld.net)* on 2008-05-14 21:55:11  
@ stenci: Thanks a lot for your improvements stensi!
---------------------------------------
*[Alex]()* on 2008-05-30 15:10:13  
function isInt(x) 
{
var y=parseInt(x);
if (isNaN(y)) return false;
return x==y &amp;&amp; x.toString()==y.toString();
}

taken from http://community.livejournal.com/nullzone/1223.html
---------------------------------------
*[Kevin van Zonneveld](http://kevin.vanzonneveld.net)* on 2008-05-31 14:19:59  
@ Alex: Thank you Alex. Added!
---------------------------------------
*[mkl.keck]()* on 2009-03-06 16:12:52  
Imprived function intval:

```
function intval() {
    var a = arguments;
    var v = a[0];
    var t = typeof(a[0])
    var b = ( (typeof(a[1]) !== 'undefined' &amp;&amp; !isNaN(a[1])) ? parseInt(a[1]) : 10 );
    switch (t.substring(0, 1).toLowerCase()) {
        case 'b':
            return ( (v === true) ? 1 : 0 );
        case 's':
            var r = parseInt(v * 1);
            return ( (!isNaN(v) &amp;&amp; isFinite(v)) ? r.toString(b) : 0 );
        case 'n':
            return ( isFinite(v) ? Math.floor(v) : 0 );
        default:
            return 0;
    }
}
```
---------------------------------------
*[Matteo]()* on 2009-09-16 16:37:08  
using this function as above, if I do something like

```
alert(is_integer(intval('12')))
```

I always get FALSE while I'd expect to get TRUE. This happens 'cause if the argument is a string, you return a string and not a number. Why is so? Shouldn't intval always return a number?
---------------------------------------
*[JD Kasinsky](http://www.caboom.tv)* on 2009-09-17 01:04:28  
This function should work in the most cases: 

```
	var v='10px';
	v=parseInt(v);
	alert(v);
```

Bye
JD


---------------------------------------
*[Brett Zamir](http://brett-zamir.me)* on 2009-09-17 05:22:30  
@Matteo: Glad you caught that. Fixed in git (also did some other clean-up). For now, see latest version at http://github.com/kvz/phpjs/commits/master/functions/var/intval.js
---------------------------------------
*[Brett Zamir](http://brett-zamir.me)* on 2009-09-17 05:25:12  
@JD Kasinsky: Yes, parseInt will often do the trick, but we're shooting for exact PHP behavior here...
---------------------------------------
*[Stefan Richter]()* on 2009-10-06 17:00:06  
I thought this function returns a number like PHP, not a string.
E.g. expected
 intval('1') + 1 = 2
but the result of this is '11'.
---------------------------------------
*[Brett Zamir](http://brett-zamir.me)* on 2009-10-06 20:38:55  
For now please see http://github.com/kvz/phpjs/blob/147b53a515907136c7804fe93f4bfb75a9c39d01/functions/var/intval.js -- the change hasn't yet come through the site.
---------------------------------------
*[Kevin van Zonneveld](http://kevin.vanzonneveld.net)* on 2009-10-08 14:17:24  
@ Brett Zamir: Thanks for fixing friend. I found there was an issue with the deployment. I fixed that just now.
---------------------------------------
*[zeroneta]()* on 2010-01-05 22:01:10  
```
_.intval = function( a, s )
{
	return is_bool( a ) ? a * 1 : _._.isFinite( a = _._.parseInt( a, s || 10 ) ) ? a : 0;
},
```
或者
```
_.intval = function( a, s )
{
	return is_bool( a ) ? a * 1 : _._.parseInt( a, s || 10 ) ? a : 0;
},
```
---------------------------------------
*[zeroneta]()* on 2010-01-05 22:04:05  
后面那个是有问题的 没有把 a 正确 传递

请使用 意思为这个的
```
_.intval = function( a, s )
{
        return is_bool( a ) ? a * 1 : _._.isFinite( a = _._.parseInt( a, s || 10 ) ) ? a : 0;
},
```
---------------------------------------
*[Philip Peterson](http://ironmagma.com/)* on 2010-12-06 14:22:13  
Just want to point out that if the base is 10, we should be using ~~"32" (e.g.) instead of parseInt, as it is MUCH faster. http://jsperf.com/bitwise-not-not-vs-parseint
---------------------------------------
*[???? ????](http://an3m1.com/)* on 2012-04-04 14:33:53  
Write more, that’s all I have to say. Literally, it seems as though you relied on the video to make your point. You clearly know what you’re talking about, why waste your intelligence on just posting videos to your blog when you could be giving us something enlightening to read 

---------------------------------------
