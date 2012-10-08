*[Legaev Andrey]()* on 2008-01-08 16:28:53  
include_once() function:

```
function include_once( filename ) {
	if (!window.php_js)	window.php_js = {};
	if (!window.php_js.includes)	window.php_js.includes = {};
	
	if (!window.php_js.includes[filename]) {
		window.php_js.includes[filename] = 1;
		include_once( filename );
	}
}
```

And small modification to include():
```
function include( filename ) {
    // http://kevin.vanzonneveld.net
    // +   original by: mdsjack (http://www.mdsjack.bo.it)
 
    var js = document.createElement('script');
    js.setAttribute('type', 'text/javascript');
    js.setAttribute('src', filename);
    js.setAttribute('defer', 'defer');
    document.getElementsByTagName('HEAD')[0].appendChild(js);
	
	if (!window.php_js)	window.php_js = {};
	if (!window.php_js.includes)	window.php_js.includes = {};
	
	if (!window.php_js.includes[filename]) 
		window.php_js.includes[filename] = 1;
	else
		window.php_js.includes[filename]++;
}
```
---------------------------------------
*[Kevin van Zonneveld](http://kevin.vanzonneveld.net)* on 2008-01-08 17:24:49  
@ Legaev Andrey: Wow great contributions again!

At first I wanted every function to be standalone, but thinking about all the redundant code we would then get, I finally decided to add a: &quot;- depends on: include&quot; comment to include_once. I think we should stick to that approach.

Thanks!
---------------------------------------
*[mark forster]()* on 2008-03-16 11:12:25  
Why not check out owl import at http://code.google.com/p/owlimport/. an alternative method of importing javascript files
---------------------------------------
*[Kevin van Zonneveld](http://kevin.vanzonneveld.net)* on 2008-03-16 12:49:52  
@ mark forster: The site's explanation isn't too elaborate, but I think I understand the idea. It's just like Java imports, right? I can imagine it being useful for many purposes, but I don't see how we would implement it in this project for two reasons:
- it requires jQuery (an additional 15kB) for only 1 functionality that
- resembles Java, not php
---------------------------------------
