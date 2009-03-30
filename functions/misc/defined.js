function defined( constant_name )  {
    // http://kevin.vanzonneveld.net
    // +   original by: Waldo Malqui Silva
    // +   improved by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)
    // +    revised by: Brett Zamir (http://brettz9.blogspot.com)
    // *     example 1: defined('IMAGINARY_CONSTANT1');
    // *     returns 1: false

    var tmp = window[constant];
    
    window[constant] = window[constant] ? 'changed'+window[constant].toString() : 'changed';
    var returnval = window[constant] === tmp;
    if (!returnval) { // Reset
        window[constant] = tmp;
    }

    return returnval;
}