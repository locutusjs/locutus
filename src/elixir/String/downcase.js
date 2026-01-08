module.exports = function downcase(string) {
  //      discuss at: https://locutus.io/elixir/downcase/
  // parity verified: Elixir 1.18
  //     original by: Kevin van Zonneveld (https://kvz.io)
  //       example 1: downcase('HELLO')
  //       returns 1: 'hello'
  //       example 2: downcase('Hello World')
  //       returns 2: 'hello world'

  return String(string).toLowerCase()
}
