function flush () {
    // http://kevin.vanzonneveld.net
    // +   original by: Brett Zamir (http://brettz9.blogspot.com)
    // *     example 1: flush();
    // *     returns 1: undefined

    // Not distinct from ob_flush() in JavaScript, since not sending to a browser
    if (!this.php_js || !this.php_js.obs || !this.php_js.obs.length) {
        return;
    }
    this.echo(this.php_js.obs[this.php_js.obs.length-1].buffer);
    this.php_js.obs[this.php_js.obs.length-1].buffer = '';
}