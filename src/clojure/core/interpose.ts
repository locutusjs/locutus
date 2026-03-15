export function interpose<T, U>(separator: T, values: U[]): Array<T | U>
export function interpose<T>(separator: T, values: unknown): T[]
export function interpose<T, U>(separator: T, values: U[] | unknown): Array<T | U> {
  //      discuss at: https://locutus.io/clojure/interpose/
  // parity verified: Clojure 1.12
  //     original by: Kevin van Zonneveld (https://kvz.io)
  //       example 1: interpose('-', ['a', 'b', 'c'])
  //       returns 1: ['a', '-', 'b', '-', 'c']
  //       example 2: interpose(0, [1, 2, 3])
  //       returns 2: [1, 0, 2, 0, 3]
  //       example 3: interpose(',', [])
  //       returns 3: []

  if (!Array.isArray(values) || values.length === 0) {
    return []
  }

  const out: Array<T | U> = []
  for (let i = 0; i < values.length; i++) {
    if (i > 0) {
      out.push(separator)
    }
    out.push(values[i] as U)
  }

  return out
}
