import { resolveNumericComparator } from '../_helpers/_callbackResolver.ts'
import {
  entriesOfPhpAssoc,
  type PhpAssoc,
  type PhpCallableDescriptor,
  type PhpValue,
  toPhpArrayObject,
} from '../_helpers/_phpTypes.ts'

type PhpArray<T extends PhpValue = PhpValue> = PhpAssoc<T>
type NumericComparatorDescriptor = PhpCallableDescriptor<[PhpValue, PhpValue], PhpValue>

export function array_uintersect<T extends PhpValue>(
  arr1: PhpArray<T>,
  ...arraysAndCallback: [arr2: PhpValue, ...rest: PhpValue[], callback: NumericComparatorDescriptor]
): PhpArray<T> {
  //  discuss at: https://locutus.io/php/array_uintersect/
  // original by: Brett Zamir (https://brett-zamir.me)
  // bugfixed by: Demosthenes Koptsis
  //   example 1: var $array1 = {a: 'green', b: 'brown', c: 'blue', 0: 'red'}
  //   example 1: var $array2 = {a: 'GREEN', B: 'brown', 0: 'yellow', 1: 'red'}
  //   example 1: array_uintersect($array1, $array2, function( f_string1, f_string2){var string1 = (f_string1+'').toLowerCase(); var string2 = (f_string2+'').toLowerCase(); if (string1 > string2) return 1; if (string1 === string2) return 0; return -1;})
  //   returns 1: {a: 'green', b: 'brown', 0: 'red'}

  const retArr: PhpArray<T> = {}
  const callback = arraysAndCallback[arraysAndCallback.length - 1]
  const arrays = arraysAndCallback.slice(0, -1).map((value) => toPhpArrayObject<PhpValue>(value))
  const valueComparator = resolveNumericComparator<PhpValue, T>(callback, 'array_uintersect(): Invalid callback')
  const lastArrayIndex = arrays.length - 1

  arr1keys: for (const [k1, arr1Value] of entriesOfPhpAssoc(arr1)) {
    arrs: for (const [i, arr] of arrays.entries()) {
      for (const [, arrValue] of entriesOfPhpAssoc(arr)) {
        if (valueComparator(arrValue, arr1Value) === 0) {
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
