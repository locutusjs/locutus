module.exports = function toupper(s) {
  //      discuss at: https://locutus.io/awk/toupper/
  // parity verified: GNU AWK 5.3
  //     original by: Kevin van Zonneveld (https://kvz.io)
  //       example 1: toupper('hello')
  //       returns 1: 'HELLO'
  //       example 2: toupper('Hello World')
  //       returns 2: 'HELLO WORLD'

  return String(s).toUpperCase()
}
