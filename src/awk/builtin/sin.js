module.exports = function sin(x) {
  //      discuss at: https://locutus.io/awk/sin/
  // parity verified: GNU AWK 5.3
  //     original by: Kevin van Zonneveld (https://kvz.io)
  //       example 1: sin(0)
  //       returns 1: 0
  //       example 2: sin(1)
  //       returns 2: 0.8414709848078965

  return Math.sin(x)
}
