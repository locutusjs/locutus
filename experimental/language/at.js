function at(cb) {  // Could also name as "at_sign", "silence", "error_suppressor", etc.
    // http://kevin.vanzonneveld.net
    // +   original by: Brett Zamir (http://brett-zamir.me)
    // %          note 1: Allows assignment to $php_errormsg global (http://php.net/manual/en/reserved.variables.phperrormsg.php)
    // %          note 2: Also implements the "scream" extension to undo the effect of at(); can do "ini_set('scream.enabled', true);"
    // *     example 1: at(someFunctionThatMayThrowErrors);
    // *     returns 1: undefined

    // Perhaps could be configured to return the appropriate value in case of errors (no doubt it would usually be 'false')

    try {
        return cb.apply(null, Array.prototype.slice.call(arguments, 1));
    }
    catch (e){
        // BEGIN REDUNDANT
        this.php_js = this.php_js || {};
        this.php_js.ini = this.php_js.ini || {};
        // END REDUNDANT
        this.php_js.last_error = {message:e.message, file:e.fileName, line:e.lineNumber, type:e.type || 1};
        if (this.php_js.ini.track_errors &&
            (
                (this.php_js.ini.track_errors.local_value.toString().toLowerCase &&
                    (this.php_js.ini.track_errors.local_value.toString().toLowerCase() === 'on' ||
                    this.php_js.ini.track_errors.local_value.toString().toLowerCase() === 'true')) ||
                parseInt(this.php_js.ini.track_errors.local_value, 10) === 1
            )
        ) {
            $php_errormsg = e.message || e; // Can assign to this global, as in PHP (see http://php.net/manual/en/reserved.variables.phperrormsg.php )
        }
        if (this.php_js.ini['scream.enabled'] &&
            (
                this.php_js.ini['scream.enabled'].local_value.toString().toLowerCase() === 'on' ||
                this.php_js.ini['scream.enabled'].local_value.toString().toLowerCase() === 'true' ||
                parseInt(this.php_js.ini['scream.enabled'].local_value, 10) === 1
            )) {
            throw e;
        }
    }
}
