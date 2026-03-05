export function tails<T>(items: T[] | unknown): T[][] {
  //  discuss at: https://locutus.io/haskell/list/tails/
  // original by: Kevin van Zonneveld (https://kvz.io)
  //      note 1: Returns all suffixes from longest to shortest, like Haskell Data.List.tails.
  //   example 1: tails([1, 2, 3])
  //   returns 1: [[1, 2, 3], [2, 3], [3], []]
  //   example 2: tails(['a', 'b'])
  //   returns 2: [['a', 'b'], ['b'], []]
  //   example 3: tails([])
  //   returns 3: [[]]

  if (!Array.isArray(items)) {
    return []
  }

  const out: T[][] = []
  for (let i = 0; i <= items.length; i++) {
    out.push(items.slice(i) as T[])
  }

  return out
}
