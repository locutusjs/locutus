*[Marc Jansen](http://selectoid.wordpress.com)* on 2009-03-03 11:47:37  
Nice work folks, but I think I found a bug:

shouldn't the following code yield 'false'?
```
var anObj = {
   'aFunc' : function () { alert('humpty'); }
};
alert( empty(anObj) ) // alerts true, but the object contains an element
```

// is IMHO wrong for arrays as well:
```
var anArr = [
   function () { alert('humpty'); }
];
alert( empty(anArr) ) // alerts true, but the array contains an element
```

Named functions should behave the same.
---------------------------------------
*[IT]()* on 2008-01-26 18:33:59  
Awesome! Exactly what I needed ;)
---------------------------------------
*[Onno Marsman]()* on 2008-09-04 16:36:10  
should also return true on undefined
---------------------------------------
*[Kevin van Zonneveld](http://kevin.vanzonneveld.net)* on 2008-09-05 21:36:24  
@ Onno Marsman: Thanks again man! Remember if you have a homepage or something, I can add it to the credit sections.
---------------------------------------
*[Onno Marsman]()* on 2008-10-06 16:39:14  
typeof array will be 'object' so the check for 'array' maxes no sense:

```
function empty( mixed_var ) {
    if (mixed_var === &quot;&quot;
        || mixed_var === 0
        || mixed_var === &quot;0&quot;
        || mixed_var === null
        || mixed_var === false
        || mixed_var === undefined
        || (mixed_var instanceof Array &amp;&amp; mixed_var.length === 0)
    ) {
        return true;
    }
```

Something else: what about empty({}) ?
If you consider {} an object as in PHP then it will never be empty. But I would never use it like that. It would make more sense to call empty({}) when {} could be considered as an associative array, and in that case it is empty and should return true:

```
function empty( mixed_var ) {
    if (mixed_var === &quot;&quot;
        || mixed_var === 0
        || mixed_var === &quot;0&quot;
        || mixed_var === null
        || mixed_var === false
        || mixed_var === undefined
    ){
        return true;
    }
    if (typeof mixed_var == 'object') {
        for (var i in mixed_var) {
            return false;
        }
        return true;
    }
    return false;
}
```
Note that in this implementation I removed the line that handles arrays because the section that takes care of objects handles this correctly for arrays anyway.
---------------------------------------
*[Kevin van Zonneveld](http://kevin.vanzonneveld.net)* on 2008-10-06 16:49:26  
@ Onno Marsman: Excellent thought and well executed Onno!
---------------------------------------
*[Francesco](www.integrasoftwae.it)* on 2008-10-26 13:46:37  
If you extend the Array or Object prototype, empty([]) and empty({}) return true...

i've added
if (typeof mixed_var[key] !== 'function' )
this test before returning false in the for cicle, thanks
---------------------------------------
*[Brett Zamir]()* on 2008-11-03 10:27:16  
If you like, here's a little bit cleaner and slightly safer implementation, I think:

```
function create_function (args, code) {
	//$newfunc = create_function('$a,$b', 'return $a + $b;');
	// alert($newfunc(5, 4)); 
	var argmnts = [];	
	argmnts = args.split(/,\s*/);	
	return Function.apply(null, argmnts.concat(code));
}
```

But if one just wishes an anonymous function, they can just do:

```call_user_func_array(function(arg) {...}, $a);```

or if they need a string

```call_user_func_array(new Function($arg1, $code), $a);```

For one behaving more like PHP in returning a global name for the new function:

```
function create_function (args, code) {
	// $newfunc = create_function('$a,$b', 'return $a + $b;');
	// alert($newfunc); // 'lambda_1'
	// alert(     window[$newfunc](5, 3)    ); // 8 (need window to call it, since the PHP behavior is to return a string)

	var funcName = '';
	if (!this.php_js) {
		this.php_js = {};
	}
	if (!this.php_js.create_function_ct) {
		this.php_js.create_function_ct = 0;
	}
	this.php_js.create_function_ct++;	
	funcName = 'lambda_'+this.php_js.create_function_ct;

	eval(funcName+' = function (' + args + ') { ' +  code + '}');

	return funcName;
}
```
---------------------------------------
*[Brett Zamir](http://bahai-library.com)* on 2009-02-10 08:59:02  
If it's all right, Kevin, I'll change the text for !== 'function' to be a test for whether o.hasOwnProperty(i). That solves the prototype problem (though even that might be considered non-empty) but avoids the current issue of considering this to be empty:  var o = {method:function(){}}
---------------------------------------
*[Kevin van Zonneveld](http://kevin.vanzonneveld.net)* on 2009-02-11 02:39:23  
@ Brett Zamir: wicked
---------------------------------------
*[Marc Jansen](http://selectoid.wordpress.com)* on 2009-03-03 11:59:22  
Nice work folks, but I think I found a bug: shouldn't the following code yield 'false'?

```
var anObj = { 
  'aFunc' : function () { alert('humpty'); } 
}; 
alert( empty( anObj ) ); // alerts true, but the object contains an element 
```

This is IMHO wrong for arrays as well:

```
var anArr = [ 
  function () { alert( 'dumpty' ); } 
]; 
alert( empty( anArr ) ) ; // alerts true, but the array contains an element
```

Named functions should behave the same.
---------------------------------------
*[Kevin van Zonneveld](http://kevin.vanzonneveld.net)* on 2009-03-04 15:02:28  
@ Marc Jansen: Fixed in svn, thank you!
---------------------------------------
*[Knoxius](http://knoxius.com/)* on 2009-04-09 09:12:47  
This version seems a bit complex for the mock-function. Couldn't it be simpler by doing something like this:

```
function empty(string) {
	if(string.length == 0) {
		return true;
	} else {
		return false;
	}
}
```

It seems a lot simpler, and it still works perfectly fine.

Example:
```
var myString = 'This is a string.';

if(empty(null)) { //Returns true
alert("It is empty.");
} else if(empty(myString)) { //Returns false
alert("It is not empty.");
}
```

There could be something about your code that is better, but it seems a bit too complex for what it could be.
---------------------------------------
*[Brett Zamir]()* on 2009-04-13 07:23:21  
@Knoxius, PHP.JS is treating objects as associative arrays, including ones without a length property, so that wouldn't work for our project. We are also attempting to mimic PHP behavior fully for those familiar with PHP or wishing to use its approach. For example, your function would not consider any number to be non-empty, whereas PHP only considers 0 as such. Of course, your function might work just fine for your own purposes, but we're trying to build a reliable, consistent API, and PHP is the standard to go by (if we just made our own decisions at every turn, there wouldn't be much justification for sticking to PHP function names, as it'd probably just be more confusing for those who expected it to behave as in PHP).
---------------------------------------
*[Kevin van Zonneveld](http://kevin.vanzonneveld.net)* on 2009-04-14 12:38:54  
@ Knoxius: Sometimes the most simple functions require the most insane JavaScript code. Seen echo ? ;)
---------------------------------------
*[Stoyan Kyosev](http://www.svest.org)* on 2009-11-16 12:18:11  
As noted in http://www.sitepoint.com/blogs/2009/11/12/google-closure-how-not-to-write-javascript/:

"This function checks if a particular variable has a value defined. Or it does, unless a 3rd party script sets the global undefined variable to something else. "
```
var undefined = 5; 
```

"u might think that anyone who assigns a value to undefined deserves what they get, but the fix in this case is trivial: simply declare a local undefined variable for use within the function!simply declare a local undefined variable for use within the function!"

function empty(val) { 
 var undefined; 
 return val !== undefined; 
}; 

I suggest to use this "fix" in the current implementation of 'empty'.
---------------------------------------
*[Brett Zamir](http://brett-zamir.me)* on 2009-11-16 13:23:27  
@Stoyan Kyosev: I committed a change at http://github.com/kvz/phpjs/commit/dd40b8850a29c0617a40c7ca5ed2ae90fd720a22 to use the "typeof" check, which doesn't suffer from the same problem (nor will it encourage bad practices for those who see our code and don't know why we're doing it).  However, I'm not really sure it is justified to do this for all our other functions which test for it since 1) It takes up a little more space, and 2) JavaScript has quite a few ways for you to redefine things (e.g., var isNaN = 5;). Any opinions? But it doesn't hurt, so there ya go... :) Thanks for the input...
---------------------------------------
*[dmitriy kulichkin]()* on 2010-06-09 19:02:18  
empty([]) will fail if we extend Array with some methods via prototype. I suppose we should check our keys do not to be function. Does it have a sense?
---------------------------------------
*[Kevin van Zonneveld](http://kevin.vanzonneveld.net)* on 2010-06-19 16:28:00  
@ dmitriy kulichkin: Could you maybe provide an example?
---------------------------------------
*[Brett Zamir](http://brett-zamir.me)* on 2010-06-21 04:54:23  
Kevin, I believe dmitriy means filtering via hasOwnProperty inside the for loop. I can make the change, but for this function I wonder whether some users might like to verify that the array/object is _really_ empty (including of prototype-inherited properties). Thoughts? Maybe add an ini_set() configuration option to allow both cases?
---------------------------------------
*[Krinkle]()* on 2010-10-23 22:48:58  
The JSLint warning about for "for in" is quite correct.
If an array has prototypes it returns false ("not empty").

To fix this, one can simply check the .length to be 0 strictly.

```

function empty (v) {
	var key;
	if (v === "" || v === 0 || v === "0" || v === null || v === false || typeof v === 'undefined') {
		return true;
	}
	if (v.length === 0) {
		return true;
	}
	if (typeof v === 'object') {
		for (key in v) {
			return false;
		}
		return true;
	}
	return false;
}
```
---------------------------------------
*[ProownCibbowl]()* on 2011-07-04 21:25:24  

---------------------------------------
*[bitPlaftwat](http://topbrandszone.com/)* on 2011-07-05 07:12:06  

---------------------------------------
*[         l]()* on 2011-08-02 04:14:40  
lol
---------------------------------------
*[utenothence](http://pharmacyworldrx.com/)* on 2011-09-07 13:15:23  

---------------------------------------
*[max4ever]()* on 2011-10-07 12:42:50  
I think checks for array should be added, it doesn't work with 

```
var my_ditta = new Array();

my_ditta['tasse'] = 1;
my_ditta['cartonaggio'] = 1;

empty(my_ditta); //=> gives true, but it's obviously false
```
---------------------------------------
*[Brett Zamir](http://brett-zamir.me)* on 2011-10-07 23:58:19  
@max4ever: I don't know if you have any older version of the function or whether you were guessing that an array would not return "object" as a type (as it does in JavaScript even for arrays which are themselves objects), but in your example the empty() call returns true.
---------------------------------------
*[Brett Zamir](http://brett-zamir.me)* on 2011-10-07 23:59:33  
@max4ever: Sorry, I mean it returns false--it indicates it is non-empty.
---------------------------------------
*[Stephan]()* on 2011-11-16 09:54:29  
Hello,

When testing a Date-Object, it always returns true: it's an object but has no keys.

No idea if this is the best solution. It works for me. I check if getMonth is available. Maybe there is a better way?

```
if (typeof mixed_var == 'object') {
        for (key in mixed_var) {
            return false;
        }
        if (mixed_var.getMonth)
        {
          return false;
        }
        return true;
    }
```
---------------------------------------
*[Sany-heem]()* on 2011-11-19 15:50:39  

---------------------------------------
*[Drug-Esota](schemes-shop.com/shop/grundig_p37_060_service.html)* on 2011-12-16 09:57:00  

---------------------------------------
*[carpinteyronyc]()* on 2012-03-15 06:11:29  

---------------------------------------
*[excemeexhaumP](http://credit.sotatka.ru/)* on 2012-03-19 18:53:25  
+1
---------------------------------------
*[pletcherdgh]()* on 2012-04-04 13:18:33  

---------------------------------------
*[CasiariwarSic]()* on 2012-05-22 09:02:51  

---------------------------------------
*[CymnMda]()* on 2012-06-09 01:42:25  
buy azithro http://zithromaxs.com/  zithromax stomach upset
---------------------------------------
*[pabrams]()* on 2012-06-21 03:52:09  
Hi, for the first two js lint issues, try some carriage returns.  Line #26 will also be much easier to read, especially if you format it nicely.  Each new line after ```if (mixed_var === ""``` could start with a constant number of tabs and then ```|| mixed_var === ```.   How 'bout that?   Personally, I find code like line #26 to be inexcusable because it's a real pain to read, and very easy to avoid, if using a decent editor.
---------------------------------------
*[Rafal]()* on 2012-06-21 09:27:00  
@pabrams: thanks. I've modified the function to make it more readable and got rid of most lint warnings. Updated code available on github (https://raw.github.com/kvz/phpjs/master/functions/var/empty.js)
---------------------------------------
*[mildevivy]()* on 2012-08-23 06:36:56  

---------------------------------------
*[David Lundgren]()* on 2012-09-12 09:12:39  
It would be nice to add the following otherwise date objects are always detected as being empty.

```
	if (mixed_var instanceof Date) {
		return isNaN(Number(mixed_var));
	}
```

Idea taken from http://frugalcoder.us/post/2010/02/15/js-is-empty.aspx
---------------------------------------
*[wHrOxPsVfW]()* on 2012-09-13 03:17:27  

---------------------------------------
