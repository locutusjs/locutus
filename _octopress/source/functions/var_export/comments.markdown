*[Oleg Butuzov (http://made.com.ua)]()* on 2008-07-19 21:24:13  
sleep ?

```
        function sleep(seconds) {
            for(var i=seconds; i &gt; 0; i--) {
				var start = Number(new Date().getTime());
				while (true) {
                	if ( (new Date().getTime() - start) &gt; 1000) {
                    	break;
                	}
            	}
			}
        }

```
---------------------------------------
*[Kevin van Zonneveld](http://kevin.vanzonneveld.net)* on 2008-07-20 12:32:29  
@ Oleg Butuzov: I'd think it would be great to have a sleep function, but this implementation locks up the browser. Maybe we could investigate in an alternative implementation based on setTimeout or something?
---------------------------------------
*[johnrembo]()* on 2008-08-22 12:35:57  
currently this function fails on objects that contain any method. Also, I suggest to use typeof instead of instanceof:

var phpBridge = {
  var_export: function (mixed_content) {
      var variable=mixed_content;
      var __pad_lines = function ( x ) {
          return x.split(&quot;\n&quot;).join(&quot;\n  &quot;);
      };
      
      var retstr = &quot;&quot;;

      if(typeof variable == ('object' || 'array')) {
          var iret = &quot;&quot;;
          for(i in variable) {
              iret=iret+&quot;\n&quot;+this.var_export(i,true)+&quot; =&gt; &quot;+this.var_export(variable[i], true)+&quot;,&quot;;
          }
          retstr = &quot;array (&quot;+__pad_lines(iret)+&quot;\n)&quot;;
      } else if( variable === null) {
          retstr = &quot;NULL&quot;;
      } else if ( typeof variable == 'function') {
        retstr=&quot;'function'&quot;;
      } else {
          retstr = (!isNaN( variable )) ? variable : &quot;'&quot; + variable.replace('/([&quot;\'\])/g', &quot;\\$1&quot;).replace('/\0/g', &quot;\\0&quot;) + &quot;'&quot;;
      }
      
      return retstr;
  }
}
---------------------------------------
*[Tom]()* on 2009-04-16 16:57:13  
The returned representation of provided function is valid PHP code (which is correct). But does anyone have a JS var_export function whose returned representation is valid javascript code? The returned value should be string and it could be passed to eval() function
Examples:
```
var a = new Array(12, '13', 'abc', 'line1\nline2\nline3');
var js_code = var_export(a);
/*
the returned value should be:
"{0:12, 1:'13', 2:'abc', 3:'line1\nline2\nline3'}"
*/

var b = {'key1':4, 'key2':'5', 'key3':'xxx\n123', 555:'text'};
js_code = var_export(b);
/*
the returned value should be:
"{'key1':4, 'key2':'5', 'key3':'xxx\n123', 555:'text'}"
*/

var c = 123;
js_code = var_export(c); // "123"

var d = '321';
js_code = var_export(d); // "'321'"

var e = 'multilne\ntext';
js_code = var_export(e); // "'multiline\ntext'"

function add(x, y)
{
      res = x + y;
      return res;
}
var js_code = var_export(add);
/*
the returned value should be:
"function add(x, y) { res = x + y; return res; }"
*/
```

Thanks.

---------------------------------------
*[Brett Zamir](http://bahai-library.com)* on 2009-04-17 02:45:50  
Hello Tom, 

You might look at our serialize implementation http://phpjs.org/functions/view/508 for support for some JS types.

As you might already be aware, you can also get some of this with JSON. See http://json.org if you're not familiar with it or are looking for an existing parser/stringifier (Mozilla provides access to these natively for JSON parsing/stringifying if you were working with Firefox extensions).  You technically can just use "eval()" for parsing, but that is unsafe, especially if user input could creep into the expression, unless you know what you're doing with it.

However, it is true that JSON (as with serialize() in some cases) does not allow other JS types, specifically functions (as you list) including as classes, the "undefined" type, Date objects, RegExp objects, and the built-in Error types (see https://developer.mozilla.org/en/Core_JavaScript_1.5_Reference/Global_Objects/Error ) (unless these are represented in some other way, just as strings or objects), and does not capture the prototype for objects.

That would be a useful option to have, I think, so if someone can implement it, maybe we can have a switch in the function to determine what kind of output to give. For most types, it shouldn't be too hard to do, as you could usually just rely on "toString()" (at least as a base), though you'd have to grab any user-defined prototype object on a function, etc. ... 

This is a good example of the cases where being able to have configuration options is useful. php_check_syntax() has a similar dilemma to yours. 

We've already built in some support for this which can be used now: PHP-style ini options. So, we could define our own "ini" for this function, using "phpjs." as the "extension prefix" (e.g., "phpjs.var_export_as_js"), and then allow users to use an ini file or ini_set() to set a non-default behavior. The function in turn would do a check like:

```
// this.php_js.ini would be set earlier, by ini_set(), an ini file 
// which directly added to this.php_js.ini (fastest), or by parsing a
// PHP-style ini file (no support for the latter yet). 
//

if (this.php_js && this.php_js.ini && this.php_js.ini.local_value['phpjs.var_export_as_js']) { // each ini should define local_value and global_value, so that it is possible to revert within the script back from ini_set() to the default behavior.
...
}
```

Note that references to 'this' will also work for the non-namespaced version of PHP.JS as it refers to the window object (PHP.JS reserves one global, "php_js", in the non-namespaced version).

At some point in the future, I think Kevin agreed in principle to allowing the namespaced version to accept configuration options in the constructor (e.g., $P = new PHP_JS({phpjs.var_export_as_js:true, ...})), so that, e.g., you could specify that by default you wanted var_export to work with JS.
---------------------------------------
*[Brian Tafoya](http://www.premasolutions.com)* on 2009-07-13 04:26:01  
According to IE, there is an error within the regex on line 74...

```
funcParts = mixed_expression.toString().match(/function .*?\((.*?)\) \{([^]*)\}/);
```

Claims it is expecting an ']' but I was not able to resolve this.
---------------------------------------
*[Brett Zamir](http://brett-zamir.me)* on 2009-07-13 16:40:08  
Fixed in SVN. Thanks for the report! 

In the meantime, convert "[^]" to "[\s\S]" (no quotes). The former works in PHP and Mozilla JavaScript but not IE--also fixed in the remaining functions which had this problem.
---------------------------------------
*[Kevin van Zonneveld](http://kevin.vanzonneveld.net)* on 2009-07-14 12:40:27  
@ Brett Zamir & Brian Tafoya: Good job guys!
---------------------------------------
*[ekim]()* on 2011-04-20 03:17:29  
```
RA=[]; RA[1]=RA;
curse={re:RA}; curse.s=curse;
```
 Can the output strings for RA and curse be posted to see what they look like?
---------------------------------------
*[Hans Henrik](hanshenrik.tk)* on 2012-05-31 00:14:42  
here is an alternate, much simpler implementation.. (since the javascript's var_export equalent seems to be JSON.stringify) 
```
function var_export (mixed_expression, bool_return) {
    if (bool_return != true) {
        this.echo(JSON.stringify(mixed_expression));
        return null;
    } else {
return JSON.stringify(mixed_expression);
}
}
```

also, in the current code, bool_return !== true should be bool_return != true
(php's var_export don't care if you call var_export(blabla,1) or call var_export(blabla,true); )
---------------------------------------
*[Brett Zamir](http://brett-zamir.me)* on 2012-07-06 03:26:03  
@ekim: No, var_export in php.js currently does not support recursive references (or flag them as errors). Feel free to add support!
@Hans Henrik: We cannot use JSON.stringify for a few reasons: 1) JSON doesn't allow functions; JSON is only a subset of JavaScript intended for safely conveying data across platform. 2) JSON methods are not supported in older browsers. 3) PHP's var_export detects other properties like resources as do we (in our own way, even though JS does not have resource types). As far as your point about the 2nd argument, I have fixed it in Git (along with fixing some JSLint issues). Thanks!
---------------------------------------
