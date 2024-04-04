module.exports = function array_map(callback) {
  // eslint-disable-line camelcase
  //  discuss at: https://locutus.io/php/array_map/
  // original by: Andrea Giammarchi (https://webreflection.blogspot.com)
  // improved by: Kevin van Zonneveld (https://kvz.io)
  // improved by: Brett Zamir (https://brett-zamir.me)
  //    input by: thekid
  //      note 1: If the callback is a string (or object, if an array is supplied),
  //      note 1: it can only work if the function name is in the global context
  //   example 1: array_map( function (a){return (a * a * a)}, [1, 2, 3, 4, 5] )
  //   returns 1: [ 1, 8, 27, 64, 125 ]

  const argc = arguments.length
  const argv = arguments
  let obj = null
  let cb = callback
  const j = argv[1].length
  let i = 0
  let k = 1
  let m = 0
  let tmp = []
  const tmpArr = []

  const $global = typeof window !== 'undefined' ? window : global

  while (i < j) {
    while (k < argc) {
      tmp[m++] = argv[k++][i]
    }

    m = 0
    k = 1

    if (callback) {
      if (typeof callback === 'string') {
        cb = $global[callback]
      } else if (typeof callback === 'object' && callback.length) {
        obj = typeof callback[0] === 'string' ? $global[callback[0]] : callback[0]
        if (typeof obj === 'undefined') {
          throw new Error('Object not found: ' + callback[0])
        }
        cb = typeof callback[1] === 'string' ? obj[callback[1]] : callback[1]
      }
      tmpArr[i++] = cb.apply(obj, tmp)
    } else {
      tmpArr[i++] = tmp
    }

    tmp = []
  }

  return tmpArr
}
