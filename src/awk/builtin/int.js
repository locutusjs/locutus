module.exports = function int(x) {
  //      discuss at: https://locutus.io/awk/int/
  // parity verified: GNU AWK 5.3
  //     original by: Kevin van Zonneveld (https://kvz.io)
  //       example 1: int(4.7)
  //       returns 1: 4
  //       example 2: int(-4.7)
  //       returns 2: -4
  //       example 3: int(3)
  //       returns 3: 3

  return Math.trunc(x)
}
