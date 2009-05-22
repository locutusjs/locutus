(function() {
    if(typeof(this.PHP_JS) === "undefined"){ 
        // This references at top of namespace allows PHP_JS class to
        // be included directly inside an object (unusual use)
        var PHP_JS = function(cfgObj) {
            if(!(this instanceof PHP_JS)) {
                // Allow invokation without "new"
                return new PHP_JS(cfgObj);
            }
            this.window = cfgObj && cfgObj.window ? cfgObj.window : window;
            // Allow user to pass in window, e.g., if in context
            // without access to window but need to pass in, like
            // a Mozilla JavaScript module
        };
    }
    var php_js_shared = {};
    // Private static holder across all instances; we usually use
    // instance variables, but this is necessary for a very few
    // like require_once()/include_once()
    PHP_JS.prototype = {
//#FUNCTIONS_HERE#
    }; // end PHP_JS.prototype
    this.PHP_JS = PHP_JS;
    // User must instantiate (don't need "new" to do it, though slightly
    // faster if do use "new")
    // use in own code like:   var $P = PHP_JS();
    // If you place this namespace in a context like a JavaScript module
    // (e.g., for a Firefox extension) without access to the global
    // window object, you could instantiate in code which did have
    // access to "window" like this: var $P = PHP_JS({window:window});
}());
// Kevin, I moved invocation parentheses inside the other parentheses for
// the sake of jslint; otherwise, no difference