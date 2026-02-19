import type { PhpInput } from '../_helpers/_phpTypes.ts'
import { sprintf } from '../strings/sprintf.ts'

type VsprintfValue = PhpInput

export function vsprintf(format: string, args: VsprintfValue[]): string | false {
  //      discuss at: https://locutus.io/php/vsprintf/
  // parity verified: PHP 8.3
  //     original by: ejsanders
  //       example 1: vsprintf('%04d-%02d-%02d', [1988, 8, 1])
  //       returns 1: '1988-08-01'

  return sprintf(format, ...args)
}
