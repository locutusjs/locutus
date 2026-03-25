export function mode<T>(data: T[] | unknown): T {
  //      discuss at: https://locutus.io/python/statistics/mode/
  // parity verified: Python 3.12
  //     original by: Kevin van Zonneveld (https://kvz.io)
  //          note 1: Returns the first encountered most-common value.
  //       example 1: mode([1, 1, 2, 2, 3])
  //       returns 1: 1
  //       example 2: mode(['red', 'blue', 'red', 'green'])
  //       returns 2: 'red'
  //       example 3: mode([true, false, true])
  //       returns 3: true

  const values = assertStatisticsArray(data, 'mode') as T[]
  if (values.length === 0) {
    throw new Error('no mode for empty data')
  }

  let bestValue = values[0] as T
  let bestCount = 0
  const counts = new Map<T, number>()

  for (const value of values) {
    const count = (counts.get(value) ?? 0) + 1
    counts.set(value, count)
    if (count > bestCount) {
      bestCount = count
      bestValue = value
    }
  }

  return bestValue
}

function assertStatisticsArray(data: unknown, functionName: string): unknown[] {
  if (!Array.isArray(data)) {
    throw new TypeError(`${functionName}() data must be an array`)
  }

  return data
}
