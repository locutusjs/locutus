export type SearchSortedRange = {
  start: number
  end: number
}

export function searchsorted(values: number[] | unknown, target: number): SearchSortedRange {
  //      discuss at: https://locutus.io/julia/searchsorted/
  // parity verified: Julia 1.11
  //     original by: Kevin van Zonneveld (https://kvz.io)
  //          note 1: Returns the 1-based matching range or empty insertion range, like Julia searchsorted.
  //       example 1: searchsorted([1, 2, 2, 2, 3], 2)
  //       returns 1: {start: 2, end: 4}
  //       example 2: searchsorted([1, 3, 5, 7], 4)
  //       returns 2: {start: 3, end: 2}
  //       example 3: searchsorted([1, 3, 5, 7], 0)
  //       returns 3: {start: 1, end: 0}

  if (!Array.isArray(values)) {
    return { start: 1, end: 0 }
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

  const start = low + 1

  high = values.length
  while (low < high) {
    const mid = Math.floor((low + high) / 2)
    const value = Number(values[mid])
    if (value <= needle) {
      low = mid + 1
    } else {
      high = mid
    }
  }

  return {
    start,
    end: low,
  }
}
