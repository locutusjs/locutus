module.exports = function isfinite(x) {
  //  discuss at: https://locutus.io/python/isfinite/
  //    verified: 3.12
  // original by: Kevin van Zonneveld (https://kvz.io)
  //      note 1: Returns True if x is neither infinity nor NaN
  //   example 1: isfinite(42)
  //   returns 1: true
  //   example 2: isfinite(Infinity)
  //   returns 2: false
  //   example 3: isfinite(NaN)
  //   returns 3: false

  return Number.isFinite(x)
}
