function create_function (args, code) {
    // http://kevin.vanzonneveld.net
    // +   original by: Johnny Mast (http://www.phpvrouwen.nl)
    // *     example 1: create_function('a, b', "return (a + b);");
    // *     returns 1: 'function'
    
    eval ('var _oFunctionObject = function (' + args + ') { ' +  code + '}');
    return _oFunctionObject;
}