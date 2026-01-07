module.exports = function isinf(x) {
  //  discuss at: https://locutus.io/python/isinf/
  //   verified: 3.12
  // original by: Kevin van Zonneveld (https://kvz.io)
  //      note 1: Returns True if x is positive or negative infinity
  //   example 1: isinf(Infinity)
  //   returns 1: true
  //   example 2: isinf(-Infinity)
  //   returns 2: true
  //   example 3: isinf(42)
  //   returns 3: false

  return x === Infinity || x === -Infinity
}
