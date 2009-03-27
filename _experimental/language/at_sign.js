function at_sign(cb) {  // Could also name as "at", "error_suppressor", etc.
    // http://kevin.vanzonneveld.net
    // +   original by: Brett Zamir
    // *     example 1: at_sign(someFunctionThatMayThrowErrors);
    // *     returns 1: true
    try {
        return cb.apply(null, Array.prototype.slice.call(arguments, 1));
    }
    catch(e){
    }
 }
