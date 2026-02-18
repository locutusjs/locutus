export function shuffle<T>(inputArr: Record<string, T>): boolean | Record<string, T> | T[] {
  //  discuss at: https://locutus.io/php/shuffle/
  // original by: Jonas Raoni Soares Silva (https://www.jsfromhell.com)
  //  revised by: Kevin van Zonneveld (https://kvz.io)
  //  revised by: Brett Zamir (https://brett-zamir.me)
  // improved by: Brett Zamir (https://brett-zamir.me)
  //   example 1: var $data = {5:'a', 2:'3', 3:'c', 4:5, 'q':5}
  //   example 1: ini_set('locutus.sortByReference', true)
  //   example 1: shuffle($data)
  //   example 1: var $result = $data.q
  //   returns 1: 5

  const valArr: T[] = []
  let k = ''
  let i = 0
  let sortByReference = false
  let populateArr: Record<string, T> | T[] = []

  for (k in inputArr) {
    // Get key and value arrays
    if (inputArr.hasOwnProperty(k)) {
      valArr.push(inputArr[k] as T)
      if (sortByReference) {
        delete inputArr[k]
      }
    }
  }
  valArr.sort(function () {
    return 0.5 - Math.random()
  })

  const $loc = (
    globalThis as typeof globalThis & {
      $locutus?: { php?: { ini?: Record<string, { local_value?: unknown }> } }
    }
  ).$locutus
  const iniVal = String($loc?.php?.ini?.['locutus.sortByReference']?.local_value ?? '') || 'on'
  sortByReference = iniVal === 'on'
  populateArr = sortByReference ? inputArr : populateArr

  for (i = 0; i < valArr.length; i++) {
    // Repopulate the old array
    if (Array.isArray(populateArr)) {
      populateArr[i] = valArr[i] as T
    } else {
      populateArr[String(i)] = valArr[i] as T
    }
  }

  return sortByReference || populateArr
}
