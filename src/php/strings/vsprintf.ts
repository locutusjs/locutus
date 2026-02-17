import { sprintf } from '../strings/sprintf.ts'

export function vsprintf(format: string, args: unknown[]): string | false {
  //      discuss at: https://locutus.io/php/vsprintf/
  // parity verified: PHP 8.3
  //     original by: ejsanders
  //       example 1: vsprintf('%04d-%02d-%02d', [1988, 8, 1])
  //       returns 1: '1988-08-01'

  return sprintf(format, ...args)
}
