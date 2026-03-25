export function median_low(data: unknown): number | string | boolean | bigint {
  //      discuss at: https://locutus.io/python/statistics/median_low/
  // parity verified: Python 3.12
  //     original by: Kevin van Zonneveld (https://kvz.io)
  //          note 1: Returns the lower of the two middle values for even-sized input.
  //       example 1: median_low([1, 2, 3, 4])
  //       returns 1: 2
  //       example 2: median_low([1, 3, 5])
  //       returns 2: 3
  //       example 3: median_low(['d', 'c', 'b', 'a'])
  //       returns 3: 'b'

  const values = sortStatisticsValues(data, 'median_low')
  if (values.length === 0) {
    throw new Error('no median for empty data')
  }

  return values[Math.floor((values.length - 1) / 2)] as number | string | boolean | bigint
}

type StatisticsSortableInput = number | boolean | bigint | string

function sortStatisticsValues(data: unknown, functionName: string): StatisticsSortableInput[] {
  if (!Array.isArray(data)) {
    throw new TypeError(`${functionName}() data must be an array`)
  }

  if (data.length === 0) {
    return []
  }

  const values = data as StatisticsSortableInput[]
  const firstKind = getStatisticsSortKind(values[0], functionName)
  for (let index = 1; index < values.length; index += 1) {
    if (getStatisticsSortKind(values[index], functionName) !== firstKind) {
      throw new TypeError(`${functionName}() requires data values that can be ordered together`)
    }
  }

  return [...values].sort((left, right) => compareStatisticsValues(left, right, firstKind))
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
