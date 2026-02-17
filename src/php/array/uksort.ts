export function uksort(
  this: { [key: string]: unknown; window?: { [key: string]: unknown } },
  inputArr: Record<string, unknown>,
  sorter: ((a: string, b: string) => number) | string,
): boolean | Record<string, unknown> {
  //  discuss at: https://locutus.io/php/uksort/
  // original by: Brett Zamir (https://brett-zamir.me)
  // improved by: Brett Zamir (https://brett-zamir.me)
  //      note 1: The examples are correct, this is a new way
  //      note 1: This function deviates from PHP in returning a copy of the array instead
  //      note 1: of acting by reference and returning true; this was necessary because
  //      note 1: IE does not allow deleting and re-adding of properties without caching
  //      note 1: of property position; you can set the ini of "locutus.sortByReference" to true to
  //      note 1: get the PHP behavior, but use this only if you are in an environment
  //      note 1: such as Firefox extensions where for-in iteration order is fixed and true
  //      note 1: property deletion is supported. Note that we intend to implement the PHP
  //      note 1: behavior by default if IE ever does allow it; only gives shallow copy since
  //      note 1: is by reference in PHP anyways
  //   example 1: var $data = {d: 'lemon', a: 'orange', b: 'banana', c: 'apple'}
  //   example 1: uksort($data, function (key1, key2){ return (key1 === key2 ? 0 : (key1 > key2 ? 1 : -1)); })
  //   example 1: var $result = $data
  //   returns 1: {a: 'orange', b: 'banana', c: 'apple', d: 'lemon'}

  const tmpArr: Record<string, unknown> = {}
  const keys: string[] = []
  let i = 0
  let k = ''
  let sortByReference = false
  let populateArr: Record<string, unknown> = {}

  let sortFn: ((a: string, b: string) => number) | undefined
  if (typeof sorter === 'string') {
    sortFn = this.window?.[sorter] as ((a: string, b: string) => number) | undefined
  } else {
    sortFn = sorter
  }

  // Make a list of key names
  for (k in inputArr) {
    if (inputArr.hasOwnProperty(k)) {
      keys.push(k)
    }
  }

  // Sort key names
  try {
    if (sorter) {
      keys.sort(sortFn)
    } else {
      keys.sort()
    }
  } catch (_e) {
    return false
  }

  const $loc = (
    globalThis as {
      $locutus?: { php?: { ini?: { [key: string]: { local_value?: unknown } | undefined } } }
    }
  ).$locutus
  const iniVal = String($loc?.php?.ini?.['locutus.sortByReference']?.local_value ?? '') || 'on'
  sortByReference = iniVal === 'on'
  populateArr = sortByReference ? inputArr : populateArr

  // Rebuild array with sorted key names
  for (i = 0; i < keys.length; i++) {
    const key = keys[i]
    if (key === undefined) {
      continue
    }
    k = key
    tmpArr[k] = inputArr[k]
    if (sortByReference) {
      delete inputArr[k]
    }
  }
  for (const i in tmpArr) {
    if (tmpArr.hasOwnProperty(i)) {
      populateArr[i] = tmpArr[i]
    }
  }

  return sortByReference || populateArr
}
