function stream_get_wrappers () {
    // http://kevin.vanzonneveld.net
    // +   original by: Brett Zamir (http://brett-zamir.me)
    // *     example 1: stream_get_wrappers();
    // *     returns 1: ['php', 'file', 'http']

    var p = '', retArr = [];

    // BEGIN REDUNDANT
    this.php_js = this.php_js || {};
    this.php_js.stream_wrappers = this.php_js.stream_wrappers || {};
    this.php_js.default_stream_wrappers = this.php_js.default_stream_wrappers || {};
    // END REDUNDANT

    for (p in this.php_js.default_stream_wrappers) {
        retArr.push(p);
    }
    for (p in this.php_js.stream_wrappers) {
        retArr.push(p);
    }
    return retArr;
}
