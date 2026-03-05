type GroupPredicate<T> = (left: T, right: T) => boolean

export function groupBy<T>(items: T[] | unknown, predicate?: GroupPredicate<T>): T[][] {
  //  discuss at: https://locutus.io/haskell/list/groupBy/
  // original by: Kevin van Zonneveld (https://kvz.io)
  //      note 1: Groups adjacent elements while predicate(prev, current) is true, like Haskell Data.List.groupBy.
  //   example 1: groupBy([1, 1, 2, 3, 3, 3, 2], (a, b) => a === b)
  //   returns 1: [[1, 1], [2], [3, 3, 3], [2]]
  //   example 2: groupBy(['a', 'A', 'b', 'B'], (a, b) => a.toLowerCase() === b.toLowerCase())
  //   returns 2: [['a', 'A'], ['b', 'B']]
  //   example 3: groupBy([], (a, b) => a === b)
  //   returns 3: []

  if (!Array.isArray(items) || items.length === 0) {
    return []
  }

  const eq: GroupPredicate<T> = typeof predicate === 'function' ? predicate : (left, right) => Object.is(left, right)

  const out: T[][] = [[items[0] as T]]
  for (let i = 1; i < items.length; i++) {
    const prev = items[i - 1] as T
    const current = items[i] as T
    const bucket = out[out.length - 1]
    if (bucket && eq(prev, current)) {
      bucket.push(current)
    } else {
      out.push([current])
    }
  }

  return out
}
