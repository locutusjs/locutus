module.exports = function array_reduce(aInput, callback) {
  //  discuss at: https://locutus.io/php/array_reduce/
  // original by: Alfonso Jimenez (https://www.alfonsojimenez.com)
  //      note 1: Takes a function as an argument, not a function's name
  //   example 1: array_reduce([1, 2, 3, 4, 5], function (v, w){v += w;return v;})
  //   returns 1: 15

  const lon = aInput.length
  let res = 0
  let i = 0
  let tmp = []

  for (i = 0; i < lon; i += 2) {
    tmp[0] = aInput[i]
    if (aInput[i + 1]) {
      tmp[1] = aInput[i + 1]
    } else {
      tmp[1] = 0
    }
    res += callback.apply(null, tmp)
    tmp = []
  }

  return res
}
