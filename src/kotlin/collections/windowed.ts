export function windowed<T>(
  values: T[] | unknown,
  size: number,
  step: number = 1,
  partialWindows: boolean = false,
): T[][] {
  //  discuss at: https://locutus.io/kotlin/collections/windowed/
  // original by: Kevin van Zonneveld (https://kvz.io)
  //      note 1: Produces sliding windows over values, similar to Kotlin's windowed(size, step, partialWindows).
  //   example 1: windowed([1, 2, 3, 4, 5], 3)
  //   returns 1: [[1, 2, 3], [2, 3, 4], [3, 4, 5]]
  //   example 2: windowed([1, 2, 3, 4, 5], 3, 2)
  //   returns 2: [[1, 2, 3], [3, 4, 5]]
  //   example 3: windowed([1, 2, 3, 4, 5], 3, 2, true)
  //   returns 3: [[1, 2, 3], [3, 4, 5], [5]]

  if (!Array.isArray(values)) {
    return []
  }

  const width = Math.trunc(Number(size))
  const stride = Math.trunc(Number(step))

  if (!Number.isFinite(width) || width <= 0) {
    throw new RangeError('windowed(): size must be a positive integer')
  }
  if (!Number.isFinite(stride) || stride <= 0) {
    throw new RangeError('windowed(): step must be a positive integer')
  }

  const out: T[][] = []
  for (let i = 0; i < values.length; i += stride) {
    const window = values.slice(i, i + width)
    if (window.length === width || (partialWindows && window.length > 0)) {
      out.push(window)
    }
  }

  return out
}
