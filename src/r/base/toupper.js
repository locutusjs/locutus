module.exports = function toupper(x) {
  //      discuss at: https://locutus.io/r/toupper/
  // parity verified: R 4.4
  //     original by: Kevin van Zonneveld (https://kvz.io)
  //       example 1: toupper('hello')
  //       returns 1: 'HELLO'
  //       example 2: toupper('Hello World')
  //       returns 2: 'HELLO WORLD'

  return String(x).toUpperCase()
}
