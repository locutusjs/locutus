module.exports = function ceiling(x) {
  //      discuss at: https://locutus.io/r/ceiling/
  // parity verified: R 4.4
  //     original by: Kevin van Zonneveld (https://kvz.io)
  //          note 1: Returns the smallest integer >= x
  //       example 1: ceiling(4.2)
  //       returns 1: 5
  //       example 2: ceiling(-0.5)
  //       returns 2: 0
  //       example 3: ceiling(3)
  //       returns 3: 3

  const result = Math.ceil(x)
  // Convert -0 to 0 for consistency
  return Object.is(result, -0) ? 0 : result
}
