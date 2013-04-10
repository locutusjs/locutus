function stream_filter_register (filtername, classname) {
    // http://kevin.vanzonneveld.net
    // +   original by: Brett Zamir (http://brett-zamir.me)
    // *     example 1: function strtoupper_filter () {}
    // *     example 1: strtoupper_filter.prototype = {filter : function ($in, out, consumed, closing) {return 'PSFS_PASS_ON';}};
    // *     example 1: stream_filter_register('strtoupper', 'strtoupper_filter');
    // *     returns 1: true

    // BEGIN REDUNDANT
    this.php_js = this.php_js || {};
    this.php_js.stream_filters = this.php_js.stream_filters || {};
    // END REDUNDANT

    if (typeof classname === 'string') {
        var win = window; // make configurable by custom phpjs ini later
        classname = win[classname];
    }

    if (this.php_js.stream_filters[filtername]) {
        return false;
    }
    this.php_js.stream_filters[filtername] = classname;
    return true;
}
