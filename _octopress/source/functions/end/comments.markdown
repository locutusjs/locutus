*[Legaev Andrey]()* on 2008-01-09 17:09:00  
Did you mean &quot;return last_elm&quot; ?
---------------------------------------
*[Kevin van Zonneveld](http://kevin.vanzonneveld.net)* on 2008-01-09 17:27:39  
@ Legaev Andrey: I sure did ;)
---------------------------------------
*[J A R]()* on 2008-06-15 04:15:18  
Doesn't .pop() return the last element from an array?
```
function end ( array ) {
    return array.pop();
}
```
---------------------------------------
*[Kevin van Zonneveld](http://kevin.vanzonneveld.net)* on 2008-06-16 00:21:26  
@ J A R: Much better, thank you!
---------------------------------------
*[Itsacon]()* on 2010-01-21 16:09:39  
The current version fails hard in Internet Explorer (both versions 7 and 8)

indexOf() is a method of the String object, not of the Array object, so calling it on pointers (an Array()) isn't valid javascript code.

I've reverted to the older version, which was less convoluted and worked fine:
```function end(array)
{
	var last_elm,key;
	if(array.constructor==Array)
	{
		last_elm=array[(array.length-1)];
	}
	else
	{
		for(key in array)
		{
			last_elm=array[key];
		}
	}
	return last_elm;
}```
---------------------------------------
*[Brett Zamir](http://brett-zamir.me)* on 2010-01-22 02:44:43  
@Itsacon, Thanks...The fix had already been applied a while ago (indexOf is supported in Firefox, etc., so that was the reason for the mistake). Anyhow, you can see the current version if you click "raw js source". Btw, the reason for the rest of the "convoluted" code is to support tracking of the array "pointer" (as in PHP). end() moves the pointer to the end. We use the "this.php_js" global (or object property in the namespaced version) to hold this information. See next(), prev(), etc. for some other functions which keep track of the array's pointer.

@Kevin, what will it take to get the site to update to reflect the latest git updates? It seems this fix was made a month ago...Thanks...
---------------------------------------
*[Itsacon]()* on 2010-01-22 09:39:34  
Ah, much better.

Strange, the problem cropped up when I updated my php.js, so maybe the version in the lib-build-tool is also still using the older one.

Thanks for the quick response (and the explanation)
---------------------------------------
*[????? ???????](http://an3m1.com/)* on 2012-04-11 15:46:10  
If I might —perhaps you should consider adding a few images. I don’t mean to disrespect what you’ve said ; its very enlightening, indeed. However, I think would respond to it more positively if they could be something tangible to your ideas 
---------------------------------------
