function connection_aborted() {
    // http://kevin.vanzonneveld.net
    // +   original by: Brett Zamir (http://brett-zamir.me)
    // *     example 1: connection_aborted();
    // *     returns 1: 0

    // BEGIN REDUNDANT
    this.php_js = this.php_js || {};
    this.php_js.abortStatus = this.php_js.abortStatus || 0;
    // END REDUNDANT

    // These functions should really be set automatically (added with addEventListener once), but for now this function can be used as a trigger to set these checks up
    var that = this;
    this.window.onabort = function (e){
        if (!that.php_js.ignoreAbort) {
            that.php_js.abortStatus = 1;
        }
    };
    this.window.onunload = function (e){
        if (!that.php_js.ignoreAbort) {
            that.php_js.abortStatus = 1;
        }
    };
    this.window.onstop = function (e){
        if (!that.php_js.ignoreAbort) {
            that.php_js.abortStatus = 1;
        }
    };

    return this.php_js.abortStatus;
}
