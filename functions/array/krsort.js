function krsort(array, sort_flags) {
    // http://kevin.vanzonneveld.net
    // +   original by: GeekFG (http://geekfg.blogspot.com)
    // +   improved by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)
    // +   improved by: Brett Zamir
    // %          note: The examples are correct, this is a new way
    // *     example 1: data = {2: 'van', 3: 'Zonneveld', 1: 'Kevin'};
    // *     example 1: krsort(data);
    // *     results 1: data == {3: 'Kevin', 2: 'van', 1: 'Zonneveld'}
    // *     returns 1: true

    var tmp_arr = {}, keys = [], sorter = false, i = 0, key = '';

    // For now only SORT_NUMERIC has a custom sorter
    // and SORT_REGULAR, SORT_STRING, and SORT_LOCALE_STRING
    // are all handled with the default sorter
    if (sort_flags == 'SORT_NUMERIC') {
        sorter = function (a, b) {
            return(a - b);
        };
    }

    // Make a list of key names
    for (key in array) {
        keys.push(key);
    }

    // Sort key names
    try {
        if (sorter !== false) {
            keys.sort(sorter);
        } else {
            keys.sort();
        }
    } catch (e) {
        return false;
    }
    keys.reverse();

    // Rebuild array with sorted key names
    for (i = 0; i < keys.length; i++) {
        key = keys[i];
        tmp_arr[key] = array[key];
        delete array[key];
    }
    for (i in tmp_arr) {
        array[i] = tmp_arr[i]
    }

    return true;
}