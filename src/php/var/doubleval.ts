import { floatval } from '../var/floatval.ts'
import type { PhpMixed } from '../_helpers/_phpTypes.ts'

export function doubleval(mixedVar: PhpMixed): number {
  //      discuss at: https://locutus.io/php/doubleval/
  // parity verified: PHP 8.3
  //     original by: Brett Zamir (https://brett-zamir.me)
  //          note 1: 1.0 is simplified to 1 before it can be accessed by the function, this makes
  //          note 1: it different from the PHP implementation. We can't fix this unfortunately.
  //       example 1: doubleval(186)
  //       returns 1: 186.00

  return floatval(String(mixedVar ?? ''))
}
