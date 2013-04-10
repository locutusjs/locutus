function debug_backtrace (provide_object) {
    // http://kevin.vanzonneveld.net
    // +   original by: Brett Zamir (http://brett-zamir.me)
    // %          note 1: Mozilla only
    // %          note 2: Since "function" is a reserved word in JavaScript (even as a property), you must use
    // %          note 2:   the ['function'] notation to get the returned object's arrays' "function" property name
    // *     example 1: function test () {var b = debug_backtrace();return b[0]['function'];}
    // *     example 1: test();
    // *     returns 1: 'test'

    var funcName, line, file, fileLine = '', lastColonPos = -1,
            className, object, type,
            args=Array.prototype.slice.call(arguments),
            olderFunc,
            i=0,
            backtraceArray=[], olderArgs=arguments,
            stackItem='',
            lastAtPos = -1, firstParenthPos = -1;
    var getFuncName = function (fn) {
        var name=(/\W*function\s+([\w\$]+)\s*\(/).exec(fn);
        if (!name) {
            return '(Anonymous)';
        }
        return name[1];
    };


    // (void 0) is undefined in argument list
    try {
        throw new Error();
    }
    catch (e) {
      var stackArr = e.stack.replace(/\n$/, '').split('\n').slice(2);
    }
    // a()@file:///C:/Users/Brett/Desktop/PHP_JS/debug_backtrace.xul:7,@file:///C:/Users/Brett/Desktop/PHP_JS/debug_backtrace.xul:16

    for (i=0; i < stackArr.length; i++) {
        stackItem = stackArr[i];

        // Will not work if parentheses (or ampersands) are in the file name! (other option would be worse, as arguments couldn't have @ or )
        lastAtPos = stackItem.lastIndexOf('@')+1;
        fileLine = stackItem.slice(lastAtPos);
        lastColonPos = fileLine.lastIndexOf(':')+1;
        line = fileLine.slice(lastColonPos);
        file = fileLine.slice(0, lastColonPos-1);

        //firstParenthPos = stackItem.indexOf('(')-1;
        //funcName = stackItem.slice(0, firstParenthPos);

        if (stackItem[0] === '@') { // this is global scope (must be i >= 1)
            // Fix: can add support for included/required files?
            // Fix: arguments returned are mismatched? ignore the last line number/call, since is call to debug_backtrace()?
            continue; // delete this when fix
        }
        else {
            olderArgs = olderArgs.callee.caller.arguments;
            args = Array.prototype.slice.call(olderArgs);
            olderFunc = olderFunc ? olderFunc.caller : arguments.callee.caller;
            funcName = getFuncName(olderFunc);
        }
        className = ''; // Not supported
        type = ''; // Special '->' and '::' values not supported for method or static methods
        object = ''; // Not supported
        if (provide_object) {
            throw 'provide_object argument is not supported in debug_backtrace';
        }

        backtraceArray.push({
            'function': funcName, // string; The current function name. See also __FUNCTION__.
            'line': line, // integer; The current line number. See also __LINE__.
            'file' : file, // string; The current file name. See also __FILE__.
            'className' : className, // string; The current class name. See also __CLASS__
            'object' : object, // object; The current object.
            'type' : type, // string; The current call type. If a method call, "->" is returned. If a static method call, "::" is returned. If a function call, nothing is returned.
            'args' : args // array; If inside a function, this lists the functions arguments. If inside an included file, this lists the included file name(s).
        });
    }
    return backtraceArray;
}
