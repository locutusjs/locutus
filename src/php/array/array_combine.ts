import type { PhpAssoc } from '../_helpers/_phpTypes.ts'

export function array_combine<TKey extends string | number, TValue>(
  keys: TKey[],
  values: TValue[],
): PhpAssoc<TValue> | false {
  //  discuss at: https://locutus.io/php/array_combine/
  // original by: Kevin van Zonneveld (https://kvz.io)
  // improved by: Brett Zamir (https://brett-zamir.me)
  //   example 1: array_combine([0,1,2], ['kevin','van','zonneveld'])
  //   returns 1: {0: 'kevin', 1: 'van', 2: 'zonneveld'}

  const newArray: PhpAssoc<TValue> = {}
  let i = 0

  // input sanitation
  // Only accept arrays or array-like objects
  // Require arrays to have a count
  if (typeof keys !== 'object') {
    return false
  }
  if (typeof values !== 'object') {
    return false
  }
  if (typeof keys.length !== 'number') {
    return false
  }
  if (typeof values.length !== 'number') {
    return false
  }
  if (!keys.length) {
    return false
  }

  // number of elements does not match
  if (keys.length !== values.length) {
    return false
  }

  for (i = 0; i < keys.length; i++) {
    const value = values[i]
    if (typeof value === 'undefined') {
      return false
    }
    newArray[String(keys[i])] = value
  }

  return newArray
}
