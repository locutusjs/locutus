module.exports = function chop (str, charlist) {
  //  discuss at: http://locutusjs.io/php/chop/
  // original by: Paulo Freitas
  //   example 1: chop('    Kevin van Zonneveld    ');
  //   returns 1: '    Kevin van Zonneveld'

  var rtrim = require('../strings/rtrim')
  return rtrim(str, charlist)
}
