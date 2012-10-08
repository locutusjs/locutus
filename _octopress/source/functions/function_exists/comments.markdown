*[Steve Clay]()* on 2008-01-04 04:54:15  
return (typeof window[function_name] == 'function');
---------------------------------------
*[Andrey]()* on 2008-01-04 09:30:09  
&gt;return (typeof window[function_name] == 'function');

Object-function may be defined as not a member of Window object.
---------------------------------------
*[Kevin van Zonneveld](http://kevin.vanzonneveld.net)* on 2008-01-04 13:49:34  
@ Steve Clay &amp; Andrey: Thanks You guys I've updated the function. I left the old code in the comments for future reference.
---------------------------------------
*[Cord]()* on 2008-01-06 03:54:43  
&gt;&gt;function is_array() {
should be
&gt;&gt;function is_array(a) {
---------------------------------------
*[Kevin van Zonneveld](http://kevin.vanzonneveld.net)* on 2008-01-06 13:00:45  
@ Cord: Thanks for noticing. Fixed!
---------------------------------------
*[Legaev Andrey (aka Andrey)]()* on 2008-01-07 15:19:44  
Sorry for my short previous comment and my bad English. Below full version.

If we pass function_name as String then all ok. But if we pass the link to function (link to Object-function) then
this function returns false. In my opinion in this case this function should return true when first 
parameter is instance of Function.

function function_exists_new( function_name ) {
	if (typeof function_name == \'string\')
	    return (typeof window[function_name] == \'function\');
	else
		return (function_name instanceof Function);
}

P.S. Please, change my name to Legaev Andrey &lt;legaev_andrey@mail.ru&gt;. Thanks.
---------------------------------------
*[Kevin van Zonneveld](http://kevin.vanzonneveld.net)* on 2008-01-07 15:44:28  
@ Legaev Andrey: Hi, I've updated the function and changed your name. I wasn't sure you really want me to enlist your email address?
---------------------------------------
*[Legaev Andrey]()* on 2008-01-08 11:10:45  
@ Kevin: I'm sorry. Not necessary to enlist my email. I did not think about spammers :)
---------------------------------------
*[Andrea Giammarchi]()* on 2008-01-14 23:02:35  
If you are interested in some similar stuff, looks for JHP setting in overbyte editor.

Finally, You could use my define function too, that accept only scalar values as PHP and is compatible with IE, FireFox, Safari and Opera (Opera devs will fix soon their const keyword ... I guess ...)

http://webreflection.blogspot.com/2007/10/cow-javascript-define-php-like-function.html

However, nice stuff .. not so useful in my mind because of different languages nature (I would like to have JS behaviours in PHP, for example :D) but good luck for the project
---------------------------------------
*[Kevin van Zonneveld](http://kevin.vanzonneveld.net)* on 2008-01-15 08:29:19  
@ Andrea Giammarchi: Wow you did some impressive work that I was unaware of. Cool :) I will look into the define function later today and add it here, thanks a lot for that.

About the PHP vs JS stuff.. I'm not trying to port or emulate the entire language or control structures of PHP. Indeed I don't see the need because (and this is quite a statement), Javascript seems to have more elegant features in that category anyway.

However in my eyes, PHP does provide a large set of standard functions that make developing very easy, and some of them don't have good standard Javascript implementations, though they often would be great to have client-side. 

So in this project by also providing the functions separately, I hope to keep people from inventing the wheel and give them a head start.

Thanks for your comment Andrea, well appreciated. And respect for your Overbyte editor &amp; JHP environment. The idea is very interesting, and I can see it's all coded with very high skill.
---------------------------------------
*[Brett Zamir]()* on 2008-12-17 05:12:14  
Here's one more...

``` 
function get_defined_functions() {
    var arr = [];
    for (var i in window) {
        try {
            if (typeof window[i] === 'function') {
                arr.push(window[i].name);
            }
        }
        catch (e) {
        }
    }
    return arr;
}
alert(get_defined_functions());```
---------------------------------------
*[Kevin van Zonneveld](http://kevin.vanzonneveld.net)* on 2008-12-17 14:34:07  
@ Brett Zamir: get_defined_functions... I must say, sometimes I'm really surprised what you guys come up with :) But it works! I have even hacked a testcase around it. Thanks again.
---------------------------------------
*[Brett Zamir]()* on 2008-12-20 11:59:33  
Here's another one more related to the function here...

Sample based on PHP manual...

```function Directory () {}
Directory.prototype.read = function () {}
$directory = new Directory('.');
alert(true === method_exists($directory,'read')); // true
alert(true === method_exists($directory,'write')); // false
```


```function method_exists (obj, method) {
    return typeof obj[method] === 'function';
}```
---------------------------------------
*[Brett Zamir]()* on 2008-12-20 12:05:37  
Sorry, neglected to see a string was allowable to test for a static method:
```

function Directory () {}
Directory.test = function () {}
Directory.prototype.read = function () {}
$directory = new Directory('.');
alert(true === method_exists($directory,'read')); // true
alert(true === method_exists($directory,'write')); // false
alert(true === method_exists('Directory','test')); // true
```

```function method_exists (obj, method) {
    if (typeof obj === 'string') {
        return typeof window[obj][method] === 'function'
    }
    return typeof obj[method] === 'function';
}```
---------------------------------------
*[Brett Zamir](http://bahai-library.com)* on 2008-12-23 04:52:59  
Fixing an error and adding more examples:

```function Directory () {}
Directory.test = function () {}
Directory.prototype.read = function () {}
$directory = new Directory('.');
alert(true === method_exists($directory,'read')); // true
alert(true === method_exists($directory,'write')); // false
alert(true === method_exists('Directory','test')); // true
alert(true === method_exists('Directory','read')); // false
alert(true === method_exists($directory,'test')); // false

function method_exists (obj, method) {
    if (typeof obj === 'string') {
        return window[obj] &amp;&amp; typeof window[obj][method] === 'function'
    }
    return typeof obj[method] === 'function';
}
```
---------------------------------------
*[Brett Zamir]()* on 2008-12-23 05:43:27  
Here's a slightly hackish and partially non-standard way to get class_exists(). Of course, any function can be instantiated in JavaScript, but I've attempted to do a hopefully more sophisticated checking to see whether it was designed as one.

```
function A (z) {this.z=z}
alert(class_exists('A')); // true (constructor sets 'this')
var a = new A('str');
alert(class_exists('a')); // false (objects not classes)

function B () {}
B.c = function () {}; // Add a static method, making it a class
alert(class_exists('B')); // true

function C () {}
C.prototype.z = function () {};
alert(class_exists('C')); // true

function D (b) {}
alert(class_exists('D')); // false (seems like a regular function)

var e = {
    E : function (z) {this.z=z;}
}
alert(class_exists('e.E')); // false (the 'this' refers to containing object, not to an instance property)


function class_exists (cls) {
    cls = window[cls]; // Note: will prevent inner classes
    if (typeof cls !== 'function') {return false;}
    for (var i in cls.prototype) {
        return true;
    }
    for (var i in cls) { // If static members exist, then consider a &quot;class&quot;
        if (i !== 'prototype') {
            return true;
        }
    }
    if (cls.toSource &amp;&amp; cls.toSource().match(/this\./)) { // Hackish and non-standard but can probably detect if setting a property (we don't want to test by instantiating as that may have side-effects)
        return true;
    }
    return false;
}```
---------------------------------------
*[Brett Zamir](http://bahai-library.com)* on 2008-12-23 06:24:45  
And here's one for property_exists(), based on PHP doc examples:

```var myClass = {
    mine : {},
    xpto : {},
    test : function () {
        var_dump(property_exists('myClass', 'xpto')); // true
    }
}
var_dump(property_exists('myClass', 'mine'));   //true
var_dump(property_exists('myClass', 'xpto'));   //true
var_dump(property_exists('myClass', 'bar'));    //false
var_dump(property_exists('myClass', 'test'));   // false (PHP considers methods as distinct from properties)
myClass.test(); // true


function myClass2 () {
    this.xpto = 'something';
}
myClass2.staticProp = 'staticValue';
myClass2.staticMethod = function () {
        var_dump(property_exists('myClass2', 'xpto')); // true
}
myClass2.prototype.instanceMethod = function () {}
myClass2.prototype.mine = 'my member';

var_dump(property_exists('myClass2', 'mine'));   //true
var_dump(property_exists(new myClass2, 'mine')); //true
var_dump(property_exists('myClass2', 'xpto'));   //true, as of PHP 5.3.0
var_dump(property_exists('myClass2', 'bar'));    //false
var_dump(property_exists('myClass2', 'staticProp'));   //true, as of PHP 5.3.0
var_dump(property_exists('myClass2', 'staticMethod'));    //false
var_dump(property_exists('myClass2', 'instanceMethod'));    //false
myClass2.staticMethod(); // true


function property_exists (cls, prop) {
    cls = (typeof cls === 'string') ? window[cls] : cls;
    if (typeof cls === 'function' &amp;&amp; cls.toSource &amp;&amp; cls.toSource().match(new RegExp('this\\.'+prop+'\\s'))) { // Hackish and non-standard but can probably detect if setting the property (we don't want to test by instantiating as that may have side-effects)
        return true;
    }
    return (cls[prop] !== undefined &amp;&amp; typeof cls[prop] !== 'function') || (cls.prototype !== undefined &amp;&amp; cls.prototype[prop] !== undefined &amp;&amp; typeof cls.prototype[prop] !== 'function');
}
```
---------------------------------------
*[Brett Zamir](http://bahai-library.com)* on 2008-12-23 06:42:29  
Added one last condition which will find if there is a static members on the class to which an object belongs, as well as some example tests for it as well:

```myClass2.prototype.instanceMethod = function () {}
myClass2.prototype.mine = 'my member';
var_dump(property_exists(new myClass2, 'mine')); //true
var_dump(property_exists(new myClass2, 'xpto'));   //true, as of PHP 5.3.0
var_dump(property_exists(new myClass2, 'bar'));    //false
var_dump(property_exists(new myClass2, 'staticProp'));   //true, as of PHP 5.3.0
var_dump(property_exists(new myClass2, 'staticMethod'));    //false
var_dump(property_exists(new myClass2, 'instanceMethod'));    //false
var myclass2 = new myClass2();
myclass2.staticMethod(); // doesn't exist
```

```function property_exists (cls, prop) {
    cls = (typeof cls === 'string') ? window[cls] : cls;
    if (typeof cls === 'function' &amp;&amp; cls.toSource &amp;&amp; cls.toSource().match(new RegExp('this\\.'+prop+'\\s'))) { // Hackish and non-standard but can probably detect if setting the property (we don't want to test by instantiating as that may have side-effects)
        return true;
    }
    return (cls[prop] !== undefined &amp;&amp; typeof cls[prop] !== 'function') || (cls.prototype !== undefined &amp;&amp; cls.prototype[prop] !== undefined &amp;&amp; typeof cls.prototype[prop] !== 'function') || cls.constructor &amp;&amp; cls.constructor[prop] !== undefined &amp;&amp; typeof cls.constructor[prop] !== 'function';
}```
---------------------------------------
*[Kevin van Zonneveld](http://kevin.vanzonneveld.net)* on 2008-12-30 11:24:24  
@ Brett Zamir: Thanks Brett. I've added the functions. I do have the idea they could be standardized &amp; improved a bit though, but I'll leave that up to the 'future us' :) Let those guys handle it. 

Seriously though: I think the class_exists example I've made should return true, but it doesn't. That's a good one to start with.
---------------------------------------
*[noptets]()* on 2011-06-10 04:22:23  

---------------------------------------
*[Impatty]()* on 2011-06-12 23:05:14  

---------------------------------------
*[pleabok]()* on 2011-06-17 09:05:59  

---------------------------------------
*[Soivory]()* on 2011-06-20 04:17:27  

---------------------------------------
*[Plefand]()* on 2011-08-01 14:32:44  

---------------------------------------
*[Bug in function_exists]()* on 2011-08-05 22:44:40  
Hi guys

Firstly thanks for a great little script!
I am a php programmer and having phpjs is great!

I downloaded the latest version of phpjf and found a bug with the function_exists() function.

When it is compiled the function definition looks like this 
```
function_exists: function (_name: function) {
```
which causes an error.

I don't think its an actual bug in the code, its just in the compilation of the package :)

Thanks again guys
Have a great day
---------------------------------------
*[Brett Zamir](http://brett-zamir.me)* on 2011-08-06 16:20:50  
I assume the compiler might be looking for the text "function_name", so I changed that variable name in the function as a workaround. See if that works...
---------------------------------------
*[entaila1987]()* on 2011-09-09 03:09:13  

---------------------------------------
*[pourrex1981]()* on 2011-09-09 03:55:46  

---------------------------------------
*[Agreern1991]()* on 2011-09-09 04:43:32  

---------------------------------------
*[niduame1990]()* on 2011-09-09 05:30:09  

---------------------------------------
*[soonync1982]()* on 2011-09-09 06:15:51  

---------------------------------------
*[greaste1980]()* on 2011-09-09 07:02:12  

---------------------------------------
*[zolkivy1992]()* on 2011-09-09 07:48:39  

---------------------------------------
*[Merfits1982]()* on 2011-09-09 08:33:36  

---------------------------------------
*[entaila1987]()* on 2011-09-09 15:16:21  

---------------------------------------
*[pourrex1981]()* on 2011-09-09 15:50:30  

---------------------------------------
*[Agreern1991]()* on 2011-09-09 16:26:24  

---------------------------------------
*[niduame1990]()* on 2011-09-09 17:04:38  

---------------------------------------
*[soonync1982]()* on 2011-09-09 17:47:59  

---------------------------------------
*[zolkivy1992]()* on 2011-09-09 18:49:04  

---------------------------------------
*[Merfits1982]()* on 2011-09-09 19:26:12  

---------------------------------------
*[Otherne1981]()* on 2011-09-10 00:25:58  

---------------------------------------
*[Otherne1981]()* on 2011-09-10 01:10:50  

---------------------------------------
*[entaila1987](http://bioty.mayka-tuta.ru
)* on 2011-09-10 19:24:50  

---------------------------------------
*[pourrex1981](http://bioty.mayka-tuta.ru
)* on 2011-09-10 20:05:45  

---------------------------------------
*[Agreern1991](http://bioty.mayka-tuta.ru
)* on 2011-09-10 20:46:24  

---------------------------------------
*[niduame1990](http://bioty.mayka-tuta.ru
)* on 2011-09-10 21:29:04  

---------------------------------------
*[soonync1982](http://bioty.mayka-tuta.ru
)* on 2011-09-10 22:08:07  

---------------------------------------
*[greaste1980](http://bioty.mayka-tuta.ru
)* on 2011-09-10 22:50:28  

---------------------------------------
*[greaste1980](http://bioty.mayka-tuta.ru
)* on 2011-09-10 23:38:53  

---------------------------------------
*[Merfits1982](http://bioty.mayka-tuta.ru
)* on 2011-09-11 00:22:27  

---------------------------------------
*[Otherne1981](http://bioty.mayka-tuta.ru
)* on 2011-09-11 01:05:09  

---------------------------------------
*[entaila1987](http://schaldot.mayka-tuta.ru)* on 2011-09-11 03:33:51  

---------------------------------------
*[pourrex1981](http://decar.mayka-tuta.ru)* on 2011-09-11 04:11:23  

---------------------------------------
*[Agreern1991](http://reli.mayka-tuta.ru)* on 2011-09-11 04:46:07  

---------------------------------------
*[niduame1990](http://scholel.mayka-tuta.ru)* on 2011-09-11 05:20:56  

---------------------------------------
*[soonync1982](http://forto.mayka-tuta.ru)* on 2011-09-11 05:55:40  

---------------------------------------
*[greaste1980](http://starim.mayka-tuta.ru)* on 2011-09-11 06:29:54  

---------------------------------------
*[zolkivy1992](http://reli.mayka-tuta.ru)* on 2011-09-11 07:05:17  

---------------------------------------
*[Merfits1982](http://wietio.mayka-tuta.ru)* on 2011-09-11 07:41:15  

---------------------------------------
*[Otherne1981](http://starim.mayka-tuta.ru)* on 2011-09-11 11:05:55  

---------------------------------------
*[Arignmor]()* on 2011-11-09 08:41:36  

---------------------------------------
*[originalll]()* on 2012-03-28 07:37:35  

---------------------------------------
*[Guergenug](http://sovet4ik.info/)* on 2012-06-16 21:29:42  

---------------------------------------
*[kneesspal]()* on 2012-06-21 00:27:39  

---------------------------------------
