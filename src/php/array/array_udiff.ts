import { resolveNumericComparator } from '../_helpers/_callbackResolver.ts'
import {
  entriesOfPhpAssoc,
  isPhpCallableDescriptor,
  type PhpAssoc,
  type PhpCallableDescriptor,
  type PhpValue,
  toPhpArrayObject,
} from '../_helpers/_phpTypes.ts'

type PhpArray<T extends PhpValue = PhpValue> = PhpAssoc<T>
type NumericComparatorDescriptor = PhpCallableDescriptor<[PhpValue, PhpValue], PhpValue>

export function array_udiff<T extends PhpValue>(
  arr1: PhpArray<T>,
  ...arraysAndCallback: [arr2: PhpValue, ...rest: PhpValue[], callback: NumericComparatorDescriptor]
): PhpArray<T> {
  //  discuss at: https://locutus.io/php/array_udiff/
  // original by: Brett Zamir (https://brett-zamir.me)
  //   example 1: var $array1 = {a: 'green', b: 'brown', c: 'blue', 0: 'red'}
  //   example 1: var $array2 = {a: 'GREEN', B: 'brown', 0: 'yellow', 1: 'red'}
  //   example 1: array_udiff($array1, $array2, function (f_string1, f_string2){var string1 = (f_string1+'').toLowerCase(); var string2 = (f_string2+'').toLowerCase(); if (string1 > string2) return 1; if (string1 === string2) return 0; return -1;})
  //   returns 1: {c: 'blue'}

  const retArr: PhpArray<T> = {}
  const callback = arraysAndCallback.at(-1)
  if (typeof callback === 'undefined' || !isPhpCallableDescriptor<[PhpValue, T], PhpValue>(callback)) {
    throw new Error('array_udiff(): Invalid callback')
  }
  const arrays = arraysAndCallback.slice(0, -1).map((value) => toPhpArrayObject<PhpValue>(value))
  const cb = resolveNumericComparator<PhpValue, T>(callback, 'array_udiff(): Invalid callback')

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
