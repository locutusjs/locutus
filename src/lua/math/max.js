module.exports = function max(...args) {
  //      discuss at: https://locutus.io/lua/max/
  // parity verified: Lua 5.4
  //     original by: Kevin van Zonneveld (https://kvz.io)
  //       example 1: max(1, 5, 3)
  //       returns 1: 5
  //       example 2: max(-1, -5)
  //       returns 2: -1

  return Math.max(...args)
}
