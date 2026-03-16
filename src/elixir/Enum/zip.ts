export function zip<T>(values: T[][] | unknown): T[][]
export function zip<T, U>(left: T[] | unknown, right: U[] | unknown): Array<[T, U]>
export function zip<T, U>(left: T[][] | T[] | unknown, right?: U[] | unknown): Array<T[] | [T, U]> {
  //      discuss at: https://locutus.io/elixir/zip/
  // parity verified: Elixir 1.18
  //     original by: Kevin van Zonneveld (https://kvz.io)
  //       example 1: zip([1, 2], [3, 4])
  //       returns 1: [[1, 3], [2, 4]]
  //       example 2: zip([[1, 2], ['a', 'b'], [true, false]])
  //       returns 2: [[1, 'a', true], [2, 'b', false]]
  //       example 3: zip([1, 2, 3], ['a'])
  //       returns 3: [[1, 'a']]

  if (right !== undefined) {
    if (!Array.isArray(left) || !Array.isArray(right)) {
      return []
    }

    const size = Math.min(left.length, right.length)
    const out: Array<[T, U]> = []
    for (let i = 0; i < size; i++) {
      out.push([left[i] as T, right[i] as U])
    }
    return out
  }

  if (!Array.isArray(left) || left.length === 0) {
    return []
  }

  if (!left.every((value) => Array.isArray(value))) {
    return []
  }

  const lists = left as T[][]
  const size = Math.min(...lists.map((value) => value.length))
  const out: T[][] = []

  for (let i = 0; i < size; i++) {
    out.push(lists.map((value) => value[i] as T))
  }

  return out
}
