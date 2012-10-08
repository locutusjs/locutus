*[Post cannot have an empty name]()* on 2008-04-07 06:41:09  
```
function array_shift(array)
{
    element = array[0];
    array.shift(array);
    return element;
}
```
---------------------------------------
*[Kevin van Zonneveld](http://kevin.vanzonneveld.net)* on 2008-04-07 11:30:29  
@ Post cannot have an empty name: I agree that this function could probably be trimmed down a bit, but your version does not support  associative arrays, so for now I'm going to have to stick with the current version. Do you agree? Thanks for your input, and if you have a different opinion or code, let me know!
---------------------------------------
*[Buzz]()* on 2008-05-21 17:13:47  
array_shift(['Kevin', 'van', 'Zonneveld']);
should return 
array('van','Zonneveld');
3178
---------------------------------------
*[Kevin van Zonneveld](http://kevin.vanzonneveld.net)* on 2008-05-21 18:47:51  
@ Buzz: I do not agree. The original array is changed by reference. But the function should return what has been removed: the value of the first element.
---------------------------------------
*[Martijn Wieringa]()* on 2008-05-30 13:07:13  
It turns out that 'shift' and 'unshift' functions are  supported by JS itself (tested in IE 6 and FF 2)

```
function array_shift(f_array)
{
	if(f_array.length > 0)
	{
		return f_array.shift();
	}
 
	return null;
}

function array_unshift(f_array)
{
	for(var i = 1; i < array_unshift.arguments.length; i++)
	{
		f_array.unshift(array_unshift.arguments[i]);
	}

	return (array_unshift.arguments.length - 1);
}```
---------------------------------------
*[Kevin van Zonneveld](http://kevin.vanzonneveld.net)* on 2008-05-31 14:45:30  
@ Martijn Wieringa: Nice! Thanks for taking the time to test it and write wrappers as well!
---------------------------------------
