import { toPhpArrayObject } from '../_helpers/_phpTypes.ts'

export function array_diff_key(
  arr1: { [key: string]: unknown } | unknown[],
  ...arrays: Array<{ [key: string]: unknown } | unknown[]>
): { [key: string]: unknown } {
  //  discuss at: https://locutus.io/php/array_diff_key/
  // original by: Ates Goral (https://magnetiq.com)
  //  revised by: Brett Zamir (https://brett-zamir.me)
  //    input by: Everlasto
  //   example 1: array_diff_key({red: 1, green: 2, blue: 3, white: 4}, {red: 5})
  //   returns 1: {"green":2, "blue":3, "white":4}
  //   example 2: array_diff_key({red: 1, green: 2, blue: 3, white: 4}, {red: 5}, {red: 5})
  //   returns 2: {"green":2, "blue":3, "white":4}

  const retArr: { [key: string]: unknown } = {}

  if (arrays.length < 1) {
    return retArr
  }

  const arr1Object = toPhpArrayObject(arr1)
  arr1keys: for (const k1 in arr1Object) {
    for (const nextArray of arrays) {
      const arr = toPhpArrayObject(nextArray)
      for (const k in arr) {
        if (k === k1) {
          continue arr1keys
        }
      }
    }
    retArr[k1] = arr1Object[k1]
  }

  return retArr
}
