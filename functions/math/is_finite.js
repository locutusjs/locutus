function is_finite(val) {
    // http://kevin.vanzonneveld.net
    // +   original by: Onno Marsman
    // *     example 1: is_finite(Infinity);
    // *     returns 1: false
    // *     example 2: is_finite(-Infinity);
    // *     returns 2: false
    // *     example 3: is_finite(0);
    // *     returns 3: true

    var code = 0, warningType = '';

    if (val===Infinity || val===-Infinity) {
        return false;
    }

    //Some warnings for maximum PHP compatibility
    if (typeof val=='object') {
        warningType = (val instanceof Array ? 'array' : 'object');
    } else if (typeof val=='string') {
        //simulate PHP's behaviour: '-9a' doesn't give a warning, but 'a9' does.
        code = val.charCodeAt(0);
        if (isNaN(code) || code<48 || code>57) { //first character is not numeric
            if (code==45 || code==43) { // first character is - or +
                code = val.charCodeAt(1);
                if (isNaN(code) || code<48 || code>57) { //second character is not numeric
                    warningType = 'string';
                }
            } else {
                warningType = 'string';
            }
        }
    }
    if (warningType) {
        throw new Error('Warning: is_infinite() expects parameter 1 to be double, '+warningType+' given');
    }

    return true;
}