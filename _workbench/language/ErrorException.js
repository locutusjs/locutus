var that = this;
this.php_js = this.php_js || {};

function ErrorException (message, code, severity, filename, lineno) {
    // http://kevin.vanzonneveld.net
    // +   original by: Brett Zamir (http://brett-zamir.me)
    // -    depends on: Exception
    // *     example 1: var e = new Exception('some exception');
    // *     example 1: e.getMessage();
    // *     returns 1: 'some exception'

    if (!message) {
        message = '';
    }
    if (!code) {
        code = 0;
    }

    /* No way to set in PHP in this inheriting function!
    if (!previous) {
        previous = null;
    }
    */

    this.message = message; // protected string
    this.code = code; // protected int
    this.string = 'Exception'; // private string; Internal Exception name

    this.severity = severity; // protected int

    // UNFINISHED
    /*
    this.previous = previous; // "previous" is not a recognized property, but we'll use it; reconcile with trace array?
    this.trace; // private array; The stack trace
    */
    this.file = filename; // protected string; The filename where the exception was thrown
    this.line = lineno; // protected int; The line where the exception was thrown
   // For JavaScript:
    this.name = 'ErrorException';
    that.php_js.error_handler(this);
}
ErrorException.prototype = new this.Exception();
ErrorException.prototype.constructor = ErrorException;
ErrorException.prototype.getSeverity = function () { // Final method
    return this.severity;
};
