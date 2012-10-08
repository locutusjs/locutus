*[Karol Kowalski]()* on 2008-01-30 11:03:04  
Why not use native JS Math.abs for this. I believe this should be faster than conditional expressions.

```
function abs( mixed_number )  {
    // http://kevin.vanzonneveld.net
    // +   original by: _argos
    // *     example 1: abs(4.2);
    // *     returns 1: 4.2
    // *     example 2: abs(-4.2);
    // *     returns 2: 4.2
    // *     example 3: abs(-5);
    // *     returns 3: 5
    // *     example 4: abs('_argos');
    // *     returns 4: 0

	var abs=Math.abs( mixed_number )
	return ( !isNaN ( abs) ) ? abs : 0
}
```
---------------------------------------
*[Kevin van Zonneveld](http://kevin.vanzonneveld.net)* on 2008-01-30 12:48:35  
@ Karol Kowalski: Using native Javascript for this is probably best so I've updated the function. But I'm not totally certain that this is faster. Doesn't the Math libary have to be loaded or something? Can somebod shed a light on this?

For reference, this was the original by _argos:
```
function abs( mixed_number )  {
    // +   original by: _argos
    return ( ( !isNaN ( mixed_number ) ) ? ( ( mixed_number &lt; 0 ) ? ( mixed_number * -1 ) : mixed_number ) : 0 );
}
```
---------------------------------------
*[Karol Kowalski]()* on 2008-01-30 15:03:31  
I run a test and it appeared that my function with Math.abs was around 40% more time consuming than yours. I tried to optimize it and ended up with 20% gain, and the code is still smaller and more readable. I tested it in Firefox, IE7, Safari and Opera with similar results. To see what's causing the overhead I run a function that would just return Math.abs, withoud checking for validity, still it was 10% slower than your function. It seems that Math.abs API is always slower than what can be accomplished with JS hack, a bit sad.

Still, for code readability I would sugget using the code of abs_math2.

Here's the test code:
```
if (!window['console']) {

console={}
console.log=alert
}

var start;

function abs_math2 ( mixed_number ) {
  return ( ( isNaN ( mixed_number ) ) ? 0 : Math.abs ( mixed_number ) );
}

function abs_math( mixed_number )  {
  var abs=Math.abs( mixed_number );
  return ( !isNaN ( abs ) ) ? abs : 0
}

function abs_cond( mixed_number )  {
  return ( ( !isNaN ( mixed_number ) ) ? ( ( mixed_number &lt; 0 ) ? ( mixed_number * -1 ) : mixed_number ) : 0 );
}


start=new Date();

for (var i=100000;i;i--) {

abs_cond(4.2);
abs_cond(-4.2);
abs_cond(-5);
abs_cond('_argos');
abs_cond(-Infinity);

}

console.log((new Date())-start)


start=new Date();

for (var i=100000;i;i--) {

abs_math(4.2);
abs_math(-4.2);
abs_math(-5);
abs_math('_argos');
abs_math(-Infinity);

}

console.log((new Date())-start)


start=new Date();

for (var i=100000;i;i--) {

abs_math2(4.2);
abs_math2(-4.2);
abs_math2(-5);
abs_math2('_argos');
abs_math2(-Infinity);

}

console.log((new Date())-start)


//my results
//Firefox 2.0.11
//1000
//1422
//1219


```
---------------------------------------
*[Kevin van Zonneveld](http://kevin.vanzonneveld.net)* on 2008-01-30 15:43:39  
@ Karol Kowalski: Awesome work Karol! I've updated the function. Thanks for putting in the extra effort. Greatly appreciated!
---------------------------------------
*[_argos]()* on 2008-01-30 22:24:48  
@Karol Kowalski : Hi, thanks for take the time to check my port, I make the same tests like you, because I think that native functions always are more slower, so ever I  use self hacks :p again thanxs for your time.

PS: Sorry for my badly English, but i have 4 years without use it :p
---------------------------------------
*[_argos]()* on 2008-01-31 17:33:29  
Hi Kevin I'm here again look this ports.

```
if ( defined ( 'CONSTANTE' ) ) {

    console.log ( CONSTANTE );

}

function defined ( constant_name ) {

	return ( ( window [ constant_name ] !== undefined ) ? true : false );

}



// -----

// [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]

console.log ( range ( 0, 12 ) );



// [0, 10, 20, 30, 40, 50, 60, 70, 80, 90, 100]

console.log ( range( 0, 100, 10 ) );



// ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i'];

console.log ( range( 'a', 'i' ) );



// ['c', 'b', 'a'];

console.log ( range ('c', 'a' ) );



function range ( low, high, step ) {

	var matrix = [];

	var inival, endval, plus;

	var walker = step || 1;

	var chars  = false;

	

	if ( !isNaN ( low ) &amp;&amp; !isNaN ( high ) ) {

		inival = low;

		endval = high;		

	} else if ( isNaN ( low ) &amp;&amp; isNaN ( high ) ) {

		chars = true;

		inival = low.charCodeAt ( 0 );

		endval = high.charCodeAt ( 0 );

	} else {

		inival = ( isNaN ( low ) ? 0 : low );

		endval = ( isNaN ( high ) ? 0 : high );

	}

	

	plus = ( ( inival &gt; endval ) ? false : true );

	

	if ( plus ) {

		while ( inival &lt;= endval ) {

			matrix.push ( ( ( chars ) ? String.fromCharCode ( inival ) : inival ) );

			inival += walker;

		}

	} else {

		while ( inival &gt;= endval ) {

			matrix.push ( ( ( chars ) ? String.fromCharCode ( inival ) : inival ) );

			inival -= walker;

		}

	}

		

	return matrix;

}



// -----

console.log ( strcmp ( 'waldo', 'Waldo' ) );

console.log ( strcmp ( 'Waldo', 'waldo' ) );

console.log ( strcmp ( 'waldo', 'waldo' ) );



function strcmp ( str1, str2 ) {

	var size1 = str1.charCodeAt ( 0 );

	var size2 = str2.charCodeAt ( 0 );

	

	return ( ( size1 == size2 ) ? 0 : ( ( size1 &gt; size2 ) ? 1 : -1 ) );

}
```
---------------------------------------
*[Kevin van Zonneveld](http://kevin.vanzonneveld.net)* on 2008-01-31 18:47:22  
@ _argos: Nice work! Added!
---------------------------------------
*[Philip]()* on 2008-03-31 19:42:37  
Dunno where this belongs, but how about this code for echo()?

```
function echo()
{
  for(i=0;i&lt;echo.arguments.length;i++)
  {
    if(document.body &amp;&amp; document.body.innerHTML) {
document.body.innerHTML=document.body.innerHTML+echo.arguments[i];
} else {
document.write(echo.arguments[i]);
}
  }
}
```
---------------------------------------
*[Kevin van Zonneveld](http://kevin.vanzonneveld.net)* on 2008-04-02 13:26:06  
Philip: Good idea, I'll add it, thanks!
---------------------------------------
*[Jonas Raoni]()* on 2008-04-12 17:33:32  
A shorter version of this would be:

return Math.abs (n) || 0;
---------------------------------------
*[Philip]()* on 2008-04-12 20:24:25  
Hey, just fyi... Philip and Philip Peterson are both me ;-)
---------------------------------------
*[Kevin van Zonneveld](http://kevin.vanzonneveld.net)* on 2008-04-13 12:29:58  
@ Jonas Raoni: Thanks I'll update the function.
@ Philip: I'll update your name!
---------------------------------------
*[Reena](nill)* on 2008-09-08 11:40:18  
Good
---------------------------------------
*[Nile](unlinkthis.net)* on 2009-01-09 21:34:02  
json_encode
```
var arr = new Array('Hello');
var applyEncode = function(varIn){
return '{'+varIn+'}';
}
var json_encode = function(value){
   var data = '';
   for(i=0,endCount='';i&lt;value.length;++i){
   var endCount = (i!=value.length-1) ? &quot;, &quot; : &quot;&quot;;
   data += '&quot;'+key(value[i])+'&quot; : &quot;'+value[key(value)]+'&quot;'+endCount;
   }
   return applyEncode(data);
}
document.write(json_encode(arr));
```
---------------------------------------
*[Kevin van Zonneveld](http://kevin.vanzonneveld.net)* on 2009-01-12 23:53:13  
@ Nile: Hey Nile thanks for your contribution. Unfortunately there are a couple of issues with it:
- depends on an outside function: applyEncode
- does not support associative arrays (in terms of traversing)
- does not support index arrays, numbers, etc (in terms of encoding)

Please have a look here:
http://www.json.org/json2.js

The code is public domain, so maybe it's possible to modify it and use it in PHP.JS. We could look into that!
---------------------------------------
*[Paul]()* on 2009-01-15 02:28:06  
I downloaded php.namespaced.*.js at 2009-01-14 15:28 HST.  There appears to be a space missing which is causing javascript errors.  Search string &quot;functionPropagation&quot;.  I was able to resolve the error in php.namespaced.js and php.namespaced.min.js, but not php.namespaced.packed.js due to the packing operation.

BTW: This package is incredible!
---------------------------------------
*[Kevin van Zonneveld](http://kevin.vanzonneveld.net)* on 2009-01-15 11:40:52  
@ Paul: It was actually an issue in the exit function. Should be fixed now, thanks for letting us know!
---------------------------------------
*[Jay]()* on 2009-03-06 17:02:58  
You should really consider putting this project up on GitHub.com, it would be a perfect fit.  That way people could modify and improve the code, and then send you a pull request for you to merge their changes.  It's a very nice way to develop open source projects.
---------------------------------------
*[Kevin van Zonneveld](http://kevin.vanzonneveld.net)* on 2009-03-22 19:06:57  
@ Jay: I'm working on 1 github project and a.t.m. I do not find the speed satisfying. I imagine all that SSH traffic causes quite some load but git pull times of > 60 seconds are just not acceptable. Maybe later though! Thanks
---------------------------------------
*[Kevin van Zonneveld](http://kevin.vanzonneveld.net)* on 2009-09-04 19:14:48  
@ Jay: "Later" has arrived. We're now on GitHub!
http://github.com/kvz/phpjs

Some more info about the change here:
http://kevin.vanzonneveld.net/techblog/article/svn_to_git/
---------------------------------------
*[????? ???](http://an3m1.com/)* on 2012-04-10 09:49:50  
I have a lot to benefit from this article and thank you for this wonderful effort to this article and will continue my many articles you have other 
---------------------------------------
