import { resolveNumericComparator } from '../_helpers/_callbackResolver.ts'
import { type PhpAssoc, toPhpArrayObject } from '../_helpers/_phpTypes.ts'

type PhpArray = PhpAssoc<unknown>

export function array_intersect_uassoc(arr1: PhpArray): PhpArray {
  //  discuss at: https://locutus.io/php/array_intersect_uassoc/
  // original by: Brett Zamir (https://brett-zamir.me)
  //   example 1: var $array1 = {a: 'green', b: 'brown', c: 'blue', 0: 'red'}
  //   example 1: var $array2 = {a: 'GREEN', B: 'brown', 0: 'yellow', 1: 'red'}
  //   example 1: array_intersect_uassoc($array1, $array2, function (f_string1, f_string2){var string1 = (f_string1+'').toLowerCase(); var string2 = (f_string2+'').toLowerCase(); if (string1 > string2) return 1; if (string1 === string2) return 0; return -1;})
  //   returns 1: {b: 'brown'}

  const retArr: PhpArray = {}
  const arglm1 = arguments.length - 1
  const arglm2 = arglm1 - 1
  const keyComparator = resolveNumericComparator<string, string>(
    arguments[arglm1],
    'array_intersect_uassoc(): Invalid callback',
  )

  arr1keys: for (const k1 in arr1) {
    arrs: for (let i = 1; i < arglm1; i++) {
      const arr = toPhpArrayObject(arguments[i])
      for (const k in arr) {
        if (arr[k] === arr1[k1] && keyComparator(k, k1) === 0) {
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
