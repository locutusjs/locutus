function ob_clean () {
    // http://kevin.vanzonneveld.net
    // +   original by: Brett Zamir (http://brett-zamir.me)
    // *     example 1: ob_clean();
    // *     returns 1: undefined
    if (!this.php_js || !this.php_js.obs || !this.php_js.obs.length) {
        return;
    }
    this.php_js.obs[this.php_js.obs.length-1].buffer = '';
}