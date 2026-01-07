module.exports = function strpos(haystack, needle, offset) {
  //      discuss at: https://locutus.io/php/strpos/
  // parity verified: PHP 8.3
  //     original by: Kevin van Zonneveld (https://kvz.io)
  //     improved by: Onno Marsman (https://twitter.com/onnomarsman)
  //     improved by: Brett Zamir (https://brett-zamir.me)
  //     bugfixed by: Daniel Esteban
  //       example 1: strpos('Kevin van Zonneveld', 'e', 5)
  //       returns 1: 14

  const i = (haystack + '').indexOf(needle, offset || 0)
  return i === -1 ? false : i
}
