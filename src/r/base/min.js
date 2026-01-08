module.exports = function min(...args) {
  //      discuss at: https://locutus.io/r/min/
  // parity verified: R 4.4
  //     original by: Kevin van Zonneveld (https://kvz.io)
  //       example 1: min(1, 5, 3)
  //       returns 1: 1
  //       example 2: min(-1, -5)
  //       returns 2: -5

  return Math.min(...args)
}
