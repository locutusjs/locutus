module.exports = function len(s) {
  //      discuss at: https://locutus.io/lua/len/
  // parity verified: Lua 5.4
  //     original by: Kevin van Zonneveld (https://kvz.io)
  //       example 1: len('hello')
  //       returns 1: 5
  //       example 2: len('')
  //       returns 2: 0

  return String(s).length
}
