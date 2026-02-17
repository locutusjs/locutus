export function array_column(
  input: unknown,
  ColumnKey: string | number | null,
  IndexKey: string | number | null = null,
): { [key: string]: unknown } | undefined {
  //  discuss at: https://locutus.io/php/array_column/
  // original by: Enzo Dañobeytía
  //   example 1: array_column([{name: 'Alex', value: 1}, {name: 'Elvis', value: 2}, {name: 'Michael', value: 3}], 'name')
  //   returns 1: {0: "Alex", 1: "Elvis", 2: "Michael"}
  //   example 2: array_column({0: {name: 'Alex', value: 1}, 1: {name: 'Elvis', value: 2}, 2: {name: 'Michael', value: 3}}, 'name')
  //   returns 2: {0: "Alex", 1: "Elvis", 2: "Michael"}
  //   example 3: array_column([{name: 'Alex', value: 1}, {name: 'Elvis', value: 2}, {name: 'Michael', value: 3}], 'name', 'value')
  //   returns 3: {1: "Alex", 2: "Elvis", 3: "Michael"}
  //   example 4: array_column([{name: 'Alex', value: 1}, {name: 'Elvis', value: 2}, {name: 'Michael', value: 3}], null, 'value')
  //   returns 4: {1: {name: 'Alex', value: 1}, 2: {name: 'Elvis', value: 2}, 3: {name: 'Michael', value: 3}}

  if (input === null || typeof input !== 'object') {
    return undefined
  }

  const newarray: unknown[] = []
  const newarrayByKey = newarray as unknown as { [key: string]: unknown }
  const normalizedInput = Array.isArray(input) ? input : Object.values(input as { [key: string]: unknown })

  for (const rowValue of normalizedInput) {
    const row = rowValue && typeof rowValue === 'object' ? (rowValue as { [key: string]: unknown }) : {}
    const indexCandidate = IndexKey ? row[String(IndexKey)] : undefined

    if (indexCandidate) {
      if (ColumnKey) {
        newarrayByKey[String(indexCandidate)] = row[String(ColumnKey)]
      } else {
        newarrayByKey[String(indexCandidate)] = rowValue
      }
    } else if (ColumnKey) {
      newarray.push(row[String(ColumnKey)])
    } else {
      newarray.push(rowValue)
    }
  }

  const result: { [key: string]: unknown } = {}
  for (const key in newarrayByKey) {
    result[key] = newarrayByKey[key]
  }
  return result
}
