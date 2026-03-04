export function group_by<T>(arr: T[] | unknown): Record<string, T[]> {
  // parity verified: Ruby 3.3
  //      discuss at: https://locutus.io/ruby/Array/group_by/
  //     original by: Kevin van Zonneveld (https://kvz.io)
  //          note 1: Groups array elements by identity key, mirroring `array.group_by { |v| v }`.
  //       example 1: group_by(['a', 'b', 'a'])
  //       returns 1: {a: ['a', 'a'], b: ['b']}
  //       example 2: group_by([1, 2, 1, 3])
  //       returns 2: {'1': [1, 1], '2': [2], '3': [3]}
  //       example 3: group_by([])
  //       returns 3: {}

  if (!Array.isArray(arr)) {
    return {}
  }

  const out: Record<string, T[]> = {}

  for (const value of arr) {
    const key = String(value)
    const existing = out[key]
    if (existing) {
      existing.push(value)
    } else {
      out[key] = [value]
    }
  }

  return out
}
