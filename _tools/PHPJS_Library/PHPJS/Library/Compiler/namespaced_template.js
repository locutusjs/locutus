// jslint.com configuration options: see http://jslint.com/
/*jslint evil: true, forin: true, newcap: true*/
/*global window */
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

    // 1) You must now instantiate PHP_JS yourself to use it (you don't need
    // "new" to do it, though it is slightly faster and better practice if you do
    // use "new").
    // You can do so like this:   var $P = PHP_JS();
    // 2) To pass in initial ini values without requiring ini_set() calls (see the
    // individual functions and
    // http://wiki.github.com/kvz/phpjs/php_js_global
    // which ones are available), you can pass in the ini data as follows:
    // var $P = new PHP_JS({ini: {
    //     'date.timezone':'America/Chicago', // PHP ini's used in PHP.JS
    //     'phpjs.objectsAsArrays': true // custom PHP.JS ini's
    // }});
    // 3) If you place this namespace in a context like a JavaScript module
    // (e.g., for a Firefox extension) without access to the global
    // window object, you could instantiate in code which can obtain a
    // "window" object like this: var $P = PHP_JS({window:window});
    // This is not necessary for regular HTML JavaScript.
    this.PHP_JS = PHP_JS; // Make PHP_JS available outside of namespace
}());
