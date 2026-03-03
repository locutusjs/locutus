import type { PhpAssoc } from '../_helpers/_phpTypes.ts'
import { toPhpArrayObject } from '../_helpers/_phpTypes.ts'

type ColumnRow<TValue> = PhpAssoc<TValue>
type ColumnInput<TValue> = ColumnRow<TValue>[] | PhpAssoc<ColumnRow<TValue>>
type ColumnOutput<TValue> = PhpAssoc<TValue | ColumnRow<TValue> | undefined>

export function array_column<TValue>(
  input: ColumnInput<TValue>,
  columnKey: string | number | null,
  indexKey?: string | number | null,
): ColumnOutput<TValue>
export function array_column<TValue>(
  input: ColumnInput<TValue> | null | undefined,
  columnKey: string | number | null,
  indexKey?: string | number | null,
): ColumnOutput<TValue> | undefined {
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

  const normalizedInput = Array.isArray(input) ? input : Object.values(toPhpArrayObject<ColumnRow<TValue>>(input))
  const result: ColumnOutput<TValue> = {}
  let fallbackIndex = 0

  for (const rowValue of normalizedInput) {
    const row = toPhpArrayObject<TValue>(rowValue)
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
