import { resolveNumericComparator } from '../_helpers/_callbackResolver.ts'
import {
  entriesOfPhpAssoc,
  isPhpCallableDescriptor,
  type PhpAssoc,
  type PhpKeyComparatorDescriptor,
  toPhpArrayObject,
} from '../_helpers/_phpTypes.ts'

type DiffArray<T> = PhpAssoc<T> | T[]

export function array_diff_ukey<T>(
  arr1: PhpAssoc<T>,
  ...arraysAndCallback: [arr2: DiffArray<T>, ...rest: Array<DiffArray<T>>, callback: PhpKeyComparatorDescriptor]
): PhpAssoc<T> {
  //  discuss at: https://locutus.io/php/array_diff_ukey/
  // original by: Brett Zamir (https://brett-zamir.me)
  //   example 1: var $array1 = {blue: 1, red: 2, green: 3, purple: 4}
  //   example 1: var $array2 = {green: 5, blue: 6, yellow: 7, cyan: 8}
  //   example 1: array_diff_ukey($array1, $array2, function (key1, key2){ return (key1 === key2 ? 0 : (key1 > key2 ? 1 : -1)); })
  //   returns 1: {red: 2, purple: 4}

  const retArr: PhpAssoc<T> = {}
  const callback = arraysAndCallback.at(-1)
  if (typeof callback === 'undefined' || !isPhpCallableDescriptor<[string, string]>(callback)) {
    throw new Error('array_diff_ukey(): Invalid callback')
  }
  const arrays = arraysAndCallback.slice(0, -1).map((value) => toPhpArrayObject<T>(value))
  const keyComparator = resolveNumericComparator<string, string>(callback, 'array_diff_ukey(): Invalid callback')

  arr1keys: for (const [k1, arr1Value] of entriesOfPhpAssoc(arr1)) {
    for (const arr of arrays) {
      for (const [k] of entriesOfPhpAssoc(arr)) {
        if (keyComparator(k, k1) === 0) {
          // If it reaches here, it was found in at least one array, so try next value
          continue arr1keys
        }
      }
    }
    retArr[k1] = arr1Value
  }

  return retArr
}
