import type { PhpMixed } from '../_helpers/_phpTypes.ts'

export function array_unshift(array: PhpMixed[], ...values: PhpMixed[]): number {
  //  discuss at: https://locutus.io/php/array_unshift/
  // original by: Kevin van Zonneveld (https://kvz.io)
  // improved by: Martijn Wieringa
  // improved by: jmweb
  //      note 1: Currently does not handle objects
  //   example 1: array_unshift(['van', 'Zonneveld'], 'Kevin')
  //   returns 1: 3

  for (let i = values.length - 1; i >= 0; i--) {
    array.unshift(values[i])
  }

  return array.length
}
