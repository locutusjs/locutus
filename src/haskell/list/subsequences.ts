export function subsequences<T>(items: T[] | unknown): T[][] {
  //  discuss at: https://locutus.io/haskell/list/subsequences/
  // original by: Kevin van Zonneveld (https://kvz.io)
  //      note 1: Returns all subsequences (power set) while preserving element order, matching Haskell Data.List.subsequences.
  //   example 1: subsequences([1, 2, 3])
  //   returns 1: [[], [1], [2], [1, 2], [3], [1, 3], [2, 3], [1, 2, 3]]
  //   example 2: subsequences(['a', 'b'])
  //   returns 2: [[], ['a'], ['b'], ['a', 'b']]
  //   example 3: subsequences([])
  //   returns 3: [[]]

  if (!Array.isArray(items)) {
    return [[]]
  }

  const out: T[][] = [[]]
  for (const item of items) {
    const currentLength = out.length
    for (let i = 0; i < currentLength; i++) {
      const prefix = out[i]
      if (prefix) {
        out.push([...prefix, item as T])
      }
    }
  }

  return out
}
