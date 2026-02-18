import { resolveNumericComparator } from '../_helpers/_callbackResolver.ts'
import { type PhpAssoc, toPhpArrayObject } from '../_helpers/_phpTypes.ts'

type PhpArray = PhpAssoc<unknown>

export function array_udiff_uassoc(arr1: PhpArray, ...arraysAndComparators: unknown[]): PhpArray {
  //  discuss at: https://locutus.io/php/array_udiff_uassoc/
  // original by: Brett Zamir (https://brett-zamir.me)
  //   example 1: var $array1 = {a: 'green', b: 'brown', c: 'blue', 0: 'red'}
  //   example 1: var $array2 = {a: 'GREEN', B: 'brown', 0: 'yellow', 1: 'red'}
  //   example 1: array_udiff_uassoc($array1, $array2, function (f_string1, f_string2){var string1 = (f_string1+'').toLowerCase(); var string2 = (f_string2+'').toLowerCase(); if (string1 > string2) return 1; if (string1 === string2) return 0; return -1;}, function (f_string1, f_string2){var string1 = (f_string1+'').toLowerCase(); var string2 = (f_string2+'').toLowerCase(); if (string1 > string2) return 1; if (string1 === string2) return 0; return -1;})
  //   returns 1: {0: 'red', c: 'blue'}

  const retArr: PhpArray = {}
  const keyCallback = arraysAndComparators[arraysAndComparators.length - 1]
  const valueCallback = arraysAndComparators[arraysAndComparators.length - 2]
  const arrays = arraysAndComparators.slice(0, -2)
  const keyComparator = resolveNumericComparator<string, string>(
    keyCallback,
    'array_udiff_uassoc(): Invalid key callback',
  )
  const valueComparator = resolveNumericComparator(valueCallback, 'array_udiff_uassoc(): Invalid value callback')

  arr1keys: for (const k1 in arr1) {
    for (const nextArray of arrays) {
      const arr = toPhpArrayObject(nextArray)
      for (const k in arr) {
        if (valueComparator(arr[k], arr1[k1]) === 0 && keyComparator(k, k1) === 0) {
          // If it reaches here, it was found in at least one array, so try next value
          continue arr1keys
        }
      }
      retArr[k1] = arr1[k1]
    }
  }

  return retArr
}
