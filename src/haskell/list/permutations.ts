function permutationsInternal<T>(items: T[]): T[][] {
  if (items.length === 0) {
    return [[]]
  }

  const out: T[][] = []
  for (let i = 0; i < items.length; i++) {
    const current = items[i] as T
    const rest = items.slice(0, i).concat(items.slice(i + 1))
    for (const tail of permutationsInternal(rest)) {
      out.push([current, ...tail])
    }
  }
  return out
}

export function permutations<T>(items: T[] | unknown): T[][] {
  //      discuss at: https://locutus.io/haskell/list/permutations/
  //     original by: Kevin van Zonneveld (https://kvz.io)
  //          note 1: Returns all permutations, preserving Haskell's empty-list behavior (one empty permutation).
  //       example 1: permutations([1, 2, 3])
  //       returns 1: [[1, 2, 3], [1, 3, 2], [2, 1, 3], [2, 3, 1], [3, 1, 2], [3, 2, 1]]
  //       example 2: permutations(['a', 'b'])
  //       returns 2: [['a', 'b'], ['b', 'a']]
  //       example 3: permutations([])
  //       returns 3: [[]]

  if (!Array.isArray(items)) {
    return [[]]
  }

  return permutationsInternal(items.slice())
}
