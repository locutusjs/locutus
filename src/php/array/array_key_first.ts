import { normalizeArrayKey, type PhpArrayLike } from '../_helpers/_phpTypes.ts'

export function array_key_first<T>(input: PhpArrayLike<T>): string | number | null {
  //      discuss at: https://locutus.io/php/array_key_first/
  // parity verified: PHP 8.3
  //     original by: Kevin van Zonneveld (https://kvz.io)
  //       example 1: array_key_first({ a: 1, b: 2 })
  //       returns 1: 'a'
  //       example 2: array_key_first(['x', 'y'])
  //       returns 2: 0
  //       example 3: array_key_first([])
  //       returns 3: null

  const [firstKey] = Object.keys(input)
  return typeof firstKey === 'string' ? normalizeArrayKey(firstKey) : null
}
