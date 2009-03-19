function each(arr) {
    // http://kevin.vanzonneveld.net
    // +   original by: Ates Goral (http://magnetiq.com) 
    // +    revised by: Brett Zamir
    // %        note 1: Uses global: php_js to store the array pointer
    // *     example 1: each({a: "apple", b: "balloon"});
    // *     returns 1: {0: "a", 1: "apple", key: "a", value: "apple"}

    //  Will return a 4-item object unless a class property 'returnArrayOnly'
    //  is set to true on this function if want to only receive a two-item
    //  numerically-indexed array (for the sake of array destructuring in
    //  JavaScript 1.7+ (similar to list() in PHP, but as PHP does it automatically
    //  in that context and JavaScript cannot, we needed something to allow that option)
    //  See https://developer.mozilla.org/en/New_in_JavaScript_1.7#Destructuring_assignment
    
    if (!php_js) php_js = {};
    if (!php_js.pointers) php_js.pointers = [];
    var pointers = php_js.pointers;
    if (pointers.indexOf(arr) === -1) {
        pointers.push(arr, 0);
    }
    var arrpos = pointers.indexOf(arr);
    var cursor = pointers[arrpos+1];
    var pos = 0;

    if (!(arr instanceof Array)) {
        var ct = 0;
        for (var k in arr) {
            if (ct === cursor) {
                pointers[arrpos+1] += 1;
                if (each.returnArrayOnly) {
                    return [k, arr[k]];
                } else {
                    return {
                        1:arr[k],
                        value:arr[k],
                        0:k,
                        key:k
                    };
                }
            }
            ct++;
        }
        return false; // Empty
    }
    if (arr.length === 0 || cursor === arr.length) {
        return false;
    }
    pos = cursor;
    pointers[arrpos+1] += 1;
    if (each.returnArrayOnly) {
        return [pos, arr[pos]];
    } else {
        return {
            1:arr[pos],
            value:arr[pos],
            0:pos,
            key:pos
        };
    }
}