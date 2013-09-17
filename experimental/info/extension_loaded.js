function extension_loaded (name) {
    // http://kevin.vanzonneveld.net
    // +   original by: Brett Zamir (http://brett-zamir.me)
    // *     example 1: extension_loaded('strings');
    // *     returns 1: true

    return !!(this.php_js && this.php_js.ini && this.php_js.ini['phpjs.loaded_extensions'] && // dl() also ensures indexOf is added for IE
                    this.php_js.ini['phpjs.loaded_extensions'].local_value.indexOf(name) !== -1);
}
