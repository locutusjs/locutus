import type { PhpAssoc } from '../_helpers/_phpTypes.ts'

export function array_values<T>(input: T[] | PhpAssoc<T>): T[] {
  //      discuss at: https://locutus.io/php/array_values/
  // parity verified: PHP 8.3
  //     original by: Kevin van Zonneveld (https://kvz.io)
  //     improved by: Brett Zamir (https://brett-zamir.me)
  //       example 1: array_values( {firstname: 'Kevin', surname: 'van Zonneveld'} )
  //       returns 1: [ 'Kevin', 'van Zonneveld' ]

  if (Array.isArray(input)) {
    return input.slice()
  }

  const values: T[] = []
  for (const key in input) {
    if (Object.prototype.hasOwnProperty.call(input, key)) {
      values.push(input[key] as T)
    }
  }

  return values
}
