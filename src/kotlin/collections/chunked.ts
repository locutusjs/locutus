export function chunked<T>(values: T[] | unknown, size: number): T[][] {
  //  discuss at: https://locutus.io/kotlin/collections/chunked/
  // original by: Kevin van Zonneveld (https://kvz.io)
  //      note 1: Splits values into consecutive chunks of at most size, like Kotlin chunked.
  //   example 1: chunked([1, 2, 3, 4, 5], 2)
  //   returns 1: [[1, 2], [3, 4], [5]]
  //   example 2: chunked(['a', 'b', 'c'], 3)
  //   returns 2: [['a', 'b', 'c']]
  //   example 3: chunked([], 2)
  //   returns 3: []

  if (!Array.isArray(values)) {
    return []
  }

  const width = Math.trunc(Number(size))
  if (!Number.isFinite(width) || width <= 0) {
    throw new RangeError('chunked(): size must be a positive integer')
  }

  const out: T[][] = []
  for (let i = 0; i < values.length; i += width) {
    out.push(values.slice(i, i + width) as T[])
  }

  return out
}
