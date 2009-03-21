function include_once( filename ) {
    // http://kevin.vanzonneveld.net
    // +   original by: Legaev Andrey
    // +   improved by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)
    // +   improved by: Michael White (http://getsprink.com)
    // +      input by: Brett Zamir
    // +   bugfixed by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)
    // -    depends on: include
    // %        note 1: Uses global: php_js to keep track of included files
    // *     example 1: include_once('http://www.phpjs.org/js/phpjs/_supporters/pj_test_supportfile_2.js');
    // *     returns 1: true

    var cur_file = {};
    cur_file[window.location.href] = 1;

    if (!this.php_js) this.php_js = {};
    if (!this.php_js.includes) this.php_js.includes = cur_file;
    if (!this.php_js.includes[filename]) {
        if(include(filename)){
            return true;
        }
    } else{
        return true;
    }
    return false;
}