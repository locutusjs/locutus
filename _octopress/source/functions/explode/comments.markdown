*[kenneth]()* on 2008-02-01 06:40:58  
This function is wrong. Params are reversed, and return values are not what they would be in PHP.

The &quot;description&quot; above is actually correct, but both the actual source code given and the example given have the params reversed.

As for return values....I might as well just right it out at this point:

```function explode( /* delimiter, string */ ) {

	var emptyArray = { 0: '' };
	
	if ( arguments.length != 2 
			|| typeof arguments[0] == 'undefined'
			|| typeof arguments[1] == 'undefined' ) 
	{
		return null;  
	}
					
	var delimiter = arguments[0];
	var string = arguments[1];	 
	
	if ( delimiter === '' 
			|| delimiter === false 
			|| delimiter === null )
	{
		return false;	
	}
	
	if ( typeof delimiter == 'function' 
			|| typeof delimiter == 'object' 
			|| typeof string == 'function' 
			|| typeof string == 'object' )
	{
		return emptyArray;
	}				
		
	if ( delimiter === true ) {
		delimiter = '1';	
	}
  
	return string.toString().split ( delimiter.toString() );	

}```
---------------------------------------
*[Kevin van Zonneveld](http://kevin.vanzonneveld.net)* on 2008-02-01 07:57:52  
@ kenneth: That was pretty ugly indeed, thanks for contributing, I've updated the source and added your name.
---------------------------------------
*[u24]()* on 2008-02-06 11:00:20  
great project.

this one doesn't replicate the optional third $limit parameter which php has though. If I get a spare second I'll add another comment with amended code.
---------------------------------------
*[d3x]()* on 2008-05-17 09:40:35  
Same function with the limit attribute:

```
function explode( delimiter, string, limit ) {
	// http://kevin.vanzonneveld.net
	// +   original by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)
	// +   improved by: kenneth
	// +   improved by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)
	// *	 example 1: explode(' ', 'Kevin van Zonneveld');
	// *	 returns 1: {0: 'Kevin', 1: 'van', 2: 'Zonneveld'}
	// +   further improved by: d3x
	// *     example 1: explode('=', 'a=bc=d', 2);
	// *     returns : ['a', 'bc=d']
 
	var emptyArray = { 0: '' };
 
	if ( arguments.length != 3
		|| typeof arguments[0] == 'undefined'
		|| typeof arguments[1] == 'undefined'
		|| typeof arguments[2] == 'undefined' )
	{
		return null;
	}
 
	if ( delimiter === ''
		|| delimiter === false
		|| delimiter === null )
	{
		return false;
	}
 
	if ( typeof delimiter == 'function'
		|| typeof delimiter == 'object'
		|| typeof string == 'function'
		|| typeof string == 'object' )
	{
		return emptyArray;
	}
 
	if ( delimiter === true ) {
		delimiter = '1';
	}
	if(!limit){
 		return string.toString().split ( delimiter.toString() );
	} else {
		var splitted = string.toString().split(delimiter.toString());
		var partA = splitted.splice(0, limit - 1);
		var partB = splitted.join(delimiter.toString());
		partA.push(partB);
		return partA;
	}
}
```
---------------------------------------
*[Kevin van Zonneveld](http://kevin.vanzonneveld.net)* on 2008-05-17 15:16:24  
@ d3x: Thanks! I've updated the function. I changed the 
```
arguments.length != 3
```
part, for it to allow 2 arguments. Other than that, great contribution!!
---------------------------------------
*[valulgi](www.valugi.ro)* on 2008-12-08 13:49:34  
why not use the split function from js?
---------------------------------------
*[Onno Marsman]()* on 2008-12-09 18:25:49  
@valulgi: You'll need to look a bit closer. This function is really built around the split function from js.
---------------------------------------
*[nowotny]()* on 2010-02-14 17:05:13  
PHP explode function allows you to split by a string, not only one character, which this JS function does not allow... 

---------------------------------------
*[Brett Zamir](http://brett-zamir.me)* on 2010-02-15 07:00:28  
It's working for me... 

```explode('-+-', 'abc-+-def-+-ghi') // abc,def,ghi```

What are you trying to do that's different?
---------------------------------------
*[IVI-R3za.M](www.webmehr.com)* on 2010-02-27 07:35:43  
its so great! thanks
---------------------------------------
*[a]()* on 2010-06-14 16:08:09  
ser
---------------------------------------
*[raj ](www.prova.com)* on 2011-03-07 06:52:47  
ghghggh
---------------------------------------
*[Ghabriel Nunes]()* on 2012-02-12 20:51:47  
I found some errors in the function above.
The above function does not handle negative limits, and, according to the PHP documentation, if limit is 0, it's treated as 1. The above function treats limit as "not set" if it's 0, which is wrong. Also, if the limit is bigger than the split length, it adds white spaces to the array, which is also wrong. I re-created this function, fixing all the mistakes  I found:

Note: sorry for any english mistakes, english is not my first language.

```
function explode( delimiter, string, limit ){
	if ( arguments.length < 2 || typeof delimiter == 'undefined' || typeof string == 'undefined' ) return null;
	if ( delimiter === '' || delimiter === false || delimiter === null) return false;
	if ( typeof delimiter == 'function' || typeof delimiter == 'object' || typeof string == 'function' || typeof string == 'object'){
		return { 0: '' };
	}
	if ( delimiter === true ) delimiter = '1';
	
	// Here we go...
	delimiter += '';
	string += '';
	
	var s = string.split( delimiter );
	

	if ( typeof limit === 'undefined' ) return s;
	
	// Support for limit
	if ( limit === 0 ) limit = 1;
	
	// Positive limit
	if ( limit > 0 ){
		if ( limit >= s.length ) return s;
		return s.slice( 0, limit - 1 ).concat( [ s.slice( limit - 1 ).join( delimiter ) ] );
	}

	// Negative limit
	if ( -limit >= s.length ) return [];
	
	s.splice( s.length + limit );
	return s;
}
```
---------------------------------------
