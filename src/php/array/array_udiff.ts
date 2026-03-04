import { resolveNumericComparator } from '../_helpers/_callbackResolver.ts'
import {
  entriesOfPhpAssoc,
  isPhpCallableDescriptor,
  type PhpAssoc,
  type PhpComparatorDescriptor,
  toPhpArrayObject,
} from '../_helpers/_phpTypes.ts'

type DiffArray<T> = PhpAssoc<T> | T[]

export function array_udiff<T>(
  arr1: PhpAssoc<T>,
  ...arraysAndCallback: [arr2: DiffArray<T>, ...rest: Array<DiffArray<T>>, callback: PhpComparatorDescriptor<T>]
): PhpAssoc<T> {
  //  discuss at: https://locutus.io/php/array_udiff/
  // original by: Brett Zamir (https://brett-zamir.me)
  //   example 1: var $array1 = {a: 'green', b: 'brown', c: 'blue', 0: 'red'}
  //   example 1: var $array2 = {a: 'GREEN', B: 'brown', 0: 'yellow', 1: 'red'}
  //   example 1: array_udiff($array1, $array2, function (f_string1, f_string2){var string1 = (f_string1+'').toLowerCase(); var string2 = (f_string2+'').toLowerCase(); if (string1 > string2) return 1; if (string1 === string2) return 0; return -1;})
  //   returns 1: {c: 'blue'}

  const retArr: PhpAssoc<T> = {}
  const callback = arraysAndCallback.at(-1)
  if (typeof callback === 'undefined' || !isPhpCallableDescriptor<[T, T]>(callback)) {
    throw new Error('array_udiff(): Invalid callback')
  }
  const arrays = arraysAndCallback.slice(0, -1).map((value) => toPhpArrayObject<T>(value))
  const cb = resolveNumericComparator<T, T>(callback, 'array_udiff(): Invalid callback')

  arr1keys: for (const [k1, arr1Value] of entriesOfPhpAssoc(arr1)) {
    for (const arr of arrays) {
      for (const [, arrValue] of entriesOfPhpAssoc(arr)) {
        if (cb(arrValue, arr1Value) === 0) {
          // If it reaches here, it was found in at least one array, so try next value
          continue arr1keys
        }
      }
    }
    retArr[k1] = arr1Value
  }

  return retArr
}
