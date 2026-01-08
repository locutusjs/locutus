module.exports = function tolower(x) {
  //      discuss at: https://locutus.io/r/tolower/
  // parity verified: R 4.4
  //     original by: Kevin van Zonneveld (https://kvz.io)
  //       example 1: tolower('HELLO')
  //       returns 1: 'hello'
  //       example 2: tolower('Hello World')
  //       returns 2: 'hello world'

  return String(x).toLowerCase()
}
