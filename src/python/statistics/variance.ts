type StatisticsNumericInput = number | boolean | bigint

export function variance(data: unknown, xbar?: StatisticsNumericInput): number {
  //      discuss at: https://locutus.io/python/statistics/variance/
  // parity verified: Python 3.12
  //     original by: Kevin van Zonneveld (https://kvz.io)
  //          note 1: Returns the sample variance and preserves exact integer results when Python does.
  //       example 1: variance([1, 2, 3])
  //       returns 1: 1
  //       example 2: variance([1, 3])
  //       returns 2: 2
  //       example 3: variance([1, 2, 3], 2)
  //       returns 3: 1

  const sequence = toNumericSequence(data, 'variance')
  if (sequence.values.length < 2) {
    throw new Error('variance requires at least two data points')
  }

  return statisticsVarianceFromSequence(sequence, sequence.values.length - 1, 'variance', xbar)
}

type NumericSequence = {
  values: number[]
  integral: boolean
}

function toNumericSequence(data: unknown, functionName: string): NumericSequence {
  const values = assertStatisticsArray(data, functionName)

  return {
    values: values.map((value) => toStatisticNumber(value, functionName)),
    integral: values.every(isIntegralStatisticValue),
  }
}

function statisticsVarianceFromSequence(
  sequence: NumericSequence,
  divisor: number,
  functionName: string,
  center?: StatisticsNumericInput,
): number {
  const mean = center === undefined ? statisticsMeanFromSequence(sequence) : toStatisticNumber(center, functionName)
  const squaredDeltaSum = sequence.values.reduce((sum, value) => {
    const delta = value - mean
    return sum + delta * delta
  }, 0)

  return divideStatisticsValue(squaredDeltaSum, divisor, sequence.integral)
}

function statisticsMeanFromSequence(sequence: NumericSequence): number {
  return divideStatisticsValue(sumNumbers(sequence.values), sequence.values.length, sequence.integral)
}

function assertStatisticsArray(data: unknown, functionName: string): unknown[] {
  if (!Array.isArray(data)) {
    throw new TypeError(`${functionName}() data must be an array`)
  }

  return data
}

function toStatisticNumber(value: unknown, functionName: string): number {
  if (typeof value === 'number') {
    return value
  }

  if (typeof value === 'boolean') {
    return value ? 1 : 0
  }

  if (typeof value === 'bigint') {
    const numericValue = Number(value)
    if (!Number.isSafeInteger(numericValue)) {
      throw new RangeError(`${functionName}() bigint values must fit within JS safe integers`)
    }

    return numericValue
  }

  throw new TypeError(`${functionName}() data must contain only real numbers`)
}

function isIntegralStatisticValue(value: unknown): boolean {
  return (
    typeof value === 'boolean' || typeof value === 'bigint' || (typeof value === 'number' && Number.isInteger(value))
  )
}

function sumNumbers(values: number[]): number {
  return values.reduce((sum, value) => sum + value, 0)
}

function divideStatisticsValue(total: number, divisor: number, integral: boolean): number {
  if (integral && Number.isSafeInteger(total) && total % divisor === 0) {
    return total / divisor
  }

  return total / divisor
}
