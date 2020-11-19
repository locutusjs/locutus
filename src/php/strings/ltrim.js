module.exports = function ltrim (str, charlist) {
  //  discuss at: https://locutus.io/php/ltrim/
  // original by: Kevin van Zonneveld (https://kvz.io)
  //    input by: Erkekjetter
  // improved by: Kevin van Zonneveld (https://kvz.io)
  // bugfixed by: Onno Marsman (https://twitter.com/onnomarsman)
  //   example 1: ltrim('    Kevin van Zonneveld    ')
  //   returns 1: 'Kevin van Zonneveld    '

  charlist = !charlist ? ' \\s\u00A0' : (charlist + '')
    .replace(/([[\]().?/*{}+$^:])/g, '$1')

  const re = new RegExp('^[' + charlist + ']+', 'g')

  return (str + '')
    .replace(re, '')
}
