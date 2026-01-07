module.exports = function chop(str) {
  // parity verified: Ruby 3.3
  //      discuss at: https://locutus.io/ruby/String/chop/
  //     original by: Kevin van Zonneveld (https://kvz.io)
  //          note 1: Returns a new string with the last character removed.
  //          note 1: If the string ends with \r\n, both characters are removed.
  //       example 1: chop('string')
  //       returns 1: 'strin'
  //       example 2: chop("string\r\n")
  //       returns 2: 'string'
  //       example 3: chop('')
  //       returns 3: ''

  str = str + ''

  if (str.length === 0) {
    return str
  }

  if (str.slice(-2) === '\r\n') {
    return str.slice(0, -2)
  }

  return str.slice(0, -1)
}
