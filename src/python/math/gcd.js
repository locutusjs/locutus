module.exports = function gcd(a, b) {
  //      discuss at: https://locutus.io/python/gcd/
  // parity verified: Python 3.12
  //     original by: Kevin van Zonneveld (https://kvz.io)
  //          note 1: Returns the greatest common divisor of a and b
  //       example 1: gcd(48, 18)
  //       returns 1: 6
  //       example 2: gcd(0, 5)
  //       returns 2: 5
  //       example 3: gcd(7, 0)
  //       returns 3: 7

  a = Math.abs(parseInt(a, 10))
  b = Math.abs(parseInt(b, 10))

  while (b !== 0) {
    const temp = b
    b = a % b
    a = temp
  }

  return a
}
