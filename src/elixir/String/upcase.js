module.exports = function upcase(string) {
  //      discuss at: https://locutus.io/elixir/upcase/
  // parity verified: Elixir 1.18
  //     original by: Kevin van Zonneveld (https://kvz.io)
  //       example 1: upcase('hello')
  //       returns 1: 'HELLO'
  //       example 2: upcase('Hello World')
  //       returns 2: 'HELLO WORLD'

  return String(string).toUpperCase()
}
