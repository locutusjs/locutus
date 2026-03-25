export type StatisticsNumericInput = number | boolean | bigint
export type StatisticsSortableInput = StatisticsNumericInput | string

type NumericSequence = {
  values: number[]
  integral: boolean
}

export function assertStatisticsArray(data: unknown, functionName: string): unknown[] {
  if (!Array.isArray(data)) {
    throw new TypeError(`${functionName}() data must be an array`)
  }

  return data
}

export function toNumericSequence(data: unknown, functionName: string): NumericSequence {
  const values = assertStatisticsArray(data, functionName)

  return {
    values: values.map((value) => toStatisticNumber(value, functionName)),
    integral: values.every(isIntegralStatisticValue),
  }
}

export function toStatisticNumber(value: unknown, functionName: string): number {
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

export function sortStatisticsValues(data: unknown, functionName: string): StatisticsSortableInput[] {
  const values = assertStatisticsArray(data, functionName) as StatisticsSortableInput[]
  if (values.length === 0) {
    return []
  }

  const firstKind = getStatisticsSortKind(values[0], functionName)
  for (let index = 1; index < values.length; index += 1) {
    const currentKind = getStatisticsSortKind(values[index], functionName)
    if (currentKind !== firstKind) {
      throw new TypeError(`${functionName}() requires data values that can be ordered together`)
    }
  }

  return [...values].sort((left, right) => compareStatisticsValues(left, right, firstKind))
}

export function statisticsMeanFromSequence(sequence: NumericSequence, preferFloat = false): number {
  return divideStatisticsValue(sumNumbers(sequence.values), sequence.values.length, sequence.integral, preferFloat)
}

export function statisticsVarianceFromSequence(
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

export function sumNumbers(values: number[]): number {
  return values.reduce((sum, value) => sum + value, 0)
}

export function sumProducts(left: number[], right: number[]): number {
  let total = 0
  for (let index = 0; index < left.length; index += 1) {
    total += (left[index] ?? 0) * (right[index] ?? 0)
  }
  return total
}

export function isIntegralStatisticValue(value: unknown): boolean {
  return (
    typeof value === 'boolean' || typeof value === 'bigint' || (typeof value === 'number' && Number.isInteger(value))
  )
}

export function toFloatStatisticNumber(value: unknown, functionName: string): number {
  if (typeof value === 'number') {
    return value
  }

  if (typeof value === 'boolean') {
    return value ? 1 : 0
  }

  if (typeof value === 'bigint') {
    return Number(value)
  }

  if (typeof value === 'string') {
    const parsed = Number(value)
    if (!Number.isNaN(parsed)) {
      return parsed
    }
    throw new TypeError('Value cannot be converted to a float')
  }

  throw new TypeError(`${functionName}() data must contain only real numbers`)
}

function divideStatisticsValue(total: number, divisor: number, integral: boolean, preferFloat = false): number {
  if (!preferFloat && integral && Number.isSafeInteger(total) && total % divisor === 0) {
    return total / divisor
  }

  return total / divisor
}

function getStatisticsSortKind(value: unknown, functionName: string): 'number' | 'string' {
  if (typeof value === 'string') {
    return 'string'
  }

  if (typeof value === 'number' || typeof value === 'boolean' || typeof value === 'bigint') {
    return 'number'
  }

  throw new TypeError(`${functionName}() requires sortable scalar values`)
}

function compareStatisticsValues(
  left: StatisticsSortableInput,
  right: StatisticsSortableInput,
  kind: 'number' | 'string',
): number {
  if (kind === 'string') {
    return String(left).localeCompare(String(right))
  }

  return toNumericSortValue(left) - toNumericSortValue(right)
}

function toNumericSortValue(value: StatisticsSortableInput): number {
  return typeof value === 'boolean' ? (value ? 1 : 0) : Number(value)
}
