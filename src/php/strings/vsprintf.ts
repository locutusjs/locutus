// @ts-nocheck
import { sprintf } from '../strings/sprintf.ts'

export function vsprintf(format, args) {
  //      discuss at: https://locutus.io/php/vsprintf/
  // parity verified: PHP 8.3
  //     original by: ejsanders
  //       example 1: vsprintf('%04d-%02d-%02d', [1988, 8, 1])
  //       returns 1: '1988-08-01'

  return sprintf.apply(this, [format].concat(args))
}
