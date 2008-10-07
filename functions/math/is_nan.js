function is_nan(val) {
    // http://kevin.vanzonneveld.net
    // +   original by: Onno Marsman
    // *     example 1: is_nan(NaN);
    // *     returns 1: true
    // *     example 2: is_nan(0);
    // *     returns 2: false

    var code = 0, errorType = '';

    if (typeof val=='number' && isNaN(val)) {
        return true;
    }

    //Some errors for maximum PHP compatibility
    if (typeof val=='object') {
        errorType = (val instanceof Array ? 'array' : 'object');
    } else if (typeof val=='string') {
        //simulate PHP's behaviour: '-9a' doesn't give a warning, but 'a9' does.
        code = val.charCodeAt(0);
        if (isNaN(code) || code<48 || code>57) { //first character is not numeric
            if (code==45 || code==43) { // first character is - or +
                code = val.charCodeAt(1);
                if (isNaN(code) || code<48 || code>57) { //second character is not numeric
                    errorType = 'string';
                }
            } else {
                errorType = 'string';
            }
        }
    }
    if (errorType) {
        throw new Error('Warning: is_infinite() expects parameter 1 to be double, '+errorType+' given');
    }

    return false;
}