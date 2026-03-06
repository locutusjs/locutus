export function searchsortedfirst(values: number[] | unknown, target: number): number {
  //      discuss at: https://locutus.io/julia/searchsortedfirst/
  // parity verified: Julia 1.11
  //     original by: Kevin van Zonneveld (https://kvz.io)
  //          note 1: Returns 1-based insertion index in a sorted array, like Julia searchsortedfirst.
  //       example 1: searchsortedfirst([1, 3, 5, 7], 4)
  //       returns 1: 3
  //       example 2: searchsortedfirst([1, 3, 5, 7], 0)
  //       returns 2: 1
  //       example 3: searchsortedfirst([1, 3, 5, 7], 9)
  //       returns 3: 5

  if (!Array.isArray(values)) {
    return 1
  }

  let low = 0
  let high = values.length
  const needle = Number(target)

  while (low < high) {
    const mid = Math.floor((low + high) / 2)
    const value = Number(values[mid])
    if (value < needle) {
      low = mid + 1
    } else {
      high = mid
    }
  }

  return low + 1
}
