function get_magic_quotes_runtime () {
    // http://kevin.vanzonneveld.net
    // +   original by: Brett Zamir (http://brett-zamir.me)
    // %        note 1: Besides being deprecated in PHP, magic quotes is not implemented within our
    // %        note 1: functions; here merely to indicate how the function could be accessed by our functions
    // *     example 1: get_magic_quotes_gpc();
    // *     returns 1: false

    return !!(this.php_js && this.php_js.ini && this.php_js.ini['magic_quotes_runtime'] &&
                    this.php_js.ini['magic_quotes_runtime'].local_value);
}
