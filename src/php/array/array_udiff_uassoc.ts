import { resolveNumericComparator } from '../_helpers/_callbackResolver.ts'
import {
  entriesOfPhpAssoc,
  isPhpCallableDescriptor,
  type PhpAssoc,
  type PhpComparatorDescriptor,
  type PhpKeyComparatorDescriptor,
  toPhpArrayObject,
} from '../_helpers/_phpTypes.ts'

type DiffArray<T> = PhpAssoc<T> | T[]

export function array_udiff_uassoc<T>(
  arr1: PhpAssoc<T>,
  ...arraysAndComparators: [
    arr2: DiffArray<T>,
    ...rest: Array<DiffArray<T>>,
    valueCallback: PhpComparatorDescriptor<T>,
    keyCallback: PhpKeyComparatorDescriptor,
  ]
): PhpAssoc<T> {
  //  discuss at: https://locutus.io/php/array_udiff_uassoc/
  // original by: Brett Zamir (https://brett-zamir.me)
  //   example 1: var $array1 = {a: 'green', b: 'brown', c: 'blue', 0: 'red'}
  //   example 1: var $array2 = {a: 'GREEN', B: 'brown', 0: 'yellow', 1: 'red'}
  //   example 1: array_udiff_uassoc($array1, $array2, function (f_string1, f_string2){var string1 = (f_string1+'').toLowerCase(); var string2 = (f_string2+'').toLowerCase(); if (string1 > string2) return 1; if (string1 === string2) return 0; return -1;}, function (f_string1, f_string2){var string1 = (f_string1+'').toLowerCase(); var string2 = (f_string2+'').toLowerCase(); if (string1 > string2) return 1; if (string1 === string2) return 0; return -1;})
  //   returns 1: {0: 'red', c: 'blue'}

  const retArr: PhpAssoc<T> = {}
  const keyCallback = arraysAndComparators.at(-1)
  const valueCallback = arraysAndComparators.at(-2)
  if (
    typeof keyCallback === 'undefined' ||
    typeof valueCallback === 'undefined' ||
    !isPhpCallableDescriptor<[string, string]>(keyCallback) ||
    !isPhpCallableDescriptor<[T, T]>(valueCallback)
  ) {
    throw new Error('array_udiff_uassoc(): Invalid callback')
  }
  const arrays = arraysAndComparators.slice(0, -2).map((value) => toPhpArrayObject<T>(value))
  const keyComparator = resolveNumericComparator<string, string>(
    keyCallback,
    'array_udiff_uassoc(): Invalid key callback',
  )
  const valueComparator = resolveNumericComparator<T, T>(valueCallback, 'array_udiff_uassoc(): Invalid value callback')

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
