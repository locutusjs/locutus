function get_defined_functions() {
    // http://kevin.vanzonneveld.net
    // +   original by: Brett Zamir
    // +   improved by: Brett Zamir
    // %        note 1: Test case 1: If get_defined_functions can find itself in the defined functions, it worked :)
    // *     example 1: function test_in_array(array, p_val) {for(var i = 0, l = array.length; i < l; i++) {if(array[i] == p_val) return true;} return false;}
    // *     example 1: funcs = get_defined_functions();
    // *     example 1: found = test_in_array(funcs, 'get_defined_functions');
    // *     results 1: found == true

    var i = '', arr = [], already = {};

    for (i in window) {
        try {
            if (typeof window[i] === 'function') {
                if (!already[i]) {
                    already[i] = 1;
                    arr.push(i);
                }
            }
            else if (typeof window[i] === 'object') {
                for (var j in window[i]) {
                    if (typeof window[j] === 'function' && window[j] && !already[j]) {
                        already[j] = 1;
                        arr.push(j);
                    }
                }
            }
        }
        catch (e) {

        }
    }

    return arr;
}