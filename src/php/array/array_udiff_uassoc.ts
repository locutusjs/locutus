import { resolveNumericComparator } from '../_helpers/_callbackResolver.ts'
import {
  entriesOfPhpAssoc,
  isPhpCallableDescriptor,
  type NumericLike,
  type PhpAssoc,
  type PhpCallableDescriptor,
  type PhpValue,
  toPhpArrayObject,
} from '../_helpers/_phpTypes.ts'

type PhpArray<T extends PhpValue = PhpValue> = PhpAssoc<T>
type NumericComparatorDescriptor = PhpCallableDescriptor<[PhpValue, PhpValue], NumericLike>
type KeyComparatorDescriptor = PhpCallableDescriptor<[string, string], NumericLike>

export function array_udiff_uassoc<T extends PhpValue>(
  arr1: PhpArray<T>,
  ...arraysAndComparators: [
    arr2: PhpValue,
    ...rest: PhpValue[],
    valueCallback: NumericComparatorDescriptor,
    keyCallback: KeyComparatorDescriptor,
  ]
): PhpArray<T> {
  //  discuss at: https://locutus.io/php/array_udiff_uassoc/
  // original by: Brett Zamir (https://brett-zamir.me)
  //   example 1: var $array1 = {a: 'green', b: 'brown', c: 'blue', 0: 'red'}
  //   example 1: var $array2 = {a: 'GREEN', B: 'brown', 0: 'yellow', 1: 'red'}
  //   example 1: array_udiff_uassoc($array1, $array2, function (f_string1, f_string2){var string1 = (f_string1+'').toLowerCase(); var string2 = (f_string2+'').toLowerCase(); if (string1 > string2) return 1; if (string1 === string2) return 0; return -1;}, function (f_string1, f_string2){var string1 = (f_string1+'').toLowerCase(); var string2 = (f_string2+'').toLowerCase(); if (string1 > string2) return 1; if (string1 === string2) return 0; return -1;})
  //   returns 1: {0: 'red', c: 'blue'}

  const retArr: PhpArray<T> = {}
  const keyCallback = arraysAndComparators[arraysAndComparators.length - 1]
  const valueCallback = arraysAndComparators[arraysAndComparators.length - 2]
  if (
    typeof keyCallback === 'undefined' ||
    typeof valueCallback === 'undefined' ||
    !isPhpCallableDescriptor<[string, string], NumericLike>(keyCallback) ||
    !isPhpCallableDescriptor<[PhpValue, T], NumericLike>(valueCallback)
  ) {
    throw new Error('array_udiff_uassoc(): Invalid callback')
  }
  const arrays = arraysAndComparators.slice(0, -2).map((value) => toPhpArrayObject<PhpValue>(value))
  const keyComparator = resolveNumericComparator<string, string>(
    keyCallback,
    'array_udiff_uassoc(): Invalid key callback',
  )
  const valueComparator = resolveNumericComparator<PhpValue, T>(
    valueCallback,
    'array_udiff_uassoc(): Invalid value callback',
  )

  arr1keys: for (const [k1, arr1Value] of entriesOfPhpAssoc(arr1)) {
    for (const arr of arrays) {
      for (const [k, arrValue] of entriesOfPhpAssoc(arr)) {
        if (valueComparator(arrValue, arr1Value) === 0 && keyComparator(k, k1) === 0) {
          // If it reaches here, it was found in at least one array, so try next value
          continue arr1keys
        }
      }
    }
    retArr[k1] = arr1Value
  }

  return retArr
}
