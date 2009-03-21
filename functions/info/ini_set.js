function ini_set (varname, newvalue) {
    // http://kevin.vanzonneveld.net
    // +   original by: Brett Zamir
    // %        note 1: This will not set a global_value or access level for the ini item
    // *     example 1: ini_set('date.timezone', 'America/Chicago');
    // *     returns 1: 'Asia/Hong_Kong'
	var oldval = '';
	if (!this.php_js) {
		this.php_js = {};
	}
	if (!this.php_js.ini) {
		this.php_js.ini = {};
	}
	if (!this.php_js.ini[varname]) {
		this.php_js.ini[varname] = {};
	}
	oldval = this.php_js.ini[varname].local_value;
	this.php_js.ini[varname].local_value = newvalue;
	return oldval;
}