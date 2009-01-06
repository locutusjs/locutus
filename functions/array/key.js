function key(arr) {
    // http://kevin.vanzonneveld.net
    // +   original by: Brett Zamir
    // %        note 1: Uses global: window.php_js to store the array pointer
    // *     example 1: array = {fruit1: 'apple', 'fruit2': 'orange'}
    // *     example 1: key(array);
    // *     returns 1: 'fruit1'

    if (!window.php_js) window.php_js = {
        pointers:[]
    };
    var pointers = window.php_js.pointers;
    if (pointers.indexOf(arr) === -1) {
        pointers.push(arr, 0);
    }
    var cursor = pointers[pointers.indexOf(arr)+1];
    if (!(arr instanceof Array)) {
        var ct = 0;
        for (var k in arr) {
            if (ct === cursor) {
                return k;
            }
            ct++;
        }
        return false; // Empty
    }
    if (arr.length === 0) {
        return false;
    }
    return cursor;
}