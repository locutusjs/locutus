module.exports = function array_diff_assoc(arr1) {
  // eslint-disable-line camelcase
  //  discuss at: https://locutus.io/php/array_diff_assoc/
  // original by: Kevin van Zonneveld (https://kvz.io)
  // bugfixed by: 0m3r
  //  revised by: Brett Zamir (https://brett-zamir.me)
  //   example 1: array_diff_assoc({0: 'Kevin', 1: 'van', 2: 'Zonneveld'}, {0: 'Kevin', 4: 'van', 5: 'Zonneveld'})
  //   returns 1: {1: 'van', 2: 'Zonneveld'}

  const retArr = {}
  const argl = arguments.length
  let k1 = ''
  let i = 1
  let k = ''
  let arr = {}

  arr1keys: for (k1 in arr1) {
    // eslint-disable-line no-labels
    for (i = 1; i < argl; i++) {
      arr = arguments[i]
      for (k in arr) {
        if (arr[k] === arr1[k1] && k === k1) {
          // If it reaches here, it was found in at least one array, so try next value
          continue arr1keys // eslint-disable-line no-labels
        }
      }
      retArr[k1] = arr1[k1]
    }
  }

  return retArr
}
