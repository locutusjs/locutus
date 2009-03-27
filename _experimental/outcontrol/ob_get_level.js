function ob_get_level () {
	if (!this.php_js || !this.php_js.obs || !this.php_js.obs.length) {
		if (this.php_js.ini && this.php_js.ini['output_buffering'] && (typeof this.php_js.ini['output_buffering'].local_value !== 'string' || this.php_js.ini['output_buffering'].local_value.toLowerCase() !== 'off')) {
			return 1;
		}
		return 0;
	}
	return this.php_js.obs.length;
}