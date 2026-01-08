module.exports = function nchar(x) {
  //      discuss at: https://locutus.io/r/nchar/
  // parity verified: R 4.4
  //     original by: Kevin van Zonneveld (https://kvz.io)
  //       example 1: nchar('hello')
  //       returns 1: 5
  //       example 2: nchar('')
  //       returns 2: 0

  return String(x).length
}
