function set_time_limit(seconds) {
    // http://kevin.vanzonneveld.net
    // +   original by: Brett Zamir (http://brettz9.blogspot.com)
    // *     example 1: set_time_limit(4);
    // *     returns 1: undefined
    if (!this.php_js) {
        this.php_js = {};
    }

    this.window.setTimeout(function () {
        if (!this.php_js.timeoutStatus) {
            this.php_js.timeoutStatus = true;
        }
        throw 'Maximum execution time exceeded';
    }, seconds*1000);
}