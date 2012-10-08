*[duncan]()* on 2008-04-30 12:27:53  
maybe i'm being stupid, but PHP array_unique returns an array, not a boolean.
&quot;Takes an input array  and returns a new array without duplicate values.&quot;
---------------------------------------
*[Kevin van Zonneveld](http://kevin.vanzonneveld.net)* on 2008-05-02 11:34:44  
@ duncan: You were not being stupid, we were. Thank you for noticing! The fixed version will be visible shortly.
---------------------------------------
*[goshki]()* on 2008-06-13 19:45:26  
Well, there seems to be some kind of a problem with this function. Running:

```
array_unique(['a','b','c','a','b','c','a','b','c']);
```

returns:

```
['a','a','b','c']
```
---------------------------------------
*[Kevin van Zonneveld](http://kevin.vanzonneveld.net)* on 2008-06-16 00:16:50  
@ goshki: You're right, it seems that our current version doesn't support associative arrays (javascript objects). Since PHP doesn't distinct those, we need to work on a version that does support objects. It's on my todo list. Thank your for noticing!
---------------------------------------
*[sankai]()* on 2008-07-24 09:47:36  
Running:
```
array_unique(['Kevin','Kevin','van','Kevin']);
```
Return:
```
['Kevin','van','Kevin']
```
It's the same problem as @goshki ?
---------------------------------------
*[sankai]()* on 2008-07-24 10:05:47  
Hi,I try to write a code for array_unique() as the following:
```
function array_unique(array){
    var tem_arr = new Array();
    for(i=0;i&lt;array.length;i++){
        if(!in_array(array[i],tem_arr)){
            tem_arr[i]=array[i];
        }
    }
    return tem_arr.join(',').split(',');
}
```
NOTE:It's require function in_array()
---------------------------------------
*[sankai]()* on 2008-07-25 08:21:01  
the code I posted yesterday had big bug!I fixed it as the following:
```
function array_unique(array,numeric){
    // http://blog.doublekai.org/
    // +   original by: sankai (http://blog.doublekai.org/)
    // *     example 1: array_unique([1,2,3,'1','2','3',1,2,3],true);
    // *     returns 1: [1,2,3]
    // *     example 2: array_unique([1,2,3,'1','2','3',1,2,3]);
    // *     returns 2: [1,2,3,'1','2','3']
    // *     example 3: array_unique([1,'a','a','1','3',3,'b','c','b',1]);
    // *     returns 3: [1,'a','1','3',3,'b','c']
    // *     example 3: array_unique([1,'a','a','1','3',3,'b','c','b',1],true);
    // *     returns 3: [1,'a',3,'b','c']    
    // *     NOTE :require function in_array()    
    var tem_arr = new Array();
    for(i=0;i&lt;array.length;i++){
        if(numeric === true &amp;&amp; typeof(array[i]) == 'string' &amp;&amp; !isNaN(array[i])){ 
            array[i]=parseInt(array[i],10);
        }
        if(!in_array(array[i],tem_arr)){
                tem_arr[i]=array[i];
        }
    }
    return tem_arr.join(' ').replace(/\s{2,}/g,' ').split(' ');
}
```
The version need require function in_array

```
function array_unique(array,numeric){
    // http://blog.doublekai.org/
    // +   original by: sankai (http://blog.doublekai.org/)
    // *     example 1: array_unique([1,2,3,'1','2','3',1,2,3],true);
    // *     returns 1: [1,2,3]
    // *     example 2: array_unique([1,2,3,'1','2','3',1,2,3]);
    // *     returns 2: [1,2,3,'1','2','3']
    // *     example 3: array_unique([1,'a','a','1','3',3,'b','c','b',1]);
    // *     returns 3: [1,'a','1','3',3,'b','c']
    // *     example 3: array_unique([1,'a','a','1','3',3,'b','c','b',1],true);
    // *     returns 3: [1,'a',3,'b','c']    
    // *     DON'T NEED require function in_array()    
    var tem_arr = new Array();
    for(i=0;i&lt;array.length;i++){
        if(numeric === true &amp;&amp; typeof(array[i]) == 'string' &amp;&amp; !isNaN(array[i])){ 
            array[i]=parseInt(array[i],10);
        }    
        if(tem_arr.length == 0){
            tem_arr[i] = array[i];
        } else {
            var exist = false;
            for(var j=0; j&lt;tem_arr.length; j++){
                if(tem_arr[j] === array[i]){
                    exist = true;
                }
            }
            if(!exist){
                if(array[i] != null){
                    tem_arr[i] = array[i];
                }    
            }
        }
    }
    return tem_arr.join(' ').replace(/\s{2,}/g,' ').split(' ');
}
```
The version don't need require funciton in_array()
---------------------------------------
*[Kevin van Zonneveld](http://kevin.vanzonneveld.net)* on 2008-07-25 08:47:53  
@ sankai: Thank you so much! But this array_unique does not support associative arrays (javascript objects). So unlike PHP's implementation, arrays that have non-numeric keys do not work.

Sad to say that my implementation didn't support it either, but I'm looking to replace array_unique with one that does support:
```
{firstname: 'Kevin', surname: 'van Zonneveld'}
```
.. style arrays
---------------------------------------
*[Nosredna]()* on 2008-08-05 00:23:36  
Stray thought. The nested loops make me wonder how slow this is for large arrays.

Perhaps you could clone the array, sort the clone, then walk the two arrays deleting the dupes as you go. Sort is probably O(n log n) and maybe it's especially fast when no user sort evaluation routine is passed in.
---------------------------------------
*[Kevin van Zonneveld](http://kevin.vanzonneveld.net)* on 2008-08-27 17:01:44  
@ Nosredna: That's an idea that calls for a function rewrite. Interested? ;)
---------------------------------------
*[Nate]()* on 2008-11-06 15:46:01  
It looks like someone forgot to declare &quot;val&quot; with var.

I think the first line of code should read:

```
    var key = '', tmp_arr1 = {}, tmp_arr2 = {}, val;
```

Otherwise, &quot;val&quot; is a global variable, I believe.

Is there any benefit to using var in a for loop?  Would it be better to also declare &quot;fkey&quot; with &quot;strict&quot;?

Also, I don't know if this is important, but there is no space between &quot;for&quot; and &quot;if&quot; and the opening parentheses in __array_search().
---------------------------------------
*[Kevin van Zonneveld](http://kevin.vanzonneveld.net)* on 2008-11-09 13:03:39  
@ Nate: Thank you for noticing!
---------------------------------------
*[Michael Grier]()* on 2009-04-13 19:03:58  
I found out if you're using this in GreaseMonkey, objects won't return. I changed the tmp_arr declarations to array, and it started working for me.

Also, regarding the strict var, PHP always does a strict comparison after casting the arguments to strings. So you could do the following:

```
if ((haystack[fkey] + "") === (needle + "")) {
    return fkey;
}
```
---------------------------------------
*[Brett Zamir](http://bahai-library.com)* on 2009-04-14 03:23:36  
Ok, I made the strict fix, Michael, in SVN, thank you! 

However, I'm not sure about the array-to-objects issue. Although we can get an array to return, due to the nature of JS, it will only contain the numerically indexed items within the array (and the length will be the total of those only). The other items would be added as properties of that array's object, and not be counted with length, though they are iteratable. Kevin has chosen to implement PHP arrays as regular (non-array) objects, so that we can support associative arrays. Granted we could theoretically return arrays with object properties, but that might be more confusing, and perhaps is the reason he chose not to do that. 

One solution, might be to detect whether the input array was indeed a genuine array (which could only be numerically indexed), and if so, build a bona fide array as output too, but the problem with that is that the PHP behavior is to preserve keys, and we cannot preserve keys unless we build an object (or delete/cause to be undefined, those items which are no longer in use, but that still keeps the array length)--the one rare exception where we could safely return a regular array would be if all of the unique items were at the front of the array... So, not any good answers, I suspect, though I imagine you personally should be able to adapt the output of our function to the form you need for Greasemonkey... Best wishes, Brett
---------------------------------------
*[Kevin van Zonneveld](http://kevin.vanzonneveld.net)* on 2009-04-14 12:41:42  
Great work guys, I'll deploy shortly
---------------------------------------
*[nitin gupta](http://publicmind.in/blog)* on 2010-02-02 12:43:44  
Hi Kevin,

I do not see this function being dependent on asort, may be a little documentation error.

Regards,
---------------------------------------
*[Brett Zamir](http://brett-zamir.me)* on 2010-02-04 02:17:15  
@nitin gupta: Thanks--I've fixed it in Git. I think it is a relic of the fact that we noticed that we may still _need_ to sort according to the docs, but I'm a bit busy to look at fixing this now myself.
---------------------------------------
*[harald]()* on 2010-03-19 12:36:02  
hello,

may i ask:

lines 25 and 35

why are you testing for hasOwnProperty inside the loop and not outside?


---------------------------------------
*[Brett Zamir](http://brett-zamir.me)* on 2010-03-19 14:53:14  
@harald: Sorry, fixed in git: http://github.com/kvz/phpjs/raw/master/functions/array/array_unique.js . See https://developer.mozilla.org/en/Core_JavaScript_1.5_Reference/Global_Objects/Object/hasOwnProperty for an explanation of the method. It is used to make sure we are only iterating over the immediate properties of the object, and not any that may have been added on an inherited class or on the Object/Array prototype itself...
---------------------------------------
*[Brett Zamir](http://brett-zamir.me)* on 2010-03-19 14:55:36  
But to make clear, it wasn't the position that was the problem, but the lack of an argument...Dumb oversight on my part...
---------------------------------------
*[t]()* on 2010-06-08 19:50:09  
Why does this function return an object where as the php version returns an array?

Thanks
---------------------------------------
*[]()* on 2010-06-09 21:10:58  
@t: Associative arrays aren't native to JavaScript, but JavaScript objects share similarities to PHP associative arrays, so to try and support associative arrays, the functions on PHP.JS convert JavaScript arrays to JavaScript objects.
---------------------------------------
*[Dj]()* on 2011-12-27 02:12:16  
I suggest you my version which has two main features compared with your version:
First, its speed; Instead of use array_search which needs to iterate over the collection for each item of the source value, I add the new values as keys (implicity converted to strings for comparision) to a temporary object, then quickly you can check if it was added using hasOwnProperty.
Second, a second paramemeter which add the feature of returning the result as array when the source value is an array.
Note that in this case the array will be re-indexed because in js the keys of the arrays are numeric and needs to be continued.
```
function array_unique(inputArr, preserveArray) {
	var key = '',
		val = '',
		hashT = {},
		result;

	if (preserveArray && (inputArr instanceof Array)) {
		result = [];
		var length = inputArr && inputArr.length >> 0;
		
		for (key = 0; key < length; ++key) {
			val = inputArr[key];
			if (!hashT.hasOwnProperty(val)) {
				result.push(val);
				hashT[val] = true;
			}
		}
		
	} else {
		result = {};
		if (!inputArr) {
			return result;
		}
		for (key in inputArr) {
			val = inputArr[key];
			if (!hashT.hasOwnProperty(val)) {
				result[key] = val;
				hashT[val] = true;
			}
		}
	}
	return result;
}
```
---------------------------------------
