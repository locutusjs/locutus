export function tally<T>(arr: T[] | unknown): Record<string, number> {
  // parity verified: Ruby 3.3
  //      discuss at: https://locutus.io/ruby/Array/tally/
  //     original by: Kevin van Zonneveld (https://kvz.io)
  //          note 1: Counts occurrences by stringified key, mirroring `array.tally`.
  //       example 1: tally(['a', 'b', 'a'])
  //       returns 1: {a: 2, b: 1}
  //       example 2: tally([1, 2, 1, 3])
  //       returns 2: {'1': 2, '2': 1, '3': 1}
  //       example 3: tally([])
  //       returns 3: {}

  if (!Array.isArray(arr)) {
    return {}
  }

  const out: Record<string, number> = {}
  for (const value of arr) {
    const key = String(value)
    out[key] = (out[key] ?? 0) + 1
  }

  return out
}
