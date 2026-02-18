import type { PhpAssoc } from '../_helpers/_phpTypes.ts'
import { explode } from '../strings/explode.ts'

type KeyedValues = PhpAssoc<unknown>

export function split(
  delimiter: string | boolean | null | undefined,
  string: string | KeyedValues | (() => unknown) | undefined,
): string[] | false | { 0: string } | null {
  //      discuss at: https://locutus.io/php/split/
  // parity verified: PHP 8.3
  //     original by: Kevin van Zonneveld (https://kvz.io)
  //       example 1: split(' ', 'Kevin van Zonneveld')
  //       returns 1: ['Kevin', 'van', 'Zonneveld']

  return explode(delimiter, string)
}
