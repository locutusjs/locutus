import { type PhpAssoc, toPhpArrayObject } from '../_helpers/_phpTypes.ts'

export function array_diff_assoc(
  arr1: PhpAssoc<unknown> | unknown[],
  ...arrays: Array<PhpAssoc<unknown> | unknown[]>
): PhpAssoc<unknown> {
  //  discuss at: https://locutus.io/php/array_diff_assoc/
  // original by: Kevin van Zonneveld (https://kvz.io)
  // bugfixed by: 0m3r
  //  revised by: Brett Zamir (https://brett-zamir.me)
  //   example 1: array_diff_assoc({0: 'Kevin', 1: 'van', 2: 'Zonneveld'}, {0: 'Kevin', 4: 'van', 5: 'Zonneveld'})
  //   returns 1: {1: 'van', 2: 'Zonneveld'}

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
        if (arr[k] === arr1Value && k === k1) {
          continue arr1keys
        }
      }
    }
    retArr[k1] = arr1Value
  }

  return retArr
}
