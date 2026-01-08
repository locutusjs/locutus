module.exports = function length(string) {
  //      discuss at: https://locutus.io/elixir/length/
  // parity verified: Elixir 1.18
  //     original by: Kevin van Zonneveld (https://kvz.io)
  //       example 1: length('hello')
  //       returns 1: 5
  //       example 2: length('')
  //       returns 2: 0

  return String(string).length
}
