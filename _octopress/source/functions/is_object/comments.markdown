*[Legaev Andrey]()* on 2008-03-01 19:39:30  
Hi
I found few errors: 
1. typeof null returns 'object', but this is not an object.
2. Original PHP function returns false if you pass array as parameter, but in JS returns 'object'. If we want fully emulate PHP function we should handle this case.

```
function is_object( mixed_var ){
    return (mixed_var !== null) &amp;&amp; (typeof( mixed_var ) == 'object');
}
```
---------------------------------------
*[Kevin van Zonneveld](http://kevin.vanzonneveld.net)* on 2008-03-01 20:52:46  
@ Legaev Andrey: updated, thanks again Legaev!
---------------------------------------
*[Michael White]()* on 2008-03-03 02:37:48  
I found a way to detect the difference between objects and arrays. There is an incredibly slight change that you pass an array to this function and it still returns true but I'll explain that after the code.

```
alert(&quot;Obj: &quot; + is_object({foo: &quot;bar&quot;}));
alert(&quot;Arr: &quot; + is_object([&quot;foo&quot;, &quot;bar&quot;]));

function is_object( mixed_var ){
	if(typeof(mixed_var.join) != &quot;function&quot;) {
	    return (mixed_var !== null) &amp;&amp; (typeof( mixed_var ) == 'object');
	} else {
		return false;
	}
}
```

Ok, this works by checking to see if there is a property of the array named &quot;join&quot; that contains a function object. If not then we know this is an object. If it is then we can reasonably assume that it is an array. I chose the join() method of arrays simply because it has been implemented since Netscape 3.0 and IE 3.0 and so should exist if you are working with an array.

http://crestidg.com
---------------------------------------
*[Michael White]()* on 2008-03-03 02:44:54  
Why do I make things more complicated than they really are? Here is a much more sensible version that based on the content of the is_array() method. I apologize for polluting your message boards with the previous post.

```
function is_object( mixed_var ){
	if(mixed_var instanceof Array) {
		return false;
	} else {
		return (mixed_var !== null) &amp;&amp; (typeof( mixed_var ) == 'object');
	}
}
```

http://crestidg.com
---------------------------------------
*[Kevin van Zonneveld](http://kevin.vanzonneveld.net)* on 2008-03-03 11:49:59  
@ Michael White: Good point, added!
---------------------------------------
*[????? ????? ???? ](http://an3m1.com/)* on 2012-05-06 09:31:09  
This is a very informative article. I was looking for these things and here I found it. I am doing a project and this information is very useful me. Some things in here I have not thought about before  

---------------------------------------
