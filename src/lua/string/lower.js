module.exports = function lower(s) {
  //      discuss at: https://locutus.io/lua/lower/
  // parity verified: Lua 5.4
  //     original by: Kevin van Zonneveld (https://kvz.io)
  //       example 1: lower('HELLO')
  //       returns 1: 'hello'
  //       example 2: lower('Hello World')
  //       returns 2: 'hello world'

  return String(s).toLowerCase()
}
