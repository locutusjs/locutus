*[Adam]()* on 2008-05-12 20:28:33  
```
 var found = false, key, strict = !!strict;
```

why are you defining strict to be NOT NOT strict ?
---------------------------------------
*[Kevin van Zonneveld](http://kevin.vanzonneveld.net)* on 2008-05-12 22:51:47  
@ Adam: If I'm not mistaken this forces strict to be boolean. A single exclamation mark would indeed reverse it's meaning.
---------------------------------------
*[peter]()* on 2008-06-17 15:55:02  
```
function in_array(value, arr)
{
var key;
for (key in arr)
	{
        if (arr[key] === value)
		{return value; }
        }
return null; //false
}
```
---------------------------------------
*[Kevin van Zonneveld](http://kevin.vanzonneveld.net)* on 2008-06-18 17:26:29  
@ peter: Thank you but according to the PHP manual in_array should return a boolean value. Also, your version doesn't support the optional strict argument, so in it's current form I'm not convinced I should replace our version with yours.
---------------------------------------
*[Java Dude]()* on 2009-02-12 22:14:22  
Has this function been tested on Google Chrome?

I am receiving a: Uncaught TypError when using it but on in Google Chrome.
---------------------------------------
*[Kevin van Zonneveld](http://kevin.vanzonneveld.net)* on 2009-02-15 15:42:54  
@ Java Dude: No but it has been tested (successfully) in Rhino and I believe Google based their js engine on that. 
Do you have more information (maybe a line number or something) for us to go on? Thanks in advance!
---------------------------------------
*[Vladimir Houba]()* on 2009-04-05 13:39:05  
function's preformance can be improoved by following
```
01.function in_array(needle, haystack, argStrict) {
02.    // Checks if the given value exists in the array 
03.    //
04.    // version: 903.1614
05.    // discuss at: http://phpjs.org/functions/in_array
06.    // +   original by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)
07.    // *     example 1: in_array('van', ['Kevin', 'van', 'Zonneveld']);
08.    // *     returns 1: true
09.    var found = false, key, strict = !!argStrict;
10. 
11.    for (key in haystack) {
12.        if ((strict && haystack[key] === needle) || (!strict && haystack[key] == needle)) {
13.            found = true;
14.            break;
15.        }
16.    }
 
    return found;
}
```
---------------------------------------
*[Brett Zamir]()* on 2009-04-05 15:04:05  
@Vladimir, it looks like you posted the same code as we currently have... One very small optimization I do see is "return true" and "return false" instead of found=true, etc. If your optimization was using indexOf, be aware that PHP.JS considers objects to be arrays, so we need to handle them as well...
---------------------------------------
*[vlado houba]()* on 2009-05-31 12:46:33  
sorry for posting that same content by mistake...

maybee it seems to be an unimporatnt change but i was working on a text analyzing script where things like this one matters a lot

for fast searching in small arrays i recommend using the value (string or number) as an index (for sure just for short values..), it much cuts the access times and can be used for advanced structures

```
function in_array(needle, haystack, argStrict)
{
	var found = new Boolean(false);
	var key;
	var strict = new Boolean(argStrict);
	if(strict)
	{
		for (key in haystack)
		{
			if (haystack[key] === needle)
			{
				found = true;
				break;
			}
		}
	}
	else
	{
		for (key in haystack)
		{
			if (haystack[key] == needle)
			{
				found = true;
				break;
			}
		}
	}
	return found;
}
```

---------------------------------------
*[Kevin van Zonneveld](http://kevin.vanzonneveld.net)* on 2009-05-31 20:27:49  
@ vlado houba: Yes using hash tables is really fast. Obviously we don't control our user's data. But we can make an effort to make in_array as fast as reasonably possible, and I see your optimization is not to check for strict every iteration, but check for it once, and use duplicated loops to do further processing.

Though I'm a big fan of DRY, this really makes sense to me and justifies exception so I will implement your proposal. Thanks for sharing!
---------------------------------------
*[Drydenmaker]()* on 2009-09-22 18:17:21  
what if you flattened the non-strict side to a string and used a string search to avoid the loop.  Something like:

```

in_array: function (needle, haystack, argStrict) {
            
            var key = '', strict = !!argStrict;
        
            if (strict) {
                for (key in haystack) {
                    if (haystack[key] === needle) {
                        return true;
                    }
                }
            } else {
				if (this.is_string(needle)) {
					str = haystack.toString();
					return (str.search(needle) !== false)
				}
				
                for (key in haystack) {
                    if (haystack[key] == needle) {
                        return true;
                    }
                }
            }
        
            return false;
        }

```
---------------------------------------
*[Kevin van Zonneveld](http://kevin.vanzonneveld.net)* on 2009-10-08 20:59:44  
@ Drydenmaker: Good point. Didn't bench it but obviously an internal function would be faster than anything we can hack.

However your implementation relies on this.is_string which is not a php.js feature. 
I replaced it with (typeof(needle)=='string') but it seems that also the second test case (where we don't want to find 'vlado') fails.
So it needs a little bit of work still.
---------------------------------------
*[Billy]()* on 2009-10-17 23:38:26  
Is it just me or does in_array("whatever", ["notit"]) return true... 

This function is majorly broken. Strings arguments always return true, even if the array is empty! 
---------------------------------------
*[Theriault]()* on 2009-10-18 06:49:30  
I believe the  solution to the bug Billy found is that the native JavaScript String.prototype.search returns -1 if the needle is not found, not false like in PHP, what this function expects.

Also, turning an array into a string and searching for the needle, while faster, will be incorrect in many situations, such as searching for 'he' against ['the'] will return true, even though 'he' is not in the array.
---------------------------------------
*[Brett Zamir](http://brett-zamir.me)* on 2009-10-18 07:03:04  
@billy: Thanks, fixed now in git: http://github.com/kvz/phpjs/commit/e37089b71ed1d32d1b4b4567c70a684c9d0e16f5

Sorry Drydenmaker and Kevin, it was a noble attempt, but search should be checked against -1, and even if that were corrected, there would still be problems as your version would make in_array('needle', ['needles']) return true.
---------------------------------------
*[Jordi]()* on 2009-11-26 11:06:18  
Shorter:

	```
	function in_array (needle, haystack, argStrict) 
    {
		var key = '', strict = !!argStrict;

		if (strict)
			for (key in haystack)
				if ( (strict && haystack[key] === needle) ) || ( !strict && strict && haystack[key] == needle )
					return true;

		return false;
	}
    ```

---------------------------------------
*[Jordi]()* on 2009-11-26 14:22:36  
Of course that had to be:

```
function in_array (needle, haystack, argStrict) 
{
    var key = '', strict = !!argStrict;

    if (strict)
        for (key in haystack)
            if ( (strict && haystack[key] === needle) || ( !strict && strict && haystack[key] == needle ) )
                return true;

    return false;
}
```

---------------------------------------
*[Brett Zamir](http://brett-zamir.me)* on 2009-11-27 04:11:34  
@Jordi: Thanks for the submission. Kevin commented on this earlier that although he supports DRY (Don't Repeat Yourself), it is faster in this case to be longer, since with the way we have it now, there is only need to check the "strict" argument once. So, we will stick with the way it is. 

Btw, if you are using your version, you should drop the first "if" since it prevents dealing with non-strict cases.

Thanks again!
---------------------------------------
*[luigifab]()* on 2011-01-05 12:03:27  
Here a recursive function.
But, there is a problem with IE without the !isNaN(key).

```
function in_array(needle, haystack) {

	if ((needle === null) || (haystack === null))
		return false;

	var key = null;

	if (needle instanceof Array) {
		for (key in needle) if (needle.hasOwnProperty(key)) {
			if (in_array(needle[key], haystack))
				return true;
		}
	}
	else {
		for (key in haystack) if (haystack.hasOwnProperty(key)) {
			if (!isNaN(key) && (haystack[key] === needle))
				return true;
		}
	}

	return false;
}
```
---------------------------------------
*[Brett Zamir](http://brett-zamir.me)* on 2011-01-05 13:33:26  
@luigifab: What problem are you referring to? Why would the key need to be a number? (php.js treats objects as associative arrays) What is the relation to IE?
---------------------------------------
*[luigifab]()* on 2011-01-29 17:31:08  
@Brett Zamir : There is a problem with array in IE if you use my function in_array without the !isNaN(key). That's it.
---------------------------------------
*[callumacrae](http://lynxphp.com/)* on 2011-05-17 14:26:01  
This might just be me being stupid, but:

https://developer.mozilla.org/en/JavaScript/Reference/Global_Objects/Array/indexOf

Why not just force that to be boolean?
---------------------------------------
*[Theriault]()* on 2011-05-17 21:02:25  
@callumacrae: The indexOf method on the Array object is not supported by Internet Explorer. Also, the PHP JS function can handle Object.
---------------------------------------
*[Mahbubur Rahman](www.mahbubblog.com)* on 2011-08-15 23:34:43  
People who are using jQuery in their project can use $.inArray which gives returns 1 when match is found and -1 when not found. 
---------------------------------------
*[Abro - Lucido Media GbR](http://lucido-media.de/)* on 2012-07-15 21:11:27  
Please consider using indexOf() [ see https://developer.mozilla.org/en/JavaScript/Reference/Global_Objects/Array/indexOf ] if available.
---------------------------------------
