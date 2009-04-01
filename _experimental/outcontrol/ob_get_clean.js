function ob_get_clean () {
    // http://kevin.vanzonneveld.net
    // +   original by: Brett Zamir (http://brettz9.blogspot.com)
    // *     example 1: ob_get_clean();
    // *     returns 1: 'some buffer contents'
    var buffer = '';
    if (!this.php_js || !this.php_js.obs || !this.php_js.obs.length) {
        return false;
    }
    buffer = this.php_js.obs[this.php_js.obs.length-1].buffer;
    this.php_js.obs.pop();
    return buffer;
}