module.exports = function join (glue, pieces) {
  //  discuss at: http://locutusjs.io/php/join/
  // original by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)
  //   example 1: join(' ', ['Kevin', 'van', 'Zonneveld']);
  //   returns 1: 'Kevin van Zonneveld'

  var implode = require('../strings/implode')
  return implode(glue, pieces)
}
