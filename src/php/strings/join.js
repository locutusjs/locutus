module.exports = function join(glue, pieces) {
  //  discuss at: https://locutus.io/php/join/
  // original by: Kevin van Zonneveld (https://kvz.io)
  //   example 1: join(' ', ['Kevin', 'van', 'Zonneveld'])
  //   returns 1: 'Kevin van Zonneveld'

  const implode = require('../strings/implode')
  return implode(glue, pieces)
}
