import { rtrim } from '../strings/rtrim.ts'

export function chop(str: string, charlist: string): string {
  //      discuss at: https://locutus.io/php/chop/
  // parity verified: PHP 8.3
  //     original by: Paulo Freitas
  //       example 1: chop('    Kevin van Zonneveld    ')
  //       returns 1: '    Kevin van Zonneveld'

  return rtrim(str, charlist)
}
