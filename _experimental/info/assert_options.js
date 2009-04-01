function assert_options (what, value) {

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
	
	var ini, dflt;
	switch(what) {
		case 'ASSERT_ACTIVE':
			ini = 'assert.active';
			dflt = 1;
			break;
		case 'ASSERT_WARNING':
			ini = 'assert.warning';
			dflt = 1;
			throw 'There are no warnings for us to throw in JavaScript for assert_options()';
			break;
		case 'ASSERT_BAIL':
			ini = 'assert.bail';
			dflt = 0;
			break;
		case 'ASSERT_QUIET_EVAL':
			ini = 'assert.quiet_eval';
			dflt = 0;
			break;
		case 'ASSERT_CALLBACK':
			ini = 'assert.callback';
			dflt = null;
			break;
		default:
			throw 'Improper type for assert_options()';
			break;
	}
	var originalValue = this.php_js.assert_values[what] || (this.php_js.ini[ini] && this.php_js.ini[ini].local_value) || dflt;
	
	if (value) {
		this.php_js.assert_values[ini] = value; // We use 'ini' instead of 'what' as key to be more convenient for assert() to test for current value
	}
	return originalValue;
}
