import { getCtypePattern } from '../_helpers/_ctypePattern.ts'
import { setlocale } from '../strings/setlocale.ts'

export function ctype_xdigit(text: string): boolean {
  //      discuss at: https://locutus.io/php/ctype_xdigit/
  // parity verified: PHP 8.3
  //     original by: Brett Zamir (https://brett-zamir.me)
  //       example 1: ctype_xdigit('01dF')
  //       returns 1: true

  if (typeof text !== 'string') {
    return false
  }
  setlocale('LC_ALL', 0)

  const pattern = getCtypePattern('xd')
  return pattern instanceof RegExp ? text.search(pattern) !== -1 : false
}
