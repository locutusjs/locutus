function foreach (arr, handler) {
    // http://kevin.vanzonneveld.net
    // +   original by: Brett Zamir (http://brettz9.blogspot.com)
    // *     example 1: foreach (['a', 'b'], function (val) {alert(val);});
    // *     returns 1: undefined
    // *     example 2: foreach (['a', 'b'], function (key, val) {alert(key+'::'+val);});
    // *     returns 2: undefined
   var k;
   if (handler.length === 1) {
       for (k in arr) {
           handler(arr[k]); // only pass the value
       }
   }
   else {
       for (k in arr) {
           handler(k, arr[k]);
       }
   }
}
