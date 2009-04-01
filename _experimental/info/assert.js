function assert (assertion) {
	var result = assertion, callback, retVal;
	
	// BEGIN REDUNDANT
	if (!this.php_js) {
		this.php_js = {};
	}
	if (!this.php_js.assert_values) {
		this.php_js.assert_values = {};
	}
	if (!this.php_js.ini) {
		this.php_js.ini = {};
	}
	// END REDUNDANT
	
	var getOption = function (value) {
		if (this.php_js.assert_values[value]) {
			return this.php_js.assert_values[value];
		}
		if (this.php_js.ini[value]) {
			return this.php_js.ini[value].local_value;
		}
		switch(value) {
			case 'assert.active':
				return 1;
			case 'assert.warning': // Don't need this now
				//return 1;
				throw 'There are no warnings for us to throw in JavaScript for assert_options()';
			case 'assert.bail':
				return 0;
			case 'assert.quiet_eval':
				return 0;
			case 'assert.callback':
				return null;
			default:
				throw 'There was some problem';
		}
	};

	if (!getOption('assert.active')) {
		return false; // is this correct? should callbacks still execute? Should still bail if on?
	}
	
	if (typeof assertion === 'string') { // Less overhead when assertion checking is off, allows message of exact code to callback
		try {
			result = eval(assertion);
			retVal = result !== false; // return false if false, otherwise, return true	
		}
		catch(e) {
			if (retVal === false) {
				callback = getOption('assert.callback');
				if (typeof callback === 'string') {
					callback = window[callback];
				}
				callback(window.location.href, e.lineNumber, assertion);
			}
			if (getOption('assert.bail')) {
				throw 'Assertion bailed'; // No way to bail without throwing an exception (and there are no "warnings" in JavaScript for us to throw)
			}
			if (!getOption('assert.quiet_eval')) {
				throw e;
			}
		}
	}
	
	return retVal;
}