import { type PhpAssoc, type PhpMixed, toPhpArrayObject } from '../_helpers/_phpTypes.ts'

export function array_sum(array: PhpMixed[] | PhpAssoc<PhpMixed> | null): number | null {
  //  discuss at: https://locutus.io/php/array_sum/
  // original by: Kevin van Zonneveld (https://kvz.io)
  // bugfixed by: Nate
  // bugfixed by: Gilbert
  // improved by: David Pilia (https://www.beteck.it/)
  // improved by: Brett Zamir (https://brett-zamir.me)
  //   example 1: array_sum([4, 9, 182.6])
  //   returns 1: 195.6
  //   example 2: var $total = []
  //   example 2: var $index = 0.1
  //   example 2: for (var $y = 0; $y < 12; $y++){ $total[$y] = $y + $index }
  //   example 2: array_sum($total)
  //   returns 2: 67.2

  let sum = 0

  // input sanitation
  if (array === null || typeof array !== 'object') {
    return null
  }
  const values = toPhpArrayObject(array)

  for (const key in values) {
    const parsed = parseFloat(String(values[key]))
    if (!isNaN(parsed)) {
      sum += parsed
    }
  }

  return sum
}
