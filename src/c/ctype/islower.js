module.exports = function islower(c) {
  //  discuss at: https://locutus.io/c/ctype/islower/
  // original by: Kevin van Zonneveld (https://kvz.io)
  //      note 1: Checks if the character is a lowercase letter (a-z).
  //   example 1: islower('a')
  //   returns 1: true
  //   example 2: islower('A')
  //   returns 2: false
  //   example 3: islower('5')
  //   returns 3: false

  c = (c + '').charAt(0)
  return /^[a-z]$/.test(c)
}
