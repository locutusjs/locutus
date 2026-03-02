import { _phpCastString } from '../_helpers/_phpCastString.ts'
import { strnatcmp } from '../strings/strnatcmp.ts'

export function strnatcasecmp(a: string | number, b: string | number): number

export function strnatcasecmp(a?: string | number, b?: string | number): number | null {
  //       discuss at: https://locutus.io/php/strnatcasecmp/
  //  parity verified: PHP 8.3
  //      original by: Martin Pool
  // reimplemented by: Pierre-Luc Paour
  // reimplemented by: Kristof Coomans (SCK-CEN (Belgian Nucleair Research Centre))
  // reimplemented by: Brett Zamir (https://brett-zamir.me)
  //      bugfixed by: Kevin van Zonneveld (https://kvz.io)
  //         input by: Devan Penner-Woelk
  //      improved by: Kevin van Zonneveld (https://kvz.io)
  // reimplemented by: Rafał Kukawski
  //        example 1: strnatcasecmp(10, 1)
  //        returns 1: 1
  //        example 2: strnatcasecmp('1', '10')
  //        returns 2: -1

  if (arguments.length !== 2 || typeof a === 'undefined' || typeof b === 'undefined') {
    return null
  }

  return strnatcmp(_phpCastString(a).toLowerCase(), _phpCastString(b).toLowerCase())
}
