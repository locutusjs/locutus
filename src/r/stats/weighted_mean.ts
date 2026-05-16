import { toRNumericArray } from '../_helpers/_stats.ts'

export function weighted_mean(x: unknown, w?: unknown): number {
  //      discuss at: https://locutus.io/r/weighted_mean/
  // parity verified: R 4.4
  //     original by: Kevin van Zonneveld (https://kvz.io)
  //          note 1: JS-safe equivalent of R's weighted.mean().
  //          note 2: Zero weights are skipped, matching R's treatment of zero-weighted values.
  //       example 1: weighted_mean([1, 2, 3])
  //       returns 1: 2
  //       example 2: weighted_mean([1, 2, 3, 4], [1, 1, 1, 2])
  //       returns 2: 2.8
  //       example 3: weighted_mean([1, 2, 3], [0, 0, 1])
  //       returns 3: 3

  const values = toRNumericArray(x, 'weighted_mean')
  const weights = w === undefined ? values.map(() => 1) : toRNumericArray(w, 'weighted_mean')

  if (values.length !== weights.length) {
    throw new Error("weighted_mean() 'x' and 'w' must have the same length")
  }

  let weightedTotal = 0
  let weightTotal = 0
  for (let index = 0; index < values.length; index += 1) {
    const weight = weights[index] ?? 0
    if (weight === 0) {
      continue
    }

    weightedTotal += (values[index] ?? 0) * weight
    weightTotal += weight
  }

  return weightedTotal / weightTotal
}
