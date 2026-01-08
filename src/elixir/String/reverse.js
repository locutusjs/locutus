module.exports = function reverse(string) {
  //      discuss at: https://locutus.io/elixir/reverse/
  // parity verified: Elixir 1.18
  //     original by: Kevin van Zonneveld (https://kvz.io)
  //       example 1: reverse('hello')
  //       returns 1: 'olleh'
  //       example 2: reverse('abc')
  //       returns 2: 'cba'

  return String(string).split('').reverse().join('')
}
