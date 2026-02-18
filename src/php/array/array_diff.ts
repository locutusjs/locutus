import { type PhpAssoc, toPhpArrayObject } from '../_helpers/_phpTypes.ts'

export function array_diff(
  arr1: unknown[] | PhpAssoc<unknown>,
  ...arrays: Array<unknown[] | PhpAssoc<unknown>>
): PhpAssoc<unknown> {
  //  discuss at: https://locutus.io/php/array_diff/
  // original by: Kevin van Zonneveld (https://kvz.io)
  // improved by: Sanjoy Roy
  //  revised by: Brett Zamir (https://brett-zamir.me)
  //   example 1: array_diff(['Kevin', 'van', 'Zonneveld'], ['van', 'Zonneveld'])
  //   returns 1: {0:'Kevin'}

  const retArr: PhpAssoc<unknown> = {}

  if (arrays.length < 1) {
    return retArr
  }

  const arr1Object = toPhpArrayObject(arr1)
  arr1keys: for (const k1 in arr1Object) {
    const arr1Value = arr1Object[k1]
    for (const nextArray of arrays) {
      const arr = toPhpArrayObject(nextArray)
      for (const k in arr) {
        if (arr[k] === arr1Value) {
          continue arr1keys
        }
      }
    }
    retArr[k1] = arr1Value
  }

  return retArr
}
