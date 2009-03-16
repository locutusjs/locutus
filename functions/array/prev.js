function prev (arr) {
    // http://kevin.vanzonneveld.net
    // +   original by: Brett Zamir
    // %        note 1: Uses global: window.php_js to store the array pointer
    // *     example 1: transport = ['foot', 'bike', 'car', 'plane'];
    // *     example 1: prev(transport);
    // *     returns 1: false

    if (!window.php_js) window.php_js = {};
    if (!window.php_js.pointers) window.php_js.pointers = [];
    var pointers = window.php_js.pointers;
    var arrpos = pointers.indexOf(arr);
    var cursor = pointers[arrpos+1];
    if (pointers.indexOf(arr) === -1 || cursor === 0) {
        return false;
    }
    if (!(arr instanceof Array)) {
        var ct = 0;
        for (var k in arr) {
            if (ct === cursor-1) {
                pointers[arrpos+1] -= 1;
                return arr[k];
            }
            ct++;
        }
    // Shouldn't reach here
    }
    if (arr.length === 0) {
        return false;
    }
    pointers[arrpos+1] -= 1;
    return arr[pointers[arrpos+1]];
}