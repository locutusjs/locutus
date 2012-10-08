*[Ash Searle]()* on 2008-01-07 11:28:58  
I've fixed a couple of bugs in your current implementation: suffix should be optional, and basename should work for partial paths (e.g. basename(&quot;foo.txt&quot; &quot;.txt&quot;) should return &quot;foo&quot;)

```
function basename(path, suffix) {
    var b = path.replace(/^.*[/\\]/g, '');
    if (typeof(suffix) == 'string' &amp;&amp; b.substr(-suffix.length) == suffix) {
        b = b.substr(0, b.length-suffix.length);
    }
    return b;
}
```
---------------------------------------
*[Kevin van Zonneveld](http://kevin.vanzonneveld.net)* on 2008-01-07 11:39:33  
@ Ash Searle: Good point, I've updated the function. Thanks for contributing!
---------------------------------------
*[Leslie Hoare]()* on 2008-01-13 00:43:14  
```
function rand(min, max) {
    if(max) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    } else {
        return Math.floor(Math.random() * (min + 1));
    }
}
```
---------------------------------------
*[Kevin van Zonneveld](http://kevin.vanzonneveld.net)* on 2008-01-13 12:45:10  
@ Leslie Hoare: Added. Thanks a lot!
---------------------------------------
*[Lincoln Ramsay]()* on 2008-01-15 05:03:27  
The regular expression is not ECMAScript-262 compliant.
It should be:

```
var b = path.replace(/^.*[\/\\]/g, '');
```

ECMAScript does not allow / to appear anywhere in a regular expression literal unless it is escaped by the \ character.
---------------------------------------
*[Kevin van Zonneveld](http://kevin.vanzonneveld.net)* on 2008-01-15 08:15:04  
@ Lincoln Ramsay: Thank you so much! The function has been updated.
---------------------------------------
*[djmix]()* on 2008-03-03 14:38:39  
```
b.substr(-suffix.length)
``` doesn't work in ie because him doesn't allow negative values as start index.
To solve that the solution is:

```b.substr(b.length-suffix.length)```

Fixed Function:
```
function basename(path, suffix) {
    // http://kevin.vanzonneveld.net
    // +   original by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)
    // +   improved by: Ash Searle (http://hexmen.com/blog/)
    // +   improved by: Lincoln Ramsay
    // *     example 1: basename('/www/site/home.htm', '.htm');
    // *     returns 1: 'home'
 
    var b = path.replace(/^.*[\/\\]/g, '');
    if (typeof(suffix) == 'string' &amp;&amp; b.substr(-suffix.length) == suffix) {
        b = b.substr(0, b.length-suffix.length);
    }
    return b;
}```
---------------------------------------
*[djmix]()* on 2008-03-03 14:41:08  
```
b.substr(-suffix.length)```
doesn't work in ie because him doesn't allow negative values as start index. To solve that the solution is: ```
b.substr(b.length-suffix.length)```
Fixed Function (Sorry, now yes): ```
function basename(path, suffix) {
    // http://kevin.vanzonneveld.net
    // +   original by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)
    // +   improved by: Ash Searle (http://hexmen.com/blog/)
    // +   improved by: Lincoln Ramsay
    // *     example 1: basename('/www/site/home.htm', '.htm');
    // *     returns 1: 'home'
 
    var b = path.replace(/^.*[\/\\]/g, '');
    if (typeof(suffix) == 'string' &amp;&amp; b.substr(b.length-suffix.length) == suffix) {
        b = b.substr(0, b.length-suffix.length);
    }
    return b;
}```
---------------------------------------
*[Kevin van Zonneveld](http://kevin.vanzonneveld.net)* on 2008-03-03 17:02:40  
@ djmix: Thanks a lot djmix!! Updated!
---------------------------------------
*[Nate]()* on 2009-01-05 00:11:10  
Hi.  I created a pathinfo() function.

```
function pathinfo(path, options)
{
	var re = /(([^\\/]*?)(?:\.([^.]*))?)$/;
	var re2 = /(.*)[\\/]/;
	
	var path_arr = re.exec(path);
	var dir_arr = re2.exec(path);
	
	// To be PHP compatible, no directory becomes &quot;.&quot;
	if (dir_arr == null || dir_arr == &quot;&quot;) dir_arr = [&quot;&quot;,&quot;.&quot;];
	
	var path_obj = {dirname:dir_arr[1],basename:path_arr[0],extension:path_arr[3],filename:path_arr[2]};
	
	if (typeof options == &quot;undefined&quot;) {
		if (path_obj.extension == &quot;&quot; &amp;&amp; path_obj.filename.slice(-1) != &quot;.&quot;) {
			// To be PHP compatible, if there is no dot (.) in the name, the extension value is not set.
			delete path_obj.extension;
		}
		return path_obj;
	} else {
		switch (options) {
			case &quot;PATHINFO_DIRNAME&quot;: return path_obj.dirname;
			case &quot;PATHINFO_BASENAME&quot;: return path_obj.basename;
			case &quot;PATHINFO_EXTENSION&quot;: return path_obj.extension;
			case &quot;PATHINFO_FILENAME&quot;: return path_obj.filename;
		}
	}
}
```

example 1: pathinfo(&quot;/www/htdocs/index.html&quot;);
returns 1: {dirname:&quot;/www/htdocs&quot;,basename:&quot;index.html&quot;,extension:&quot;html&quot;,filename:&quot;index&quot;}
---------------------------------------
*[Kevin van Zonneveld](http://kevin.vanzonneveld.net)* on 2009-01-06 16:34:39  
@ Nate: Thanks a lot Nate! I did struggle to get the regexes to work though (syntax issues). I finally felt like taking a completely different approach (I hope you don't mind man), and by means of an experiment, I took a look at the original php5 C code and tried to recreate it from there.
Of course I kept the credit for your original intact!
---------------------------------------
*[Albert Martin](http://www.albertmartin.de)* on 2009-07-18 09:05:41  
I needed also to remove the extension, no matter what filetype it is. So if you set suffix==true, it removes any, not the one specified:
```
function basename(path, suffix) {
    //...
    var b = path.replace(/^.*[\/\\]/g, '');
    if (typeof(suffix) == 'string' && b.substr(b.length-suffix.length) == suffix) {
        b = b.substr(0, b.length-suffix.length);
    } else if (suffix == true && b.indexOf('.') != -1) {
		b = b.substr(0, b.lastIndexOf('.'));
	}
    return b;
}
```
---------------------------------------
*[Brett Zamir](http://brett-zamir.me)* on 2009-07-19 01:46:27  
@Albert Martin, Thanks for offering. Although we only intend to use functions in the library which adhere to PHP behavior (unless it seems to warrant a configuration which can be changed with ini_set()), you might consider adding your function to http://phpjs.org/wiki . Kevin, it looks like by your removing the specific license, Mediawiki has defaulted to GNU Free Documentation License for the wiki. Do you recall if there was a way to configure it otherwise?
---------------------------------------
*[Kevin van Zonneveld](http://kevin.vanzonneveld.net)* on 2009-07-24 12:04:09  
@ Brett Zamir: I manually changed the license now. It's the same as PHP.JS'. Will this license work for content as well as code you think?
---------------------------------------
*[Brett Zamir](http://brett-zamir.me)* on 2009-07-29 03:14:56  
@Kevin: Sweet! Thanks for handling that! Yes, I think it should work just fine for content... Btw, while there's no harm in it, we don't strictly need to "dual license" since the MIT license is compatible with GPL (though not vice versa)--you can just use MIT and it will work for GPL users, though I guess maybe it avoids GPL users having to copy-and-paste the MIT clause info...
---------------------------------------
*[Pedro]()* on 2009-09-21 00:33:52  
Hello there.

I would like to report that basename should stripdown what's in front of the ?. By applying basename to a url like this:
ecra.php?p=1

It should return "ecra.php" only.
I've tested the following way:

```
var path = window.location.href;
console.log(basename(path)); 
```

Please note:
With window.location.pathname this issue does not apply.
---------------------------------------
*[Kevin van Zonneveld](http://kevin.vanzonneveld.net)* on 2009-10-08 14:43:28  
@ Pedro: Actually, this is expected behavior. If you try this in PHP it will also return ecra.php?p=1

This may not make a whole lot of sense from the browser point-of-view; but we also have to consider other JavaScript platforms like V8, rhino, and stuff built on that like node.js

This is the one of the reasons we chose to always stick with PHP's implementation. At least developers know what to expect; and in theory you should be able to run PHP code in PHP.JS without worrying about different implementations & stuff blowing up in your face.

So I'm sorry to say Pedro, you're going to have to parse this like you'd otherwise have to in PHP as well.
---------------------------------------
*[Dj]()* on 2011-07-26 19:02:02  
Note that when the input ends with one or more slashes, PHP ignores them and returns the word before them.
'///b///' result is 'b'
'///\\//' result is '' (an empty string)

To return values like PHP the code should be:
```
function basename(path, suffix) {
    var str = (path + '').replace(/^[\/\\]+$/, '').replace(/^.*[\/\\]([^\/\\]+)[\/\\]?/g, '$1');
    if (typeof suffix === 'string' && str.substr(str.length - suffix.length) === suffix) {
    	return str.substr(0, str.length - suffix.length);
    }
    return str;
}
```
---------------------------------------
*[Dj]()* on 2011-07-26 19:09:12  
A fix to my previous post:
The last character in the last regexp should be an '*' instead of the '?':

Replace: 

```var str = (path + '').replace(/^[\/\\]+$/, '').replace(/^.*[\/\\]([^\/\\]+)[\/\\]?/g, '$1');```

With:
```var str = (path + '').replace(/^[\/\\]+$/, '').replace(/^.*[\/\\]([^\/\\]+)[\/\\]*/g, '$1');```
---------------------------------------
*[??????? ????? ???](http://an3m1.com/)* on 2012-04-18 10:16:57  
They have done such a great job with this. This is why they are deserving of these awards. Keep up the good work

---------------------------------------
