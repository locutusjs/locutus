import { getCtypePattern } from '../_helpers/_ctypePattern.ts'
import { setlocale } from '../strings/setlocale.ts'

export function ctype_cntrl(text: string): boolean {
  //      discuss at: https://locutus.io/php/ctype_cntrl/
  // parity verified: PHP 8.3
  //     original by: Brett Zamir (https://brett-zamir.me)
  //       example 1: ctype_cntrl('\u0020')
  //       returns 1: false
  //       example 2: ctype_cntrl('\u001F')
  //       returns 2: true

  if (typeof text !== 'string') {
    return false
  }
  setlocale('LC_ALL', 0)

  const pattern = getCtypePattern('ct')
  return pattern instanceof RegExp ? pattern.test(text) : false
}
