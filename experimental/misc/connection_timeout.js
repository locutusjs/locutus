function connection_timeout () {
    // http://kevin.vanzonneveld.net
    // +   original by: Brett Zamir (http://brett-zamir.me)
    // *     example 1: connection_timeout();
    // *     returns 1: 0

    return this.php_js && this.php_js.timeoutStatus ? 1 : 0;
}
