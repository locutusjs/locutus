import type { PhpAssoc, PhpValue } from '../_helpers/_phpTypes.ts'

export function array_search(needle: PhpValue, haystack: PhpAssoc<PhpValue>, argStrict?: PhpValue): string | false {
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

  if (needle instanceof RegExp) {
    // Duck-type for RegExp
    let regex = needle
    if (!strict) {
      // Let's consider case sensitive searches as strict
      const flags =
        'i' +
        (needle.global ? 'g' : '') +
        (needle.multiline ? 'm' : '') +
        // sticky is FF only
        (needle.sticky ? 'y' : '')
      regex = new RegExp(needle.source, flags)
    }
    for (const key in haystack) {
      if (Object.prototype.hasOwnProperty.call(haystack, key)) {
        if (regex.test(String(haystack[key]))) {
          return key
        }
      }
    }
    return false
  }

  for (const key in haystack) {
    if (Object.prototype.hasOwnProperty.call(haystack, key)) {
      // biome-ignore lint/suspicious/noDoubleEquals: non-strict comparison intended
      if ((strict && haystack[key] === needle) || (!strict && haystack[key] == needle)) {
        return key
      }
    }
  }

  return false
}
