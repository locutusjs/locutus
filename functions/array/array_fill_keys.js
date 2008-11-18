function array_fill_keys (keys, value) {
    // http://kevin.vanzonneveld.net
    // +   original by: Brett Zamir
    // *     example 1: keys = ['foo', 5, 10, 'bar']
    // *     example 1: array_fill_keys(keys, 'banana')
    // *     returns 1: {"foo": "banana", 5: "banana", 10: "banana", "bar": "banana"}
    
    var i = 0, retObj = {}, k;
    
    for (i = 0; i < keys.length; i++) {
        retObj[keys[i]] = value;
    }
    
    return retObj;
}