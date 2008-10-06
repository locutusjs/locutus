function str_split ( f_string, f_split_length){
    // http://kevin.vanzonneveld.net
    // +     original by: Martijn Wieringa
    // +     improved by: Brett Zamir
    // +     bugfixed by: Onno Marsman
    // *         example 1: str_split('Hello Friend', 3);
    // *         returns 1: ['Hel', 'lo ', 'Fri', 'end']

    f_string += '';

    if (f_split_length == undefined) {
        f_split_length = 1;
    }
    if(f_split_length > 0){
        var result = [];
        while(f_string.length > f_split_length) {
            result[result.length] = f_string.substring(0, f_split_length);
            f_string = f_string.substring(f_split_length);
        }
        result[result.length] = f_string;
        return result;
    }
    return false;
}