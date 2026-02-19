import { implode } from '../strings/implode.ts'

type JoinValue = {} | null | undefined

export function join(glue: string, pieces: JoinValue[]): string {
  //      discuss at: https://locutus.io/php/join/
  // parity verified: PHP 8.3
  //     original by: Kevin van Zonneveld (https://kvz.io)
  //       example 1: join(' ', ['Kevin', 'van', 'Zonneveld'])
  //       returns 1: 'Kevin van Zonneveld'

  return implode(glue, pieces)
}
