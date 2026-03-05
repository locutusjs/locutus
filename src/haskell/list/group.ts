export function group<T>(items: T[] | unknown): T[][] {
  //  discuss at: https://locutus.io/haskell/list/group/
  // original by: Kevin van Zonneveld (https://kvz.io)
  //      note 1: Groups adjacent equal elements, like Haskell Data.List.group.
  //   example 1: group([1, 1, 2, 3, 3, 3, 2])
  //   returns 1: [[1, 1], [2], [3, 3, 3], [2]]
  //   example 2: group(['a', 'a', 'b', 'a'])
  //   returns 2: [['a', 'a'], ['b'], ['a']]
  //   example 3: group([])
  //   returns 3: []

  if (!Array.isArray(items) || items.length === 0) {
    return []
  }

  const out: T[][] = [[items[0] as T]]
  for (let i = 1; i < items.length; i++) {
    const prev = items[i - 1] as T
    const current = items[i] as T
    const bucket = out[out.length - 1]
    if (bucket && Object.is(prev, current)) {
      bucket.push(current)
    } else {
      out.push([current])
    }
  }

  return out
}
