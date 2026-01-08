module.exports = function tolower(s) {
  //      discuss at: https://locutus.io/awk/tolower/
  // parity verified: GNU AWK 5.3
  //     original by: Kevin van Zonneveld (https://kvz.io)
  //       example 1: tolower('HELLO')
  //       returns 1: 'hello'
  //       example 2: tolower('Hello World')
  //       returns 2: 'hello world'

  return String(s).toLowerCase()
}
