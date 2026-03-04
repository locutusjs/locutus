import { resolveNumericComparator } from '../_helpers/_callbackResolver.ts'
import {
  entriesOfPhpAssoc,
  isPhpCallableDescriptor,
  type PhpAssoc,
  type PhpKeyComparatorDescriptor,
  toPhpArrayObject,
} from '../_helpers/_phpTypes.ts'

type IntersectArray<T> = PhpAssoc<T> | T[]

export function array_intersect_uassoc<T>(
  arr1: PhpAssoc<T>,
  ...arraysAndCallback: [
    arr2: IntersectArray<T>,
    ...rest: Array<IntersectArray<T>>,
    callback: PhpKeyComparatorDescriptor,
  ]
): PhpAssoc<T> {
  //  discuss at: https://locutus.io/php/array_intersect_uassoc/
  // original by: Brett Zamir (https://brett-zamir.me)
  //   example 1: var $array1 = {a: 'green', b: 'brown', c: 'blue', 0: 'red'}
  //   example 1: var $array2 = {a: 'GREEN', B: 'brown', 0: 'yellow', 1: 'red'}
  //   example 1: array_intersect_uassoc($array1, $array2, function (f_string1, f_string2){var string1 = (f_string1+'').toLowerCase(); var string2 = (f_string2+'').toLowerCase(); if (string1 > string2) return 1; if (string1 === string2) return 0; return -1;})
  //   returns 1: {b: 'brown'}

  const retArr: PhpAssoc<T> = {}
  const callback = arraysAndCallback.at(-1)
  if (typeof callback === 'undefined' || !isPhpCallableDescriptor<[string, string]>(callback)) {
    throw new Error('array_intersect_uassoc(): Invalid callback')
  }
  const arrays = arraysAndCallback.slice(0, -1).map((value) => toPhpArrayObject<T>(value))
  const lastArrayIndex = arrays.length - 1
  const keyComparator = resolveNumericComparator<string, string>(callback, 'array_intersect_uassoc(): Invalid callback')

  arr1keys: for (const [k1, arr1Value] of entriesOfPhpAssoc(arr1)) {
    arrs: for (const [i, arr] of arrays.entries()) {
      for (const [k, arrValue] of entriesOfPhpAssoc(arr)) {
        if (arrValue === arr1Value && keyComparator(k, k1) === 0) {
          if (i === lastArrayIndex) {
            retArr[k1] = arr1Value
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
