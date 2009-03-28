function ob_end_clean () {
    // http://kevin.vanzonneveld.net
    // +   original by: Brett Zamir
    // *     example 1: ob_end_clean();
    // *     returns 1: true
    if (!this.php_js || !this.php_js.obs || !this.php_js.obs.length) {
        return false;
    }
    this.php_js.obs.pop();
    return true;
}