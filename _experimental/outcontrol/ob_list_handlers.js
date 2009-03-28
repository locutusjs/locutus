function ob_list_handlers () {
    // http://kevin.vanzonneveld.net
    // +   original by: Brett Zamir
    // *     example 1: ob_list_handlers();
    // *     returns 1: ['default output handler', 'myOwnHandler']

	var i=0, arr=[], name='', cbname=this.php_js.obs[i].callback.name;
    
	if (!this.php_js || !this.php_js.obs || !this.php_js.obs.length) {
		if (this.php_js.ini && this.php_js.ini['output_buffering'] && (typeof this.php_js.ini['output_buffering'].local_value !== 'string' || this.php_js.ini['output_buffering'].local_value.toLowerCase() !== 'off')) {
			return ['default output handler']; // PHP doesn't return output_handler ini, even if it is set
		}
		return arr;
	}
	for (i=0; i < this.php_js.obs.length; i++) {
		name = cbname === '' ? 'default output handler' : cbname === 'URLRewriter' ? 'URL-Rewriter' : cbname;
		arr.push(name);
	}
	return arr;
}