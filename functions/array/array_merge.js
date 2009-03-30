function array_merge() {
    // http://kevin.vanzonneveld.net
    // +   original by: Brett Zamir (http://brettz9.blogspot.com)
    // +   bugfixed by: Nate
    // -    depends on: is_int
    // %          note: Relies on is_int because !isNaN accepts floats     
    // *     example 1: arr1 = {"color": "red", 0: 2, 1: 4}
    // *     example 1: arr2 = {0: "a", 1: "b", "color": "green", "shape": "trapezoid", 2: 4}
    // *     example 1: array_merge(arr1, arr2)
    // *     returns 1: {"color": "green", 0: 2, 1: 4, 2: "a", 3: "b", "shape": "trapezoid", 4: 4}
    // *     example 2: arr1 = []
    // *     example 2: arr2 = {1: "data"}
    // *     example 2: array_merge(arr1, arr2)
    // *     returns 2: {1: "data"}
    
    var args = Array.prototype.slice.call(arguments);
    var retObj = {}, k, j = 0, i = 0;
    var retArr;
    
    for (i=0, retArr=true; i < args.length; i++) {
        if (!(args[i] instanceof Array)) {
            retArr=false;
            break;
        }
    }
    
    if (retArr) {
        return args;
    }
    var ct = 0;
    
    for (i=0, ct=0; i < args.length; i++) {
        if (args[i] instanceof Array) {
            for (j=0; j < args[i].length; j++) {
                retObj[ct++] = args[i][j];
            }
        } else {
            for (k in args[i]) {
                if (is_int(k)) {
                    retObj[ct++] = args[i][k];
                } else {
                    retObj[k] = args[i][k];
                }
            }
        }
    }
    
    return retObj;
}