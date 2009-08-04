function array_intersect_assoc () {
    // http://kevin.vanzonneveld.net
    // +   original by: Brett Zamir (http://brett-zamir.me)
    // %        note 1: These only output associative arrays (would need to be
    // %        note 1: all numeric and counting from zero to be numeric)
    // *     example 1: $array1 = {a: 'green', b: 'brown', c: 'blue', 0: 'red'}
    // *     example 1: $array2 = {a: 'green', 0: 'yellow', 1: 'red'}
    // *     example 1: array_intersect_assoc($array1, $array2)
    // *     returns 1: {a: 'green'}


    var arr1 = arguments[0], retArr = {};
    var k1 = '', arr = {}, i = 0, k = '';

    arr1keys:
    for (k1 in arr1) {
        arrs:
        for (i=1; i < arguments.length; i++) {
            arr = arguments[i];
            for (k in arr) {
                if (arr[k] === arr1[k1] && k === k1) {
                    if (i === arguments.length-1) {
                        retArr[k1] = arr1[k1];
                    }
                    // If the innermost loop always leads at least once to an equal value, continue the loop until done
                    continue arrs;
                }
            }
            // If it reaches here, it wasn't found in at least one array, so try next value
            continue arr1keys;
        }
    }

    return retArr;
}