function stream_wrapper_unregister (protocol) {
    // http://kevin.vanzonneveld.net
    // +   original by: Brett Zamir (http://brett-zamir.me)
    // *     example 1: stream_wrapper_unregister('var');
    // *     returns 1: true

    // BEGIN REDUNDANT
    this.php_js = this.php_js || {};
    this.php_js.stream_wrappers = this.php_js.stream_wrappers || {};
    this.php_js.default_stream_wrappers = this.php_js.default_stream_wrappers || {};
    // END REDUNDANT

    if (this.php_js.stream_wrappers[protocol]) {
        delete this.php_js.stream_wrappers[protocol]; // in case there is a user-registered one
    }
    else {
        if (!this.php_js.default_stream_wrappers[protocol]) {
            this.php_js.default_stream_wrappers[protocol] = {};
        }
        this.php_js.default_stream_wrappers[protocol].disabled = true;
    }

    return true;
}
