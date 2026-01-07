module.exports = function is_null(mixedVar) {
  //  discuss at: https://locutus.io/php/is_null/
  //   verified: 8.3
  // original by: Kevin van Zonneveld (https://kvz.io)
  //   example 1: is_null('23')
  //   returns 1: false
  //   example 2: is_null(null)
  //   returns 2: true

  return mixedVar === null
}
