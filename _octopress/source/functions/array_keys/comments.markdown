*[Ates Goral]()* on 2008-01-22 04:20:11  
Hey Kevin, here's my implementation for array_change_key_case().

```
var CASE_LOWER = 0;
var CASE_UPPER = 1;

function array_change_key_case(array) {
    // *     example 1: array_change_key_case(42);
    // *     returns 1: false
    // *     example 2: array_change_key_case([ 3, 5 ]);
    // *     returns 2: {0: 3, 1: 5}
    // *     example 3: array_change_key_case({ FuBaR: 42 });
    // *     returns 3: {&quot;fubar&quot;: 42}
    // *     example 4: array_change_key_case({ FuBaR: 42 }, CASE_LOWER);
    // *     returns 4: {&quot;fubar&quot;: 42}
    // *     example 5: array_change_key_case({ FuBaR: 42 }, CASE_UPPER);
    // *     returns 5: {&quot;FUBAR&quot;: 42}
    // *     example 6: array_change_key_case({ FuBaR: 42 }, 2);
    // *     returns 6: {&quot;FUBAR&quot;: 42}
    
    if (array instanceof Array) {
        return array;
    }
    
    if (array instanceof Object) {
        var case_fn = (arguments.length == 1 || arguments[1] == CASE_LOWER) ?
                &quot;toLowerCase&quot; : &quot;toUpperCase&quot;;
        var ret = new Object();
        
        for (var key in array) {
            ret[key[case_fn]()] = array[key];    
        }
        
        return ret;
    }
    
    return false;
}
```
---------------------------------------
*[Ates Goral]()* on 2008-01-22 04:22:08  
Hmmm. I should change that to:

```
const CASE_LOWER = 0;
const CASE_UPPER = 1;
```
---------------------------------------
*[Kevin van Zonneveld](http://kevin.vanzonneveld.net)* on 2008-01-22 08:46:41  
@ Ates Goral: Nice work, added!
---------------------------------------
*[Mickael]()* on 2010-01-12 10:44:01  
Hi,
I test this function with Mozilla Firefox 3.5.7 but it does not work.
I think that Mozilla has a bug concerning "for in" syntax.

Thanks for all scripts, PHP.JS is a very good work :)
---------------------------------------
*[Brett Zamir](http://brett-zamir.me)* on 2010-01-12 13:35:10  
Hello Mickael,

This should definitely be working in Firefox, as that is what i use to test it. Can you please give example code which causes the problem for you? Are you using any other libraries with your code like Prototype?
---------------------------------------
*[JeromeM]()* on 2010-05-12 11:04:33  
Doesn't seem to work on Safari 4 ..
Neither on Safari 3.x (i'm actually developping for iPhone / iPad).
---------------------------------------
*[Brett Zamir](http://brett-zamir.me)* on 2010-05-12 19:36:21  
@JeromeM: Can you provide some sample data where it is not working? Are you using the latest version? (see "raw js source" link on this page) What errors? The example is working for me
---------------------------------------
*[jd]()* on 2011-02-16 18:12:42  
Shouldn't line 11 be:

var tmp_arr = []
(i.e. not curly brackets)
---------------------------------------
*[Brett Zamir](http://brett-zamir.me)* on 2011-02-18 05:37:28  
@jd: Yes, in this function, I see no reason we shouldn't return a genuine array, since PHP is not preserving keys of an original array here but is just starting fresh (and is only producing a sequential numeric array). I've fixed in Git. Some of our other functions, however, our constrained to return an object in order to preserve keys and/or to avoid returning confusing arrays which have "undefined" interspersed throughout.
---------------------------------------
*[P]()* on 2011-06-12 22:30:23  
The raw seems to be different than the site's copy, and in the raw copy there's a cs variable that's unaccounted for.
---------------------------------------
*[Brett Zamir](http://brett-zamir.me)* on 2011-06-13 06:13:33  
@P: Fixed in Git. Thanks for the report!
---------------------------------------
*[????? ???](http://an3m1.com/)* on 2012-04-04 14:24:20  
I have a lot to benefit from this article and thank you for this wonderful effort to this article and will continue my many articles you have other   

---------------------------------------
