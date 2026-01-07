module.exports = function atof(str) {
  //      discuss at: https://locutus.io/c/stdlib/atof/
  // parity verified: C 23
  //     original by: Kevin van Zonneveld (https://kvz.io)
  //          note 1: Converts a string to a floating-point number.
  //       example 1: atof('3.14')
  //       returns 1: 3.14
  //       example 2: atof('  -2.5e10')
  //       returns 2: -25000000000
  //       example 3: atof('abc')
  //       returns 3: 0

  str = (str + '').replace(/^\s+/, '')
  const result = parseFloat(str)
  return isNaN(result) ? 0 : result
}
