*[Alfonso Jiménez]()* on 2008-03-04 23:15:33  
Hi Kevin! I post here the array_reduce function:

```
function array_reduce(a_input, callback) {
       var lon = a_input.length;
       var res = 0;
       var tmp = new Array();

       for(i = 0; i &lt; lon; i += 2) {
	    tmp[0] = a_input[i];
	    if(a_input[i+1])
		tmp[1] = a_input[i+1];
	    else
		tmp[1] = 0;

	    res += callback.apply(null, tmp);
	    tmp = new Array();
	}

	return res;
}
```

Usage example: 

```
array_reduce([1,2,3,4,5], function (x, y) { return (x+y); });
```

Regards!
Alfonso JimÃ©nez (http://www.alfonsojimenez.com)
---------------------------------------
*[Kevin van Zonneveld](http://kevin.vanzonneveld.net)* on 2008-03-04 23:35:42  
@ Alfonso JimÃ©nez: Great contribution, thank you very much!
---------------------------------------
*[ricardo avalos]()* on 2008-03-11 16:17:45  
Greats Work!!

Very, very, very thanks you!!!

	
All my cordial greetings and appreciation from Chile

Ricardo
avalos.ricardo@gmail.com
---------------------------------------
*[Michael White]()* on 2008-03-11 21:03:15  
Found a bug in print_r()


So far this bug only seems to affect Netscape and the version I am using is 7.2


Replace this segment:
```
var repeat_char = function (len, char) {
	var str = &quot;&quot;;
	for(var i=0; i &lt; len; i++) { str += char; };
	return str;
};
```

with this segment:
```
var repeat_char = function (len, pad_char) {
	var str = &quot;&quot;;
	for(var i=0; i &lt; len; i++) { str += pad_char; };
	return str;
};
```

Netscape thinks that &quot;char&quot; is a reserved word and so cannot be used as a variable name. It errors out saying something about a formal parameter. Changing the 'char&quot; variable to &quot;pad_char&quot; solves that quite easily.


http://crestidg.com
---------------------------------------
*[Kevin van Zonneveld](http://kevin.vanzonneveld.net)* on 2008-03-15 11:55:34  
@ Michael White: replaced!
---------------------------------------
*[Günter Kits]()* on 2008-05-08 14:27:04  
```if(return_val !== true) {```
should be
```if(return_val == true) {```
---------------------------------------
*[Kevin van Zonneveld](http://kevin.vanzonneveld.net)* on 2008-05-08 22:01:40  
@ GÃ¼nter Kits: I do not agree. When the return parameter is not true, the function should not return the string but print it instead. Unless I'm overlooking something, that's what it does now?
---------------------------------------
*[Ben Bryan]()* on 2008-05-20 06:00:20  
Where formatArray function is testing data types, it does not except types of Object, replacing the if statement with the following seems to overcome this. Basically letting OBject types be processed. Tested with FF.
```
        if (obj instanceof Array || obj instanceof Object) {
            str += &quot;Array\n&quot; + base_pad + &quot;(\n&quot;;
            for (var key in obj) {
                if (obj[key] instanceof Array || obj[key] instanceof Object) {
                    str += thick_pad + &quot;[&quot;+key+&quot;] =&gt; &quot;+formatArray(obj[key], cur_depth+1, pad_val, pad_char);
                } else {
                    str += thick_pad + &quot;[&quot;+key+&quot;] =&gt; &quot; + obj[key] + &quot;\n&quot;;
                }
            }
            str += base_pad + &quot;)\n&quot;;
        } else {
            str = obj.toString();
        };
```
---------------------------------------
*[Kevin van Zonneveld](http://kevin.vanzonneveld.net)* on 2008-05-20 23:27:56  
@ Ben Bryan: Thanks a lot Ben!
---------------------------------------
*[vinnieboombots]()* on 2008-05-26 17:49:46  
used it on an array of all links on this page (firebug)
it replaced the page contents with a comma separated value string of the array's values.
ie: http://kevin.vanzonneveld.net/techblog,http://kevin.vanzonneveld.net/techblog,http://kevin.vanzonneveld.net/techblog,http://kevin.vanzonneveld.net/techblog,http://kevin.vanzonneveld.net/techblog,http://kevin.vanzonneveld.net/techblog

Php's print_r output is different (&amp; better)

array
  [0]=&gt;http://kevin.vanzonneveld.net/techblog
  [1]=&gt;http://kevin.vanzonneveld.net/links
  [2]=&gt;http://kevin.vanzonneveld.net/code
  [3]=&gt;http://kevin.vanzonneveld.net/about
---------------------------------------
*[Kevin van Zonneveld](http://kevin.vanzonneveld.net)* on 2008-05-31 14:36:14  
@ vinnieboombots: Looking at the code, I cannot establish how that could have happened at the moment. Would you be able to provide more debug info? (maybe a codeblock with how you tried to run print_r exactly?) Thank you.
---------------------------------------
*[Alejandro]()* on 2008-06-04 17:14:28  
Excelent!!!!!!!!!!!
---------------------------------------
*[aron budinszky]()* on 2008-08-07 09:17:48  
here's a bit of an improvement for the print_r function (which, as it seems, ben bryan has partially posted below) to process nested objects as well as arrays. in addition to his code, it is important to print OBJECT or to print ARRAY for the appropriate data type, since accessing the data requires slightly different syntax.

```
// {{{ print_r
function print_r( array, return_val ) {
    // Prints human-readable information about a variable
    // 
    // +    discuss at: http://kevin.vanzonneveld.net/techblog/article/javascript_equivalent_for_phps_print_r/
    // +       version: 803.612
    // +   original by: Michael White (http://crestidg.com)
    // *     example 1: print_r(['Kevin', 'van', 'Zonneveld']);
    // *     returns 1: true

    var output = &quot;&quot;, pad_char = &quot; &quot;, pad_val = 4;

    var formatArray = function (obj, cur_depth, pad_val, pad_char) {
        if(cur_depth &gt; 0)
            cur_depth++;

        var base_pad = repeat_char(pad_val*cur_depth, pad_char);
        var thick_pad = repeat_char(pad_val*(cur_depth+1), pad_char);
        var str = &quot;&quot;;
        var name = &quot;&quot;;

        if(obj instanceof Array || obj instanceof Object) {
            if(obj instanceof Array) name = &quot;Array&quot;;
            else name = &quot;Object&quot;;
            str += name+&quot;\n&quot; + base_pad + &quot;(\n&quot;;
            for(var key in obj) {
                if(obj[key] instanceof Array || obj instanceof Object) {
                    str += thick_pad + &quot;[&quot;+key+&quot;] =&gt; &quot;+formatArray(obj[key], cur_depth+1, pad_val, pad_char);
                } else {
                    str += thick_pad + &quot;[&quot;+key+&quot;] =&gt; &quot; + obj[key] + &quot;\n&quot;;
                }
            }
            str += base_pad + &quot;)\n&quot;;
        } else {
            str = obj.toString();
        };

        return str;
    };

    var repeat_char = function (len, char) {
        var str = &quot;&quot;;
        for(var i=0; i &lt; len; i++) { str += char; };
        return str;
    };

    output = formatArray(array, 0, pad_val, pad_char);

    if(return_val !== true) {
        document.write(&quot;&lt;pre&gt;&quot; + output + &quot;&lt;/pre&gt;&quot;);
        return true;
    } else {
        return output;
    }
}// }}}
```
---------------------------------------
*[aron budinszky]()* on 2008-08-07 09:27:32  
oops. there was a mistake in my code below. here's the improved version...(using ben bryan's code). but i noticed that the line 6:
if (obj[key] instanceof Array || obj[key] instanceof Object) 
is omitted from the current version in php.js, even though it is included in ben bryan's posted version...

```
if (obj instanceof Array || obj instanceof Object) {
            if(obj instanceof Array) name = &quot;Array&quot;;
            else name = &quot;Object&quot;;
            str += name+&quot;\n&quot; + base_pad + &quot;(\n&quot;;
            for (var key in obj) {
                if (obj[key] instanceof Array || obj[key] instanceof Object) {
                    str += thick_pad + &quot;[&quot;+key+&quot;] =&gt; &quot;+formatArray(obj[key], cur_depth+1, pad_val, pad_char);
                } else {
                    str += thick_pad + &quot;[&quot;+key+&quot;] =&gt; &quot; + obj[key] + &quot;\n&quot;;
                }
            }
            str += base_pad + &quot;)\n&quot;;
        } else {
            str = obj.toString();
        };
```
---------------------------------------
*[aron budinszky]()* on 2008-08-07 10:47:49  
also, changing the newlines to &lt;br&gt; and the pad_char to &quot;&amp;nbsp;&quot; creates a more readable result, even if it deviates from the php norm. since print_r is normally used to visually represent data, and since javascript is typically run within a browser, this might be the preferred way in this case...of course the opposite can also be argued...
---------------------------------------
*[Kevin van Zonneveld](http://kevin.vanzonneveld.net)* on 2008-08-27 17:34:32  
@aron budinszky: Thank you very much for your input. 
The object vs array story is because PHP does not differentiate between numerically indexed arrays and 'associative arrays'. But as soon as JavaScript encounters an associative array, it becomes an 'Object'. This is an essential difference between JS &amp; PHP. In this project we've chosen to side with PHP.

Hopefully this answers your question. As for the BR tag, if I output PHP's print_r I can choose to enclose it between PRE tags. I would like JS scripters to be able to approach JS's print_r in the same manner.
---------------------------------------
*[Francois]()* on 2008-09-25 14:52:01  
There is a missing coma (,) at line 2985

it is:
= string.replace(/&amp;gt;/g '&gt;');

but we should read:

= string.replace(/&amp;gt;/g, '&gt;');
---------------------------------------
*[Kevin van Zonneveld](http://kevin.vanzonneveld.net)* on 2008-09-29 12:33:29  
@ Francois: The bug was in the htmlspecialchars_decode function and has been fixed. Sorry for the inconvenience and thank you for tipping me!
---------------------------------------
*[Tomot]()* on 2008-10-03 15:45:51  
print_r(document, true) returns in IE7: &quot;[object]&quot;
in FF3 works fine.
---------------------------------------
*[Kevin van Zonneveld](http://kevin.vanzonneveld.net)* on 2008-10-06 12:47:30  
@ Tomot: Thanks for sharing, can you tell if it produces errors on any line?
---------------------------------------
*[Alexander]()* on 2008-11-19 15:53:51  
May be need change:
```
if (obj[key] instanceof Array) {
```
Change to:
```
if (obj[key] instanceof Array || obj[key] instanceof Object) {
```
therefor print a nested objects
---------------------------------------
*[nikdo]()* on 2008-11-28 12:48:13  
using for(var a in b) isnt a good idea as it doesnt work in ie and is replacable with regular for(e1;e2;e3)
---------------------------------------
*[Kevin van Zonneveld](http://kevin.vanzonneveld.net)* on 2008-12-01 09:17:16  
@ nikdo: regular for loops won't work for associative arrays (js objects) so we really need these 'for key in array' structures. What version of ie are you using? I find it hard to believe that IE in general does not support these kind of loops at all, because that would have led to problems earlier on.
---------------------------------------
*[alexandre]()* on 2008-12-31 02:36:32  
no words are able to tell how wonderful is your work. Congratulations you all!!!

PS: Sorry about my awful English... I'm Brazillian
---------------------------------------
*[Kevin van Zonneveld](http://kevin.vanzonneveld.net)* on 2008-12-31 13:26:00  
@ alexandre: I think your words are very clear :) Thanks alexandre, it's nice of you to let us know. Happy NYE tonight!
---------------------------------------
*[Dennis Day](www.ddddesigns.com)* on 2009-02-03 00:34:18  
This code works great for printing out variable information but do you think it would be possible to print out a javascript object?  I am new to javascript objects otherwise I would do it myself.  To be honest, I'm not even sure it is possible.
---------------------------------------
*[Brett Zamir](http://bahai-library.com)* on 2009-02-03 04:29:00  
It can print out a JavaScript object. Since JavaScript has no special associative arrays, this project treats JavaScript objects like associative arrays (that's most likely why it says &quot;array&quot; when you put in a JS object)--and since PHP lets you put in arrays (and objects too), this function should too. var_export() is another option for you too. I hope we can also get var_dump() added at some point, but you should be able to see the contents of your JS objects with print_r or var_export()...
---------------------------------------
*[Nilesh]()* on 2010-10-08 07:36:20  
why is the use of print_r functaion in php


---------------------------------------
*[Krrish](http://itech.hubpages.com)* on 2011-09-13 13:28:56  
This is the Limit... Excellent work... You Guys converted nearly all PHP functions into JavaScript...
You Got another Fan for your site and for your work.
---------------------------------------
