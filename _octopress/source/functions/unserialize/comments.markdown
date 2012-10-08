*[Pedro Tainha]()* on 2008-03-20 06:52:43  
Hello!!!

I was searching for this function in javascript a long time ago and happy to finally fond it. But when I tryed didnÂ´t work with me.
I sent an email for the author but he didnÂ´t reply (probably he had no time - no problem), so i had to learn the code and find the problems.
IÂ´m glad because i solved my problem and at the same time, because i never tryed to contribute with something, this was inspiring and i can see that probably anyone can do it as well - DonÂ´t be shy, try it!!! 

(please donÂ´t look at the language errors, IÂ´m from Portugal and I donÂ´t write with much frequency)

Now letÂ´s get with the real stuff, that in reality isnÂ´t so much.

the lines that were changed and comented with: '//changed...'

1. In the array case, the code was only prepared for the number of fields less then 10, now suports any number of fields

2. In the boolean case, the semicolon afther the &quot;0&quot; or &quot;1&quot; boolean variables wasnÂ´t cuted.


Thanks very much to Arpad Ray, you did a great job. This function is very useful for me!!!
And will be for others, i will try to put a great toturial about this function and php using AJAX.
I prefer this instead Json to receive data from php.


The code is above:

```

function unserialize ( inp ) {
    // http://kevin.vanzonneveld.net
    // +   original by: Arpad Ray (mailto:arpad@php.net)
    // *     example 1: unserialize();
    // *     returns 1: ['Kevin', 'van', 'Zonneveld']
	//
 	//*******************************************************************************
	//
	// *   Reviewed at: 19/03/2008
	// +            by: Pedro Tainha (email@pedrotainha.com or pedrotainha@gmail.com)
	//
	// Notes:
	//	Fixed bugs for the cases: 'b'(boolean) and 'a'(array)
	//
	//*******************************************************************************
	
	
    error = 0;
    if (inp == &quot;&quot; || inp.length &lt; 2) {
        errormsg = &quot;input is too short&quot;;
        return;
    }
    var val, kret, vret, cval;
    var type = inp.charAt(0);
    var cont = inp.substring(2);
    var size = 0, divpos = 0, endcont = 0, rest = &quot;&quot;, next = &quot;&quot;;
 
    switch (type) {
    case &quot;N&quot;: // null
        if (inp.charAt(1) != &quot;;&quot;) {
            errormsg = &quot;missing ; for null&quot;;
        }
        // leave val undefined
        rest = cont;
        break;
    case &quot;b&quot;: // boolean
        if (!/[01];/.test(cont.substring(0,2))) {
            errormsg = &quot;value not 0 or 1, or missing ; for boolean&quot;;
        }
        val = (cont.charAt(0) == &quot;1&quot;);
        rest = cont.substring(2);	//changed...
        break;
    case &quot;s&quot;: // string
        val = &quot;&quot;;
        divpos = cont.indexOf(&quot;:&quot;);
        if (divpos == -1) {
            errormsg = &quot;missing : for string&quot;;
            break;
        }
        size = parseInt(cont.substring(0, divpos));
        if (size == 0) {
            if (cont.length - divpos &lt; 4) {
                errormsg = &quot;string is too short&quot;;
                break;
            }
            rest = cont.substring(divpos + 4);
            break;
        }
        if ((cont.length - divpos - size) &lt; 4) {
            errormsg = &quot;string is too short&quot;;
            break;
        }
        if (cont.substring(divpos + 2 + size, divpos + 4 + size) != &quot;\&quot;;&quot;) {
            errormsg = &quot;string is too long, or missing \&quot;;&quot;;
        }
        val = cont.substring(divpos + 2, divpos + 2 + size);
        rest = cont.substring(divpos + 4 + size);
        break;
    case &quot;i&quot;: // integer
    case &quot;d&quot;: // float
	
        var dotfound = 0;
        for (var t = 0; t &lt; cont.length; t++) {
            cval = cont.charAt(t);
            if (isNaN(parseInt(cval)) &amp;&amp; !(type == &quot;d&quot; &amp;&amp; cval == &quot;.&quot; &amp;&amp; !dotfound++)) {
                endcont = t;
                break;
            }
        }
        if (!endcont || cont.charAt(endcont) != &quot;;&quot;) {
            errormsg = &quot;missing or invalid value, or missing ; for int/float&quot;;
        }
        val = cont.substring(0, endcont);
        val = (type == &quot;i&quot; ? parseInt(val) : parseFloat(val));
        rest = cont.substring(endcont + 1);
        break;
    case &quot;a&quot;: // array
        if (cont.length &lt; 4) {
            errormsg = &quot;array is too short&quot;;
            return;
        }
        divpos = cont.indexOf(&quot;:&quot;, 1);
	
        if (divpos == -1) {
            errormsg = &quot;missing : for array&quot;;
            return;
        }
        size = parseInt(cont.substring(1*divpos, 0));  //changed...
	
        cont = cont.substring(divpos + 2);
        val = new Array();
        if (cont.length &lt; 1) {
            errormsg = &quot;array is too short&quot;;
            return;
        }
        for (var i = 0; i + 1 &lt; size * 2; i += 2) {
			
			
            kret = unserialize(cont, 1);
			
            if (error || kret[0] == undefined || kret[1] == &quot;&quot;) {
                errormsg = &quot;missing or invalid key, or missing value for array&quot;;
                return;
            }
			
            vret = unserialize(kret[1], 1);
		
            if (error) {
                errormsg = &quot;invalid value for array&quot;;
                return;
            }
            val[kret[0]] = vret[0];
            cont = vret[1];
        }
		
        if (cont.charAt(0) != &quot;}&quot;) {
            errormsg = &quot;missing ending }, or too many values for array&quot;;
            return;
        }
		
        rest = cont.substring(1);
        break;
    case &quot;O&quot;: // object
        divpos = cont.indexOf(&quot;:&quot;);
        if (divpos == -1) {
            errormsg = &quot;missing : for object&quot;;
            return;
        }
        size = parseInt(cont.substring(0, divpos));
        var objname = cont.substring(divpos + 2, divpos + 2 + size);
        if (cont.substring(divpos + 2 + size, divpos + 4 + size) != &quot;\&quot;:&quot;) {
            errormsg = &quot;object name is too long, or missing \&quot;:&quot;;
            return;
        }
		
        var objprops = unserialize(&quot;a:&quot; + cont.substring(divpos + 4 + size), 1);
		
        if (error) {
            errormsg = &quot;invalid object properties&quot;;
            return;
        }
        rest = objprops[1];
		
        var objout = &quot;function &quot; + objname + &quot;(){&quot;;
        for (key in objprops[0]) {
            objout += &quot;&quot; + key + &quot;=objprops[0]['&quot; + key + &quot;'];&quot;;
        }
        objout += &quot;}val=new &quot; + objname + &quot;();&quot;;
        eval(objout);
        break;
    default:
        errormsg = &quot;invalid input type&quot;;
    }
	
    return (arguments.length == 1 ? val : [val, rest]);
}
```


Pedro Tainha - email@pedrotainha.com

www.pedrotainha.com (in construction)
---------------------------------------
*[Kevin van Zonneveld](http://kevin.vanzonneveld.net)* on 2008-03-20 15:13:16  
@ Pedro Tainha: Awesome! Thanks for the kind words and improved code!
---------------------------------------
*[Devin]()* on 2008-04-03 05:02:21  
You have:
```
if (inp == &quot;&quot; || inp.length &lt; 2) {
```

Isn't the string length of &quot;&quot; &lt; 2 anyway?
How about:
```
if (inp.length &lt; 2) {
```
---------------------------------------
*[Kevin van Zonneveld](http://kevin.vanzonneveld.net)* on 2008-04-03 08:49:21  
@ Devin: Logically you're right but my guess is that Arpad Ray had performance on his mind when writing it like that. 

It's a recursive function so every bit of performance tweaking will help.

I think the first check may be less CPU intensive than the second one. Though the second one probably needs to be in place for arrays and other cases, it is skipped if the first condition is true, thus saving you a calculation.

If you have other thoughts on that please let me know.
---------------------------------------
*[alberto]()* on 2008-04-27 15:22:03  
wouldn't it be better just to transform the php object data to an XML object that is easy to hang by Javascript?
Anybody interested in this way email me albertomelchor@hotmail.com
---------------------------------------
*[Kevin van Zonneveld](http://kevin.vanzonneveld.net)* on 2008-04-28 09:03:20  
@ alberto: Of course there are many ways to transport data between server- and clientside. 

Which way is better depends on your situation. In this project however it's all about mimicking PHP functionality. And serialize &amp; unserialize are two functions that do just that, and I wouldn't be surprised if this is faster then generating &amp; parsing XML. Which is a pretty heavy format actually. 
Best in most cases would probably be JSON though. Because since PHP5, PHP can
```
$json = json_encode($array);
```
And JavaScript can interpret JSON natively:
```
for ( item in json ) {
}
```
JSON will also produce the smallest output compared to XML &amp; serialized arrays.

For safe transportation you may want to additionally:

```
base = base64_encode(json_encode($data));
```

```
data = base64_decode(base);
```

base64 functions have also been ported in this project.
---------------------------------------
*[Lukasz]()* on 2008-06-27 08:11:47  
You have race conditions in your code
for the unserialize. That is you have return statement on multiple lines which sometimes but not always causes the an error

Example:
######################
var deserializedArray = unserialize(serializedObject);

var x = deserializedArray['someFiled'];

######################

Sometimes if  I want to use the field ['someField'] of the deserializedArray immediately on the next line of code after calling the function unserialize I get the error saying that deserializedArray['someFiled'] has no properites. This is caused beacuse YOU HAVE RETUNED FROM THE FUNCTION BEFORE YOU HAVE FINISHED DESERIALIZING ALL THE FIELDS, AND THE CODE CONTINUES. I guess it is the way you used recursion that is the problem. 

The actual output from Firebug:
######################
unserialize() finished ::
unserialize() finished ::
unserialize() finished ::
unserialize() finished ::
unserialize() finished ::
unserialize() finished ::
unserialize() finished ::
unserialize() finished ::
unserialize() finished ::
unserialize() finished ::
unserialize() finished ::
unserialize() finished ::
unserialize() finished ::
unserialize() finished ::
unserialize() finished ::
unserialize() finished ::
unserialize() finished ::
unserialize() finished ::
unserialize() finished ::
unserialize() finished ::
unserialize() finished ::
unserialize() finished ::
unserialize() finished ::
unserializeResp has no properties
[Break on this error] var anonsArr = unserializeResp['anons_media']
######################
---------------------------------------
*[Kevin van Zonneveld](http://kevin.vanzonneveld.net)* on 2008-07-17 22:16:09  
@ Lukasz: Can you post me the serializedObject  so we can test it?
---------------------------------------
*[Bug when key names have spaces]()* on 2008-07-22 18:18:26  
I have really enjoyed using these php.js functions. They sure make it easy for a PHP developer to use JavaScript

I have been using unserialize() on Firefox 3.0 and noticed that if the key name contains spaces they are not unserialized correctly. Down near the end of the function, right before it eval()'s the code, replace this code with the following:

Buggy code:
```
for (key in objprops[0]) {
	objout += &quot;&quot; + key + &quot;=objprops[0]['&quot; + key + &quot;'];&quot;;
}```

Fixed code:
```
for (key in objprops[0]) {
	objout += &quot;this['&quot; + key + &quot;']=objprops[0]['&quot; + key + &quot;'];&quot;;
}```

dptr1988
---------------------------------------
*[Kevin van Zonneveld](http://kevin.vanzonneveld.net)* on 2008-07-22 20:02:33  
@ dptr1988: I've committed your fix and credited you accordingly. Thank you very much dptr1988!!
---------------------------------------
*[nimbus]()* on 2008-07-28 15:17:47  
serializing arrays has two major flaws:

a) non-numeric indexes cause the function to break!

b) negative values break your function!

did you test your code at all?!

please fix or at least tell people - it took me quite a while to find that out!
:-(
---------------------------------------
*[Kevin van Zonneveld](http://kevin.vanzonneveld.net)* on 2008-08-27 16:32:56  
@ nimbus: This has been caused by a logic-mistake. JavaScript distincts associative arrays from objects. PHP does not. I've made some adjustments to correct the behaviour &amp; increase compatibility with PHP.

And for as testing the functions, I've just finished writing a CLI script that can now test functions from the commandline, so expect the quality to be higher in the near future.

Of course, input (ideas for tests, improvements) by readers is very much appreciated.
---------------------------------------
*[Jakub]()* on 2008-09-11 15:50:16  
Hi,
I have noticed that for some strings, this 'for' should be executed 'length -1' not 'length' times:
```
        for(var i = 0;i &lt; length;i++){
            var chr = data.slice(offset + (i - 1),offset + i);
            buf.push(chr);
        }
```
when I have changed it to:
```
        for(var i = 0;i &lt; length-1;i++){
            var chr = data.slice(offset + (i - 1),offset + i);
            buf.push(chr);
        }
```
it has worked well.

BTW. You are doing a great job here.
---------------------------------------
*[Kevin van Zonneveld](http://kevin.vanzonneveld.net)* on 2008-09-13 15:45:58  
@ Jakub: Thanks for contributing to our project. When I implement your change and test it, I get the following error from rhino:

```
kevin@trinity:~/workspace/plutonia-phpjs/_tools$ ./phpjstest.php unserialize
Exception in thread &quot;Thread-0&quot; org.mozilla.javascript.JavaScriptException: [object Error] (/home/kevin/workspace/plutonia-phpjs/functions/var/unserialize.js#16)
	at org.mozilla.javascript.gen.c4._c2(Unknown Source)
	at org.mozilla.javascript.gen.c4.call(Unknown Source)
	at org.mozilla.javascript.optimizer.OptRuntime.callName(OptRuntime.java:97)
	at org.mozilla.javascript.gen.c4._c5(Unknown Source)
	at org.mozilla.javascript.gen.c4.call(Unknown Source)
	at org.mozilla.javascript.optimizer.OptRuntime.callName(OptRuntime.java:97)
	at org.mozilla.javascript.gen.c4._c5(Unknown Source)
	at org.mozilla.javascript.gen.c4.call(Unknown Source)
	at org.mozilla.javascript.optimizer.OptRuntime.callName(OptRuntime.java:97)
	at org.mozilla.javascript.gen.c4._c1(Unknown Source)
	at org.mozilla.javascript.gen.c4.call(Unknown Source)
	at org.mozilla.javascript.optimizer.OptRuntime.callName(OptRuntime.java:97)
	at org.mozilla.javascript.gen.c1._c1(Unknown Source)
	at org.mozilla.javascript.gen.c1.call(Unknown Source)
	at org.mozilla.javascript.ScriptRuntime.applyOrCall(ScriptRuntime.java:2234)
	at org.mozilla.javascript.BaseFunction.execIdCall(BaseFunction.java:257)
	at org.mozilla.javascript.IdFunctionObject.call(IdFunctionObject.java:127)
	at org.mozilla.javascript.optimizer.OptRuntime.call2(OptRuntime.java:76)
	at org.mozilla.javascript.gen.c2._c17(Unknown Source)
	at org.mozilla.javascript.gen.c2.call(Unknown Source)
	at org.mozilla.javascript.optimizer.OptRuntime.call1(OptRuntime.java:66)
	at org.mozilla.javascript.gen.c2._c4(Unknown Source)
	at org.mozilla.javascript.gen.c2.call(Unknown Source)
	at org.mozilla.javascript.optimizer.OptRuntime.callProp0(OptRuntime.java:119)
	at org.mozilla.javascript.gen.c2._c107(Unknown Source)
	at org.mozilla.javascript.gen.c2.call(Unknown Source)
	at org.mozilla.javascript.ContextFactory.doTopCall(ContextFactory.java:393)
	at org.mozilla.javascript.ScriptRuntime.doTopCall(ScriptRuntime.java:2834)
	at org.mozilla.javascript.gen.c2.call(Unknown Source)
	at org.mozilla.javascript.Context.call(Context.java:548)
	at org.mozilla.javascript.JavaAdapter.callMethod(JavaAdapter.java:507)
	at adapter1.run(&lt;adapter&gt;)
	at java.lang.Thread.run(Thread.java:619)
```
---------------------------------------
*[Kate](http://www.exploretheearth.info)* on 2008-09-17 17:35:17  
Thank you so much for allowing me the opportunity to visit this site.
---------------------------------------
*[Alind]()* on 2008-12-17 06:54:32  
Unserialize function is not working for Javascript Objects can u tell me something related with this.....
---------------------------------------
*[Kevin van Zonneveld](http://kevin.vanzonneveld.net)* on 2008-12-17 14:35:48  
@ Alind: It would really help if you could supply the exact code that fails so we can take a look at it, fix it, and add it as testcase to it stays fixed in the future as well. Would that be possible?
---------------------------------------
*[Thomas Buschhardt]()* on 2009-04-02 16:41:01  
Hallo, thanx for the code. How can I read the length of the list you returned in Example 1? Is this an array?
I try
```
var testArray=unserialize(someStuff);
alert(testArray.length);
```
with no luck

Bye Thomas
---------------------------------------
*[Kevin van Zonneveld](http://kevin.vanzonneveld.net)* on 2009-04-03 16:52:29  
Why not use count :)
---------------------------------------
*[Brett Zamir]()* on 2009-04-03 19:25:15  
Hi Thomas,

In PHP.JS, we return objects often where arrays are used in PHP. This is because JavaScript has no other way to represent associative-arrays--arrays in which the indexes are either not all numerical, or are not numbered sequentially from 0 and/or by 1..

Here's the link to count() as Kevin pointed out: http://phpjs.org/functions/view/count/ which does counting of objects too...
---------------------------------------
*[Chris]()* on 2009-06-26 17:53:19  
Regarding this code:
```            case 'b':
                typeconvert = function (x) {return parseInt(x, 10) == 1;};```
I don't know that this could ever matter, but it should technically be `return parseInt(x, 10) != 0` because all non-zero values are true.
---------------------------------------
*[James]()* on 2009-06-29 01:10:16  
Had a problem using this on FF 3.5b4. The browser was having trouble at determining what data was so I had to make the following change:

```
return _unserialize(data, 0)[2];
```

to

```
return _unserialize(String(data), 0)[2];
```
---------------------------------------
*[Kevin van Zonneveld](http://kevin.vanzonneveld.net)* on 2009-07-03 13:48:27  
@ Chris + James: Thanks for your fixes guys, I've added them to SVN
---------------------------------------
*[k_de surya](kdenotes.blogspot.com)* on 2009-07-07 03:45:44  
thanks for the code...
---------------------------------------
*[fer]()* on 2009-07-16 05:01:17  
thanks 

does not work well with accents such as: á
---------------------------------------
*[Martin](www.erlenwiese.de)* on 2009-08-23 21:58:50  
This does not work with german umlauts (ö, ä, ü, ß). 

I get the following message:

Unknown / Unhandled data type(s):

I'm wondering, why there is a call of "encodeURIComponent" in the serialize function but no "decodeURIComponent" in the unserialize function. Maybe it has something to do with this!?

```
   var test = {
    a: "Martin",
    b: "Schmidt",
    c: "äöüß",
    d: "&&%%$$" };

  var x = serialize(test);
  var test2 = unserialize(x);
```
---------------------------------------
*[Martin](www.erlenwiese.de)* on 2009-08-24 08:53:27  
In opposite to the php unserialize function this one cannot handle utf8 strings. If you call utf8_encode() before you call unserialize() and run the returned data through utf8_decode(), it works fine. But to have the same functionality as the php function, this should be part of the unserialize function.
---------------------------------------
*[Kevin van Zonneveld](http://kevin.vanzonneveld.net)* on 2009-09-04 18:31:31  
@ Martin: Good point. The base64 encoding function have utf8 dependencies too, so we might as well add them to the serialize functions.

Added to our new git rep:
http://github.com/kvz/phpjs/commit/80ef918e43ffe015c241cb31d35b3afafada7d33
---------------------------------------
*[Le Torbi](http://www.letorbi.de)* on 2009-09-26 17:47:14  
Hi guys,

I just fixed the utf8 issue. The problem was, that the given size represents the length in bytes, but it was interpreted as if it is the length in characters. I fixed it by calculating the size in bytes of each character and reducing the length accordingly. Here is the code:

```
var read_chrs = function (data, offset, length){
    var buf;

    buf = [];
    for (var i = 0;i < length;i++){
        var chr = data.slice(offset + (i - 1),offset + i);
        buf.push(chr);
        length -= utf8Overhead(chr); // NEW LINE
    }
    return [buf.length, buf.join('')];
};
var utf8Overhead = function(char) { // NEW FUNCTION
    var code = char.charCodeAt(0);
    if (code < 0x0080)
        return 0;
    if (code < 0x0800)
         return 1;
    return 2;
};
```

I've also written a faster method to calculate the string length in bytes for the serialize() function. See my posting there for details.

BTW: What do I have to to to get this into the official code?

Bai
Le Torbi
---------------------------------------
*[Le Torbi](http://www.letorbi.de)* on 2009-09-26 19:02:12  
Whoops, I guess my bug is another than the one discussed below my post.

The problem is (or was) that strings, which contain special chars (like German umlauts or Japanese), have some additional chars after they have been unserialized. For example 's:6:"höhö":s:3:"abc"' became 'höhö":' and 'abc' (": was added to the string with the umlauts).

However, the code I've postetd below fixes this issue.

PS: ö is one character (German umlaut oe) not two (just in case it'll be screwed up when posted).
---------------------------------------
*[Frank]()* on 2009-10-08 18:05:58  
This black background is horrible and makes it a pain to read this site!
---------------------------------------
*[Kevin van Zonneveld](http://kevin.vanzonneveld.net)* on 2009-10-08 22:07:50  
@ Le Torbi: Wow big kuddos to you! I must say I would have never thought of that. Thanks a lot Le Torbi!

We will include this in the official repo. It will be online shortly. Thanks again!
---------------------------------------
*[Kevin van Zonneveld](http://kevin.vanzonneveld.net)* on 2009-10-08 22:59:22  
@ Frank: Thanks for voicing your opinion : )
We're no designers. How do you like the new comment-code colors?
---------------------------------------
*[kilops]()* on 2009-11-03 07:15:12  
This function is giving me some troubles, throwing error : "Function utf8_decode() does not exists --- Line ... 120"

Original code :
```
case 's':
(...)

// Length was calculated on an utf-8 encoded string
// so wait with decoding
readdata = this.utf8_decode(readdata);

break;
case 'a':
(...)
```


I changed to :
```
case 's':
(...)

// Length was calculated on an utf-8 encoded string
// so wait with decoding
readdata = PHP_JS.prototype.utf8_decode(readdata);

break;
case 'a':
(...)
```


I don't really know why but using "PHP_JS.prototype." instead of "this." fix my problem (despite the fact it's supposed to be the same object as far as I know)


FYI :
I'm using the namespaced version on FF 3.5.3
and the serialize function may have the same problem.
---------------------------------------
*[Brett Zamir](http://brett-zamir.me)* on 2009-11-03 09:25:28  
@kilops: Fixed at http://github.com/kvz/phpjs/commit/ce785027aeff2a1461ff54d5fd44d35b2f2d68d7 . When we made function calls use 'this', I may have overlooked a few nested function cases where we have to declare "that" (or something) outside of the nested functions and then refer to "that" inside the nested functions (since "this" has a different meaning depending on the function it is in and how it is used). 

In this case (no pun intended), since "this" in a non-instantiated function refers to the global window object, and since you were using the namespaced version, it wasn't finding the method in the global namespace (as it shouldn't unless you redeclared it there). Using the "that" convention lets us drop through the "that" variable to the inner function so it can have access to the "this" on the enclosing method. Hope that makes sense.

If not, see http://www.crockford.com/javascript/private.html  
---------------------------------------
*[kilops]()* on 2009-11-03 19:02:24  
Thanx "Brett Zamir" for the explanation.

And thx again for crediting me the fix despite I only came with the bug and a bad workaround.

If I see something else like that i'll keep you in touch.


ps: hurray for PHP.JS and everyone making it.
---------------------------------------
*[Brett Zamir](http://brett-zamir.me)* on 2009-11-04 03:39:57  
@kilops, our pleasure. Kevin set up a good pattern of crediting people I think, and indeed pointing out bugs should get credit since it is the first step in fixing them! Also thanks for the positive feedback and for keeping your eye out for any other bugs...
---------------------------------------
*[Lyle Pratt](baylor.edu)* on 2009-11-04 09:40:10  
Hello,

I am having some serious problems using this script in all versions of IE.

The error is getting thrown at line 146 (from the code excerpt on this page). It seems that that switch statement is getting defaulted a few times and its throwing off the whole unserialization.

Can someone take a look at this? Im in a pretty big bind at the moment.

Here is a sample of what I am trying to unserialize that is failing (works in Chrome, safari, and FF):
```
a:18:{s:10:"fa_essay_1";a:4:{s:7:"storage";s:16:"Essay Question 1";s:5:"value";s:8:"testfest";s:2:"id";s:10:"fa_essay_1";s:5:"group";s:10:"fa_essay_1";}s:10:"fa_essay_2";a:4:{s:7:"storage";s:16:"Essay Question 2";s:5:"value";s:16:"unset_this_value";s:2:"id";s:10:"fa_essay_2";s:5:"group";s:10:"fa_essay_2";}s:15:"form_first_name";a:4:{s:7:"storage";s:10:"First Name";s:5:"value";s:7:"Bobby J";s:2:"id";s:15:"form_first_name";s:5:"group";s:15:"form_first_name";}s:16:"form_middle_name";a:4:{s:7:"storage";s:11:"Middle Name";s:5:"value";s:2:"P.";s:2:"id";s:16:"form_middle_name";s:5:"group";s:16:"form_middle_name";}s:14:"form_last_name";a:4:{s:7:"storage";s:9:"Last Name";s:5:"value";s:6:"Baylor";s:2:"id";s:14:"form_last_name";s:5:"group";s:14:"form_last_name";}s:19:"form_preferred_name";a:4:{s:7:"storage";s:14:"Preferred Name";s:5:"value";s:5:"Bubba";s:2:"id";s:19:"form_preferred_name";s:5:"group";s:19:"form_preferred_name";}s:13:"form_birthday";a:4:{s:7:"storage";s:8:"Birthday";s:5:"value";s:9:"12-JUN-62";s:2:"id";s:13:"form_birthday";s:5:"group";s:13:"form_birthday";}s:11:"form_gender";a:4:{s:7:"storage";s:6:"Gender";s:5:"value";s:1:"M";s:2:"id";s:11:"form_gender";s:5:"group";s:11:"form_gender";}s:12:"form_country";a:4:{s:7:"storage";s:7:"Country";s:5:"value";s:13:"United States";s:2:"id";s:12:"form_country";s:5:"group";s:12:"form_country";}s:12:"form_address";a:4:{s:7:"storage";s:7:"Address";s:5:"value";s:24:"107 West Denison Drive ";s:2:"id";s:12:"form_address";s:5:"group";s:12:"form_address";}s:10:"form_phone";a:4:{s:7:"storage";s:12:"Phone Number";s:5:"value";s:16:"unset_this_value";s:2:"id";s:10:"form_phone";s:5:"group";s:10:"form_phone";}s:10:"form_email";a:4:{s:7:"storage";s:5:"Email";s:5:"value";s:34:"Bobby_Baylor-University@baylor.edu";s:2:"id";s:10:"form_email";s:5:"group";s:10:"form_email";}s:10:"form_major";a:4:{s:7:"storage";s:5:"Major";s:5:"value";s:10:"Accounting";s:2:"id";s:10:"form_major";s:5:"group";s:10:"form_major";}s:19:"form_classification";a:4:{s:7:"storage";s:14:"Classification";s:5:"value";s:8:"Freshman";s:2:"id";s:19:"form_classification";s:5:"group";s:19:"form_classification";}s:16:"fa_art_interests";a:4:{s:7:"storage";s:13:"Art Interests";s:5:"value";s:8:"testfest";s:2:"id";s:16:"fa_art_interests";s:5:"group";s:16:"fa_art_interests";}s:17:"fa_film_interests";a:4:{s:7:"storage";s:32:"Film and Digital Media Interests";s:5:"value";s:16:"unset_this_value";s:2:"id";s:17:"fa_film_interests";s:5:"group";s:17:"fa_film_interests";}s:18:"fa_music_interests";a:4:{s:7:"storage";s:15:"Music Interests";s:5:"value";s:16:"unset_this_value";s:2:"id";s:18:"fa_music_interests";s:5:"group";s:18:"fa_music_interests";}s:20:"fa_theatre_interests";a:4:{s:7:"storage";s:22:"Theatre Arts Interests";s:5:"value";s:16:"unset_this_value";s:2:"id";s:20:"fa_theatre_interests";s:5:"group";s:20:"fa_theatre_interests";}}
```


---------------------------------------
*[Brett Zamir](http://brett-zamir.me)* on 2009-11-07 13:54:23  
@Lyle Pratt: By altering the error message to return the offset, it seems that the function is running into problems where you have a space at the end of a string (i.e., after "107 West Denison Drive") if that helps you or someone else to debug this. Not sure if the space is being dropped somewhere or something...
---------------------------------------
*[plotas](http://rokdd.de/s/scripts/)* on 2010-02-19 09:28:28  
Hi your function looks great but it does not work for me in FF 3.5 .. i get always the error:```Error: that.window[type] is not a constructor
Source File: file:///E:/Dienste/FirefoxPortable/Data/profile/extensions/%7Be4a8a97b-f2ed-450b-b12d-ee082ba24781%7D/components/greasemonkey.js
Line: 1305```
well maybe that is because try to use in greasemonkey? any idea? Thaanks!
---------------------------------------
*[Brett Zamir](http://brett-zamir.me)* on 2010-02-19 12:12:51  
@plotas: It looks as though you are trying to use it within an XPCOM component. Is that right? If so, as with also JavaScript code modules (see https://developer.mozilla.org/en/JavaScript_code_modules ), certain JavaScript environments do not automatically include a window object. 

So, you can either pass in a window object to the component at some point to initialize the window used by the component (esp. if you need a particular window, though that is not important in this case), or you may be able to simply use this to define "window".  It is possible that just using "window" could cause errors (I believe I've tried to redefine "alert" in that context and couldn't use it either), in such case, just rename "window", but hopefully you won't have to do that.

If your code that is using unserialize() is on an object/class you'll need to ensure "window" is defined as a property of the object; otherwise, it can be defined globally within the component.

```this.window = Components.classes['@mozilla.org/appshell/appShellService;1'].getService(Components.interfaces.nsIAppShellService).hiddenDOMWindow;```

I believe there is another way to get a window in such code too, but the above works for me.

Note that in regular client-side JS, "this.window" will translate to "window.window" which conveniently for us, simply refers back to the window object. Same effect I believe in XPCOM and code modules.

Depending on your needs, if you weren't aware, Firefox also includes the JSON (see https://developer.mozilla.org/en/JSON , though maybe you need nsIJSON for XPCOM code: https://developer.mozilla.org/en/nsIJSON ) for object serialization.
---------------------------------------
*[mscdex]()* on 2010-05-04 23:25:09  
I'm having the same problem as Alind (this function doesn't seem to support PHP objects). I am attempting to unserialize a PHP session, but the session string starts with:
```
breadCrumbs|O:15:"BreadCrumbStack":3:{s:22:" BreadCrumbStack stack";a:2:{i:0;a:6:{s:7:"item_id"; ......
```

What happens as a result of unserializing this string is that the function sees the first 'b' in 'breadCrumbs' and thinks it found a boolean value, which causes unserialize() to return a value of true in this case.

Is there a (already existing) fix for this?
---------------------------------------
*[]()* on 2010-05-04 23:48:11  
@mscdex: I don't think PHP sessions can be unserialized in PHP itself. The format a PHP session is stored in (the one you provided) differs from the format serialize($_SESSION) would return, which is what you need to use. However, after looking at the code above for the unserialize function, I don't see a case statement for "O," so you're right that this function won't work with objects.
---------------------------------------
*[mansur muzafarov]()* on 2010-10-27 12:27:59  
it doesn't work with arrays

http://www.phpguru.org/downloads/PHP_Unserialize/PHP_Unserialize.js

here you can find working example
---------------------------------------
*[ramonlechuga](http://twitter.com/ramonlechuga)* on 2011-04-17 20:42:35  
Great! Is so nice to find this , an already made function of unserialize and serialize :D you save my time thank you so much.
---------------------------------------
*[Dj]()* on 2011-06-01 15:09:10  
Adding the following code to the switch statement will allow you to unserialize php objects to javascript array.
So you can take a string that was serialized by the php serialize() function and unserialize it with the javascript function.

```
case 'o':
				readdata = {};
	
				ccount = read_until(data, dataoffset, ':');
				chrs = ccount[0];
				stringlength = ccount[1];
				dataoffset += chrs + 2;
	
				readData = read_chrs(data, dataoffset + 1, parseInt(stringlength, 10));
				chrs = readData[0];
				var className = readData[1];
				dataoffset += chrs + 2;
				
				if (chrs == parseInt(stringlength, 10) || chrs == className.length) {
					keyandchrs = read_until(data, dataoffset, ':');
					chrs = keyandchrs[0];
					keys = keyandchrs[1];
					dataoffset += chrs + 2;
		
					for (var i = 0; i < parseInt(keys, 10); i++){
						var kprops = _unserialize(data, dataoffset);
						var kchrs = kprops[1];
						var key = kprops[2];
						dataoffset += kchrs;
		
						var vprops = _unserialize(data, dataoffset);
						var vchrs = vprops[1];
						var value = vprops[2];
						dataoffset += vchrs;
						
						//Ignore non public properties (first char of key is null)
						if (typeof value !== 'undefined'
							&& typeof key === 'string'
							&& key.charCodeAt(0)
						) {
							readdata[key] = value;
						}
					}
		
					dataoffset += 1;
				}
				break;
```
---------------------------------------
*[]()* on 2011-06-20 15:19:45  
Hi,



I dont understand why is this decoding from utf8. I was getting wierd characters, so I just commented the uft8_decode function. It's cool now (I use utf8 only or whenever possible)
---------------------------------------
*[Diana](http://www.webonedivision.net)* on 2012-04-10 06:18:43  
Great stuff, both serialize and unserialize work great for arrays!
Thank you very much.
---------------------------------------
*[Anum]()* on 2012-05-01 06:47:07  
It gave me [object Object] as an output, i dont understand whats happening here.
---------------------------------------
*[Jaroslaw Czarniak]()* on 2012-06-07 18:48:32  
Unserialize doesn't work (again) with german umlauts (ö, ä, ü, ß) and other not latin characters.

for example folowing code:
```
var test = {
    a: "Martin",
    b: "Schmidt",
    c: "äöüß",
    d: "&&%%$$" };

  var x = serialize(test);
  var test2 = unserialize(x);
```

return:

```
a => "Martin"
b => "Schmidt"
c => "䶼߀"
d => "&&%%$$"
```

is there any way to fix it ?

---------------------------------------
*[Brett Zamir](http://brett-zamir.me)* on 2012-07-10 16:28:50  
@Jaroslaw Czarniak: I have fixed this in Git. Hopefully we can keep this function (and all others) friendly to UTF8 which everyone should be using now anyways.
---------------------------------------
*[Brett Zamir](http://brett-zamir.me)* on 2012-07-10 16:31:35  
@Anum: You mean it is giving you the string "[object Object]" as output, or you are expecting an object? This should be converting a properly serialized string into an object. If you are getting the string, do you have sample code?
---------------------------------------
