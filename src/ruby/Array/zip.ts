export function zip<T>(arr: T[] | unknown, ...others: unknown[]): Array<Array<T | unknown | null>> {
  // parity verified: Ruby 3.3
  //      discuss at: https://locutus.io/ruby/Array/zip/
  //     original by: Kevin van Zonneveld (https://kvz.io)
  //          note 1: Combines elements at matching indexes, filling missing values with null.
  //       example 1: zip([1, 2, 3], ['a', 'b', 'c'])
  //       returns 1: [[1, 'a'], [2, 'b'], [3, 'c']]
  //       example 2: zip([1, 2], ['a'])
  //       returns 2: [[1, 'a'], [2, null]]
  //       example 3: zip([])
  //       returns 3: []

  if (!Array.isArray(arr)) {
    return []
  }

  const rows: Array<Array<T | unknown | null>> = []
  const normalizedOthers = others.map((value) => (Array.isArray(value) ? value : []))

  for (let index = 0; index < arr.length; index += 1) {
    const row: Array<T | unknown | null> = [arr[index]]
    for (const source of normalizedOthers) {
      row.push(index < source.length ? source[index] : null)
    }
    rows.push(row)
  }

  return rows
}
