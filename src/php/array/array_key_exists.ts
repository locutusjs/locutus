import { isObjectLike, type PhpAssoc, type PhpMixed } from '../_helpers/_phpTypes.ts'

export function array_key_exists(key: string | number, search: PhpAssoc<PhpMixed> | PhpMixed[]): boolean {
  //  discuss at: https://locutus.io/php/array_key_exists/
  // original by: Kevin van Zonneveld (https://kvz.io)
  // improved by: Felix Geisendoerfer (https://www.debuggable.com/felix)
  //   example 1: array_key_exists('kevin', {'kevin': 'van Zonneveld'})
  //   returns 1: true

  if (!Array.isArray(search) && !isObjectLike(search)) {
    return false
  }

  return String(key) in search
}
