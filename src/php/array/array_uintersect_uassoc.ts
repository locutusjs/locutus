import { resolveNumericComparator } from '../_helpers/_callbackResolver.ts'
import { type PhpAssoc, type PhpValue, toPhpArrayObject } from '../_helpers/_phpTypes.ts'

type PhpArray = PhpAssoc<PhpValue>

export function array_uintersect_uassoc(arr1: PhpArray, ...arraysAndComparators: PhpValue[]): PhpArray {
  //  discuss at: https://locutus.io/php/array_uintersect_uassoc/
  // original by: Brett Zamir (https://brett-zamir.me)
  //   example 1: var $array1 = {a: 'green', b: 'brown', c: 'blue', 0: 'red'}
  //   example 1: var $array2 = {a: 'GREEN', B: 'brown', 0: 'yellow', 1: 'red'}
  //   example 1: array_uintersect_uassoc($array1, $array2, function (f_string1, f_string2){var string1 = (f_string1+'').toLowerCase(); var string2 = (f_string2+'').toLowerCase(); if (string1 > string2) return 1; if (string1 === string2) return 0; return -1;}, function (f_string1, f_string2){var string1 = (f_string1+'').toLowerCase(); var string2 = (f_string2+'').toLowerCase(); if (string1 > string2) return 1; if (string1 === string2) return 0; return -1;})
  //   returns 1: {a: 'green', b: 'brown'}

  const retArr: PhpArray = {}
  const keyCallback = arraysAndComparators[arraysAndComparators.length - 1]
  const valueCallback = arraysAndComparators[arraysAndComparators.length - 2]
  const arrays = arraysAndComparators.slice(0, -2).map((value) => toPhpArrayObject<PhpValue>(value))
  const lastArrayIndex = arrays.length - 1
  const keyComparator = resolveNumericComparator<string, string>(
    keyCallback,
    'array_uintersect_uassoc(): Invalid key callback',
  )
  const valueComparator = resolveNumericComparator(valueCallback, 'array_uintersect_uassoc(): Invalid value callback')

  arr1keys: for (const k1 in arr1) {
    arrs: for (const [i, arr] of arrays.entries()) {
      for (const k in arr) {
        if (valueComparator(arr[k], arr1[k1]) === 0 && keyComparator(k, k1) === 0) {
          if (i === lastArrayIndex) {
            retArr[k1] = arr1[k1]
          }
          // If the innermost loop always leads at least once to an equal value,
          // continue the loop until done
          continue arrs
        }
      }
      // If it reaches here, it wasn't found in at least one array, so try next value
      continue arr1keys
    }
  }

  return retArr
}
