function strrchr (haystack, needle) {
    // http://kevin.vanzonneveld.net
    // +   original by: Brett Zamir
    // *     example 1: strrchr("Line 1\nLine 2\nLine 3", 10).substr(1)
    // *     returns 1: 'Line 3'

    var pos = 0;

    if (typeof needle !== 'string') {
        needle = String.fromCharCode(parseInt(needle, 10));
    }
    needle = needle[0];
    pos = haystack.lastIndexOf(needle);
    if (pos === -1) {
        return false;
    }

    return haystack.substr(pos);
}