function get_included_files() {
    // http://kevin.vanzonneveld.net
    // +   original by: Michael White (http://getsprink.com)
    // *     example 1: get_included_files();
    // *     returns 1: ['http://kevin.vanzonneveld.net/pj_tester.php']

    var cur_file = {};
    cur_file[window.location.href] = 1;
    if(!php_js) php_js = {};
    if(!php_js.includes) php_js.includes = cur_file;

    var includes = [];
    var i = 0;
    for(var key in php_js.includes){
        includes[i] = key;
        i++;
    }

    return includes;
}