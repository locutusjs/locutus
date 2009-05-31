function include_once( filename ) {
    // http://kevin.vanzonneveld.net
    // +   original by: Legaev Andrey
    // +   improved by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)
    // +   improved by: Michael White (http://getsprink.com)
    // +      input by: Brett Zamir (http://brett-zamir.me)
    // +   bugfixed by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)
    // -    depends on: include
    // %        note 1: Uses global: php_js to keep track of included files
    // *     example 1: include_once('http://www.phpjs.org/js/phpjs/_supporters/pj_test_supportfile_2.js');
    // *     returns 1: true

    var cur_file = {};
    cur_file[this.window.location.href] = 1;

    // BEGIN REDUNDANT
    php_js_shared = php_js_shared || {}; // We use a non-namespaced global here since we wish to share across all instances
    // END REDUNDANT
    if (!php_js_shared.includes) {
        php_js_shared.includes = cur_file;
    }
    if (!php_js_shared.includes[filename]) {
        if(this.include(filename)){
            return true;
        }
    } else{
        return true;
    }
    return false;
}