export function multimode<T>(data: T[] | unknown): T[] {
  //      discuss at: https://locutus.io/python/statistics/multimode/
  // parity verified: Python 3.12
  //     original by: Kevin van Zonneveld (https://kvz.io)
  //          note 1: Returns all most-common values in first-seen order.
  //       example 1: multimode([1, 1, 2, 2, 3])
  //       returns 1: [1, 2]
  //       example 2: multimode(['a', 'b', 'a', 'b'])
  //       returns 2: ['a', 'b']
  //       example 3: multimode([])
  //       returns 3: []

  const values = assertStatisticsArray(data, 'multimode') as T[]
  const counts = new Map<T, number>()
  const order: T[] = []

  for (const value of values) {
    if (!counts.has(value)) {
      order.push(value)
    }
    counts.set(value, (counts.get(value) ?? 0) + 1)
  }

  let highestCount = 0
  for (const count of counts.values()) {
    highestCount = Math.max(highestCount, count)
  }

  if (highestCount === 0) {
    return []
  }

  return order.filter((value) => counts.get(value) === highestCount)
}

function assertStatisticsArray(data: unknown, functionName: string): unknown[] {
  if (!Array.isArray(data)) {
    throw new TypeError(`${functionName}() data must be an array`)
  }

  return data
}
