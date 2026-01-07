module.exports = function isnan(x) {
  //  discuss at: https://locutus.io/python/isnan/
  //    verified: 3.12
  // original by: Kevin van Zonneveld (https://kvz.io)
  //      note 1: Returns True if x is NaN (Not a Number)
  //   example 1: isnan(NaN)
  //   returns 1: true
  //   example 2: isnan(42)
  //   returns 2: false
  //   example 3: isnan(Infinity)
  //   returns 3: false

  return Number.isNaN(x)
}
