function substr (f_string, f_start, f_length) {
    // http://kevin.vanzonneveld.net
    // +     original by: Martijn Wieringa
    // +     bugfixed by: T.Wild
    // +      tweaked by: Onno Marsman
    // *       example 1: substr('abcdef', 0, -1);
    // *       returns 1: 'abcde'
    // *       example 2: substr(2, 0, -6);
    // *       returns 2: ''

    f_string += '';

    if (f_start < 0) {
        f_start += f_string.length;
    }

    if (f_length == undefined) {
        f_length = f_string.length;
    } else if (f_length < 0){
        f_length += f_string.length;
    } else {
        f_length += f_start;
    }

    if (f_length < f_start) {
        f_length = f_start;
    }

    return f_string.substring(f_start, f_length);
}