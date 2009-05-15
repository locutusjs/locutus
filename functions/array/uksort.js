function uksort(array, sorter) {
    // http://kevin.vanzonneveld.net
    // +   original by: Brett Zamir (http://brettz9.blogspot.com)
    // %          note: The examples are correct, this is a new way
    // *     example 1: data = {d: 'lemon', a: 'orange', b: 'banana', c: 'apple'};
    // *     example 1: uksort(data, function(key1, key2){ return (key1 == key2 ? 0 : (key1 > key2 ? 1 : -1)); });
    // *     results 1: data == {a: 'orange', b: 'banana', c: 'apple', d: 'lemon'}
    // *     returns 1: true

    if (typeof sorter === 'string') {
        sorter = this.window[sorter];
    }

    var tmp_arr = {}, keys = [], i = 0, key = '';

    // Make a list of key names
    for (key in array) {
        keys.push(key);
    }

    // Sort key names
    try {
        if (sorter) {
            keys.sort(sorter);
        } else {
            keys.sort();
        }
    } catch (e) {
        return false;
    }

    // Rebuild array with sorted key names
    for (i = 0; i < keys.length; i++) {
        key = keys[i];
        tmp_arr[key] = array[key];
        delete array[key];
    }
    for (i in tmp_arr) {
        array[i] = tmp_arr[i];
    }
    return true;
}