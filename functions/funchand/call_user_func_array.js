function call_user_func_array(func, parameters) {
    // http://kevin.vanzonneveld.net
    // +   original by: Thiago Mata (http://thiagomata.blog.com)
    // +   revised  by: Jon Hohle
    // *     example 1: call_user_func_array('isNaN', ['a']);
    // *     returns 1: true
    // *     example 2: call_user_func_array('isNaN', [1]);
    // *     returns 2: false

    if (typeof func == 'string') {
        if (typeof this[func] == 'function') { 
            func = this[func]; 
        } else {
            func = (new Function(null, 'return ' + func))();
        }
        
        if (typeof func != 'function') {
            throw new Exception(func + ' is not a valid function');
        }
    }
    
    return func.apply(null, parameters);
}