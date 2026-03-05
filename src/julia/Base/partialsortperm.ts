export function partialsortperm<T>(values: T[] | unknown, k: number, rev: boolean = false): number[] {
  //      discuss at: https://locutus.io/julia/partialsortperm/
  // parity verified: Julia 1.11
  //     original by: Kevin van Zonneveld (https://kvz.io)
  //          note 1: Returns 1-based indices of the first k positions in sorted order, similar to Julia partialsortperm(v, 1:k).
  //       example 1: partialsortperm([9, 1, 5, 3], 2)
  //       returns 1: [2, 4]
  //       example 2: partialsortperm([4, 1, 4, 2], 3)
  //       returns 2: [2, 4, 1]
  //       example 3: partialsortperm(['b', 'a', 'c'], 2, true)
  //       returns 3: [3, 1]

  if (!Array.isArray(values)) {
    return []
  }

  const count = Math.trunc(Number(k))
  if (!Number.isFinite(count) || count <= 0) {
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

  return indexed.slice(0, count).map((entry) => entry.index)
}
