function set_error_handler (callback) {
    // http://kevin.vanzonneveld.net
    // +   original by: Brett Zamir (http://brett-zamir.me)
    // *     example 1: set_error_handler(function (errno, errorObj, errfile, errline, errcontext) {alert(errorObj.getMessage());});
    // *     returns 1: null

    var oldHandlerName = '';
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
    oldHandlerName = this.php_js.error_handler ? _getFuncName(this.php_js.error_handler) : null;

    if (this.php_js.error_handler) { // Fix: Any potential built-in ones (e.g., via ini) to fall back on, as the PHP manual suggests?
        this.php_js.previous_error_handler = this.php_js.error_handler; // usable by restore_error_handler()
    }

    // Set callback
    this.php_js.error_handler = callback;

    // Make available a global ErrorException class (see _experimental/language)
    if (!this.window.ErrorException) {
        this.window.ErrorException = function (message, code, severity, filename, lineno) {
            this.message = message || '';
            this.code = code || 0; // user defined exception code
            this.severity = severity;
            this.file = filename;
            this.line = lineno;
        };
        this.window.ErrorException.prototype = new Exception();
        this.window.ErrorException.constructor = Error;
        this.window.ErrorException.prototype.getSeverity = function () {
            return this.severity;
        };
    }

    return oldHandlerName;
}
