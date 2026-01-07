module.exports = function strchr(haystack, needle, bool) {
  //  discuss at: https://locutus.io/php/strchr/
  //   verified: 8.3
  // original by: Philip Peterson
  //   example 1: strchr('Kevin van Zonneveld', 'van')
  //   returns 1: 'van Zonneveld'
  //   example 2: strchr('Kevin van Zonneveld', 'van', true)
  //   returns 2: 'Kevin '

  const strstr = require('../strings/strstr')
  return strstr(haystack, needle, bool)
}
