function str_split ( f_string, f_split_length, f_backwards ){
    // http://kevin.vanzonneveld.net
    // +     original by: Martijn Wieringa
    // *         example 1: str_split('Hello Friend', 3);
    // *         returns 1: ['Hel', 'lo ', 'Fri', 'end']

    if(f_backwards == undefined) {
        f_backwards = false;
    }

    if(f_split_length > 0){
        var result = new Array();

        if(f_backwards) {
            var r = (f_string.length % f_split_length);

            if(r > 0){
                result[result.length] = f_string.substring(0, r);
                f_string = f_string.substring(r);
            }
        }

        while(f_string.length > f_split_length) {
            result[result.length] = f_string.substring(0, f_split_length);
            f_string = f_string.substring(f_split_length);
        }

        result[result.length] = f_string;
        return result;
    }

    return false;
}