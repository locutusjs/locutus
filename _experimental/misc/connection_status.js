function connection_status () {
    // http://kevin.vanzonneveld.net
    // +   original by: Brett Zamir (http://brett-zamir.me)
    // *     example 1: connection_status();
    // *     returns 1: 3

    var ret = 0; // NORMAL
    if (this.php_js && this.php_js.abortStatus) {
        ret += 1; // ABORTED
    }
    if (this.php_js && this.php_js.timeoutStatus) {
        ret += 2; // TIMEOUT
    }
    return ret;
}
