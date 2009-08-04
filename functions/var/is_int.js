function is_int (mixed_var) {
    // http://kevin.vanzonneveld.net
    // +   original by: Alex
    // +   improved by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)
    // +    revised by: Matt Bradley
    // +   bugfixed by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)
    // %        note 1: 1.0 is simplified to 1 before it can be accessed by the function, this makes
    // %        note 1: it different from the PHP implementation. We can't fix this unfortunately.
    // *     example 1: is_int(23)
    // *     returns 1: true
    // *     example 2: is_int('23')
    // *     returns 2: false
    // *     example 3: is_int(23.5)
    // *     returns 3: false
    // *     example 4: is_int(true)
    // *     returns 4: false

    if (typeof mixed_var !== 'number') {
        return false;
    }

    if (parseFloat(mixed_var) != parseInt(mixed_var, 10)) {
        return false;
    }
    
    return true;
}