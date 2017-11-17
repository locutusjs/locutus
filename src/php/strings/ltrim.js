module.exports = function ltrim (str, charlist) {
  //  discuss at: http://locutus.io/php/ltrim/
  // original by: Kevin van Zonneveld (http://kvz.io)
  //    input by: Erkekjetter
  // improved by: Kevin van Zonneveld (http://kvz.io)
  // bugfixed by: Onno Marsman (https://twitter.com/onnomarsman)
  //   example 1: ltrim('    Kevin van Zonneveld    ')
  //   returns 1: 'Kevin van Zonneveld    '

  charlist = !charlist ? ' \\s\u00A0' : (String(charlist))
    .replace(/([[\]().?/*{}+$^:])/g, '$1')

  var re = new RegExp('^[' + charlist + ']+', 'g')

  return (String(str))
    .replace(re, '')
}
