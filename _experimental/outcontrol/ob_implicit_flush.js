function ob_implicit_flush () {
    // http://kevin.vanzonneveld.net
    // +   original by: Brett Zamir (http://brett-zamir.me)
    // *     example 1: ob_implicit_flush();
    // *     returns 1: undefined
    // BEGIN REDUNDANT
    this.php_js = this.php_js || {};
    // END REDUNDANT
    var phpjs = this.php_js;
    phpjs.ob_implicit_flush = !phpjs.ob_implicit_flush;
}
