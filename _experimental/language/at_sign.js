function at_sign(cb) {  // Could also name as "at", "error_suppressor", etc.
    // http://kevin.vanzonneveld.net
    // +   original by: Brett Zamir (http://brettz9.blogspot.com)
    // *     example 1: at_sign(someFunctionThatMayThrowErrors);
    // *     returns 1: true
    try {
        return cb.apply(null, Array.prototype.slice.call(arguments, 1));
    }
    catch(e){
        $php_errormsg = e.message || e; // Can assign to this global, as in PHP (see http://php.net/manual/en/reserved.variables.phperrormsg.php )
    }
 }
