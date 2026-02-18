import { toPhpArrayObject } from '../_helpers/_phpTypes.ts'

export function array_intersect(
  arr1: { [key: string]: unknown } | unknown[],
  ...arrays: Array<{ [key: string]: unknown } | unknown[]>
): { [key: string]: unknown } {
  //  discuss at: https://locutus.io/php/array_intersect/
  // original by: Brett Zamir (https://brett-zamir.me)
  //      note 1: These only output associative arrays (would need to be
  //      note 1: all numeric and counting from zero to be numeric)
  //   example 1: var $array1 = {'a' : 'green', 0:'red', 1: 'blue'}
  //   example 1: var $array2 = {'b' : 'green', 0:'yellow', 1:'red'}
  //   example 1: var $array3 = ['green', 'red']
  //   example 1: var $result = array_intersect($array1, $array2, $array3)
  //   returns 1: {0: 'red', a: 'green'}

  const retArr: { [key: string]: unknown } = {}
  if (arrays.length < 1) {
    return retArr
  }

  const arr1Object = toPhpArrayObject(arr1)
  arr1keys: for (const k1 in arr1Object) {
    const arr1Value = arr1Object[k1]
    for (const nextArray of arrays) {
      const arr = toPhpArrayObject(nextArray)
      let found = false
      for (const k in arr) {
        if (arr[k] === arr1Value) {
          found = true
          break
        }
      }
      if (!found) {
        continue arr1keys
      }
    }
    retArr[k1] = arr1Value
  }

  return retArr
}
