function max() {
    // http://kevin.vanzonneveld.net
    // +   original by: Onno Marsman
    // +    revised by: Onno Marsman
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

    var ar, retVal, i=0;

    var _obj2Array = function(obj) {
       if (obj instanceof Array) {
           return obj;
       } else {
           var ar = [];
           for (var i in obj) {
               ar.push(obj[i]);
           }
           return ar;
       }
    }
    
    var _compare = function(current, next) {
       if (current===next) {
           return 0;
       } else if (typeof current == 'object') {
           if (typeof next == 'object') {
               current = _obj2Array(current);
               next = _obj2Array(next);
               if (next.length>current.length) {
                   return 1;
               } else if (next.length<current.length) {
                   return -1;
               } else {
                   var tmp;
                   for (var i=0, n=current.length; i<n; ++i) {
                       tmp = _compare(current[i], next[i]);
                       if (tmp==1) {
                           return 1;
                       } else if (tmp==-1) {
                           return -1;
                       }
                   }
                   return 0;
               }
           } else {
               return -1;
           }
       } else if (typeof next == 'object') {
           return 1;
       } else if (isNaN(next) && !isNaN(current)) {
           if (current==0) {
               return 0;
           } else {
               return (current<0 ? 1 : -1);
           }
       } else if (isNaN(current) && !isNaN(next)) {
           if (next==0) {
               return 0;
           } else {
               return (next>0 ? 1 : -1);
           }
       } else {
           if (next==current) {
               return 0;
           } else {
               return (next>current ? 1 : -1);
           }
       }
    }
    
    if (arguments.length==0) {
       throw new Error('At least one value should be passed to max()');
    } else if (arguments.length==1) {
       if (typeof arguments[0]=='object') {
           ar = _obj2Array(arguments[0]);
       } else {
           throw new Error('Wrong parameter count for max()');
       }
       if (ar.length==0) {
           throw new Error('Array must contain at least one element for max()');
       }
    } else {
       ar = arguments;
    }
    
    retVal = ar[0];
    for (i=1, n=ar.length; i<n; ++i) {
       if (_compare(retVal, ar[i])==1) {
           retVal = ar[i];
       }
    }
    
    return retVal;
}