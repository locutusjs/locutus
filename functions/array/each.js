function each(arr) {
  //  discuss at: http://phpjs.org/functions/each/
  // original by: Ates Goral (http://magnetiq.com)
  //  revised by: Brett Zamir (http://brett-zamir.me)
  //        note: Uses global: php_js to store the array pointer
  //   example 1: each({a: "apple", b: "balloon"});
  //   returns 1: {0: "a", 1: "apple", key: "a", value: "apple"}

  this.php_js = this.php_js || {};
  this.php_js.pointers = this.php_js.pointers || [];
  var indexOf = function(value) {
    for (var i = 0, length = this.length; i < length; i++) {
      if (this[i] === value) {
        return i;
      }
    }
    return -1;
  };
  // END REDUNDANT
  var pointers = this.php_js.pointers;
  if (!pointers.indexOf) {
    pointers.indexOf = indexOf;
  }
  if (pointers.indexOf(arr) === -1) {
    pointers.push(arr, 0);
  }
  var arrpos = pointers.indexOf(arr);
  var cursor = pointers[arrpos + 1];
  var pos = 0;

  if (Object.prototype.toString.call(arr) !== '[object Array]') {
    var ct = 0;
    for (var k in arr) {
      if (ct === cursor) {
        pointers[arrpos + 1] += 1;
        if (each.returnArrayOnly) {
          return [k, arr[k]];
        } else {
          return {
            1: arr[k],
            value: arr[k],
            0: k,
            key: k
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
  pointers[arrpos + 1] += 1;
  if (each.returnArrayOnly) {
    return [pos, arr[pos]];
  } else {
    return {
      1: arr[pos],
      value: arr[pos],
      0: pos,
      key: pos
    };
  }
}