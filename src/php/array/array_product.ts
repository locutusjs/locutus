import type { PhpMixed } from '../_helpers/_phpTypes.ts'

export function array_product(input: PhpMixed): number | null {
  //      discuss at: https://locutus.io/php/array_product/
  // parity verified: PHP 8.3
  //     original by: Waldo Malqui Silva (https://waldo.malqui.info)
  //       example 1: array_product([ 2, 4, 6, 8 ])
  //       returns 1: 384

  let idx = 0
  let product = 1
  let il = 0

  if (!Array.isArray(input)) {
    return null
  }

  il = input.length
  while (idx < il) {
    const numeric = Number(input[idx])
    product *= Number.isNaN(numeric) ? 0 : numeric
    idx++
  }

  return product
}
