import { normalizeArrayKey, type PhpArrayLike } from '../_helpers/_phpTypes.ts'

export function array_is_list<T>(input: PhpArrayLike<T>): boolean {
  //      discuss at: https://locutus.io/php/array_is_list/
  // parity verified: PHP 8.3
  //     original by: Kevin van Zonneveld (https://kvz.io)
  //          note 1: Plain JS objects cannot preserve PHP insertion order for integer-like associative keys.
  //                  Use real JS arrays when numeric key order matters for PHP-style list detection.
  //       example 1: array_is_list(['a', 'b', 'c'])
  //       returns 1: true
  //       example 2: array_is_list({'0': 'a', '2': 'b'})
  //       returns 2: false
  //       example 3: array_is_list({})
  //       returns 3: true

  // Integer-like keys on plain JS objects are always enumerated numerically by the language runtime,
  // so PHP insertion-order semantics for associative numeric keys can only be preserved with real arrays.
  const keys = Object.keys(input)
  for (let i = 0; i < keys.length; i++) {
    if (normalizeArrayKey(keys[i] ?? '') !== i) {
      return false
    }
  }

  return true
}
