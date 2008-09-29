function get_included_files() {
    // http://kevin.vanzonneveld.net
    // +   original by: Michael White (http://getsprink.com)
    // *     example 1: get_included_files();
    // *     returns 1: ['http://kevin.vanzonneveld.net/pj_tester.php']

    var cur_file = {};
    cur_file[window.location.href] = 1;
    if(!this.__php_js) this.__php_js = {};
    if(!this.__php_js.includes) this.__php_js.includes = cur_file;

    var includes = new Array();
    var i = 0;
    for(var key in this.__php_js.includes){
        includes[i] = key;
        i++;
    }

    return includes;
}