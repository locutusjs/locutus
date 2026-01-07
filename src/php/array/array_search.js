module.exports = function array_search(needle, haystack, argStrict) {
  //      discuss at: https://locutus.io/php/array_search/
  // parity verified: PHP 8.3
  //     original by: Kevin van Zonneveld (https://kvz.io)
  //        input by: Brett Zamir (https://brett-zamir.me)
  //     bugfixed by: Kevin van Zonneveld (https://kvz.io)
  //     bugfixed by: Reynier de la Rosa (https://scriptinside.blogspot.com.es/)
  //       example 1: array_search('zonneveld', {firstname: 'kevin', middle: 'van', surname: 'zonneveld'})
  //       returns 1: 'surname'
  //       example 2: array_search('3', {a: 3, b: 5, c: 7})
  //       returns 2: 'a'

  const strict = !!argStrict
  let key = ''

  if (typeof needle === 'object' && needle.exec) {
    // Duck-type for RegExp
    if (!strict) {
      // Let's consider case sensitive searches as strict
      const flags =
        'i' +
        (needle.global ? 'g' : '') +
        (needle.multiline ? 'm' : '') +
        // sticky is FF only
        (needle.sticky ? 'y' : '')
      needle = new RegExp(needle.source, flags)
    }
    for (key in haystack) {
      if (haystack.hasOwnProperty(key)) {
        if (needle.test(haystack[key])) {
          return key
        }
      }
    }
    return false
  }

  for (key in haystack) {
    if (haystack.hasOwnProperty(key)) {
      // biome-ignore lint/suspicious/noDoubleEquals: non-strict comparison intended
      if ((strict && haystack[key] === needle) || (!strict && haystack[key] == needle)) {
        return key
      }
    }
  }

  return false
}
