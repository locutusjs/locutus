function foreach (arr, handler) {
    // http://kevin.vanzonneveld.net
    // +   original by: Brett Zamir (http://brett-zamir.me)
    // *     example 1: foreach (['a', 'b'], function (val) {alert(val);});
    // *     returns 1: undefined
    // *     example 2: foreach (['a', 'b'], function (key, val) {alert(key+'::'+val);});
    // *     returns 2: undefined
    // *     example 1: foreach ({key: 'value'}, function (val) {alert(val);});
    // *     returns 1: undefined
    // *     example 2: foreach ({key: 'value'}, function (key, val) {alert(key+'::'+val);});
    // *     returns 2: undefined

    var k, it, pair;
    if (arr && typeof arr === 'object' && arr.change_key_case) { // Duck-type check for our own array()-created PHPJS_Array
        return arr.foreach(handler);
    }
    if (typeof this.Iterator !== 'undefined') {
        var it = this.Iterator(arr); // Does not add prototype items
        if (handler.length === 1) {
            for (pair in it) {
                handler(pair[1]); // only pass the value
            }
        }
        else {
            for (pair in it) {
                handler(pair[0], pair[1]);
            }
        }
    }
    else if (handler.length === 1) {
        for (k in arr) {
            if (arr.hasOwnProperty(k)) {
                handler(arr[k]); // only pass the value
            }
        }
    }
    else {
        for (k in arr) {
            if (arr.hasOwnProperty(k)) {
                handler(k, arr[k]);
            }
        }
    }
}
