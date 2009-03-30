function call_user_func_array(cb, parameters) {
    // http://kevin.vanzonneveld.net
    // +   original by: Thiago Mata (http://thiagomata.blog.com)
    // +   revised  by: Jon Hohle
    // +   improved by: Brett Zamir (http://brettz9.blogspot.com)
    // *     example 1: call_user_func_array('isNaN', ['a']);
    // *     returns 1: true
    // *     example 2: call_user_func_array('isNaN', [1]);
    // *     returns 2: false

    var func;

    if (typeof cb == 'string') {
        if (typeof this[cb] == 'function') {
            func = this[cb];
        } else {
            func = (new Function(null, 'return ' + cb))();
        }
    } else if (cb instanceof Array) {
        func = eval(cb[0]+"['"+cb[1]+"']");
    }
    
    if (typeof func != 'function') {
        throw new Exception(func + ' is not a valid function');
    }

    return func.apply(null, parameters);
}