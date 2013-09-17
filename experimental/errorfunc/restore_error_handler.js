function restore_error_handler () {
    // http://kevin.vanzonneveld.net
    // +   original by: Brett Zamir (http://brett-zamir.me)
    // *     example 1: restore_error_handler();
    // *     returns 1: true

    // Fix: Docs suggest can revert to built-in function; where/how is it set? in ini somewhere?

    if (!this.php_js || !this.php_js.previous_error_handler) {
        return true; // function always returns true
    }

    this.php_js.error_handler = this.php_js.previous_error_handler;

    return true;
}
