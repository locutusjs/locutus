export function groupBy<T>(
  values: T[] | unknown,
  selector: (value: T, index: number, array: T[]) => string | number | symbol,
): Record<string, T[]> {
  //  discuss at: https://locutus.io/kotlin/collections/groupBy/
  // original by: Kevin van Zonneveld (https://kvz.io)
  //      note 1: Groups elements using selector(value), similar to Kotlin's groupBy.
  //   example 1: groupBy([1, 2, 3, 4], (n) => (n % 2 === 0 ? 'even' : 'odd'))
  //   returns 1: {odd: [1, 3], even: [2, 4]}
  //   example 2: groupBy(['ant', 'bear', 'cat'], (s) => s.length)
  //   returns 2: {'3': ['ant', 'cat'], '4': ['bear']}
  //   example 3: groupBy([], () => 'x')
  //   returns 3: {}

  if (!Array.isArray(values) || typeof selector !== 'function') {
    return {}
  }

  const out: Record<string, T[]> = {}
  for (let i = 0; i < values.length; i++) {
    const value = values[i] as T
    const key = String(selector(value, i, values))
    const bucket = out[key]
    if (bucket) {
      bucket.push(value)
    } else {
      out[key] = [value]
    }
  }

  return out
}
