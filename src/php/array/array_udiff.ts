import { resolveNumericComparator } from '../_helpers/_callbackResolver.ts'
import { type PhpAssoc, toPhpArrayObject } from '../_helpers/_phpTypes.ts'

type PhpArray = PhpAssoc<unknown>

export function array_udiff(arr1: PhpArray, ...arraysAndCallback: unknown[]): PhpArray {
  //  discuss at: https://locutus.io/php/array_udiff/
  // original by: Brett Zamir (https://brett-zamir.me)
  //   example 1: var $array1 = {a: 'green', b: 'brown', c: 'blue', 0: 'red'}
  //   example 1: var $array2 = {a: 'GREEN', B: 'brown', 0: 'yellow', 1: 'red'}
  //   example 1: array_udiff($array1, $array2, function (f_string1, f_string2){var string1 = (f_string1+'').toLowerCase(); var string2 = (f_string2+'').toLowerCase(); if (string1 > string2) return 1; if (string1 === string2) return 0; return -1;})
  //   returns 1: {c: 'blue'}

  const retArr: PhpArray = {}
  const callback = arraysAndCallback[arraysAndCallback.length - 1]
  const arrays = arraysAndCallback.slice(0, -1)
  const cb = resolveNumericComparator(callback, 'array_udiff(): Invalid callback')

  arr1keys: for (const k1 in arr1) {
    for (const nextArray of arrays) {
      const arr = toPhpArrayObject(nextArray)
      for (const k in arr) {
        if (cb(arr[k], arr1[k1]) === 0) {
          // If it reaches here, it was found in at least one array, so try next value
          continue arr1keys
        }
      }
      retArr[k1] = arr1[k1]
    }
  }

  return retArr
}
