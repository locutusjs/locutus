module.exports = function ucfirst(str) {
  //      discuss at: https://locutus.io/php/ucfirst/
  // parity verified: PHP 8.3
  //     original by: Kevin van Zonneveld (https://kvz.io)
  //     bugfixed by: Onno Marsman (https://twitter.com/onnomarsman)
  //     improved by: Brett Zamir (https://brett-zamir.me)
  //       example 1: ucfirst('kevin van zonneveld')
  //       returns 1: 'Kevin van zonneveld'

  str += ''
  const f = str.charAt(0).toUpperCase()
  return f + str.substr(1)
}
