module.exports = function lowercase(s) {
  //      discuss at: https://locutus.io/julia/lowercase/
  // parity verified: Julia 1.11
  //     original by: Kevin van Zonneveld (https://kvz.io)
  //       example 1: lowercase('HELLO')
  //       returns 1: 'hello'
  //       example 2: lowercase('Hello World')
  //       returns 2: 'hello world'

  return String(s).toLowerCase()
}
