function max() {
    // http://kevin.vanzonneveld.net
    // +   original by: Onno Marsman
    // %          note: Long code cause we're aiming for maximum PHP compatibility
    // %          note: Example 3 doesn't give the expected output yet
    // *     example 1: max(1, 3, 5, 6, 7);
    // *     returns 1: 7
    // *     example 2: max([2, 4, 5]);
    // *     returns 2: 5
    // *     example 3: max(0, 'hello');
    // *     returns 3: 0
    // *     example 4: max('hello', 0);
    // *     returns 4: 'hello'
    // *     example 5: max(-1, 'hello');
    // *     returns 5: 'hello'
    // *     example 6: max([2, 4, 8], [2, 5, 7]);
    // *     returns 6: [2, 5, 7]

    var ar, retVal = -Infinity;
    
    if (arguments.length == 0) {
        throw new Error('Atleast one value should be passed to max()');
    } else if (arguments.length == 1) {
        if (arguments[0] instanceof Array) {
            ar = arguments[0];
        } else if (typeof arguments[0] == 'object') {
            ar = [];
            for (var i in arguments[0]) {
               ar.push(ar[i]);
            }
        } else {
            throw new Error('Wrong parameter count for max()');
        }
        if (ar.length==0) {
            throw new Error('Array must contain at least one element for max()');
        }
    } else {
       ar = arguments;
    }
    
    for (var i=0, n=ar.length; i<n; ++i) {
        if (retVal==Infinity) {
            retVal = ar[i];
        } else if (isNaN(ar[i]) && !isNaN(retVal)) {
            if (retVal<=0) {
               retVal = ar[i];
            }
        } else if (isNaN(retVal) && !isNaN(ar[i])) {
           if (ar[i]>0) {
               retVal = ar[i];
           }
        } else if (ar[i]>retVal) {
           retVal = ar[i];
        }
    }
    
    return retVal;
}