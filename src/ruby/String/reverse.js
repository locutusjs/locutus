module.exports = function reverse(str) {
  // parity verified: Ruby 3.3
  //      discuss at: https://locutus.io/ruby/String/reverse/
  //     original by: Kevin van Zonneveld (https://kvz.io)
  //          note 1: Returns a new string with the characters from str in reverse order.
  //       example 1: reverse('stressed')
  //       returns 1: 'desserts'
  //       example 2: reverse('a')
  //       returns 2: 'a'

  return (str + '').split('').reverse().join('')
}
