function set_exception_handler (callback) {
	// http://kevin.vanzonneveld.net
	// +   original by: Brett Zamir (http://brettz9.blogspot.com)
    // *     example 1: set_exception_handler(function (exceptionObj) {alert(exceptionObj.getMessage());});
	// *     returns 1: null

    var that = this, oldHandlerName = '';
    if (typeof callback === 'string') {
        callback = window[callback];
    }
    if (!this.php_js) {this.php_js = {};}
    // For return
    oldHandlerName = this.php_js.exception_handler ? this.php_js.exception_handler.name : null;

    if (this.php_js.exception_handler) { // Fix: Any potential built-in ones (e.g., via ini) to fall back on, as the PHP manual suggests?
        this.php_js.previous_exception_handler = this.php_js.exception_handler; // usable by restore_exception_handler()
    }

    // Set callback
    this.php_js.exception_handler = callback;

    // Make available a global Exception class
    if (!window.Exception) {
        window.Exception = function (message, code) {
            // These four are supposed to be protected (extendable, but not public)
            this.message = message || 'Unknown exception';
            this.code = code || 0; // user defined exception code
            // Fix: Just putting something here for the next two (not PHP-style)... Can over-ride if overriding, however
            this.file = window.href.location; // source filename of exception
            this.line = 0; // source line of exception
            that.php_js.exception_handler(this);
        };
        window.Exception.prototype = {
            constructor: window.Exception,
            // FINAL (not suppoesd to extend the following 6 methods)
            getMessage : function () { // message of exception
                return this.message;
            },
            getCode : function () { // code of exception
                return this.code;
            },
            getFile : function () { // source filename
                return this.file;
            },
            getLine : function () { // source line
                return this.line;
            },
            getTrace : function () { // an array of the backtrace()
                // Todo: add trace for Mozilla, etc.
            },
            getTraceAsString : function () { // formatted string of trace
                // Todo: add trace for Mozilla, etc.
            },
            // Overrideable
            __toString : function () { // formatted string for display
                return this.message;
            }
        };
    }
    
    return oldHandlerName;
}