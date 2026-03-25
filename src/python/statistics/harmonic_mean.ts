import { assertStatisticsArray, toStatisticNumber } from '../_helpers/_statistics.ts'

export function harmonic_mean(data: unknown, weights?: unknown): number {
  //      discuss at: https://locutus.io/python/statistics/harmonic_mean/
  // parity verified: Python 3.12
  //     original by: Kevin van Zonneveld (https://kvz.io)
  //          note 1: Returns the harmonic mean and supports optional positive weights.
  //       example 1: harmonic_mean([40, 60])
  //       returns 1: 47.99999999999999
  //       example 2: harmonic_mean([40, 60], [5, 30])
  //       returns 2: 56
  //       example 3: harmonic_mean([0, 10])
  //       returns 3: 0

  const values = assertStatisticsArray(data, 'harmonic_mean').map((value) => toStatisticNumber(value, 'harmonic_mean'))
  if (values.length < 1) {
    throw new Error('harmonic_mean requires at least one data point')
  }

  if (values.length === 1 && weights === undefined) {
    const value = values[0] ?? 0
    if (value < 0) {
      throw new Error('harmonic mean does not support negative values')
    }
    return value
  }

  const errmsg = 'harmonic mean does not support negative values'
  const weightValues =
    weights === undefined
      ? new Array(values.length).fill(1)
      : assertStatisticsArray(weights, 'harmonic_mean').map((value) => toStatisticNumber(value, 'harmonic_mean'))

  if (weightValues.length !== values.length) {
    throw new Error('Number of weights does not match data size')
  }

  if (weightValues.some((value) => value < 0) || values.some((value) => value < 0)) {
    throw new Error(errmsg)
  }

  const sumWeights = weightValues.reduce((sum, value) => sum + value, 0)

  try {
    let total = 0
    for (let index = 0; index < values.length; index += 1) {
      const value = values[index] ?? 0
      const weight = weightValues[index] ?? 0
      total += weight ? weight / value : 0
    }
    if (total <= 0) {
      throw new Error('Weighted sum must be positive')
    }
    return sumWeights / total
  } catch (error) {
    if (error instanceof Error && error.message === 'Weighted sum must be positive') {
      throw error
    }
    return 0
  }
}
