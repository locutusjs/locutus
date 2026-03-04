import type { PhpAssoc } from '../_helpers/_phpTypes.ts'

export function array_keys<T>(input: PhpAssoc<T>, searchValue?: T, argStrict?: boolean): string[] {
  //      discuss at: https://locutus.io/php/array_keys/
  // parity verified: PHP 8.3
  //     original by: Kevin van Zonneveld (https://kvz.io)
  //        input by: Brett Zamir (https://brett-zamir.me)
  //        input by: P
  //     bugfixed by: Kevin van Zonneveld (https://kvz.io)
  //     bugfixed by: Brett Zamir (https://brett-zamir.me)
  //     improved by: jd
  //     improved by: Brett Zamir (https://brett-zamir.me)
  //       example 1: array_keys( {firstname: 'Kevin', surname: 'van Zonneveld'} )
  //       returns 1: [ 'firstname', 'surname' ]

  const search = typeof searchValue !== 'undefined'
  const tmpArr: string[] = []
  const strict = !!argStrict
  let include = true

  for (const [key, value] of Object.entries(input)) {
    include = true
    if (search) {
      if (strict && value !== searchValue) {
        include = false
      } else if (value !== searchValue) {
        include = false
      }
    }

    if (include) {
      tmpArr.push(key)
    }
  }

  return tmpArr
}
