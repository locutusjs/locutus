module.exports = function upcase(str) {
  // parity verified: Ruby 3.3
  //      discuss at: https://locutus.io/ruby/String/upcase/
  //     original by: Kevin van Zonneveld (https://kvz.io)
  //          note 1: Returns a copy of str with all lowercase letters replaced with uppercase.
  //       example 1: upcase('hELLo')
  //       returns 1: 'HELLO'

  return (str + '').toUpperCase()
}
