module.exports = function uppercase(s) {
  //      discuss at: https://locutus.io/julia/uppercase/
  // parity verified: Julia 1.11
  //     original by: Kevin van Zonneveld (https://kvz.io)
  //       example 1: uppercase('hello')
  //       returns 1: 'HELLO'
  //       example 2: uppercase('Hello World')
  //       returns 2: 'HELLO WORLD'

  return String(s).toUpperCase()
}
