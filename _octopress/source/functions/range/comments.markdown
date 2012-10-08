*[cfddream](http://hi.chibaole.com/blog)* on 2009-12-06 14:56:06  
This is my 'range' function:
function range(start, end, step){
    var l = arguments.length;
    if(l == 0) return [];
    if(l == 1) return arguments.callee(0, start, 1);
    if(l == 2) return arguments.callee(start, end, 1);
    var temp = []
    start = start>>0, end = end>>0, step = step>>0;
    //console.log(start, end, step);
    for(;start < end; start+= step){
        temp.push(start);
    }
    return temp;
}
range(); // []
range(10); // [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]
range(-10); // []
range(-10, -20); //[]
range(0, 10); //[0, 1, 2, 3, 4, 5, 6, 7, 8, 9]
range(-10, 10, 2); // [-10, -8, -6, -4, -2, 0, 2, 4, 6, 8]
---------------------------------------
*[Kevin van Zonneveld](http://kevin.vanzonneveld.net)* on 2009-12-14 15:40:34  
@ cfddream: Thanks for sharing. Does your function also support alphanumeric ranges like in the 3rd example though?
---------------------------------------
*[George]()* on 2011-03-16 23:20:02  
I just downloaded a build of jPaq that only contains the array functions.  I definitely like how easy dealing with arrays can be.  I used the following code to produce the lower-case letters a through i.
```
Array.range(97,106).forEach(function(num) {
  return String.fromCharCode(num);
})
```

I can also easily emulate the other examples as well with jPaq.  FYI, if you are looking for a neat javascript library that you custom build, make it at http://www.jpaq.org/
---------------------------------------
*[George]()* on 2011-03-16 23:22:17  
I apologize.  The code that you can use from jPaq is this:
```
Array.range(97,106).map(function(num) {
  return String.fromCharCode(num);
})
```
---------------------------------------
*[Brett Zamir](http://brett-zamir.me)* on 2011-03-17 11:12:00  
@George. You can also compile only the functions you need for php.js. Personally speaking, doing "range('a', 'i');" seems easier and clearer than writing multi-stepped non-semantic code, even if that code is in a nice functional style. (It would be nice, I'll admit if our compiler could allow chaining in array functions, possibly stripping of the redundant "array_" prefix as in the PHP API, but in this case the php.js way seems easier.)
---------------------------------------
*[Rocket](http://NTICompassInc.com)* on 2011-05-05 18:23:00  
I found an error with this code.

```
range('1', '10');
```

This makes Google Chrome lock up.

Lines 21 and 22 should be:

```
inival = parseInt(low, 10);
endval = parseInt(high, 10);
```
---------------------------------------
*[????? ???](http://an3m1.com/)* on 2012-04-17 15:27:03  
I have a lot to benefit from this article and thank you for this wonderful effort to this article and will continue my many articles you have other 

---------------------------------------
