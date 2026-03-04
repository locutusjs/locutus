import { getCtypePattern } from '../_helpers/_ctypePattern.ts'
import { setlocale } from '../strings/setlocale.ts'

export function ctype_alpha(text: string): boolean {
  //      discuss at: https://locutus.io/php/ctype_alpha/
  // parity verified: PHP 8.3
  //     original by: Brett Zamir (https://brett-zamir.me)
  //       example 1: ctype_alpha('Az')
  //       returns 1: true

  if (typeof text !== 'string') {
    return false
  }
  setlocale('LC_ALL', 0)

  const pattern = getCtypePattern('al')
  return pattern instanceof RegExp ? pattern.test(text) : false
}
