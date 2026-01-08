module.exports = function length(s) {
  //      discuss at: https://locutus.io/awk/length/
  // parity verified: GNU AWK 5.3
  //     original by: Kevin van Zonneveld (https://kvz.io)
  //       example 1: length('hello')
  //       returns 1: 5
  //       example 2: length('')
  //       returns 2: 0
  //       example 3: length('test string')
  //       returns 3: 11

  if (s === undefined || s === null) {
    return 0
  }
  return String(s).length
}
