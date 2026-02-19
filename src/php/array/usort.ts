import { resolvePhpCallable } from '../_helpers/_callbackResolver.ts'
import { ensurePhpRuntimeState } from '../_helpers/_phpRuntimeState.ts'
import { type PhpAssoc, type PhpCallableDescriptor, type PhpInput } from '../_helpers/_phpTypes.ts'

type SortContextValue = PhpInput

export function usort<T>(
  this: PhpAssoc<SortContextValue>,
  inputArr: Record<string, T>,
  sorter: PhpCallableDescriptor<[T, T], number>,
): boolean | Record<string, T> {
  //  discuss at: https://locutus.io/php/usort/
  // original by: Brett Zamir (https://brett-zamir.me)
  // improved by: Brett Zamir (https://brett-zamir.me)
  //      note 1: This function deviates from PHP in returning a copy of the array instead
  //      note 1: of acting by reference and returning true; this was necessary because
  //      note 1: IE does not allow deleting and re-adding of properties without caching
  //      note 1: of property position; you can set the ini of "locutus.sortByReference" to true to
  //      note 1: get the PHP behavior, but use this only if you are in an environment
  //      note 1: such as Firefox extensions where for-in iteration order is fixed and true
  //      note 1: property deletion is supported. Note that we intend to implement the PHP
  //      note 1: behavior by default if IE ever does allow it; only gives shallow copy since
  //      note 1: is by reference in PHP anyways
  //   example 1: var $stuff = {d: '3', a: '1', b: '11', c: '4'}
  //   example 1: usort($stuff, function (a, b) { return (a - b) })
  //   example 1: var $result = $stuff
  //   returns 1: {0: '1', 1: '3', 2: '4', 3: '11'}

  const valArr: T[] = []
  let k = ''
  let i = 0
  let sortByReference = false
  let populateArr: Record<string, T> = {}

  const normalizedSorter: PhpCallableDescriptor<[T, T], number> = typeof sorter === 'string' ? [this, sorter] : sorter
  let comparator: ((a: T, b: T) => number) | undefined
  try {
    const resolved = resolvePhpCallable<[T, T], number>(normalizedSorter, {
      invalidMessage: 'usort(): Invalid callback',
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
        valArr.push(value)
      }
      if (sortByReference) {
        delete inputArr[k]
      }
    }
  }
  try {
    if (typeof comparator !== 'function') {
      return false
    }
    valArr.sort(comparator)
  } catch (_e) {
    return false
  }
  for (i = 0; i < valArr.length; i++) {
    // Repopulate the old array
    const value = valArr[i]
    if (typeof value === 'undefined') {
      continue
    }
    populateArr[i] = value
  }

  return sortByReference || populateArr
}
