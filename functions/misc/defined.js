function defined( constant_name )  {
    // http://kevin.vanzonneveld.net
    // +   original by: Waldo Malqui Silva
    // +   improved by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)
    // *     example 1: defined('IMAGINARY_CONSTANT1');
    // *     returns 1: false

    return (typeof window[constant_name] !== 'undefined');
}