import type { PhpArrayLike } from '../_helpers/_phpTypes.ts'

export function array_key_exists<TValue>(key: string | number, search: PhpArrayLike<TValue>): boolean {
  //  discuss at: https://locutus.io/php/array_key_exists/
  // original by: Kevin van Zonneveld (https://kvz.io)
  // improved by: Felix Geisendoerfer (https://www.debuggable.com/felix)
  //   example 1: array_key_exists('kevin', {'kevin': 'van Zonneveld'})
  //   returns 1: true

  return String(key) in search
}
