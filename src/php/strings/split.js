module.exports = function split (delimiter, string) {
  //  discuss at: http://locutusjs.io/php/split/
  // original by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)
  //   example 1: split(' ', 'Kevin van Zonneveld')
  //   returns 1: ['Kevin', 'van', 'Zonneveld']

  var explode = require('../strings/explode')
  return explode(delimiter, string)
}
