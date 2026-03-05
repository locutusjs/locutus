type EqFn<T> = (left: T, right: T) => boolean

export function nubBy<T>(items: T[] | unknown, eq?: EqFn<T>): T[] {
  //  discuss at: https://locutus.io/haskell/list/nubBy/
  // original by: Kevin van Zonneveld (https://kvz.io)
  //      note 1: Keeps the first occurrence of each element using a custom equality predicate, like Haskell Data.List.nubBy.
  //   example 1: nubBy([1, 2, 2, 3, 1], (a, b) => a === b)
  //   returns 1: [1, 2, 3]
  //   example 2: nubBy(['aa', 'ab', 'ba'], (a, b) => a.charAt(0) === b.charAt(0))
  //   returns 2: ['aa', 'ba']
  //   example 3: nubBy([], (a, b) => a === b)
  //   returns 3: []

  if (!Array.isArray(items)) {
    return []
  }

  const equals: EqFn<T> = typeof eq === 'function' ? eq : (left, right) => Object.is(left, right)
  const out: T[] = []

  for (const item of items) {
    const duplicate = out.some((existing) => equals(item as T, existing))
    if (!duplicate) {
      out.push(item as T)
    }
  }

  return out
}
