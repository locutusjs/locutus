export function slice_when<T>(
  arr: T[] | unknown,
  boundary: (previous: T, current: T, index: number, source: T[]) => boolean,
): T[][] {
  //      discuss at: https://locutus.io/ruby/Array/slice_when/
  //     original by: Kevin van Zonneveld (https://kvz.io)
  //          note 1: Starts a new slice whenever boundary(previous, current) returns true.
  //          note 2: Mirrors Ruby's Enumerable#slice_when behavior on arrays.
  //       example 1: slice_when([1, 2, 4, 5, 7, 8], (prev, curr) => curr - prev !== 1)
  //       returns 1: [[1, 2], [4, 5], [7, 8]]
  //       example 2: slice_when(['a', 'ab', 'abc', 'd', 'de'], (prev, curr) => curr.length <= prev.length)
  //       returns 2: [['a', 'ab', 'abc'], ['d', 'de']]
  //       example 3: slice_when([], () => true)
  //       returns 3: []

  if (!Array.isArray(arr) || arr.length === 0 || typeof boundary !== 'function') {
    return []
  }

  const source = arr as T[]
  const out: T[][] = [[source[0] as T]]

  for (let i = 1; i < source.length; i++) {
    const previous = source[i - 1] as T
    const current = source[i] as T
    const shouldSlice = Boolean(boundary(previous, current, i, source))
    if (shouldSlice) {
      out.push([current])
      continue
    }
    const last = out[out.length - 1]
    if (last) {
      last.push(current)
    }
  }

  return out
}
