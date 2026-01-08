module.exports = function upper(s) {
  //      discuss at: https://locutus.io/lua/upper/
  // parity verified: Lua 5.4
  //     original by: Kevin van Zonneveld (https://kvz.io)
  //       example 1: upper('hello')
  //       returns 1: 'HELLO'
  //       example 2: upper('Hello World')
  //       returns 2: 'HELLO WORLD'

  return String(s).toUpperCase()
}
