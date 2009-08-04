function strrpos (haystack, needle, offset) {
    // http://kevin.vanzonneveld.net
    // +   original by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)
    // +   bugfixed by: Onno Marsman
    // *     example 1: strrpos('Kevin van Zonneveld', 'e');
    // *     returns 1: 16

    var i = (haystack+'').lastIndexOf( needle, offset ); // returns -1
    return i >= 0 ? i : false;
}