function at(cb) {  // Could also name as "at_sign", "silence", "error_suppressor", etc.
    // http://kevin.vanzonneveld.net
    // +   original by: Brett Zamir (http://brettz9.blogspot.com)
	// %          note 1: Also implements the "scream" extension to undo the effect of at(); can do "ini_set('scream.enabled', true);"
    // *     example 1: at_sign(someFunctionThatMayThrowErrors);
    // *     returns 1: true
    try {
        return cb.apply(null, Array.prototype.slice.call(arguments, 1));
    }
    catch(e){
        $php_errormsg = e.message || e; // Can assign to this global, as in PHP (see http://php.net/manual/en/reserved.variables.phperrormsg.php )
        if (this.php_js && this.php_js.ini && 
            (this.php_js.ini['scream.enabled'].local_value === true ||
                this.php_js.ini['scream.enabled'].local_value === 1 ||
                this.php_js.ini['scream.enabled'].local_value === '1'
            )) {
            throw e;
        }
    }
}

