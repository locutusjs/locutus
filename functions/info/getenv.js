function getenv (varname) {
	// http://kevin.vanzonneveld.net
	// +   original by: Brett Zamir
	// %        note 1: We are not using $_ENV as in PHP, you could define
    // %        note 1: "$_ENV = window.php_js.ENV;" and get/set accordingly
    // %        note 2: Returns e.g. 'en-US' when set global php_js.ENV is set
	// *     example 1: getenv('LC_ALL');
	// *     returns 1: false
    
	if (!window.php_js || !window.php_js.ENV || !window.php_js.ENV[varname]) {
		return false;
	}
    
	return window.php_js.ENV[varname];
}
