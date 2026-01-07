module.exports = function isspace(c) {
  //  discuss at: https://locutus.io/c/ctype/isspace/
  // original by: Kevin van Zonneveld (https://kvz.io)
  //      note 1: Checks if the character is a whitespace character.
  //      note 1: Includes space, tab, newline, vertical tab, form feed, carriage return.
  //   example 1: isspace(' ')
  //   returns 1: true
  //   example 2: isspace('\t')
  //   returns 2: true
  //   example 3: isspace('a')
  //   returns 3: false

  c = (c + '').charAt(0)
  return /^[\s]$/.test(c)
}
