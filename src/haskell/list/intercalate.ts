export function intercalate<T>(separator: T[] | unknown, lists: Array<T[] | unknown> | unknown): T[] {
  //  discuss at: https://locutus.io/haskell/list/intercalate/
  // original by: Kevin van Zonneveld (https://kvz.io)
  //      note 1: Concatenates lists with separator inserted between sublists, like Haskell Data.List.intercalate.
  //   example 1: intercalate([0], [[1, 2], [3], [4, 5]])
  //   returns 1: [1, 2, 0, 3, 0, 4, 5]
  //   example 2: intercalate([' '], [['a'], ['b'], ['c']])
  //   returns 2: ['a', ' ', 'b', ' ', 'c']
  //   example 3: intercalate([], [[1], [2]])
  //   returns 3: [1, 2]

  if (!Array.isArray(separator) || !Array.isArray(lists) || lists.length === 0) {
    return []
  }

  const out: T[] = []
  for (let i = 0; i < lists.length; i++) {
    const chunk = lists[i]
    if (Array.isArray(chunk)) {
      out.push(...(chunk as T[]))
    }
    if (i < lists.length - 1) {
      out.push(...(separator as T[]))
    }
  }

  return out
}
