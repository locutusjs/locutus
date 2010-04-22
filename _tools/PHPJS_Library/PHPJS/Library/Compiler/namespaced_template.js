// jslint.com configuration options. See: http://wiki.github.com/kvz/phpjs/jslint-options
/* global window */
/* jslint adsafe: false, bitwise: false, browser: false, cap: false, css: false, debug: false, devel: false, eqeqeq: true, evil: false, forin: false, fragment: false, immed: true, indent: 4, laxbreak: false, maxerr: 100, maxlen: 80, newcap: true, nomen: false, on: true, onevar: false, passfail: false, plusplus: false, regexp: false, rhino: false, safe: false, sidebar: false, strict: false, sub: false, undef: true, white: false, widget: false */
(function() {
    if(typeof(this.PHP_JS) === "undefined"){ 
        // This references at top of namespace allows PHP_JS class to
        // be included directly inside an object (unusual use)
        var PHP_JS = function(cfgObj) {
            if(!(this instanceof PHP_JS)) {
                // Allow invokation without "new"
                return new PHP_JS(cfgObj);
            }
            // Allow user to pass in window, e.g., if in context
            // without access to window but need to pass in, like
            // a Mozilla JavaScript module
            this.window = cfgObj && cfgObj.window ? cfgObj.window : window;

            // Allow user to pass in object representing initial ini values
            this.php_js = {};
            this.php_js.ini = {};
            if (cfgObj) {
                for (var ini in cfgObj.ini) {
                    this.php_js.ini[ini] = {};
                    this.php_js.ini[ini].local_value = cfgObj.ini[ini]; // changeable by ini_set()
                    this.php_js.ini[ini].global_value = cfgObj.ini[ini]; // usable by ini_restore()
                }
            }
        };
    }
    // Private static holder across all instances; we usually use
    // instance variables, but this is necessary for a very few
    // like require_once()/include_once()
    var php_js_shared = {};

    PHP_JS.prototype = {
        constructor: PHP_JS,
//#FUNCTIONS_HERE#
    }; // end PHP_JS.prototype

    this.PHP_JS = PHP_JS;
}());
