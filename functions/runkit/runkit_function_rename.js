function runkit_function_rename (funcname, newname) {
    // http://kevin.vanzonneveld.net
    // +   original by: Brett Zamir (http://brettz9.blogspot.com)
	// %          note 1: Function can only be copied to and from the global context
    // *     example 1: function plus (a, b) { return (a + b); }
    // *     example 1: runkit_function_rename('plus', 'add');
    // *     returns 1: true

    if (typeof window[newname] !== 'function' || window[funcname] !== undefined) { //  (presumably disallow overwriting existing variables)
        return false;
    }
    window[newname] = window[funcname];
    delete window[funcname];
    return true;
}