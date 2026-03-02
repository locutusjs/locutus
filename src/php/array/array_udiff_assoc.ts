import { resolveNumericComparator } from '../_helpers/_callbackResolver.ts'
import {
  entriesOfPhpAssoc,
  isPhpCallableDescriptor,
  type PhpAssoc,
  type PhpComparatorDescriptor,
  toPhpArrayObject,
} from '../_helpers/_phpTypes.ts'

type DiffArray<T> = PhpAssoc<T> | T[]

export function array_udiff_assoc<T>(
  arr1: PhpAssoc<T>,
  ...arraysAndCallback: [arr2: DiffArray<T>, ...rest: Array<DiffArray<T>>, callback: PhpComparatorDescriptor<T>]
): PhpAssoc<T> {
  //  discuss at: https://locutus.io/php/array_udiff_assoc/
  // original by: Brett Zamir (https://brett-zamir.me)
  //   example 1: array_udiff_assoc({0: 'kevin', 1: 'van', 2: 'Zonneveld'}, {0: 'Kevin', 4: 'van', 5: 'Zonneveld'}, function (f_string1, f_string2){var string1 = (f_string1+'').toLowerCase(); var string2 = (f_string2+'').toLowerCase(); if (string1 > string2) return 1; if (string1 === string2) return 0; return -1;})
  //   returns 1: {1: 'van', 2: 'Zonneveld'}

  const retArr: PhpAssoc<T> = {}
  const callback = arraysAndCallback[arraysAndCallback.length - 1]
  if (typeof callback === 'undefined' || !isPhpCallableDescriptor<[T, T]>(callback)) {
    throw new Error('array_udiff_assoc(): Invalid callback')
  }
  const arrays = arraysAndCallback.slice(0, -1).map((value) => toPhpArrayObject<T>(value))
  const cb = resolveNumericComparator<T, T>(callback, 'array_udiff_assoc(): Invalid callback')

  arr1keys: for (const [k1, arr1Value] of entriesOfPhpAssoc(arr1)) {
    for (const arr of arrays) {
      for (const [k, arrValue] of entriesOfPhpAssoc(arr)) {
        if (cb(arrValue, arr1Value) === 0 && k === k1) {
          // If it reaches here, it was found in at least one array, so try next value
          continue arr1keys
        }
      }
    }
    retArr[k1] = arr1Value
  }

  return retArr
}
