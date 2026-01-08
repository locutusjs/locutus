module.exports = function ceil(x) {
  //      discuss at: https://locutus.io/lua/ceil/
  // parity verified: Lua 5.4
  //     original by: Kevin van Zonneveld (https://kvz.io)
  //          note 1: Returns the smallest integer >= x
  //       example 1: ceil(4.2)
  //       returns 1: 5
  //       example 2: ceil(-0.5)
  //       returns 2: 0
  //       example 3: ceil(3)
  //       returns 3: 3

  const result = Math.ceil(x)
  // Convert -0 to 0 for consistency
  return Object.is(result, -0) ? 0 : result
}
