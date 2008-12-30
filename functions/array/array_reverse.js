function array_reverse(array, preserve_keys) {
    // http://kevin.vanzonneveld.net
    // +   original by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)
    // +   improved by: Karol Kowalski
    // *     example 1: array_reverse( [ 'php', '4.0', ['green', 'red'] ], true);
    // *     returns 1: { 2: ['green', 'red'], 1: 4, 0: 'php'}

    var arr_len = array.length, newkey = 0, tmp_arr = {}, key = '';
    preserve_keys = !!preserve_keys;
    
    for (key in array) {
        newkey = arr_len - key - 1;
        tmp_arr[preserve_keys ? key : newkey] = array[key];
    }

    return tmp_arr;
}
