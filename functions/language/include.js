function include( filename ) {
    // http://kevin.vanzonneveld.net
    // +   original by: mdsjack (http://www.mdsjack.bo.it)
    // +   improved by: Legaev Andrey
    // +   improved by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)
    // +   improved by: Michael White (http://crestidg.com)
    // %        note 1: Force Javascript execution to pause until the file is loaded. Usually causes failure if the file never loads. ( Use sparingly! )
    // *     example 1: include('/pj_test_supportfile_2.js');
    // *     returns 1: 1

    var js = document.createElement('script');
    js.setAttribute('type', 'text/javascript');
    js.setAttribute('src', filename);
    js.setAttribute('defer', 'defer');
    document.getElementsByTagName('HEAD')[0].appendChild(js);

    // save include state for reference by include_once
    var cur_file = {};
    cur_file[window.location.href] = 1;

    if (!window.php_js) window.php_js = {};
    if (!window.php_js.includes) window.php_js.includes = cur_file;
    if (!window.php_js.includes[filename]) {
        window.php_js.includes[filename] = 1;
    } else {
        window.php_js.includes[filename]++;
    }

    return window.php_js.includes[filename];
}