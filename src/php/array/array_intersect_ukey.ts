import { resolveNumericComparator } from '../_helpers/_callbackResolver.ts'
import { type PhpAssoc, toPhpArrayObject } from '../_helpers/_phpTypes.ts'

type PhpArray = PhpAssoc<unknown>

export function array_intersect_ukey(arr1: PhpArray): PhpArray {
  //  discuss at: https://locutus.io/php/array_intersect_ukey/
  // original by: Brett Zamir (https://brett-zamir.me)
  //   example 1: var $array1 = {blue: 1, red: 2, green: 3, purple: 4}
  //   example 1: var $array2 = {green: 5, blue: 6, yellow: 7, cyan: 8}
  //   example 1: array_intersect_ukey ($array1, $array2, function (key1, key2){ return (key1 === key2 ? 0 : (key1 > key2 ? 1 : -1)); })
  //   returns 1: {blue: 1, green: 3}

  const retArr: PhpArray = {}
  const arglm1 = arguments.length - 1
  const arglm2 = arglm1 - 1
  const keyComparator = resolveNumericComparator<string, string>(
    arguments[arglm1],
    'array_intersect_ukey(): Invalid callback',
  )

  arr1keys: for (const k1 in arr1) {
    arrs: for (let i = 1; i < arglm1; i++) {
      const arr = toPhpArrayObject(arguments[i])
      for (const k in arr) {
        if (keyComparator(k, k1) === 0) {
          if (i === arglm2) {
            retArr[k1] = arr1[k1]
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
