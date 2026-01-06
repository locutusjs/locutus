module.exports = function isalnum(c) {
  //  discuss at: https://locutus.io/c/ctype/isalnum/
  // original by: Kevin van Zonneveld (https://kvz.io)
  //      note 1: Checks if the character is alphanumeric (A-Z, a-z, or 0-9).
  //   example 1: isalnum('A')
  //   returns 1: true
  //   example 2: isalnum('5')
  //   returns 2: true
  //   example 3: isalnum('_')
  //   returns 3: false

  c = (c + '').charAt(0)
  return /^[A-Za-z0-9]$/.test(c)
}
