export function ltrim(str?: string, charlist?: string): string {
  //      discuss at: https://locutus.io/php/ltrim/
  // parity verified: PHP 8.3
  //     original by: Kevin van Zonneveld (https://kvz.io)
  //        input by: Erkekjetter
  //     improved by: Kevin van Zonneveld (https://kvz.io)
  //     bugfixed by: Onno Marsman (https://twitter.com/onnomarsman)
  //       example 1: ltrim('    Kevin van Zonneveld    ')
  //       returns 1: 'Kevin van Zonneveld    '

  if (typeof str === 'undefined') {
    throw new Error('ltrim() expects at least 1 argument, 0 given')
  }

  charlist = !charlist ? ' \\s\u00A0' : (charlist + '').replace(/([[\]().?/*{}+$^:])/g, '$1')

  const re = new RegExp('^[' + charlist + ']+', 'g')

  return (str + '').replace(re, '')
}
