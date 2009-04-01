function ob_implicit_flush () {
    // http://kevin.vanzonneveld.net
    // +   original by: Brett Zamir (http://brettz9.blogspot.com)
    // *     example 1: ob_implicit_flush();
    // *     returns 1: undefined
	// BEGIN REDUNDANT
	if (!this.php_js) {
		this.php_js = {};
	}
	// END REDUNDANT
	if (!this.php_js.ob_implicit_flush) {
		this.php_js.ob_implicit_flush = true;
        return;
	}
    this.php_js.ob_implicit_flush = !this.php_js.ob_implicit_flush;
}