module.exports = function strripos(haystack, needle, offset) {
  //      discuss at: https://locutus.io/php/strripos/
  // parity verified: PHP 8.3
  //     original by: Kevin van Zonneveld (https://kvz.io)
  //     bugfixed by: Onno Marsman (https://twitter.com/onnomarsman)
  //     bugfixed by: Brett Zamir (https://brett-zamir.me)
  //        input by: saulius
  //       example 1: strripos('Kevin van Zonneveld', 'E')
  //       returns 1: 16

  haystack = (haystack + '').toLowerCase()
  needle = (needle + '').toLowerCase()

  let i = -1
  if (offset) {
    i = (haystack + '').slice(offset).lastIndexOf(needle) // strrpos' offset indicates starting point of range till end,
    // while lastIndexOf's optional 2nd argument indicates ending point of range from the beginning
    if (i !== -1) {
      i += offset
    }
  } else {
    i = (haystack + '').lastIndexOf(needle)
  }
  return i >= 0 ? i : false
}
