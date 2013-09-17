function stream_wrapper_restore (protocol) {
    // http://kevin.vanzonneveld.net
    // +   original by: Brett Zamir (http://brett-zamir.me)
    // *     example 1: stream_wrapper_restore('http');
    // *     returns 1: true

    if (!this.php_js || !this.php_js.default_stream_wrappers || !this.php_js.default_stream_wrappers[protocol] ||
            !this.php_js.default_stream_wrappers[protocol].disabled
        ) {
        return false;
    }
    this.php_js.default_stream_wrappers[protocol].disabled = false;

    return true;
}
