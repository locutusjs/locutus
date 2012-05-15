function array_walk (array, funcname, userdata) {
    // http://kevin.vanzonneveld.net
    // +   original by: Johnny Mast (http://www.phpvrouwen.nl)
    // *     example 1: array_walk ({'a':'b'}, 'void', 'userdata');
    // *     returns 1: true
    // *     example 2: array_walk ('a', 'void', 'userdata');
    // *     returns 2: false
    var key;

    if (typeof array !== 'object' || array === null) {
        return false;
    }

    for (key in array) {
        if (typeof(userdata) !== 'undefined') {
            eval(funcname + '( array [key] , key , userdata  )');
        } else {
            eval(funcname + '(  userdata ) ');
        }
    }

    return true;
}
