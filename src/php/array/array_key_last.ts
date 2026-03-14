import { normalizeArrayKey, type PhpArrayLike } from '../_helpers/_phpTypes.ts'

export function array_key_last<T>(input: PhpArrayLike<T>): string | number | null {
  //      discuss at: https://locutus.io/php/array_key_last/
  // parity verified: PHP 8.3
  //     original by: Kevin van Zonneveld (https://kvz.io)
  //       example 1: array_key_last({ a: 1, b: 2 })
  //       returns 1: 'b'
  //       example 2: array_key_last(['x', 'y'])
  //       returns 2: 1
  //       example 3: array_key_last([])
  //       returns 3: null

  const keys = Object.keys(input)
  const lastKey = keys.at(-1)
  return typeof lastKey === 'string' ? normalizeArrayKey(lastKey) : null
}
