module.exports = function trim(str, charlist) {
  //      discuss at: https://locutus.io/php/trim/
  // parity verified: PHP 8.3
  //     original by: Kevin van Zonneveld (https://kvz.io)
  //     improved by: mdsjack (https://www.mdsjack.bo.it)
  //     improved by: Alexander Ermolaev (https://snippets.dzone.com/user/AlexanderErmolaev)
  //     improved by: Kevin van Zonneveld (https://kvz.io)
  //     improved by: Steven Levithan (https://blog.stevenlevithan.com)
  //     improved by: Jack
  //        input by: Erkekjetter
  //        input by: DxGx
  //     bugfixed by: Onno Marsman (https://twitter.com/onnomarsman)
  //       example 1: trim('    Kevin van Zonneveld    ')
  //       returns 1: 'Kevin van Zonneveld'
  //       example 2: trim('Hello World', 'Hdle')
  //       returns 2: 'o Wor'
  //       example 3: trim(16, 1)
  //       returns 3: '6'

  let whitespace = [
    ' ',
    '\n',
    '\r',
    '\t',
    '\f',
    '\x0b',
    '\xa0',
    '\u2000',
    '\u2001',
    '\u2002',
    '\u2003',
    '\u2004',
    '\u2005',
    '\u2006',
    '\u2007',
    '\u2008',
    '\u2009',
    '\u200a',
    '\u200b',
    '\u2028',
    '\u2029',
    '\u3000',
  ].join('')
  let l = 0
  let i = 0
  str += ''

  if (charlist) {
    whitespace = (charlist + '').replace(/([[\]().?/*{}+$^:])/g, '$1')
  }

  l = str.length
  for (i = 0; i < l; i++) {
    if (whitespace.indexOf(str.charAt(i)) === -1) {
      str = str.substring(i)
      break
    }
  }

  l = str.length
  for (i = l - 1; i >= 0; i--) {
    if (whitespace.indexOf(str.charAt(i)) === -1) {
      str = str.substring(0, i + 1)
      break
    }
  }

  return whitespace.indexOf(str.charAt(0)) === -1 ? str : ''
}
