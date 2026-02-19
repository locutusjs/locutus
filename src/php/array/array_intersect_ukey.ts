import { resolveNumericComparator } from '../_helpers/_callbackResolver.ts'
import {
  entriesOfPhpAssoc,
  isPhpCallableDescriptor,
  type NumericLike,
  type PhpAssoc,
  type PhpCallableDescriptor,
  type PhpValue,
  toPhpArrayObject,
} from '../_helpers/_phpTypes.ts'

type PhpArray<T extends PhpValue = PhpValue> = PhpAssoc<T>
type KeyComparatorDescriptor = PhpCallableDescriptor<[string, string], NumericLike>

export function array_intersect_ukey<T extends PhpValue>(
  arr1: PhpArray<T>,
  ...arraysAndCallback: [arr2: PhpValue, ...rest: PhpValue[], callback: KeyComparatorDescriptor]
): PhpArray<T> {
  //  discuss at: https://locutus.io/php/array_intersect_ukey/
  // original by: Brett Zamir (https://brett-zamir.me)
  //   example 1: var $array1 = {blue: 1, red: 2, green: 3, purple: 4}
  //   example 1: var $array2 = {green: 5, blue: 6, yellow: 7, cyan: 8}
  //   example 1: array_intersect_ukey ($array1, $array2, function (key1, key2){ return (key1 === key2 ? 0 : (key1 > key2 ? 1 : -1)); })
  //   returns 1: {blue: 1, green: 3}

  const retArr: PhpArray<T> = {}
  const callback = arraysAndCallback[arraysAndCallback.length - 1]
  if (typeof callback === 'undefined' || !isPhpCallableDescriptor<[string, string], NumericLike>(callback)) {
    throw new Error('array_intersect_ukey(): Invalid callback')
  }
  const arrays = arraysAndCallback.slice(0, -1).map((value) => toPhpArrayObject<PhpValue>(value))
  const lastArrayIndex = arrays.length - 1
  const keyComparator = resolveNumericComparator<string, string>(callback, 'array_intersect_ukey(): Invalid callback')

  arr1keys: for (const [k1, arr1Value] of entriesOfPhpAssoc(arr1)) {
    arrs: for (const [i, arr] of arrays.entries()) {
      for (const [k] of entriesOfPhpAssoc(arr)) {
        if (keyComparator(k, k1) === 0) {
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
