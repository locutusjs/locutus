function ob_get_contents () {
	if (!this.php_js || !this.php_js.obs || !this.php_js.obs.length) {
		if (this.php_js.ini && this.php_js.ini['output_buffering'] && (typeof this.php_js.ini['output_buffering'].local_value !== 'string' || this.php_js.ini['output_buffering'].local_value.toLowerCase() !== 'off')) {
			return ''; // If output was already buffered, it would be available in this.php_js.obs
		}
		return false;
	}
	return this.php_js.obs[this.php_js.obs.length-1].buffer; // Retrieve most recently added buffer contents
}