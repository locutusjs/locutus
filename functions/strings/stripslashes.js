function stripslashes( str ) {
    // +   original by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)
    // +   improved by: Ates Goral (http://magnetiq.com)
    // +      fixed by: Mick@el
    // +   improved by: marrtins
    // +   bugfixed by: Onno Marsman
    // +   improved by: rezna
    // +   input by: Rick Waldron
    // +   reimplemented by: Brett Zamir (http://brett-zamir.me)
    // *     example 1: stripslashes('Kevin\'s code');
    // *     returns 1: "Kevin's code"
    // *     example 2: stripslashes('Kevin\\\'s code');
    // *     returns 2: "Kevin\'s code"
    str = (str+'').replace(/\\(.?)/g, function (s, n1) {
        switch(n1) {
            case '\\': // reduce to single backslash
                return '\\';
            case '0': // preserve for replace below
                return '\\0';
            case '': // backslash at end of input
                return '';
            default: // reduce to character without backslash
                return n1;
        }
    });
    return str.replace(/\\0/g, '\0');
}