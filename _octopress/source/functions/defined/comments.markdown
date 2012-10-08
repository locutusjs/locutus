*[Brett Zamir](http://bahai-library.com)* on 2008-12-21 02:42:10  
Here's an implementation which works with the 'const' keyword. Tested with NaN, booleans, numbers, strings, arrays, objects, regular expression literals.

```
const a = 5;
var b = 5;
alert(defined('a')); // true 
alert(defined('b'));  // false

function defined (constant) {
    var tmp = window[constant];    
    window[constant] = window[constant] ? 'changed'+window[constant].toString() : 'not-null';
    if (typeof window[constant] === 'number' &amp;&amp; isNaN(window[constant])) { // NaN
        return typeof tmp === typeof window[constant];
    }
    return window[constant] === tmp;
}
```
---------------------------------------
*[Brett Zamir](http://bahai-library.com)* on 2008-12-21 07:41:18  
Whoops... forgot to reassign the variable I temporarily changed:

```function defined (constant) {
    var returnval;
    var tmp = window[constant];    
    window[constant] = window[constant] ? 'changed'+window[constant].toString() : 'not-null';
    if (typeof window[constant] === 'number' &amp;&amp; isNaN(window[constant])) { // NaN
        returnval = typeof tmp === typeof window[constant];
        if (!returnval) {
            window[constant] = tmp;
        }
        return returnval;
    }
    returnval = window[constant] === tmp;
    if (!returnval) {
        window[constant] = tmp;
    }
    return returnval;
}
```
---------------------------------------
*[Kevin van Zonneveld](http://kevin.vanzonneveld.net)* on 2008-12-30 12:33:35  
@ Brett Zamir: If I'm not mistaken you are reassigning the variable a value to make sure it really is a constant.

If it's not set, you set it to not-null? That part I don't get.
Then, if it's a number AND it's not a number (?!) and the types of the original &amp; newly set var do not match you reset it to it's original value. But if they do match you leave the 'changed' keyword there? I don't understand that.

One concern that comes to surface is that you are changing a user variable (if they accidentally specify a variable instead of a const).

If the function fails or there is a parallel process, a the changed value will be returned.

Could you explain a bit more about this approach? I'm just not getting it I guess.
---------------------------------------
*[Brett Zamir](http://bahai-library.com)* on 2009-01-23 17:04:03  
Ok, as far as &quot;not-null&quot;, that should be changed to &quot;changed&quot; (to be more clear). That is just providing some way to ensure that an undefined variable will return false (since &quot;changed&quot; will not equal 'undefined'). We need to do some test for whether it is defined, since it will otherwise throw an error. This is safe since the value will be reset back to its original value (in this case to undefined).

As far as the NaN issue in the function... NaN is actually is considered to be typeof number, but that was redundant, and I shouldn't have handled it as a constant anyways because I've since discovered NaN, Infinity, and undefined are all variables in JavaScript--you can change them!

The only way that adding the 'changed' keyword to the &quot;variable&quot; could result in the same value as the original temporary variable is if the original was a constant. For example, (non-constant) objects or arrays will have their toString() methods called, but they will get an additional string &quot;changed&quot; appended, so they can never match (and thus the variable will get set back to its original value).

As far as failing, I don't see any reason which could cause it to fail--do you? (if it crashed at that point, the changed variable would be meaningless anyways). 

As far as a parallel process, even if the person is using a setTimeout &quot;thread&quot;, my understanding is that the function must fully complete before yielding since JavaScript doesn't have true threads. So the variable should always get set back, as far as I can tell.

(Off the subject, but speaking of setTimeout, I just realized we could allow passing of PHP-style callbacks-as-strings into JavaScript functions by calling setTimeout with a 0 ms timeout (optionally building arguments to pass in as necessary).)

```
var a = function(b){alert('aaa');}
runCallback('a')
function runCallback (cb) {
    var a = setTimeout(cb+&quot;()&quot;,0) 
}
```

Ok, now here's the simplified defined() function:

```function defined (constant) {
    var tmp = window[constant];
    window[constant] = window[constant] ? 'changed'+window[constant].toString() : 'changed';
    var returnval = window[constant] === tmp;
    if (!returnval) { // Reset
        window[constant] = tmp;
    }
    return returnval;
}```
---------------------------------------
*[Kevin van Zonneveld](http://kevin.vanzonneveld.net)* on 2009-01-25 14:58:09  
@ Brett Zamir: You convinced me! Interesting idea about the callbacks as well!
---------------------------------------
*[Brett Zamir](http://bahai-library.com)* on 2009-01-26 12:45:29  
As far as the callbacks-as-strings, on second thought, just using window[funcName]() (or building a function with an inner function if hard-wiring arguments is needed) avoids the eval()ish nature of setTimeout-with-1st-arg-as-string. But it was a fun thought... :)
---------------------------------------
*[danny morabito](http://www.newsocialife.com)* on 2012-02-05 20:33:35  
sorry, but isn't simplier:
```
return this.window[const_name] === undefined ? false: true;
```
?
---------------------------------------
*[Brett Zamir](http://brett-zamir.me)* on 2012-02-06 04:25:16  
@danny morabito: This is not just checking whether a variable exists. In such a case "return this.window[const_name] !== undefined" would work. This is looking for a genuine constant which cannot be altered.
---------------------------------------
*[????? ????? ???](http://an3m1.com/)* on 2012-04-11 15:43:41  
I agree it is a very informative article and I actually enjoy reading good stuff unlike all the crap out there on the internet

---------------------------------------
*[Xexys]()* on 2012-09-01 17:09:46  
Hello!
I'm trying to use such construction

```
if (!defined('MY_CONST'))
        define('MY_CONST', "some text");
```

And I get an error 'TypeError: redeclaration of var MY_CONST'

but this works correct

```
if (!defined('MY_CONST')) {
        delete MY_CONST;
        define('MY_CONST', "some text");
}
```

May be you can fix?

---------------------------------------
