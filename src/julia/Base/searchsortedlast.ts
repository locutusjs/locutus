export function searchsortedlast(values: number[] | unknown, target: number): number {
  //      discuss at: https://locutus.io/julia/searchsortedlast/
  // parity verified: Julia 1.11
  //     original by: Kevin van Zonneveld (https://kvz.io)
  //          note 1: Returns 1-based insertion index after the last <= target element, like Julia searchsortedlast.
  //       example 1: searchsortedlast([1, 3, 5, 7], 4)
  //       returns 1: 2
  //       example 2: searchsortedlast([1, 3, 5, 7], 0)
  //       returns 2: 0
  //       example 3: searchsortedlast([1, 3, 5, 7], 9)
  //       returns 3: 4

  if (!Array.isArray(values)) {
    return 0
  }

  let low = 0
  let high = values.length
  const needle = Number(target)

  while (low < high) {
    const mid = Math.floor((low + high) / 2)
    const value = Number(values[mid])
    if (value <= needle) {
      low = mid + 1
    } else {
      high = mid
    }
  }

  return low
}
