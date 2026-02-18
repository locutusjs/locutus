import { resolveNumericComparator } from '../_helpers/_callbackResolver.ts'
import { type PhpAssoc, toPhpArrayObject } from '../_helpers/_phpTypes.ts'

type PhpArray = PhpAssoc<unknown>

export function array_diff_uassoc(arr1: PhpArray, ...arraysAndCallback: unknown[]): PhpArray {
  //  discuss at: https://locutus.io/php/array_diff_uassoc/
  // original by: Brett Zamir (https://brett-zamir.me)
  //   example 1: var $array1 = {a: 'green', b: 'brown', c: 'blue', 0: 'red'}
  //   example 1: var $array2 = {a: 'GREEN', B: 'brown', 0: 'yellow', 1: 'red'}
  //   example 1: array_diff_uassoc($array1, $array2, function (key1, key2) { return (key1 === key2 ? 0 : (key1 > key2 ? 1 : -1)) })
  //   returns 1: {a: 'green', b: 'brown', c: 'blue', 0: 'red'}

  const retArr: PhpArray = {}
  const callback = arraysAndCallback[arraysAndCallback.length - 1]
  const arrays = arraysAndCallback.slice(0, -1)
  const keyComparator = resolveNumericComparator<string, string>(callback, 'array_diff_uassoc(): Invalid callback')

  arr1keys: for (const k1 in arr1) {
    for (const nextArray of arrays) {
      const arr = toPhpArrayObject(nextArray)
      for (const k in arr) {
        if (arr[k] === arr1[k1] && keyComparator(k, k1) === 0) {
          // If it reaches here, it was found in at least one array, so try next value
          continue arr1keys
        }
      }
      retArr[k1] = arr1[k1]
    }
  }

  return retArr
}
