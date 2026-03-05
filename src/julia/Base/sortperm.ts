export function sortperm<T>(values: T[] | unknown, rev: boolean = false): number[] {
  //      discuss at: https://locutus.io/julia/sortperm/
  // parity verified: Julia 1.11
  //     original by: Kevin van Zonneveld (https://kvz.io)
  //          note 1: Returns 1-based permutation indices that would sort the array, stable on ties.
  //       example 1: sortperm([10, 30, 20])
  //       returns 1: [1, 3, 2]
  //       example 2: sortperm([4, 1, 4, 2])
  //       returns 2: [2, 4, 1, 3]
  //       example 3: sortperm(['b', 'a', 'c'], true)
  //       returns 3: [3, 1, 2]

  if (!Array.isArray(values)) {
    return []
  }

  const indexed = values.map((value, index) => ({ value, index: index + 1 }))
  indexed.sort((left, right) => {
    if (Object.is(left.value, right.value)) {
      return left.index - right.index
    }
    const cmp = left.value < right.value ? -1 : 1
    return rev ? -cmp : cmp
  })

  return indexed.map((entry) => entry.index)
}
