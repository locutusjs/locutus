import { ensurePhpRuntimeState } from '../_helpers/_phpRuntimeState.ts'
import { i18n_loc_get_default as i18nlgd } from '../i18n/i18n_loc_get_default.ts'
import { strnatcmp } from '../strings/strnatcmp.ts'

type PhpValue = {} | null | undefined

const toSortablePrimitive = (value: PhpValue): string | number | bigint | boolean => {
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

export function rsort<T extends PhpValue>(
  inputArr: Record<string, T>,
  sortFlags?: string,
): boolean | Record<string, T> {
  //  discuss at: https://locutus.io/php/rsort/
  // original by: Kevin van Zonneveld (https://kvz.io)
  //  revised by: Brett Zamir (https://brett-zamir.me)
  // improved by: Brett Zamir (https://brett-zamir.me)
  //      note 1: SORT_STRING (as well as natsort and natcasesort) might also be
  //      note 1: integrated into all of these functions by adapting the code at
  //      note 1: https://sourcefrog.net/projects/natsort/natcompare.js
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
  //   example 1: var $arr = ['Kevin', 'van', 'Zonneveld']
  //   example 1: rsort($arr)
  //   example 1: var $result = $arr
  //   returns 1: ['van', 'Zonneveld', 'Kevin']
  //   example 2: ini_set('locutus.sortByReference', true)
  //   example 2: var $fruits = {d: 'lemon', a: 'orange', b: 'banana', c: 'apple'}
  //   example 2: rsort($fruits)
  //   example 2: var $result = $fruits
  //   returns 2: {0: 'orange', 1: 'lemon', 2: 'banana', 3: 'apple'}

  const runtime = ensurePhpRuntimeState()

  const regularSortDesc = (leftValue: T, rightValue: T): number => {
    const left = toSortablePrimitive(leftValue)
    const right = toSortablePrimitive(rightValue)
    return left < right ? 1 : left > right ? -1 : 0
  }

  let sorter: ((a: T, b: T) => number) | undefined

  switch (sortFlags) {
    case 'SORT_STRING':
      sorter = (a, b) => Number(strnatcmp(b, a) ?? 0)
      break
    case 'SORT_LOCALE_STRING': {
      const locale = runtime.locales[i18nlgd()]
      if (locale?.sorting) {
        sorter = locale.sorting
      }
      break
    }
    case 'SORT_NUMERIC':
      sorter = (a, b) => Number(b) - Number(a)
      break
    case 'SORT_REGULAR':
      sorter = regularSortDesc
      break
    default:
      sorter = regularSortDesc
      break
  }

  const iniVal = String(runtime.ini['locutus.sortByReference']?.local_value ?? '') || 'on'
  const sortByReference = iniVal === 'on'
  const populateArr: Record<string, T> = sortByReference ? inputArr : {}

  const values: T[] = []
  for (const [key, value] of Object.entries(inputArr)) {
    values.push(value)
    if (sortByReference) {
      delete inputArr[key]
    }
  }

  values.sort(sorter)

  for (const [index, value] of values.entries()) {
    populateArr[index] = value
  }

  return sortByReference || populateArr
}
