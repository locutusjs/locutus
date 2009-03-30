function array_diff_ukey() {
    // http://kevin.vanzonneveld.net
    // +   original by: Brett Zamir (http://brettz9.blogspot.com)
    // *     example 1: $array1 = {blue: 1, red: 2, green: 3, purple: 4}
    // *     example 1: $array2 = {green: 5, blue: 6, yellow: 7, cyan: 8}
    // *     example 1: array_diff_ukey($array1, $array2, function(key1, key2){ return (key1 == key2 ? 0 : (key1 > key2 ? 1 : -1)); });
    // *     returns 1: {red: 2, purple: 4}


    var arr1 = arguments[0], retArr = {}, cb = arguments[arguments.length-1];
    var arr = {}, i = 1, k1 = '', k = '';

    cb = (typeof cb === 'string') ? window[cb] : (cb instanceof Array) ? window[cb[0]][cb[1]] : cb;

    arr1keys:
    for (k1 in arr1) {
        for (i=1; i < arguments.length-1; i++) {
            arr = arguments[i];
            for (k in arr) {
                if (cb(k, k1) === 0) {
                    // If it reaches here, it was found in at least one array, so try next value
                    continue arr1keys;
                }
            }
            retArr[k1] = arr1[k1];
        }
    }

    return retArr;
}