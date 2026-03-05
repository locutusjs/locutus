export function inits<T>(items: T[] | unknown): T[][] {
  //  discuss at: https://locutus.io/haskell/list/inits/
  // original by: Kevin van Zonneveld (https://kvz.io)
  //      note 1: Returns all prefixes from shortest to longest, like Haskell Data.List.inits.
  //   example 1: inits([1, 2, 3])
  //   returns 1: [[], [1], [1, 2], [1, 2, 3]]
  //   example 2: inits(['a', 'b'])
  //   returns 2: [[], ['a'], ['a', 'b']]
  //   example 3: inits([])
  //   returns 3: [[]]

  if (!Array.isArray(items)) {
    return []
  }

  const out: T[][] = [[]]
  for (let i = 1; i <= items.length; i++) {
    out.push(items.slice(0, i) as T[])
  }

  return out
}
