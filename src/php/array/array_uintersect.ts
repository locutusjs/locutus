import { resolveNumericComparator } from '../_helpers/_callbackResolver.ts'
import { type PhpAssoc, toPhpArrayObject } from '../_helpers/_phpTypes.ts'

type PhpValue = {} | null | undefined
type PhpArray = PhpAssoc<PhpValue>

export function array_uintersect(arr1: PhpArray, ...arraysAndCallback: PhpValue[]): PhpArray {
  //  discuss at: https://locutus.io/php/array_uintersect/
  // original by: Brett Zamir (https://brett-zamir.me)
  // bugfixed by: Demosthenes Koptsis
  //   example 1: var $array1 = {a: 'green', b: 'brown', c: 'blue', 0: 'red'}
  //   example 1: var $array2 = {a: 'GREEN', B: 'brown', 0: 'yellow', 1: 'red'}
  //   example 1: array_uintersect($array1, $array2, function( f_string1, f_string2){var string1 = (f_string1+'').toLowerCase(); var string2 = (f_string2+'').toLowerCase(); if (string1 > string2) return 1; if (string1 === string2) return 0; return -1;})
  //   returns 1: {a: 'green', b: 'brown', 0: 'red'}

  const retArr: PhpArray = {}
  const callback = arraysAndCallback[arraysAndCallback.length - 1]
  const arrays = arraysAndCallback.slice(0, -1).map((value) => toPhpArrayObject<PhpValue>(value))
  const valueComparator = resolveNumericComparator(callback, 'array_uintersect(): Invalid callback')
  const lastArrayIndex = arrays.length - 1

  arr1keys: for (const k1 in arr1) {
    arrs: for (const [i, arr] of arrays.entries()) {
      for (const k in arr) {
        if (valueComparator(arr[k], arr1[k1]) === 0) {
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
