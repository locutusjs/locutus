module.exports = function isupper(c) {
  //  discuss at: https://locutus.io/c/ctype/isupper/
  // original by: Kevin van Zonneveld (https://kvz.io)
  //      note 1: Checks if the character is an uppercase letter (A-Z).
  //   example 1: isupper('A')
  //   returns 1: true
  //   example 2: isupper('a')
  //   returns 2: false
  //   example 3: isupper('5')
  //   returns 3: false

  c = (c + '').charAt(0)
  return /^[A-Z]$/.test(c)
}
