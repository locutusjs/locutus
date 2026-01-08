module.exports = function rep(s, n) {
  //      discuss at: https://locutus.io/lua/rep/
  // parity verified: Lua 5.4
  //     original by: Kevin van Zonneveld (https://kvz.io)
  //       example 1: rep('ab', 3)
  //       returns 1: 'ababab'
  //       example 2: rep('x', 5)
  //       returns 2: 'xxxxx'

  if (n <= 0) {
    return ''
  }
  return String(s).repeat(n)
}
