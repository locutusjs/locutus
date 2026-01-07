module.exports = function array_splice(arr, offst, lgth, replacement) {
  //  discuss at: https://locutus.io/php/array_splice/
  //   verified: 8.3
  // original by: Brett Zamir (https://brett-zamir.me)
  //    input by: Theriault (https://github.com/Theriault)
  //      note 1: Order does get shifted in associative array input with numeric indices,
  //      note 1: since PHP behavior doesn't preserve keys, but I understand order is
  //      note 1: not reliable anyways
  //      note 1: Note also that IE retains information about property position even
  //      note 1: after being supposedly deleted, so use of this function may produce
  //      note 1: unexpected results in IE if you later attempt to add back properties
  //      note 1: with the same keys that had been deleted
  //   example 1: var $input = ["red", "green", "blue", "yellow"]
  //   example 1: array_splice($input, 2)
  //   returns 1: ["blue", "yellow"]
  //   example 2: var $input = ["red", "green", "blue", "yellow"]
  //   example 2: array_splice($input, 3, 0, "purple")
  //   returns 2: []
  //   example 3: var $input = ["red", "green", "blue", "yellow"]
  //   example 3: array_splice($input, -1, 1, ["black", "maroon"])
  //   returns 3: ["yellow"]

  const isInt = require('../var/is_int')

  const _checkToUpIndices = function (arr, ct, key) {
    // Deal with situation, e.g., if encounter index 4 and try
    // to set it to 0, but 0 exists later in loop (need to
    // increment all subsequent (skipping current key,
    // since we need its value below) until find unused)
    if (arr[ct] !== undefined) {
      const tmp = ct
      ct += 1
      if (ct === key) {
        ct += 1
      }
      ct = _checkToUpIndices(arr, ct, key)
      arr[ct] = arr[tmp]
      delete arr[tmp]
    }
    return ct
  }

  if (replacement && typeof replacement !== 'object') {
    replacement = [replacement]
  }
  if (lgth === undefined) {
    lgth = offst >= 0 ? arr.length - offst : -offst
  } else if (lgth < 0) {
    lgth = (offst >= 0 ? arr.length - offst : -offst) + lgth
  }

  if (Object.prototype.toString.call(arr) !== '[object Array]') {
    /* if (arr.length !== undefined) {
     // Deal with array-like objects as input
    delete arr.length;
    } */
    let lgt = 0
    let ct = -1
    const rmvd = []
    const rmvdObj = {}
    let replCt = -1
    let intCt = -1
    let returnArr = true
    let rmvdCt = 0
    // var rmvdLngth = 0
    let key = ''
    // rmvdObj.length = 0;
    for (key in arr) {
      // Can do arr.__count__ in some browsers
      lgt += 1
    }
    offst = offst >= 0 ? offst : lgt + offst
    for (key in arr) {
      ct += 1
      if (ct < offst) {
        if (isInt(key)) {
          intCt += 1
          if (parseInt(key, 10) === intCt) {
            // Key is already numbered ok, so don't need to change key for value
            continue
          }
          // Deal with situation, e.g.,
          _checkToUpIndices(arr, intCt, key)
          // if encounter index 4 and try to set it to 0, but 0 exists later in loop
          arr[intCt] = arr[key]
          delete arr[key]
        }
        continue
      }
      if (returnArr && isInt(key)) {
        rmvd.push(arr[key])
        // PHP starts over here too
        rmvdObj[rmvdCt++] = arr[key]
      } else {
        rmvdObj[key] = arr[key]
        returnArr = false
      }
      // rmvdLngth += 1
      // rmvdObj.length += 1;
      if (replacement && replacement[++replCt]) {
        arr[key] = replacement[replCt]
      } else {
        delete arr[key]
      }
    }
    // Make (back) into an array-like object
    // arr.length = lgt - rmvdLngth + (replacement ? replacement.length : 0);
    return returnArr ? rmvd : rmvdObj
  }

  if (replacement) {
    replacement.unshift(offst, lgth)
    return Array.prototype.splice.apply(arr, replacement)
  }

  return arr.splice(offst, lgth)
}
