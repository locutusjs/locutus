function __FUNCTION__() {
    // http://kevin.vanzonneveld.net
    // +   original by: Brett Zamir (http://brett-zamir.me)
    // %        note 1: Not a function in PHP, so in experimental
    // %        note 2: This function depends on the non-standard caller property of Function instances
    // *     example 1: function myFunc () {return __FUNCTION__();}
    // *     example 1: myFunc();
    // *     returns 1: 'myFunc'

    var getFuncName = function (fn) {
        var name=(/\W*function\s+([\w\$]+)\s*\(/).exec(fn);
        if (!name) {
            return '(Anonymous)';
        }
        return name[1];
    };
    return arguments.callee.caller && getFuncName(arguments.callee.caller);
}
