module.exports = function strip(str) {
  // parity verified: Ruby 3.3
  //      discuss at: https://locutus.io/ruby/String/strip/
  //     original by: Kevin van Zonneveld (https://kvz.io)
  //          note 1: Returns a copy of str with leading and trailing whitespace removed.
  //       example 1: strip('    hello    ')
  //       returns 1: 'hello'
  //       example 2: strip('\t\ngoodbye\r\n')
  //       returns 2: 'goodbye'

  return (str + '').trim()
}
