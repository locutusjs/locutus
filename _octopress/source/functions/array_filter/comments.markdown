*[J.]()* on 2009-08-17 02:59:10  
php handles both array and object, unfortunately JS does not distinguish indexed array and hashed array object...

array_filter in php handles both types and returns type intacted..  Can we add type check like below?

```
array_filter: function  (arr, func) {
	    var retObj, k, type = 'array';
	    func_set = 0;
	    
	    if(this.isset(func))
	    	func_set = 1;
	    // Check for 'length'
	    if(arr.length === undefined){
	    	type = 'hashed_array';
	    }
	    if(type == 'hashed_array'){
	    	retObj = {};
		    for (k in arr) {
		    	if(func_set){
			        if (func(arr[k])) {
			            retObj[k] = arr[k];
			        }
		    	}else{
		    		if(this.is_null(arr[k]))
		    			continue;
		    		retObj[k] = arr[k];
		    	}
		    }
	    }else{
	    	retObj = [];
	    	for(i=0;i<arr.length;++i){
	    		if(func_set){
			        if (func(arr[i])) {
			            retObj[i] = arr[i];
			        }
		    	}else{
		    		if(this.is_null(arr[i]))
		    			continue;
		    		retObj[i] = arr[i];
		    	}
	    	}
	    }
	    
	    return retObj;
	}
```
---------------------------------------
*[Brett Zamir](http://brett-zamir.me)* on 2009-08-17 04:42:18  
@J.: While I know it's definitely tempting to try it that way, a problem arises when the preserved filtered results are not all sequential at the beginning of the array (probably most times); the keys will either end up not being preserved (as they are in PHP), or, as in your code, we'd end up making an array with "undefined" values throughout in place of missing values and which showed a size equal to the original array instead of the length of filter-positive values (as most people would probably want it). 

In a number of functions we really have to return an array, though there may be a few which could be adapted to try to return a genuine array where possible. But as far as array_filter, the cases where this would be valid (positive results all sequential at the beginning) would be uncommon, and probably confusing if we didn't follow a uniform policy (unless, again, the results would be consistent).
---------------------------------------
*[Brett Zamir](http://brett-zamir.me)* on 2009-08-17 04:43:35  
Sorry, I meant, "we really have to return an object"
---------------------------------------
*[J]()* on 2009-08-18 07:59:14  
Oops, I meant to put retObj.length  to omit the null ones..
Not sure if that makes any diff..

```
if(!this.is_null(arr[i])){
	retObj[retObj.length] = arr[i];
}
```
---------------------------------------
*[Brett Zamir](http://brett-zamir.me)* on 2009-08-18 12:04:48  
@J: Sorry, no difference. If you set a key on a JS array, it will fill in the gaps with 'undefined'. 

Try this with our function:

var arr = array_filter2([3, 4, 5, 6], function (n) {return n >= 5;});
alert(arr.length); // Should be 2, but is 4

Yours gives four, while ours doesn't pretend to be an array (there's no length at all), so it is not confusing.

---------------------------------------
*[Brett Zamir](http://brett-zamir.me)* on 2009-08-18 12:11:28  
Of course that's a typo with array_filter2 (which should just be array_filter)
---------------------------------------
*[max4ever]()* on 2011-10-07 12:57:49  
usually in php array_filter($array), filters empty values(like '', 0, false ...) 
---------------------------------------
*[Brett Zamir](http://brett-zamir.me)* on 2011-10-08 00:12:22  
@max4ever: The latest version in Git now adds support for a single-argument-only call. Thanks!
---------------------------------------
*[Tim Younger](bustedtubes.com)* on 2012-02-22 18:54:39  
might want to return an array if param was an array. i'm sure there is a more secure way to evaluate if the param was an array, but is_array is overkill for native support.

```
if ('number'==typeof arr.length && isFinite(arr.length)) {return Array.prototype.slice.call(retObj);}
```
---------------------------------------
*[Tim Younger](bustedtubes.com)* on 2012-02-22 20:16:44  
blast, i tried to solve it concisely without needing to loop twice. this one actually works though:

```
if (arr instanceof Array) { var retArr = []; for(k in retObj) {retArr.push(retObj[k])}; return retArr; }
```
---------------------------------------
*[????? ???](http://an3m1.com/)* on 2012-04-17 15:24:05  
I have a lot to benefit from this article and thank you for this wonderful effort to this article and will continue my many articles you have other 
<a href="http://an3m1.com/">بوابة نعم</a>

---------------------------------------
*[????? ???](http://an3m1.com/)* on 2012-04-17 15:26:49  
```http://an3m1.com/('بوابة نعم');```
---------------------------------------
