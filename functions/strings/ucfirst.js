function ucfirst( str ) {
    // http://kevin.vanzonneveld.net
    // +   original by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)
    // *     example 1: ucfirst('kevin van zonneveld');
    // *     returns 1: 'Kevin van zonneveld'

    var f = str.charAt(0).toUpperCase();
    return f + str.substr(1, str.length-1);
}