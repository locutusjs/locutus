function list () {
    // http://kevin.vanzonneveld.net
    // +   original by: Brett Zamir (http://brett-zamir.me)
    // %        note 1: Only works in global context and deviates (by necessity) from
    // %        note 1: PHP version by adding the array (which in PHP is an rvalue
    // %        note 1: separate from the list() lvalue) as the last argument
    // *     example 1: list('drink', 'color', 'power', ['coffee', 'brown', 'caffeine']);
    // *     returns 1: 'coffee is brown and caffeine makes it special.\n'

    var i=0, arr=[];

    arr = arguments[arguments.length-1];
    for (i = 0; i < arr.length; i++) {
        this[arguments[i]] = arr[i];
    }
    
}
