function php_check_syntax (filename, error_message) {
    // http://kevin.vanzonneveld.net
    // +   original by: Brett Zamir (http://brett-zamir.me)
    // -    depends on: ob_start
    // -    depends on: file_get_contents
    // -    depends on: ob_end_clean
    // %          note 1: Relies on eval(), so use, if at all, with caution
    // %          note 2: error_message, if used, must be a string referring to a global variable name
    // *     example 1: var myErr = '';
    // *     example 1: php_check_syntax('http://kevin.vanzonneveld.net/pj_test_supportfile_1.htm', 'myErr');
    // *     returns 1: false

    // Should not output contents, but will evaluate, as per PHP
    this.ob_start();
    try {
        eval(file_get_contents(filename));
    }
    catch (e) {
        if (error_message) {
            this.window[error_message] = e.message;
        }
        return false;
    }
    this.ob_end_clean();
    return true;
}
