module.exports = function addslashes(str) {
  //  discuss at: https://locutus.io/php/addslashes/
  // original by: Kevin van Zonneveld (https://kvz.io)
  // improved by: Ates Goral (https://magnetiq.com)
  // improved by: marrtins
  // improved by: Nate
  // improved by: Onno Marsman (https://twitter.com/onnomarsman)
  // improved by: Brett Zamir (https://brett-zamir.me)
  // improved by: Oskar Larsson Högfeldt (https://oskar-lh.name/)
  //    input by: Denny Wardhana
  //   example 1: addslashes("kevin's birthday")
  //   returns 1: "kevin\\'s birthday"

  // biome-ignore lint/suspicious/noControlCharactersInRegex: null byte escaping is intentional
  return (str + '').replace(/[\\"']/g, '\\$&').replace(/\u0000/g, '\\0')
}
