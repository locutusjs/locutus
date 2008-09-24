function require_once(filename) {
    // http://kevin.vanzonneveld.net
    // +   original by: Michael White (http://getsprink.com)
    // -    depends on: require
    // *     example 1: require_once('http://www.phpjs.org/js/phpjs/_supporters/pj_test_supportfile_2.js');
    // *     returns 1: true

    var cur_file = {};
    cur_file[window.location.href] = 1;

    // save include state for reference by include_once and require_once()
    if (!window.php_js) window.php_js = {};
    if (!window.php_js.includes) window.php_js.includes = cur_file;
    if (!window.php_js.includes[filename]) {
        if (require(filename)) {
            return true;
        }
    } else {
        return true;
    }
}