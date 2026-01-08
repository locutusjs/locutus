module.exports = function log(x) {
  //      discuss at: https://locutus.io/awk/log/
  // parity verified: GNU AWK 5.3
  //     original by: Kevin van Zonneveld (https://kvz.io)
  //       example 1: log(1)
  //       returns 1: 0
  //       example 2: log(2.718281828459045)
  //       returns 2: 1

  return Math.log(x)
}
