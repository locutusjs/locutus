module.exports = function array_diff_uassoc(arr1) {
  //  discuss at: https://locutus.io/php/array_diff_uassoc/
  // original by: Brett Zamir (https://brett-zamir.me)
  //   example 1: var $array1 = {a: 'green', b: 'brown', c: 'blue', 0: 'red'}
  //   example 1: var $array2 = {a: 'GREEN', B: 'brown', 0: 'yellow', 1: 'red'}
  //   example 1: array_diff_uassoc($array1, $array2, function (key1, key2) { return (key1 === key2 ? 0 : (key1 > key2 ? 1 : -1)) })
  //   returns 1: {b: 'brown', c: 'blue', 0: 'red'}
  //        test: skip-1

  const retArr = {}
  const arglm1 = arguments.length - 1
  let cb = arguments[arglm1]
  let arr = {}
  let i = 1
  let k1 = ''
  let k = ''

  const $global = typeof window !== 'undefined' ? window : global

  cb =
    typeof cb === 'string'
      ? $global[cb]
      : Object.prototype.toString.call(cb) === '[object Array]'
        ? $global[cb[0]][cb[1]]
        : cb

  arr1keys: for (k1 in arr1) {
    for (i = 1; i < arglm1; i++) {
      arr = arguments[i]
      for (k in arr) {
        if (arr[k] === arr1[k1] && cb(k, k1) === 0) {
          // If it reaches here, it was found in at least one array, so try next value
          continue arr1keys // eslint-disable-line no-labels
        }
      }
      retArr[k1] = arr1[k1]
    }
  }

  return retArr
}
