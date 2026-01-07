module.exports = function isalpha(c) {
  //      discuss at: https://locutus.io/c/ctype/isalpha/
  // parity verified: C 23
  //     original by: Kevin van Zonneveld (https://kvz.io)
  //          note 1: Checks if the character is an alphabetic letter (A-Z or a-z).
  //       example 1: isalpha('A')
  //       returns 1: true
  //       example 2: isalpha('z')
  //       returns 2: true
  //       example 3: isalpha('5')
  //       returns 3: false
  //       example 4: isalpha(' ')
  //       returns 4: false

  c = (c + '').charAt(0)
  return /^[A-Za-z]$/.test(c)
}
