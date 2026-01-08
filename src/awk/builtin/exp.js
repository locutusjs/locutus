module.exports = function exp(x) {
  //      discuss at: https://locutus.io/awk/exp/
  // parity verified: GNU AWK 5.3
  //     original by: Kevin van Zonneveld (https://kvz.io)
  //       example 1: exp(0)
  //       returns 1: 1
  //       example 2: exp(1)
  //       returns 2: 2.718281828459045

  return Math.exp(x)
}
