module.exports = function strpbrk(haystack, charList) {
  //  discuss at: https://locutus.io/php/strpbrk/
  //    verified: 8.3
  // original by: Alfonso Jimenez (https://www.alfonsojimenez.com)
  // bugfixed by: Onno Marsman (https://twitter.com/onnomarsman)
  //  revised by: Christoph
  // improved by: Brett Zamir (https://brett-zamir.me)
  //   example 1: strpbrk('This is a Simple text.', 'is')
  //   returns 1: 'is is a Simple text.'

  for (let i = 0, len = haystack.length; i < len; ++i) {
    if (charList.indexOf(haystack.charAt(i)) >= 0) {
      return haystack.slice(i)
    }
  }
  return false
}
