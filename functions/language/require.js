function require( filename ) {
    // http://kevin.vanzonneveld.net
    // +   original by: Michael White (http://getsprink.com)
    // +   improved by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)
    // +      input by: Brett Zamir (http://brettz9.blogspot.com)
    // +   bugfixed by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)
    // %        note 1: Force Javascript execution to pause until the file is loaded. Usually causes failure if the file never loads. ( Use sparingly! )
    // %        note 2: Uses global: php_js to keep track of included files
    // -    depends on: file_get_contents
    // *     example 1: require('http://www.phpjs.org/js/phpjs/_supporters/pj_test_supportfile_2.js');
    // *     returns 1: 2

    var js_code = this.file_get_contents(filename);
    var script_block = document.createElementNS ? document.createElementNS('http://www.w3.org/1999/xhtml', 'script') : document.createElement('script');
    script_block.type = 'text/javascript';
    var client_pc = navigator.userAgent.toLowerCase();
    if((client_pc.indexOf("msie") != -1) && (client_pc.indexOf("opera") == -1)) {
        script_block.text = js_code;
    } else {
        script_block.appendChild(document.createTextNode(js_code));
    }
    
    if (typeof(script_block) != "undefined") {
        document.getElementsByTagNameNS ? document.getElementsByTagNameNS('http://www.w3.org/1999/xhtml', 'head')[0].appendChild(script_block) : document.getElementsByTagName('head')[0].appendChild(script_block);

        // save include state for reference by include_once and require_once()
        var cur_file = {};
        cur_file[this.window.location.href] = 1;

        if (!this.php_js) {
            this.php_js = {};
        }
        if (!this.php_js.includes) {
            this.php_js.includes = cur_file;
        }

        if (!this.php_js.includes[filename]) {
            this.php_js.includes[filename] = 1;
            return 1;
        } else {
            return ++this.php_js.includes[filename];
        }
    }
    return 0;
}