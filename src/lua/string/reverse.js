module.exports = function reverse(s) {
  //      discuss at: https://locutus.io/lua/reverse/
  // parity verified: Lua 5.4
  //     original by: Kevin van Zonneveld (https://kvz.io)
  //       example 1: reverse('hello')
  //       returns 1: 'olleh'
  //       example 2: reverse('abc')
  //       returns 2: 'cba'

  return String(s).split('').reverse().join('')
}
