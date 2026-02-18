import { type PhpArrayLike, type PhpAssoc, type PhpValue, toPhpArrayObject } from '../_helpers/_phpTypes.ts'

export function array_diff<TValue = PhpValue>(
  arr1: PhpArrayLike<TValue>,
  ...arrays: Array<PhpArrayLike<TValue>>
): PhpAssoc<TValue> {
  //  discuss at: https://locutus.io/php/array_diff/
  // original by: Kevin van Zonneveld (https://kvz.io)
  // improved by: Sanjoy Roy
  //  revised by: Brett Zamir (https://brett-zamir.me)
  //   example 1: array_diff(['Kevin', 'van', 'Zonneveld'], ['van', 'Zonneveld'])
  //   returns 1: {0:'Kevin'}

  const retArr: PhpAssoc<TValue> = {}

  if (arrays.length < 1) {
    return retArr
  }

  const arr1Object = toPhpArrayObject<TValue>(arr1)
  arr1keys: for (const [k1, arr1Value] of Object.entries(arr1Object) as Array<[string, TValue]>) {
    for (const nextArray of arrays) {
      const arr = toPhpArrayObject<TValue>(nextArray)
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
