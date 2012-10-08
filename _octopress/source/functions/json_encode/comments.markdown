*[T.J. Leahy]()* on 2009-06-17 06:06:07  
This function should check to see if the browser has native JSON encoding first (IE8, FF 3.5) and use that when available. Would make it faster and safer then running the object against multiple regular expressions. See http://hacks.mozilla.org/2009/06/security-performance-native-json/

```
if (typeof JSON == "object" && typeof JSON.stringify == "function") {
    return JSON.stringify(str_json);
}
```

---------------------------------------
*[Brett Zamir](http://bahai-library.com)* on 2009-06-18 06:55:21  
@T. J. Leahy:  Fixed in SVN. Thanks for the report! See also my note at http://phpjs.org/functions/json_decode:456#comment_64602
---------------------------------------
*[Michael White](http://getsprink.com/)* on 2009-10-18 02:38:03  
The part that uses native browser JSON objects should be contained in a try/catch block and return the proper value in accordance with how PHP handles bad input. (The only bad input in PHP seems to be resource objects). Should we return "null" or an empty string or false here upon error?

```
try {
    return json.stringify(mixed_val);
}
catch(err) {
    return mixed_val;
}

```
---------------------------------------
*[Brett Zamir](http://brett-zamir.me)* on 2009-10-18 07:20:33  
@Michael: If you try it with a resource object, what does it return in PHP?  See also my comment in json_decode().
---------------------------------------
*[Michael White](http://getsprink.com/)* on 2009-10-20 03:13:43  
@kevin I didn't know what it returned because last time I ran into this in PHP I was encountering an infinite loop because of it (long story). However, I tested it in a simple script just now and I'm getting NULL output. It also throws a PHP error warning that the type is unsupported. This happens if a resource is present anywhere in the data to be encoded.
---------------------------------------
*[Kevin van Zonneveld](http://kevin.vanzonneveld.net)* on 2009-10-25 14:08:02  
@ Michael White: Ok great that you did the research on this Michael!

I've implemented your fixes: 
http://github.com/kvz/phpjs/commit/cae72555c08c11ec416f1c8ecfcd5e42509cb46d
---------------------------------------
*[Brett Zamir](http://brett-zamir.me)* on 2009-10-26 00:49:03  
Have made a fix (NULL to null) and added support for json_last_error(); see commits at http://github.com/kvz/phpjs/commits/master/
---------------------------------------
*[Kevin van Zonneveld](http://kevin.vanzonneveld.net)* on 2009-11-07 18:14:41  
Excellent!
---------------------------------------
*[felix]()* on 2010-04-20 01:52:35  
Hi

as already listed above, PHPJS_Resource is not defined. This triggers an unexpected error for me at least if I try to use this function standalone (FF 3.5.9).
How about changing lines ## 95-97 to:
```
if (PHPJS_Resource && value instanceof PHPJS_Resource) {                        
    throw new SyntaxError('json_encode');
}
```
?
---------------------------------------
*[Brett Zamir](http://brett-zamir.me)* on 2010-04-20 08:00:39  
Fixed in Git. Thanks for pointing out the problem, felix. Btw, one can't only check for a variable like that (as one can in PHP) since your example will also cause an undefined error. In JS, you have to test a variable as a property, including against the global:

e.g., these are ok:
if (window.someVar) {}
if (this.someVar) {}

but this is not:
if (someVar) {}

---------------------------------------
*[tony]()* on 2010-11-05 10:32:30  
this function has a problem with ie8.. it says it expects an hex number near line 50
---------------------------------------
*[Brett Zamir](http://brett-zamir.me)* on 2010-11-05 14:14:37  
@tony: Can you give the sample you are trying to encode...
---------------------------------------
*[4545](2423)* on 2012-02-09 14:53:07  
432
---------------------------------------
*[????? ????](http://an3m1.com/)* on 2012-03-22 13:56:33  
News articles and new in the world of tourism 

---------------------------------------
