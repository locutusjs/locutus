module.exports = function log(x, base) {
  //      discuss at: https://locutus.io/python/log/
  // parity verified: Python 3.12
  //     original by: Kevin van Zonneveld (https://kvz.io)
  //          note 1: Returns the natural logarithm of x (base e)
  //          note 2: If base is provided, returns log(x) / log(base)
  //       example 1: log(1)
  //       returns 1: 0
  //       example 2: log(2.718281828459045)
  //       returns 2: 1

  if (base === undefined) {
    return Math.log(x)
  }
  return Math.log(x) / Math.log(base)
}
