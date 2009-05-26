function Exception (message, code, previous) { // string, int, Exception (all arguments optional)
    // http://kevin.vanzonneveld.net
    // +   original by: Brett Zamir (http://brettz9.blogspot.com)
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

    // UNFINISHED
    /*
    this.previous = previous; // "previous" is not a recognized property, but we'll use it; reconcile with trace array?
    this.string = 'Exception'; // private string; Internal Exception name
    this.trace; // private array; The stack trace
    this.file; // protected string; The filename where the exception was thrown
    this.line; // protected int; The line where the exception was thrown
    */
}
Exception.prototype = {
    constructor : Exception,
    // PRIVATE FINAL METHODS
    __clone : function () {
        throw 'Fatal exception: exceptions are not clonable';
    },
    // PUBLIC METHODS
    __toString : function () { // returns string
        return 'exception '+this.string+' in '+this.file+':'+this.line+'\nStack trace:\n'+this.getTraceAsString();
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
