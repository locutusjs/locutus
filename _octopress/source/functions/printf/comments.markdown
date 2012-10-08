*[someone]()* on 2008-01-17 13:58:17  
The php.js is a great project. But I know the similar project, p2js.

http://p2js.googlecode.com/svn/trunk/src/
---------------------------------------
*[Kevin van Zonneveld](http://kevin.vanzonneveld.net)* on 2008-01-17 18:05:20  
@ someone: Wow I really thought I did my research but similar projects keep popping up. Thank you.
---------------------------------------
*[Michael White]()* on 2008-03-02 05:43:30  
This function can be made a bit more flexible by not using the eval() function. This really helps more when using namespaces to encapsulate the code. Line three in the example shows the line I used when inside a closed namespace.

```
//ret = eval('sprintf(' + args + ')'); // Old
ret = sprintf.apply(this, args); // New
//ret = this.sprintf.apply(this, args); // When inside a closed namespace.
```

http://crestidg.com
---------------------------------------
*[Kevin van Zonneveld](http://kevin.vanzonneveld.net)* on 2008-03-02 12:13:25  
Michael White: I agree that that would be better but it currently generates a: 'format has no properties' error on the line with:

```
return format.replace(regex, function(substring, valueIndex, flags, minWidth, _, precision, type) {
```
---------------------------------------
*[Michael White]()* on 2008-03-02 17:37:11  
What browser(s)? I think I have a solution anyway and I'm going to test it as soon as I can obtain that error message.
---------------------------------------
*[Kevin van Zonneveld](http://kevin.vanzonneveld.net)* on 2008-03-02 17:56:56  
@ Michael White: Firefox 2 with firebug addon on ubunty gutsy
---------------------------------------
*[Michael White]()* on 2008-03-04 02:43:07  
Hmm - not sure I can grab that OS but I'll see if I can get the error on another OS. The good news is that I have a new function: print_r()

```
function print_r(array, return_val) {
	var output = &quot;&quot;, pad_char = &quot; &quot;, pad_val = 3;
	
	function formatArray(obj, cur_depth, pad_val, pad_char) {
		if(cur_depth &gt; 0)
			cur_depth++;
		
		var base_pad = repeat_char(pad_val*cur_depth, pad_char);
		var thick_pad = repeat_char(pad_val*(cur_depth+1), pad_char);
		var str = &quot;&quot;;
		
		if(obj instanceof Array) {
			str += &quot;Array\n&quot; + base_pad + &quot;(\n&quot;;
			for(var key in obj) {
				if(obj[key] instanceof Array) {
					str += thick_pad + &quot;[&quot;+key+&quot;] =&gt; &quot;+formatArray(obj[key], cur_depth+1, pad_val, pad_char);
				} else {
					str += thick_pad + &quot;[&quot;+key+&quot;] =&gt; &quot; + obj[key] + &quot;\n&quot;;
				}
			}
			str += base_pad + &quot;)\n&quot;;
		} else {
			str = obj.toString(); // They didn't pass in an array.... why? -- Do the best we can to output this object.
		};
		
		return str;
	};
	
	function repeat_char(len, char) {
		var str = &quot;&quot;;
		for(var i=0; i &lt; len; i++) { str += char; };
		return str;
	};
	
	output = formatArray(array, 0, pad_val, pad_char);
	
	if(return_val !== true) {
		document.write(&quot;&lt;pre&gt;&quot; + output + &quot;&lt;/pre&gt;&quot;);
	} else {
		return output;
	}
}

The &lt;pre&gt; tags here are optional for the version you release (although they are recommended) I like them because unless you have Firefox you probably can't view &quot;generated source&quot; and you won't be able to make sense of the data unless it is formatted.

http://crestidg.com -- by the way - how do I add line breaks in this message box?
```
---------------------------------------
*[Michael White]()* on 2008-03-04 03:16:07  
I ended up nearly rewriting this function...

```
function printf( ) {
    // *     example 1: printf(&quot;%01.2f&quot;, 123.1);
    // *     returns 1: 6
 
	var ret = this.sprintf.apply(this, arguments);
	document.write(ret);
	return ret.length;
}
```

The previous code turned the arguments array into a string representation of that array. With eval() that works properly but with apply() it expects the arguments to be an array. All we have to do is leave the arguments array alone and pass it directly to the apply() function call. The &quot;this&quot; keyword makes sure the proper scope is used and applied to the function whether the code is namespaced or just in the global namespace as a simple function. Why it worked in a namespace when passing string arguments I cannot pretend to know.... but at least it works everywhere now.
---------------------------------------
*[Michael White]()* on 2008-03-04 05:37:23  
floatval() : A nearly pointless addition. Only slightly more than a wrapper for JavaScript's parseFloat() method.

```
function floatval(mixed_var) {
	// *     example 1: floatval('150.03_page-section');
	// *     return 1: 150.03
	// *     example 2: floatval('page: 3');
	// *     return 2: 0
	// *     example 2: floatval('-50 + 8');
	// *     return 2: -50
	
	// Note: The native parseFloat() method of JavaScript returns NaN when it encounters a string before an int or float value.
	
	return (parseFloat(mixed_var) || 0);
}
```

http://crestidg.com
---------------------------------------
*[Michael White]()* on 2008-03-04 07:36:07  
Ok, I swear this is my last post tonight. I've just been really busy working on a few things that happen to really coincide with what is being done here with php.js

```
// This post doesn't have code - just a URL.
// Use the URL in this post to find a source file with a few new functions and some updates to existing functions. It also contains updates to a couple of my own new functions that I have already posted and then found some little discrepancies in.

// http://www.sprinkit.net/aether/php_js-updates.js

Maybe in the future I will just save all my work on php.js stuff into a single file and post it all at once so this doesn't happen again.
```
---------------------------------------
*[Kevin van Zonneveld](http://kevin.vanzonneveld.net)* on 2008-03-04 17:05:50  
@ Michael White: LOL :) No problem dude. Thanks for all of the hard work. There still are some errors though: http://kevin.vanzonneveld.net/pj_tester.php
---------------------------------------
*[Kevin van Zonneveld](http://kevin.vanzonneveld.net)* on 2008-03-04 17:25:28  
@ Michael White: two of them were related to flawed examples of my own ;) but i think there is still some discrepancies between include &amp; require ?
---------------------------------------
*[Brett Zamir]()* on 2009-01-29 04:10:16  
Here's vprintf based largely on printf (and helped a little by vsprintf).

I think the lines in printf dealing with setting up body should also allow (as does my vprintf below) for getElementsByTagNameNS if available or the last child of the XML document if body is not available (allows this function to work in XUL, etc.):

```
    var HTMLNS = 'http://www.w3.org/1999/xhtml';
    body = document.getElementsByTagNameNS ? 
			(document.getElementsByTagNameNS(HTMLNS, 'body')[0] ? 
				document.getElementsByTagNameNS(HTMLNS, 'body') : 
				document.documentElement.lastChild) : 
			document.getElementsByTagName('body')[0];

    if (!body) {
        return false;
    }```

If that is done the declaration &quot;bodies = [], &quot; can also be removed.

```
function vprintf(format, args) {
    // http://kevin.vanzonneveld.net
    // +   original by: Ash Searle (http://hexmen.com/blog/)
    // +   improved by: Michael White (http://getsprink.com)
    // -    depends on: sprintf
    // *     example 1: printf(&quot;%01.2f&quot;, 123.1);
    // *     returns 1: 6
 
    var body, elmt;
    var ret = '';
    
    // .shift() does not work to get first item in bodies

    var HTMLNS = 'http://www.w3.org/1999/xhtml';
    body = document.getElementsByTagNameNS ? 
			(document.getElementsByTagNameNS(HTMLNS, 'body')[0] ? 
				document.getElementsByTagNameNS(HTMLNS, 'body') : 
				document.documentElement.lastChild) : 
			document.getElementsByTagName('body')[0];

    if (!body) {
        return false;
    }
    
    ret = sprintf.apply(this, [format].concat(args));
 
    elmt = document.createTextNode(ret);
    body.appendChild(elmt);
    
    return ret.length;
}```
---------------------------------------
*[Brett Zamir](http://bahai-library.com)* on 2009-01-29 04:27:55  
Had a slight bug in this line (for vprintf and printf):
```
    body = document.getElementsByTagNameNS ? 
			(document.getElementsByTagNameNS(HTMLNS, 'body')[0] ? 
				document.getElementsByTagNameNS(HTMLNS, 'body')[0] : 
				document.documentElement.lastChild) : 
			document.getElementsByTagName('body')[0];
```
---------------------------------------
*[Kevin van Zonneveld](http://kevin.vanzonneveld.net)* on 2009-02-01 22:09:09  
@ Brett Zamir: Fixed.
---------------------------------------
*[Air Jordan Spizike](http://www.kixmall.com/  )* on 2010-09-30 11:36:35  
I was very pleased to find this site. This is an intelligent and well
written article, you must have put a fair amount of research into writing
this. 

---------------------------------------
*[????? ???????](http://an3m1.com/)* on 2012-04-04 14:34:24  
If I might —perhaps you should consider adding a few images. I don’t mean to disrespect what you’ve said ; its very enlightening, indeed. However, I think would respond to it more positively if they could be something tangible to your ideas 

---------------------------------------
