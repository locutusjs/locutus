module.exports = function tolower(c) {
  //      discuss at: https://locutus.io/c/ctype/tolower/
  // parity verified: C 23
  //     original by: Kevin van Zonneveld (https://kvz.io)
  //          note 1: Converts an uppercase letter to lowercase.
  //       example 1: tolower('A')
  //       returns 1: 'a'
  //       example 2: tolower('a')
  //       returns 2: 'a'
  //       example 3: tolower('5')
  //       returns 3: '5'

  c = (c + '').charAt(0)
  return c.toLowerCase()
}
