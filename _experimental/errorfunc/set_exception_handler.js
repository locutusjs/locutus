function set_exception_handler (callback) {
    // http://kevin.vanzonneveld.net
    // +   original by: Brett Zamir (http://brett-zamir.me)
    // *     example 1: set_exception_handler(function (exceptionObj) {alert(exceptionObj.getMessage());});
    // *     returns 1: null

    var that = this, oldHandlerName = '';
    var _getFuncName = function (fn) {
        var name = (/\W*function\s+([\w\$]+)\s*\(/).exec(fn);
        if (!name) {
            return '(Anonymous)';
        }
        return name[1];
    };
    if (typeof callback === 'string') {
        callback = this.window[callback];
    }
    // BEGIN REDUNDANT
    this.php_js = this.php_js || {};
    // END REDUNDANT
    // For return
    oldHandlerName = this.php_js.exception_handler ? _getFuncName(this.php_js.exception_handler) : null;

    if (this.php_js.exception_handler) { // Fix: Any potential built-in ones (e.g., via ini) to fall back on, as the PHP manual suggests?
        this.php_js.previous_exception_handler = this.php_js.exception_handler; // usable by restore_exception_handler()
    }

    // Set callback
    this.php_js.exception_handler = callback;

    // Make available a global Exception class (see _experimental/language)
    if (!this.window.Exception) {
        this.window.Exception = function (message, code) {
            // These four are supposed to be protected (extendable, but not public)
            this.message = message || '';
            this.code = code || 0; // user defined exception code
            // Fix: Just putting something here for the next two (not PHP-style)... Can over-ride if extending, however;
            //    in Mozilla, error objects (e.g., if you're in a catch block), have these properties which might be used to
            //    add to the object after instantiation (or during instantiation if extending the exception): fileName,
            //    lineNumber, stack; actually, should use PHP Error object for these anyways if following the PHP API
            //    since it does have these properties
            //  Note that for the trace, however, in Mozilla the stack property is a string, and getTrace() needs the items
            //    parsed as an array; this might be doable by setting the exception object's trace property to
            //    "e.stack.replace(/\n$/, '').split('\n');" if 'e' is a JavaScript exception
            this.file = this.window.href.location; // source filename of exception
            this.line = 0; // source line of exception

            this.string = 'Exception'; // private string; Internal Exception name
            this.name = 'Exception';  // To fit the JavaScript Error interface, user could also add a custom name property.
            that.php_js.exception_handler(this);
        };
        this.window.Exception.prototype = {
            constructor: this.window.Exception,
            // FINAL (not supposed to extend the following 6 methods)
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
                var ret = '';
                for (var i=0; i < this.trace.length; i++) {
                    ret += '\n#'+i+' '+this.trace[i];
                }
                return ret.slice(1);
                // return this.trace; // should be an array (especially so that getTraceAsString() works properly)
            },
            getTraceAsString : function () { // formatted string of trace
                // Todo: add trace for Mozilla, etc.
                return this.trace.toString();
            },
            // Overrideable
            __toString : function () { // formatted string for display
                // PHP-style
                return "exception '"+this.string+"' with message '"+this.getMessage()+"' in "+
                                this.getFile()+":"+this.getLine()+"\nStack trace:\n"+this.getTraceAsString();
                // return this.name+': '+this.message; // this works also, but in JavaScript-style
            },
            // For JavaScript interface/behavior:
            toString : function () {
                return this.__toString(); // We implement on toString() to implement JavaScript Error interface
            },
            // PRIVATE FINAL METHODS
            __clone : function () {
                throw 'Fatal exception: exceptions are not clonable';
            }
        };
    }

    return oldHandlerName;
}
