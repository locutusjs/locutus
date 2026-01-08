module.exports = function cos(x) {
  //      discuss at: https://locutus.io/awk/cos/
  // parity verified: GNU AWK 5.3
  //     original by: Kevin van Zonneveld (https://kvz.io)
  //       example 1: cos(0)
  //       returns 1: 1
  //       example 2: cos(1)
  //       returns 2: 0.5403023058681398

  return Math.cos(x)
}
