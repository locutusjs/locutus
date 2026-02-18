import {
  entriesOfPhpAssoc,
  type PhpArrayLike,
  type PhpAssoc,
  type PhpValue,
  toPhpArrayObject,
} from '../_helpers/_phpTypes.ts'

export function array_diff_assoc<TValue = PhpValue>(
  arr1: PhpArrayLike<TValue>,
  ...arrays: Array<PhpArrayLike<TValue>>
): PhpAssoc<TValue> {
  //  discuss at: https://locutus.io/php/array_diff_assoc/
  // original by: Kevin van Zonneveld (https://kvz.io)
  // bugfixed by: 0m3r
  //  revised by: Brett Zamir (https://brett-zamir.me)
  //   example 1: array_diff_assoc({0: 'Kevin', 1: 'van', 2: 'Zonneveld'}, {0: 'Kevin', 4: 'van', 5: 'Zonneveld'})
  //   returns 1: {1: 'van', 2: 'Zonneveld'}

  const retArr: PhpAssoc<TValue> = {}

  if (arrays.length < 1) {
    return retArr
  }

  const arr1Object = toPhpArrayObject<TValue>(arr1)
  arr1keys: for (const [k1, arr1Value] of entriesOfPhpAssoc(arr1Object)) {
    for (const nextArray of arrays) {
      const arr = toPhpArrayObject<TValue>(nextArray)
      for (const [k, value] of entriesOfPhpAssoc(arr)) {
        if (value === arr1Value && k === k1) {
          continue arr1keys
        }
      }
    }
    retArr[k1] = arr1Value
  }

  return retArr
}
