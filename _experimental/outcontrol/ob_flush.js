function ob_flush () {
    // http://kevin.vanzonneveld.net
    // +   original by: Brett Zamir (http://brettz9.blogspot.com)
    // *     example 1: ob_flush();
    // *     returns 1: undefined

    if (!this.php_js || !this.php_js.obs || !this.php_js.obs.length) {
        return;
    }
    this.echo(this.php_js.obs[this.php_js.obs.length-1].buffer);
    this.php_js.obs[this.php_js.obs.length-1].buffer = '';
}