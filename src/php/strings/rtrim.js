module.exports = function rtrim(str, charlist) {
  //  discuss at: https://locutus.io/php/rtrim/
  //    verified: 8.3
  // original by: Kevin van Zonneveld (https://kvz.io)
  //    input by: Erkekjetter
  //    input by: rem
  // improved by: Kevin van Zonneveld (https://kvz.io)
  // bugfixed by: Onno Marsman (https://twitter.com/onnomarsman)
  // bugfixed by: Brett Zamir (https://brett-zamir.me)
  //   example 1: rtrim('    Kevin van Zonneveld    ')
  //   returns 1: '    Kevin van Zonneveld'

  charlist = !charlist ? ' \\s\u00A0' : (charlist + '').replace(/([[\]().?/*{}+$^:])/g, '\\$1')

  const re = new RegExp('[' + charlist + ']+$', 'g')

  return (str + '').replace(re, '')
}
