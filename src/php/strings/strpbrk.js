module.exports = function strpbrk (haystack, char_list) {
  //  discuss at: http://locutusjs.io/php/strpbrk/
  // original by: Alfonso Jimenez (http://www.alfonsojimenez.com)
  // bugfixed by: Onno Marsman (https://twitter.com/onnomarsman)
  //  revised by: Christoph
  // improved by: Brett Zamir (http://brett-zamir.me)
  //   example 1: strpbrk('This is a Simple text.', 'is')
  //   returns 1: 'is is a Simple text.'

  for (var i = 0, len = haystack.length; i < len; ++i) {
    if (char_list.indexOf(haystack.charAt(i)) >= 0) {
      return haystack.slice(i)
    }
  }
  return false
}
