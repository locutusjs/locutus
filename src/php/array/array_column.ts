import { isObjectLike, toPhpArrayObject } from '../_helpers/_phpTypes.ts'

export function array_column(
  input: unknown,
  columnKey: string | number | null,
  indexKey: string | number | null = null,
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

  const normalizedInput = Array.isArray(input) ? input : Object.values(toPhpArrayObject(input))
  const result: { [key: string]: unknown } = {}
  let fallbackIndex = 0

  for (const rowValue of normalizedInput) {
    const row = isObjectLike(rowValue) ? toPhpArrayObject(rowValue) : {}
    const indexCandidate = indexKey === null ? undefined : row[String(indexKey)]

    const value = columnKey === null ? rowValue : row[String(columnKey)]
    if (indexCandidate !== undefined && indexCandidate !== null) {
      result[String(indexCandidate)] = value
    } else {
      result[String(fallbackIndex)] = value
      fallbackIndex += 1
    }
  }

  return result
}
