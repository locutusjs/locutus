module.exports = function chop(str, charlist) {
  //      discuss at: https://locutus.io/php/chop/
  // parity verified: PHP 8.3
  //     original by: Paulo Freitas
  //       example 1: chop('    Kevin van Zonneveld    ')
  //       returns 1: '    Kevin van Zonneveld'

  const rtrim = require('../strings/rtrim')
  return rtrim(str, charlist)
}
