*[Itsacon](http://www.itsacon.net/)* on 2009-10-09 13:32:59  
This is a follow-up on the discussion at the array_diff() function.

The implode function is currently incompatible with most of the array_xxx() functions. Those functions often return objects instead of Arrays, but the implode() function actively checks for Arrays, and returns objects un-imploded.

I made a slight alteration, parsing all object properties as well.

```function implode(glue,pieces)
{
	if(arguments.length == 1)
	{
		pieces = glue;
		glue = '';
	}
	if(typeof(pieces)=='object')
	{
		if(pieces instanceof Array)
			return pieces.join(glue);
		else
		{
			retVal='', tGlue='';
			for(i in pieces)
			{
				retVal += tGlue + pieces[i];
				tGlue = glue;
			}
			return retVal;
		}
	}
	else
	{
		return pieces;
	}
}```

I also made the function compatible with the PHP 4.3.0 alteration that made the glue parameter optional.
---------------------------------------
*[Brett Zamir](http://brett-zamir.me)* on 2009-10-12 22:43:58  
@Itsacon: Thanks very much! There may be a few other functions out there like that that only work with true arrays, so it is very good to have your fix. FYI, I declared retVal, tGlue, and i with 'var' so they would not be globals. It is now fixed in git: http://github.com/kvz/phpjs/commit/e00889a7914df1e91640b7222d56eee30c20ec97
---------------------------------------
*[Kevin van Zonneveld](http://kevin.vanzonneveld.net)* on 2009-10-25 13:29:50  
@ Itsacon: Excellent!
---------------------------------------
*[Krrish](http://itech.hubpages.com)* on 2011-09-13 12:21:15  
Excellent Work... 
Well, I already developed one web 2.0 application (For Personal Use)... But Still having problems in mastering JavaScript (Especially JavaScript arrays)...
Bookmarked it for future reference.
Thanks
---------------------------------------
*[Brett Zamir](http://brett-zamir.me)* on 2011-09-14 10:56:36  
Glad you find the site helpful, Krrish. I recommend reading JavaScript: The Definitive Guide and JavaScript: The Good Parts.
---------------------------------------
*[ionut](http://ionutpopa.tumblr.com)* on 2011-09-19 11:12:14  
Hi,
Why do you declare ```tGlue = glue;``` in the loop each time?
---------------------------------------
*[Brett Zamir](http://brett-zamir.me)* on 2011-09-19 20:42:23  
@ionut: It ensures that the first time in the loop it will use an empty string, but use the glue for subsequent loops.
---------------------------------------
*[Marek Spak](http://www.sanderundspak.de)* on 2012-08-01 11:35:06  
or you could just use join on the array. like this

```
['hello','world','!!!'].join(' ') //return "hello world !!!"
```

or am i missing something?
---------------------------------------
*[Brett Zamir](http://brett-zamir.me)* on 2012-09-18 17:29:30  
@Marek Spak: That's basically what we're doing, with a little extra to cover the PHP API more exactly. See the Wiki/FAQ for project goals.
---------------------------------------
