import { ensurePhpRuntimeState } from '../_helpers/_phpRuntimeState.ts'
import type { PhpRuntimeValue } from '../_helpers/_phpTypes.ts'
import { i18n_loc_get_default as i18nlgd } from '../i18n/i18n_loc_get_default.ts'
import { strnatcmp } from '../strings/strnatcmp.ts'

type SortValue = PhpRuntimeValue
type SortFlag = 'SORT_REGULAR' | 'SORT_NUMERIC' | 'SORT_STRING' | 'SORT_LOCALE_STRING'

const isDenseArrayList = <T>(value: T[]): boolean => {
  const keys = Object.keys(value)
  return keys.length === value.length && keys.every((key, index) => key === String(index))
}

const setSortableEntry = <T>(target: Record<string, T> | T[], key: string, value: T): void => {
  Object.defineProperty(target, key, {
    value,
    configurable: true,
    enumerable: true,
    writable: true,
  })
}

const toSortablePrimitive = (value: SortValue): string | number | bigint | boolean => {
  if (
    typeof value === 'string' ||
    typeof value === 'number' ||
    typeof value === 'bigint' ||
    typeof value === 'boolean'
  ) {
    return value
  }

  return String(value ?? '')
}

export function asort<T extends SortValue>(inputArr: T[], sortFlags?: SortFlag): boolean | T[]
export function asort<T extends SortValue>(
  inputArr: Record<string, T>,
  sortFlags?: SortFlag,
): boolean | Record<string, T>
export function asort<T extends SortValue>(
  inputArr: Record<string, T> | T[],
  sortFlags?: SortFlag,
): boolean | Record<string, T> | T[] {
  //  discuss at: https://locutus.io/php/asort/
  // original by: Brett Zamir (https://brett-zamir.me)
  // improved by: Brett Zamir (https://brett-zamir.me)
  // improved by: Brett Zamir (https://brett-zamir.me)
  // improved by: Theriault (https://github.com/Theriault)
  //    input by: paulo kuong
  // bugfixed by: Adam Wallner (https://web2.bitbaro.hu/)
  //      note 1: SORT_STRING (as well as natsort and natcasesort) might also be
  //      note 1: integrated into all of these functions by adapting the code at
  //      note 1: https://sourcefrog.net/projects/natsort/natcompare.js
  //      note 1: The examples are correct, this is a new way
  //      note 1: Credits to: https://javascript.internet.com/math-related/bubble-sort.html
  //      note 1: This function deviates from PHP in returning a copy of the array instead
  //      note 1: of acting by reference and returning true; this was necessary because
  //      note 1: IE does not allow deleting and re-adding of properties without caching
  //      note 1: of property position; you can set the ini of "locutus.sortByReference" to true to
  //      note 1: get the PHP behavior, but use this only if you are in an environment
  //      note 1: such as Firefox extensions where for-in iteration order is fixed and true
  //      note 1: property deletion is supported. Note that we intend to implement the PHP
  //      note 1: behavior by default if IE ever does allow it; only gives shallow copy since
  //      note 1: is by reference in PHP anyways
  //      note 1: Since JS objects' keys are always strings, and (the
  //      note 1: default) SORT_REGULAR flag distinguishes by key type,
  //      note 1: if the content is a numeric string, we treat the
  //      note 1: "original type" as numeric.
  //   example 1: var $data = {d: 'lemon', a: 'orange', b: 'banana', c: 'apple'}
  //   example 1: asort($data)
  //   example 1: var $result = $data
  //   returns 1: {c: 'apple', b: 'banana', d: 'lemon', a: 'orange'}
  //   example 2: ini_set('locutus.sortByReference', true)
  //   example 2: var $data = {d: 'lemon', a: 'orange', b: 'banana', c: 'apple'}
  //   example 2: asort($data)
  //   example 2: var $result = $data
  //   returns 2: {c: 'apple', b: 'banana', d: 'lemon', a: 'orange'}

  const runtime = ensurePhpRuntimeState()
  const valArr: [string, T][] = []

  const regularSortAsc = (leftValue: T, rightValue: T): number => {
    const left = toSortablePrimitive(leftValue)
    const right = toSortablePrimitive(rightValue)
    return left > right ? 1 : left < right ? -1 : 0
  }

  let sorter: (a: T, b: T) => number = regularSortAsc

  switch (sortFlags) {
    case 'SORT_STRING':
      sorter = (a, b) => Number(strnatcmp(a, b) ?? 0)
      break
    case 'SORT_LOCALE_STRING': {
      const locale = runtime.locales[i18nlgd()]
      if (locale?.sorting) {
        sorter = locale.sorting
      }
      break
    }
    case 'SORT_NUMERIC':
      sorter = (a, b) => Number(a) - Number(b)
      break
    case 'SORT_REGULAR':
      sorter = regularSortAsc
      break
    default:
      sorter = regularSortAsc
      break
  }

  const iniVal = String(runtime.ini['locutus.sortByReference']?.local_value ?? '') || 'on'
  const sortByReference = iniVal === 'on'

  if (Array.isArray(inputArr) && isDenseArrayList(inputArr)) {
    const sortedValues = [...inputArr].sort(sorter)
    const target = sortByReference ? inputArr : []
    if (sortByReference) {
      target.length = 0
    }
    for (const value of sortedValues) {
      target.push(value)
    }

    return sortByReference ? true : target
  }

  for (const [key, value] of Object.entries(inputArr)) {
    valArr.push([key, value])
    if (sortByReference) {
      Reflect.deleteProperty(inputArr, key)
    }
  }

  valArr.sort((a, b) => sorter(a[1], b[1]))

  const populateArr: Record<string, T> | T[] = sortByReference ? inputArr : Array.isArray(inputArr) ? [] : {}

  for (const [key, value] of valArr) {
    setSortableEntry(populateArr, key, value)
  }

  return sortByReference || populateArr
}
