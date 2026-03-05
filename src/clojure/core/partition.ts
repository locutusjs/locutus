export function partition<T>(n: number, values: T[] | unknown, step: number = n, pad: T[] | null = null): T[][] {
  //      discuss at: https://locutus.io/clojure/partition/
  // parity verified: Clojure 1.12
  //     original by: Kevin van Zonneveld (https://kvz.io)
  //          note 1: Mirrors Clojure partition for n/step/pad forms, dropping incomplete trailing partitions unless pad completes them.
  //       example 1: partition(3, [1, 2, 3, 4, 5])
  //       returns 1: [[1, 2, 3]]
  //       example 2: partition(3, [1, 2, 3, 4, 5], 1)
  //       returns 2: [[1, 2, 3], [2, 3, 4], [3, 4, 5]]
  //       example 3: partition(3, [1, 2, 3, 4, 5], 3, ['x', 'y'])
  //       returns 3: [[1, 2, 3], [4, 5, 'x']]

  if (!Array.isArray(values)) {
    return []
  }

  const size = Math.trunc(Number(n))
  const stride = Math.trunc(Number(step))
  if (!Number.isFinite(size) || size <= 0) {
    throw new RangeError('partition(): n must be a positive integer')
  }
  if (!Number.isFinite(stride) || stride <= 0) {
    throw new RangeError('partition(): step must be a positive integer')
  }

  const out: T[][] = []
  for (let i = 0; i < values.length; i += stride) {
    const chunk = values.slice(i, i + size)
    if (chunk.length === size) {
      out.push(chunk)
      continue
    }

    if (!pad || chunk.length === 0) {
      continue
    }

    const needed = size - chunk.length
    if (pad.length >= needed) {
      out.push([...chunk, ...pad.slice(0, needed)])
    }
  }

  return out
}
