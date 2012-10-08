*[Karol Kowalski]()* on 2008-02-12 13:40:35  
Hello,
I've done some code refactoring, making the code do what it really needs to do (there's no need for the 2nd loop, it there?). I've run a test and it seems to be 38% faster. Here's the code
```
function array_reverse( array, preserve_keys ) {
    // http://kevin.vanzonneveld.net
    // +   original by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)
    // *     example 1: array_reverse( [ 'php', '4.0', ['green', 'red'] ], true );
    // *     returns 1: { 2: ['green', 'red'], 1: 4, 0: 'php'}
 
    var i=0, f, key, keys = [], key_cnt=0, tmp_ar = {};
 
    for(key in array){
        keys[i++] = key;
    }
    keys = keys.reverse();
    key_cnt = keys.length;
    for( i=0; i &lt; key_cnt; i++ ){
        tmp_ar[(preserve_keys ? keys[i] : i)] = array[keys[i]];
    }
 
    return tmp_ar;
}

function array_reverse2( array, preserve_keys ) {
    // http://kevin.vanzonneveld.net
    // +   original by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)
    // *     example 1: array_reverse( [ 'php', '4.0', ['green', 'red'] ], true );
    // *     returns 1: { 2: ['green', 'red'], 1: 4, 0: 'php'}
 
	var arr_len=array.length, newkey=0, tmp_ar = {}
	 
    for(var key in array){
		newkey=arr_len-key-1;
        tmp_ar[(!!preserve_keys)?newkey:key]=array[newkey]
    }
	
    
    return tmp_ar;
}

// wrapped in windows onload cause
// Firebug 1.1 throws an error otherwise

window.onload=function () {

console.time('array_reverse')

for (var i=10000;i;i--) {

array_reverse( [ 'php', '4.0', ['green', 'red'] ], true );

}

console.timeEnd('array_reverse')


console.time('array_reverse2')

for (var i=10000;i;i--) {

array_reverse2( [ 'php', '4.0', ['green', 'red'] ], true );

}

console.timeEnd('array_reverse2')

}
```
---------------------------------------
*[Kevin van Zonneveld](http://kevin.vanzonneveld.net)* on 2008-02-16 13:48:31  
@ Karol Kowalski: That's solid work you can take pride in Karol, thank you!
---------------------------------------
*[Brett Zamir]()* on 2008-03-21 03:53:29  
Seems you've already done a whole lot of work, but not knowing about your site, I had started a wiki to keep this kind of information: http://javascript.wikia.com/wiki/PHP-Javascript . There are a few functions there presently, but please feel free to consider hosting this at such a wiki so it can be easily maintained by the whole community! Thanks! Email me at brettz9 &amp; yahoo if you like.
---------------------------------------
*[Also...]()* on 2008-03-21 04:10:17  
Also from the site I just mentioned, here's a function which returns a genuine array (this could probably be combined with your function to test for preserve_keys and if not present, return a genuine array?):
```function array_reverse(arr) {
	/* Simulate copy by value */
	var arr_rev = [];
	for (var i = 0; i &lt; arr.length; i++) {
		arr_rev[i] = arr[i];
	}
	arr_rev.reverse();
	return arr_rev;
}```
---------------------------------------
*[frame]()* on 2008-11-18 01:25:46  
Some functions are not included in php.js or php.min.js.. why?

do you forget to?

ex: file_exists, array_reserve
---------------------------------------
*[frame]()* on 2008-11-18 01:38:31  
hmm .. i have downloaded the lib again and now there are the missing functions included.. please ignore..
---------------------------------------
*[Kevin van Zonneveld](http://kevin.vanzonneveld.net)* on 2008-11-18 12:24:46  
@ frame: Yeah php.js is by no means ready. New functions are written and bugs are being fixed. It's a good idea to update your version every once in a while.
---------------------------------------
*[makanaki](...)* on 2011-02-09 17:57:12  
At least when there's no flag " preserve_keys" this function should return array, not object. 
---------------------------------------
*[Paul](http://PaulANorman.info)* on 2011-09-20 02:30:55  
When you pass a flat array (no direct keys) of just strings, and even set ``` preserve_keys ``` to false, you of course keep getting an object returned, and not an array as  ```  tmp_arr = {} ``` and not ``` tmp_arr = [] ```

So in the case of there being no supplied keys in the array this does not seem to work.

```

  a = ["a", "b", "c"];
 
  b = PhpJs.array_reverse(a);

```

 display b and you get [object Object] under QtScript at least.

Change to ``` tmp_arr = [] ``` 

... and you get the expected c, b, a

Does the function need to test on preserve_keys  first as to what ``` temp_arr ``` is created as?
---------------------------------------
*[Rafa?]()* on 2011-09-20 08:42:35  
@Paul: I changed the function, so it returns Array when preserve_keys is falsy.
https://github.com/kvz/phpjs/blob/master/functions/array/array_reverse.js
I think it was the first and last time I've touched array functions.
---------------------------------------
*[Jan Bouvrie]()* on 2012-08-08 17:15:20  
Is it me, or is the type change from string '4.0' to numeric 4 in the example a side effect?
---------------------------------------
