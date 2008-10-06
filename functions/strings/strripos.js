function strripos( haystack, needle, offset){
    // http://kevin.vanzonneveld.net
    // +   original by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)
    // +   bugfixed by: Onno Marsman
    // *     example 1: strripos('Kevin van Zonneveld', 'E');
    // *     returns 1: 16

    var i = (haystack+'').toLowerCase().lastIndexOf( (needle+'').toLowerCase(), offset ); // returns -1
    return i >= 0 ? i : false;
}