module.exports = function trunc(x) {
  //      discuss at: https://locutus.io/python/trunc/
  // parity verified: Python 3.12
  //     original by: Kevin van Zonneveld (https://kvz.io)
  //          note 1: Returns the integer part of x, removing the decimal part
  //       example 1: trunc(3.7)
  //       returns 1: 3
  //       example 2: trunc(-3.7)
  //       returns 2: -3
  //       example 3: trunc(5)
  //       returns 3: 5

  return Math.trunc(x)
}
