export default function uasort(
  this: Record<string, any>,
  inputArr: Record<string, unknown>,
  sorter: ((a: unknown, b: unknown) => number) | string | string[],
): boolean | Record<string, unknown> {
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

  const valArr: [string, unknown][] = []
  let k = ''
  let i = 0
  let sortByReference = false
  let populateArr: Record<string, unknown> = {}

  let sortFn: (a: unknown, b: unknown) => number
  if (typeof sorter === 'string') {
    sortFn = this[sorter]
  } else if (Array.isArray(sorter)) {
    sortFn = this[sorter[0]][sorter[1]]
  } else {
    sortFn = sorter
  }

  const $loc = (globalThis as any).$locutus
  const iniVal = String($loc?.php?.ini?.['locutus.sortByReference']?.local_value ?? '') || 'on'
  sortByReference = iniVal === 'on'
  populateArr = sortByReference ? inputArr : populateArr

  for (k in inputArr) {
    // Get key and value arrays
    if (inputArr.hasOwnProperty(k)) {
      valArr.push([k, inputArr[k]])
      if (sortByReference) {
        delete inputArr[k]
      }
    }
  }
  valArr.sort(function (a, b) {
    return sortFn(a[1], b[1])
  })

  for (i = 0; i < valArr.length; i++) {
    // Repopulate the old array
    populateArr[valArr[i][0]] = valArr[i][1]
  }

  return sortByReference || populateArr
}
