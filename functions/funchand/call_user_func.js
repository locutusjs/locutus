function call_user_func(cb, parameters) {
    // http://kevin.vanzonneveld.net
    // +   original by: Brett Zamir
    // +   improved by: 
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

    func.apply(null, Array.prototype.slice.call(parameters, 1));
}