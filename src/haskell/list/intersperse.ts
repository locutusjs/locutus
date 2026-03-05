export function intersperse<T>(separator: T, items: T[] | unknown): T[] {
  //  discuss at: https://locutus.io/haskell/list/intersperse/
  // original by: Kevin van Zonneveld (https://kvz.io)
  //      note 1: Inserts separator between elements, like Haskell Data.List.intersperse.
  //   example 1: intersperse(0, [1, 2, 3])
  //   returns 1: [1, 0, 2, 0, 3]
  //   example 2: intersperse('-', ['a'])
  //   returns 2: ['a']
  //   example 3: intersperse(',', [])
  //   returns 3: []

  if (!Array.isArray(items) || items.length === 0) {
    return []
  }

  const out: T[] = [items[0] as T]
  for (let i = 1; i < items.length; i++) {
    out.push(separator, items[i] as T)
  }

  return out
}
