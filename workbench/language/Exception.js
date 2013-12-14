var that = this;
this.php_js = this.php_js || {};

function Exception (message, code, previous) { // string, int, Exception (all arguments optional)
    // http://kevin.vanzonneveld.net
    // +   original by: Brett Zamir (http://brett-zamir.me)
    // *     example 1: var e = new Exception('some exception');
    // *     example 1: e.getMessage();
    // *     returns 1: 'some exception'

    if (!message) {
        message = '';
    }
    if (!code) {
        code = 0;
    }
    if (!previous) {
        previous = null;
    }

    this.message = message; // protected string
    this.code = code; // protected int
    this.string = 'Exception'; // private string; Internal Exception name

    // UNFINISHED
    /*
    this.previous = previous; // "previous" is not a recognized property, but we'll use it; reconcile with trace array?
    this.trace; // private array; The stack trace
    this.file; // protected string; The filename where the exception was thrown
    this.line; // protected int; The line where the exception was thrown
    */
   // For JavaScript:
    this.name = 'Exception';
    that.php_js.exception_handler(this);
}
Exception.prototype = {
    constructor : Exception,
    // PRIVATE FINAL METHODS
    __clone : function () {
        throw 'Fatal exception: exceptions are not clonable';
    },
    // PUBLIC METHODS
    __toString : function () { // returns string
        return "exception '"+this.string+"' with message '"+this.getMessage()+"' in "+
                                this.getFile()+":"+this.getLine()+"\nStack trace:\n"+this.getTraceAsString();
    },
    // For JavaScript interface/behavior:
    toString : function () {
        return this.__toString(); // We implement on toString() to implement JavaScript Error interface
    },
    // FINAL PUBLIC METHODS
    getMessage : function () { // returns string
        return this.message;
    },
    getPrevious : function () { // returns Exception
        return this.previous;
    },
    getCode : function () { // returns int
        return this.code;
    },
    getFile : function () { // returns string
        return this.file;
    },
    getLine : function () { // returns int
        return this.line;
    },
    getTrace : function () { // returns array
        // Each entry may look like:
        // filepath(linenumber): funcName()  OR
        // {main}
        return this.trace;
    },
    getTraceAsString : function () { // returns string
        var ret = '';
        for (var i=0; i < this.trace.length; i++) {
            ret += '\n#'+i+' '+this.trace[i];
        }
        return ret.slice(1);
    }
};
