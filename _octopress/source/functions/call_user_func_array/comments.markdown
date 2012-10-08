*[Jon Hohle]()* on 2008-08-05 15:32:26  
Here is a cleaner version of call_user_func_array which uses Function:apply. It takes string arg functions or function objects. Because of scoping issues, however, this may behave differently then the method posted above:

call_user_func_array = function(func, parameters) {
    if (typeof func == 'string') {
        if (typeof this[func] == 'function') { func = this[func]; }
        else {
            func = (new Function(null, 'return ' + func))();
        }
        if (typeof func != 'function') {
            throw new Exception(func + ' is not a valid function');
        }
    }
    return func.apply(null, parameters);
}
---------------------------------------
*[Kevin van Zonneveld](http://kevin.vanzonneveld.net)* on 2008-08-27 17:06:10  
@ Jon Hohle: Very good work Jon Hohle! Your version will be included!
---------------------------------------
*[Brett Zamir](http://bahai-library.com)* on 2008-12-20 11:49:24  
Hi,

First, here's a revision. I have a number of differences in mine, some perhaps for better or worse.

1) I can't see any need for the check &quot;if (typeof this[func] == 'function') {&quot;
2) Although 'eval' is not in vogue, I know, the Function constructor is also subject to eval() issues too, so I just used eval().
3) I didn't see any need for &quot;throw new Exception(func + ' is not a valid function');&quot; in the code posted here, since it would already be a function.
4) I allowed a PHP-style array to be given as the callback to supply a object+method (as in the call_user_func() PHP documentation)

```function call_user_func_array (cb, arr) {
    if (typeof cb === 'string') {
        cb = eval(cb);
    }
    else if (cb instanceof Array) {
        cb = eval(cb[0]+&quot;['&quot;+cb[1]+&quot;']&quot;);
    }
    cb.apply(null, arr);
}```

And then, here's a new one, call_user_func():

```function call_user_func (cb) {
    if (typeof cb === 'string') {
        cb = eval(cb);
    }
    else if (cb instanceof Array) {
        cb = eval(cb[0]+&quot;['&quot;+cb[1]+&quot;']&quot;);
    }
    cb.apply(null, Array.prototype.slice.call(arguments, 1));
}```

Works with objects, and regular functions, whether as strings, arrays, or functions.
---------------------------------------
*[Kevin van Zonneveld](http://kevin.vanzonneveld.net)* on 2008-12-30 10:58:07  
@ Brett Zamir: Yes eval is evil so we'll try to minimize it's use as much as possible, I've made some minor adjustments, let me know if it's ok.
---------------------------------------
*[Diplom@t](difane.com)* on 2010-04-28 13:54:02  
Function didn't work for me when i've tried to call it like:
var ma = new A();
call_ser_func_array( array(ma, "foo"), [x] );
An error was thrown:
"Syntax error: Missing ] after element list" pointing on the line with eval.

I have modified the function like one below and it works now:
    
    var func;

    if (typeof cb == 'string') {
        if (typeof this[cb] == 'function') {
            func = this[cb];
        } else {
            func = (new Function(null, 'return ' + cb))();
        }
    } else if (cb instanceof Array) {
        if ( typeof cb[0] == 'string' ) {
            func = eval(cb[0]+"['"+cb[1]+"']");
        } else {
            func = cb[0][cb[1]];
        }
    }
    
    if (typeof func != 'function') {
        throw new Error(func + ' is not a valid function');
    }

    if ( typeof cb[0] == 'string' ) {
      return func.apply(null, parameters);
    } else {
      return func.apply(cb[0], parameters);
    }
---------------------------------------
*[Brett Zamir](http://brett-zamir.me)* on 2010-04-28 18:41:56  
@Diplom@t : Very helpful patch, thank you. I've simplified a bit using the conditional operator and applied against the object when the object is specified as a string (in an array). Feel free to review the changes at http://github.com/kvz/phpjs/raw/master/functions/funchand/call_user_func_array.js and http://github.com/kvz/phpjs/raw/master/functions/funchand/call_user_func.js
---------------------------------------
*[legatee322]()* on 2012-08-04 07:10:30  

---------------------------------------
