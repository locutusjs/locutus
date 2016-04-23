module.exports = function split (delimiter, string) {
  //  discuss at: http://locutusjs.io/php/split/
  // original by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)
  //   example 1: split(' ', 'Kevin van Zonneveld');
  //   returns 1: {0: 'Kevin', 1: 'van', 2: 'Zonneveld'}

  var explode = require('../strings/explode')
  return explode(delimiter, string)
}
