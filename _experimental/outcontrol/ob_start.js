function ob_start (output_callback, chunk_size, erase) {
	// BEGIN REDUNDANT
	if (!this.php_js) {
		this.php_js = {};
	}
	if (!this.php_js.obs) {
		this.php_js.obs = []; // Array for nestable buffers
	}
	// END REDUNDANT
	if (typeof output_callback === 'string') {
		if (typeof window[output_callback] === 'function') {
			output_callback = window[output_callback]; // callback expressed as a string (PHP-style)
		}
		else {
			return false;
		}
	}
	this.php_js.obs.push({erase:erase, chunk_size:chunk_size, callback:output_callback, buffer:''});
	return true;
}