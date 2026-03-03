import type { NumericLike, PhpNullish } from '../_helpers/_phpTypes.ts'

export type FloatvalInput = NumericLike | boolean | PhpNullish

export function floatval(mixedVar: FloatvalInput): number {
  //      discuss at: https://locutus.io/php/floatval/
  // parity verified: PHP 8.3
  //     original by: Michael White (https://getsprink.com)
  //          note 1: The native parseFloat() method of JavaScript returns NaN
  //          note 1: when it encounters a string before an int or float value.
  //       example 1: floatval('150.03_page-section')
  //       returns 1: 150.03
  //       example 2: floatval('page: 3')
  //       example 2: floatval('-50 + 8')
  //       returns 2: 0
  //       returns 2: -50

  return parseFloat(String(mixedVar ?? '')) || 0
}
