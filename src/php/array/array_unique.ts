import { type PhpAssoc, toPhpArrayObject } from '../_helpers/_phpTypes.ts'

export function array_unique<T>(inputArr: T[] | PhpAssoc<T>): PhpAssoc<T> | false {
  //  discuss at: https://locutus.io/php/array_unique/
  // original by: Carlos R. L. Rodrigues (https://www.jsfromhell.com)
  //    input by: duncan
  //    input by: Brett Zamir (https://brett-zamir.me)
  // bugfixed by: Kevin van Zonneveld (https://kvz.io)
  // bugfixed by: Nate
  // bugfixed by: Kevin van Zonneveld (https://kvz.io)
  // bugfixed by: Brett Zamir (https://brett-zamir.me)
  // improved by: Michael Grier
  //      note 1: The second argument, sort_flags is not implemented;
  //      note 1: also should be sorted (asort?) first according to docs
  //   example 1: array_unique(['Kevin','Kevin','van','Zonneveld','Kevin'])
  //   returns 1: {0: 'Kevin', 2: 'van', 3: 'Zonneveld'}
  //   example 2: array_unique({'a': 'green', 0: 'red', 'b': 'green', 1: 'blue', 2: 'red'})
  //   returns 2: {a: 'green', 0: 'red', 1: 'blue'}

  const tmpArr2: PhpAssoc<T> = {}
  const inputObj = toPhpArrayObject<T>(inputArr)

  const _arraySearch = function (needle: T, haystack: PhpAssoc<T>): string | false {
    let fkey = ''
    for (fkey in haystack) {
      if (Object.prototype.hasOwnProperty.call(haystack, fkey)) {
        if (String(haystack[fkey]) === String(needle)) {
          return fkey
        }
      }
    }
    return false
  }

  for (const key in inputObj) {
    if (Object.prototype.hasOwnProperty.call(inputObj, key)) {
      const val = inputObj[key] as T
      if (_arraySearch(val, tmpArr2) === false) {
        tmpArr2[key] = val
      }
    }
  }

  return tmpArr2
}
