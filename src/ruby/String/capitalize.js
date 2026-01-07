module.exports = function capitalize(str) {
  // parity verified: Ruby 3.3
  //      discuss at: https://locutus.io/ruby/String/capitalize/
  //     original by: Kevin van Zonneveld (https://kvz.io)
  //          note 1: Returns a copy of str with the first character converted to uppercase
  //          note 1: and the remainder to lowercase.
  //       example 1: capitalize('hello')
  //       returns 1: 'Hello'
  //       example 2: capitalize('HELLO')
  //       returns 2: 'Hello'
  //       example 3: capitalize('123ABC')
  //       returns 3: '123abc'

  str = str + ''
  if (str.length === 0) {
    return str
  }
  return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase()
}
