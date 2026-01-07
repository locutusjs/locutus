module.exports = function split(delimiter, string) {
  //      discuss at: https://locutus.io/php/split/
  // parity verified: PHP 8.3
  //     original by: Kevin van Zonneveld (https://kvz.io)
  //       example 1: split(' ', 'Kevin van Zonneveld')
  //       returns 1: ['Kevin', 'van', 'Zonneveld']

  const explode = require('../strings/explode')
  return explode(delimiter, string)
}
