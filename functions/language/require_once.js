function require_once(filename) {
    // http://kevin.vanzonneveld.net
    // +   original by: Michael White (http://getsprink.com)
    // +      input by: Brett Zamir (http://brettz9.blogspot.com)
    // +   bugfixed by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)
    // %        note 1: Uses global: php_js to keep track of included files
    // -    depends on: require
    // *     example 1: require_once('http://www.phpjs.org/js/phpjs/_supporters/pj_test_supportfile_2.js');
    // *     returns 1: true

    var cur_file = {};
    cur_file[window.location.href] = 1;

    // save include state for reference by include_once and require_once()
    if (!this.php_js) {
	    this.php_js = {};
	}
    if (!this.php_js.includes) {
	    this.php_js.includes = cur_file;
	}
    if (!this.php_js.includes[filename]) {
        if (require(filename)) {
            return true;
        }
    } else {
        return true;
    }
    return false;
}