function list () {
    // http://kevin.vanzonneveld.net
    // +   original by: Brett Zamir (http://brett-zamir.me)
    // %        note 1: Only works in global context and deviates (by necessity) from
    // %        note 1: PHP version by adding the array (which in PHP is an rvalue
    // %        note 1: separate from the list() lvalue) as the last argument
    // *     example 1: var drink, color, power;
    // *     example 1: list('drink', 'color', 'power', ['coffee', 'brown', 'caffeine']);
    // *     example 1: drink +' is '+color+' and '+power+' makes it special.\n';
    // *     returns 1: 'coffee is brown and caffeine makes it special.\n'

    var i = 0, arr = [];

    arr = arguments[arguments.length-1];

    if (arr && typeof arr === 'object' && arr.change_key_case) { // Duck-type check for our own array()-created PHPJS_Array
        return arr.list.apply(arr, Array.prototype.slice.call(arguments, 0, -1));
    }
    if (arr && typeof arr === 'object' && arr.length && !arr.propertyIsEnumerable('length')) {
        for (i = 0; i < arr.length; i++) {
            this.window[arguments[i]] = arr[i];
        }
    }
    else {
        for (i in arr) {
            if (i.length === parseInt(i).toString().length && parseInt(i) < arguments.length-1) {
                this.window[arguments[i]] = arr[i];
            }
        }
    }

    return arr;
}
