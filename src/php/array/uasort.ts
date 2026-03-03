import { resolvePhpCallable } from '../_helpers/_callbackResolver.ts'
import { ensurePhpRuntimeState } from '../_helpers/_phpRuntimeState.ts'
import {
  type NumericLike,
  type PhpAssoc,
  type PhpComparatorDescriptor,
  type PhpRuntimeValue,
} from '../_helpers/_phpTypes.ts'

type SortContextValue = PhpRuntimeValue

export function uasort<T>(
  this: PhpAssoc<SortContextValue>,
  inputArr: Record<string, T>,
  sorter: PhpComparatorDescriptor<T>,
): boolean | Record<string, T> {
  //  discuss at: https://locutus.io/php/uasort/
  // original by: Brett Zamir (https://brett-zamir.me)
  // improved by: Brett Zamir (https://brett-zamir.me)
  // improved by: Theriault (https://github.com/Theriault)
  //      note 1: This function deviates from PHP in returning a copy of the array instead
  //      note 1: of acting by reference and returning true; this was necessary because
  //      note 1: IE does not allow deleting and re-adding of properties without caching
  //      note 1: of property position; you can set the ini of "locutus.sortByReference" to true to
  //      note 1: get the PHP behavior, but use this only if you are in an environment
  //      note 1: such as Firefox extensions where for-in iteration order is fixed and true
  //      note 1: property deletion is supported. Note that we intend to implement the PHP
  //      note 1: behavior by default if IE ever does allow it; only gives shallow copy since
  //      note 1: is by reference in PHP anyways
  //   example 1: var $sorter = function (a, b) { if (a > b) {return 1;}if (a < b) {return -1;} return 0;}
  //   example 1: var $fruits = {d: 'lemon', a: 'orange', b: 'banana', c: 'apple'}
  //   example 1: uasort($fruits, $sorter)
  //   example 1: var $result = $fruits
  //   returns 1: {c: 'apple', b: 'banana', d: 'lemon', a: 'orange'}

  const valArr: [string, T][] = []
  let k = ''
  let i = 0
  let sortByReference = false
  let populateArr: Record<string, T> = {}

  const normalizedSorter: PhpComparatorDescriptor<T> = typeof sorter === 'string' ? [this, sorter] : sorter
  let comparator: ((a: T, b: T) => number) | undefined
  try {
    const resolved = resolvePhpCallable<[T, T], NumericLike>(normalizedSorter, {
      invalidMessage: 'uasort(): Invalid callback',
      missingScopeMessage: (scopeName: string) => 'Object not found: ' + scopeName,
    })
    comparator = (a: T, b: T): number => Number(resolved.fn.apply(resolved.scope, [a, b]))
  } catch (_error) {
    return false
  }

  const runtime = ensurePhpRuntimeState()
  const iniVal = String(runtime.ini['locutus.sortByReference']?.local_value ?? '') || 'on'
  sortByReference = iniVal === 'on'
  populateArr = sortByReference ? inputArr : populateArr

  for (k in inputArr) {
    // Get key and value arrays
    if (inputArr.hasOwnProperty(k)) {
      const value = inputArr[k]
      if (typeof value !== 'undefined') {
        valArr.push([k, value])
      }
      if (sortByReference) {
        delete inputArr[k]
      }
    }
  }
  if (typeof comparator !== 'function') {
    return false
  }
  valArr.sort(function (a, b) {
    return comparator(a[1], b[1])
  })

  for (i = 0; i < valArr.length; i++) {
    // Repopulate the old array
    const entry = valArr[i]
    if (!entry) {
      continue
    }
    populateArr[entry[0]] = entry[1]
  }

  return sortByReference || populateArr
}
