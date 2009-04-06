function runkit_function_add (funcname, arglist, code) {
    // http://kevin.vanzonneveld.net
    // +   original by: Brett Zamir (http://brettz9.blogspot.com)
	// %          note 1: Function can only be added to the global context; use create_function() for an anonymous function
    // *     example 1: runkit_function_add('add', 'a, b', "return (a + b);");
    // *     returns 1: true

    if (window[funcname] !== undefined) { // Presumably disallows adding where exists, since there is also redefine function
        return false;
    }
    
    try {
        window[funcname] = Function.apply(null, arglist.split(',').concat(code));
        return true;
    }
    catch (e) {
        return false;
    }
}