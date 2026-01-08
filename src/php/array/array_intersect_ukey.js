module.exports = function array_intersect_ukey(arr1) {
  //  discuss at: https://locutus.io/php/array_intersect_ukey/
  // original by: Brett Zamir (https://brett-zamir.me)
  //   example 1: var $array1 = {blue: 1, red: 2, green: 3, purple: 4}
  //   example 1: var $array2 = {green: 5, blue: 6, yellow: 7, cyan: 8}
  //   example 1: array_intersect_ukey ($array1, $array2, function (key1, key2){ return (key1 === key2 ? 0 : (key1 > key2 ? 1 : -1)); })
  //   returns 1: {blue: 1, green: 3}

  const retArr = {}
  const arglm1 = arguments.length - 1
  const arglm2 = arglm1 - 1
  let cb = arguments[arglm1]
  // var cb0 = arguments[arglm2]
  let k1 = ''
  let i = 1
  let k = ''
  let arr = {}

  const $global = typeof window !== 'undefined' ? window : global

  cb = typeof cb === 'string' ? $global[cb] : Array.isArray(cb) ? $global[cb[0]][cb[1]] : cb

  // cb0 = (typeof cb0 === 'string')
  //   ? $global[cb0]
  //   : (Array.isArray(cb0))
  //     ? $global[cb0[0]][cb0[1]]
  //     : cb0

  arr1keys: for (k1 in arr1) {
    arrs: for (i = 1; i < arglm1; i++) {
      arr = arguments[i]
      for (k in arr) {
        if (cb(k, k1) === 0) {
          if (i === arglm2) {
            retArr[k1] = arr1[k1]
          }
          // If the innermost loop always leads at least once to an equal value,
          // continue the loop until done
          continue arrs
        }
      }
      // If it reaches here, it wasn't found in at least one array, so try next value
      continue arr1keys
    }
  }

  return retArr
}
