module.exports = function isdigit(c) {
  //  discuss at: https://locutus.io/c/ctype/isdigit/
  // original by: Kevin van Zonneveld (https://kvz.io)
  //      note 1: Checks if the character is a decimal digit (0-9).
  //   example 1: isdigit('5')
  //   returns 1: true
  //   example 2: isdigit('0')
  //   returns 2: true
  //   example 3: isdigit('A')
  //   returns 3: false

  c = (c + '').charAt(0)
  return /^[0-9]$/.test(c)
}
