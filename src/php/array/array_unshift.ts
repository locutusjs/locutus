import type { PhpRuntimeValue } from '../_helpers/_phpTypes.ts'

type UnshiftValue = PhpRuntimeValue

export function array_unshift<TValue extends UnshiftValue>(array: TValue[], ...values: TValue[]): number {
  //  discuss at: https://locutus.io/php/array_unshift/
  // original by: Kevin van Zonneveld (https://kvz.io)
  // improved by: Martijn Wieringa
  // improved by: jmweb
  //      note 1: Currently does not handle objects
  //   example 1: array_unshift(['van', 'Zonneveld'], 'Kevin')
  //   returns 1: 3

  const reversedValues = values.slice().reverse()
  for (const value of reversedValues) {
    array.unshift(value)
  }

  return array.length
}
