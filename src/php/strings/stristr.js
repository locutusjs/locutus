module.exports = function stristr(haystack, needle, bool) {
  //      discuss at: https://locutus.io/php/stristr/
  // parity verified: PHP 8.3
  //     original by: Kevin van Zonneveld (https://kvz.io)
  //     bugfixed by: Onno Marsman (https://twitter.com/onnomarsman)
  //       example 1: stristr('Kevin van Zonneveld', 'Van')
  //       returns 1: 'van Zonneveld'
  //       example 2: stristr('Kevin van Zonneveld', 'VAN', true)
  //       returns 2: 'Kevin '

  let pos = 0

  haystack += ''
  pos = haystack.toLowerCase().indexOf((needle + '').toLowerCase())
  if (pos === -1) {
    return false
  } else {
    if (bool) {
      return haystack.substr(0, pos)
    } else {
      return haystack.slice(pos)
    }
  }
}
