function current(arr) {
    // http://kevin.vanzonneveld.net
    // +   original by: Brett Zamir
    // %        note 1: Uses global: window.php_js to store the array pointer
    // *     example 1: transport = ['foot', 'bike', 'car', 'plane'];
    // *     example 1: current(transport); 
    // *     returns 1: 'foot'

    if (!window.php_js) window.php_js = {};
    if (!window.php_js.pointers) window.php_js.pointers = [];
    var pointers = window.php_js.pointers;
    if (pointers.indexOf(arr) === -1) {
        pointers.push(arr, 0);
    }
    var arrpos = pointers.indexOf(arr);
    var cursor = pointers[arrpos+1];
    if (arr instanceof Array) {
        return arr[cursor] || false;
    }
    var ct = 0;
    for (var k in arr) {
        if (ct === cursor) {
            return arr[k];
        }
        ct++;
    }
    return false; // Empty
}