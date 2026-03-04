export function transpose<T>(rows: Array<Array<T> | unknown> | unknown): T[][] {
  //  discuss at: https://locutus.io/haskell/list/transpose/
  // original by: Kevin van Zonneveld (https://kvz.io)
  //      note 1: Transposes rows and columns, dropping exhausted rows like Haskell Data.List.transpose.
  //   example 1: transpose([[1, 2, 3], [4, 5, 6]])
  //   returns 1: [[1, 4], [2, 5], [3, 6]]
  //   example 2: transpose([['a', 'b'], ['c'], ['d', 'e', 'f']])
  //   returns 2: [['a', 'c', 'd'], ['b', 'e'], ['f']]
  //   example 3: transpose([])
  //   returns 3: []

  if (!Array.isArray(rows)) {
    return []
  }

  const queue = rows
    .filter((row): row is T[] => Array.isArray(row))
    .map((row) => row.slice())
    .filter((row) => row.length > 0)

  const out: T[][] = []
  while (queue.length > 0) {
    const column: T[] = []
    for (let i = queue.length - 1; i >= 0; i--) {
      const row = queue[i]
      const head = row?.shift()
      if (typeof head !== 'undefined') {
        column.push(head)
      }
      if (!row || row.length === 0) {
        queue.splice(i, 1)
      }
    }
    column.reverse()
    out.push(column)
  }

  return out
}
