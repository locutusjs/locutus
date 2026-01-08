module.exports = function round(x, digits) {
  //      discuss at: https://locutus.io/r/round/
  // parity verified: R 4.4
  //     original by: Kevin van Zonneveld (https://kvz.io)
  //       example 1: round(3.14159)
  //       returns 1: 3
  //       example 2: round(3.14159, 2)
  //       returns 2: 3.14

  if (digits === undefined || digits === 0) {
    return Math.round(x)
  }
  const factor = Math.pow(10, digits)
  return Math.round(x * factor) / factor
}
