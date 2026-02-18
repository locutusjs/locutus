import { type PhpArrayLike, type PhpAssoc, toPhpArrayObject } from '../_helpers/_phpTypes.ts'

export function array_intersect_key(
  arr1: PhpArrayLike<unknown>,
  ...arrays: Array<PhpArrayLike<unknown>>
): PhpAssoc<unknown> {
  //  discuss at: https://locutus.io/php/array_intersect_key/
  // original by: Brett Zamir (https://brett-zamir.me)
  //      note 1: These only output associative arrays (would need to be
  //      note 1: all numeric and counting from zero to be numeric)
  //   example 1: var $array1 = {a: 'green', b: 'brown', c: 'blue', 0: 'red'}
  //   example 1: var $array2 = {a: 'green', 0: 'yellow', 1: 'red'}
  //   example 1: array_intersect_key($array1, $array2)
  //   returns 1: {0: 'red', a: 'green'}

  const retArr: PhpAssoc<unknown> = {}
  if (arrays.length < 1) {
    return retArr
  }

  const arr1Object = toPhpArrayObject(arr1)
  const hasOwn = Object.prototype.hasOwnProperty

  arr1keys: for (const k1 in arr1Object) {
    if (!hasOwn.call(arr1Object, k1)) {
      continue
    }
    for (const nextArray of arrays) {
      const arr = toPhpArrayObject(nextArray)
      if (!hasOwn.call(arr, k1)) {
        continue arr1keys
      }
    }
    retArr[k1] = arr1Object[k1]
  }

  return retArr
}
