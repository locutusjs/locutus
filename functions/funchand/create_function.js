function create_function (args, code) {
    // http://kevin.vanzonneveld.net
    // +   original by: Johnny Mast (http://www.phpvrouwen.nl)
    // *     example 1: f = create_function('a, b', "return (a + b);");
    // *     example 1: f(1, 2);
    // *     returns 1: 3
    
    eval('var _oFunctionObject = function (' + args + ') { ' +  code + '}');
    return _oFunctionObject;
}