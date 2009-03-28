function ob_list_handlers () {
	
	var i=0, arr=[], name='';
	if (!this.php_js || !this.php_js.obs || !this.php_js.obs.length) {
		if (this.php_js.ini && this.php_js.ini['output_buffering'] && (typeof this.php_js.ini['output_buffering'].local_value !== 'string' || this.php_js.ini['output_buffering'].local_value.toLowerCase() !== 'off')) {
			return ['default output handler']; // PHP doesn't return output_handler ini, even if it is set
		}
		return arr;
	}
	for (i=0; i < this.php_js.obs.length; i++) {
		name = this.php_js.obs[i].callback.name === '' ? 'default output handler' : this.php_js.obs[i].callback.name;
		arr.push(name);
	}
	return arr;
}