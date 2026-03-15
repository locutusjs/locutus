type BsearchIndexCallback<T> = (value: T, index: number, array: T[]) => boolean | number | null | undefined

export function bsearch_index<T>(values: T[] | unknown, callback: BsearchIndexCallback<T>): number | null {
  //      discuss at: https://locutus.io/ruby/Array/bsearch_index/
  // parity verified: Ruby 3.3
  //     original by: Kevin van Zonneveld (https://kvz.io)
  //          note 1: Supports Ruby's boolean "find minimum" mode and numeric "find any exact match" mode.
  //          note 2: Returns the matching index instead of the matching element.
  //       example 1: bsearch_index([1, 3, 4, 6, 8], (value) => value >= 4)
  //       returns 1: 2
  //       example 2: bsearch_index([1, 3, 4, 6, 8], (value) => (value === 4 ? 0 : 4 > value ? 1 : -1))
  //       returns 2: 2
  //       example 3: bsearch_index([1, 3, 4, 6, 8], (value) => (value === 5 ? 0 : 5 > value ? 1 : -1))
  //       returns 3: null

  if (typeof callback !== 'function') {
    throw new TypeError('bsearch_index(): callback must be a function')
  }

  if (!Array.isArray(values) || values.length === 0) {
    return null
  }

  let low = 0
  let high = values.length - 1
  let candidateIndex: number | null = null
  let mode: 'boolean' | 'numeric' | null = null

  while (low <= high) {
    const mid = low + Math.floor((high - low) / 2)
    const value = values[mid] as T
    const result = callback(value, mid, values)

    if (typeof result === 'number') {
      if (mode === 'boolean') {
        throw new TypeError('bsearch_index(): callback must consistently return booleans or numbers')
      }

      mode = 'numeric'

      if (result === 0) {
        return mid
      }

      if (result > 0) {
        low = mid + 1
      } else {
        high = mid - 1
      }

      continue
    }

    if (mode === 'numeric') {
      throw new TypeError('bsearch_index(): callback must consistently return booleans or numbers')
    }

    mode = 'boolean'

    if (result) {
      candidateIndex = mid
      high = mid - 1
    } else {
      low = mid + 1
    }
  }

  return candidateIndex
}
