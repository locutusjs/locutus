*[d3x]()* on 2008-05-17 16:12:15  
Javascript equivalent for the PHP array():

```
function array(){
return Array.prototype.slice.call(arguments);
}
```
---------------------------------------
*[Kevin van Zonneveld](http://kevin.vanzonneveld.net)* on 2008-05-17 16:41:00  
@ d3x: Awesome!!!! Added.
---------------------------------------
*[Scot Diddle](www.webtdo.com)* on 2009-01-08 16:44:09  
Hi,

I am building a PHP/JS page to call, process, and display the results of eache php.js function.

I'm not sure why I am getting back '[object object]' for array_change_key_case();

```
		
	/**
	 * 
	 *  array_change_key_case()
	 * 
	 */
	
	  $integer = 42;
	  
	 $simpleArray = '[ 3, 5 ]';
	 
	 $associativeArrray = "{ FuBaR: 42, Dry: 'Do not repeat repeat yourself' } ";
	 
	 $associativeArrrayForDisplay = "{ FuBaR: 42, Dry: \'Do not repeat repeat yourself\' } ";
```

 ```

		var answer = confirm("Show: array_change_key_case() ?");

		if (answer) {
			
			var array_change_key_case_query = array_change_key_case(<?php echo $integer ?>);   
			alert('array(<?php echo $integer; ?>)  : ' + array_change_key_case_query);
			
			var array_change_key_case_query = array_change_key_case(<?php echo $simpleArray ?>);   
			alert('array(<?php echo $simpleArray; ?>)  : ' + array_change_key_case_query);
						
			var array_change_key_case_query = array_change_key_case(<?php echo $associativeArrray ?>);   
			
			for (a in array_change_key_case_query) {
			
				alert('array(<?php echo $associativeArrrayForDisplay; ?>)  : ' + a);
				
			}

		}

```

The "For (a in Oject) returns the Index in lower case, but where did the value(s) associated with the new lowercase index go... How do you use the output from this function. ?

Thanks, Scot L. Diddle
---------------------------------------
*[Kevin van Zonneveld](http://kevin.vanzonneveld.net)* on 2009-01-08 17:11:02  
@ Scot Diddle: Our testsuite does not produce any unexpected results with the example-based test-cases. Currently it is not clear to me what statement exactly fails.

If the question is just how to get a value from an object-element:
```
for (a in array_change_key_case_query) {
    // a is the key
    val = array_change_key_case_query[a];
    // val is now the value of the element with key: a
}
```
---------------------------------------
*[Kevin van Zonneveld](http://kevin.vanzonneveld.net)* on 2009-01-08 17:16:13  
@ Scot Diddle: PS, may I ask to what purpose you are building this page? If it is for testing purposes you may want to look into our testsuite which runs from commandline (mac &amp; linux).
---------------------------------------
