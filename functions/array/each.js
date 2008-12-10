function each(arr) {
    // http://kevin.vanzonneveld.net
    // +   original by: Ates Goral (http://magnetiq.com)
    // *     example 1: each([42,43]);
    // *     returns 1: {0: 0, 1: 42, value: 42, key: 0}
    // *     example 2: each({a: "apple", b: "balloon"});
    // *     returns 2: {0: "a", 1: "apple", key: "a", value: "apple"}


    var k, v;

    if (!(arr instanceof Object) || (arr._keys && !arr._keys.length)) {
        return false;
    }

    if (!arr._keys) {
        arr._keys = [];

        for (k in arr) {
            if (k != "_keys") {
                arr._keys.push(k);
            }
        }
    }

    k = arr._keys.shift();
    v = arr[k];

    return { 
        0: k,
        1: v,
        key: k,
        value: v
    };
}