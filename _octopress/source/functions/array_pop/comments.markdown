*[delete key in array (not available in php!)]()* on 2008-05-27 16:22:45  
The code beneath deletes the instance with key &quot;todelete&quot; in an array, in any position in the array(!). Even PHP doesn't have an function to accomplish this.

Alex Pot
Zinrijk Webtechniek
http://www.zinrijk.nl/webapplicaties
Haarlem, the Netherlands

```function array_deletekey( mixed_var, todelete) {
	last=mixed_var.length;
	narr=new Array();
	correction=0;

	for (x=0;x&lt;last;x++)
	{
		if(mixed_var[x]!=todelete)narr[x-correction]=mixed_var[x];
		else correction++;
	}

	mixed_var=narr;
	return mixed_var;
}```
---------------------------------------
*[Kevin van Zonneveld](http://kevin.vanzonneveld.net)* on 2008-05-31 12:38:39  
@ delete key in array: I'm not sure array_deletekey is a valid PHP functions ;) But in PHP, why don't you use unset() ?
---------------------------------------
*[Brett Zamir](http://bahai-library.com)* on 2009-02-02 11:46:49  
The harder part of fixing these functions goes beyond making them work with arrays and objects; if you really want them to be faithful to PHP, they need to force numerical indexes to start over at 0 (e.g., if you have an object which has numerical indexes starting at 5 or skipping around, etc.) as soon as these functions are used. I think we can use an inner function I developed for array_splice() to help with that.
---------------------------------------
*[Kevin van Zonneveld](http://kevin.vanzonneveld.net)* on 2009-02-02 23:33:48  
@ Brett Zamir: I missed that, I'll look into it.
---------------------------------------
*[aleczapka]()* on 2010-08-02 00:32:01  
I don't get it.. what's wrong with native javascript function

array.pop() ?


---------------------------------------
*[faq]()* on 2010-08-02 00:39:49  
@aleczapka:
please read the first entry in the FAQ ( http://wiki.github.com/kvz/phpjs/faq )
---------------------------------------
