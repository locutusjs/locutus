import { resolveNumericComparator } from '../_helpers/_callbackResolver.ts'
import { type PhpAssoc, toPhpArrayObject } from '../_helpers/_phpTypes.ts'

type PhpArray = PhpAssoc<unknown>

export function array_udiff_assoc(arr1: PhpArray): PhpArray {
  //  discuss at: https://locutus.io/php/array_udiff_assoc/
  // original by: Brett Zamir (https://brett-zamir.me)
  //   example 1: array_udiff_assoc({0: 'kevin', 1: 'van', 2: 'Zonneveld'}, {0: 'Kevin', 4: 'van', 5: 'Zonneveld'}, function (f_string1, f_string2){var string1 = (f_string1+'').toLowerCase(); var string2 = (f_string2+'').toLowerCase(); if (string1 > string2) return 1; if (string1 === string2) return 0; return -1;})
  //   returns 1: {1: 'van', 2: 'Zonneveld'}

  const retArr: PhpArray = {}
  const arglm1 = arguments.length - 1
  const cb = resolveNumericComparator(arguments[arglm1], 'array_udiff_assoc(): Invalid callback')

  arr1keys: for (const k1 in arr1) {
    for (let i = 1; i < arglm1; i++) {
      const arr = toPhpArrayObject(arguments[i])
      for (const k in arr) {
        if (cb(arr[k], arr1[k1]) === 0 && k === k1) {
          // If it reaches here, it was found in at least one array, so try next value
          continue arr1keys
        }
      }
      retArr[k1] = arr1[k1]
    }
  }

  return retArr
}
