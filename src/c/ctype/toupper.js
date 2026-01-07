module.exports = function toupper(c) {
  //      discuss at: https://locutus.io/c/ctype/toupper/
  // parity verified: C 23
  //     original by: Kevin van Zonneveld (https://kvz.io)
  //          note 1: Converts a lowercase letter to uppercase.
  //       example 1: toupper('a')
  //       returns 1: 'A'
  //       example 2: toupper('A')
  //       returns 2: 'A'
  //       example 3: toupper('5')
  //       returns 3: '5'

  c = (c + '').charAt(0)
  return c.toUpperCase()
}
