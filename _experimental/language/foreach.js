function foreach (arr, handler) {
    // http://kevin.vanzonneveld.net
    // +   original by: Brett Zamir (http://brett-zamir.me)
    // *     example 1: foreach (['a', 'b'], function (val) {alert(val);});
    // *     returns 1: undefined
    // *     example 2: foreach (['a', 'b'], function (key, val) {alert(key+'::'+val);});
    // *     returns 2: undefined
   var k;
   if (arr && typeof arr === 'object' && arr.change_key_case) { // Duck-type check for our own array()-created PHPJS_Array
        return arr.foreach(handler);
   }
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
