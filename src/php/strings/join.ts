import { implode } from '../strings/implode.ts'
import type { PhpMixed } from '../_helpers/_phpTypes.ts'

export function join(glue: string, pieces: PhpMixed[]): string {
  //      discuss at: https://locutus.io/php/join/
  // parity verified: PHP 8.3
  //     original by: Kevin van Zonneveld (https://kvz.io)
  //       example 1: join(' ', ['Kevin', 'van', 'Zonneveld'])
  //       returns 1: 'Kevin van Zonneveld'

  return implode(glue, pieces)
}
