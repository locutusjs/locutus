import { describe, expect, it } from 'vitest'
import { Atoi } from '../../src/golang/strconv/Atoi.ts'
import { ParseBool } from '../../src/golang/strconv/ParseBool.ts'
import { ParseInt } from '../../src/golang/strconv/ParseInt.ts'
import { array_change_key_case } from '../../src/php/array/array_change_key_case.ts'
import { array_chunk } from '../../src/php/array/array_chunk.ts'
import { array_column } from '../../src/php/array/array_column.ts'
import { array_replace_recursive } from '../../src/php/array/array_replace_recursive.ts'
import { array_reverse } from '../../src/php/array/array_reverse.ts'
import { array_slice } from '../../src/php/array/array_slice.ts'
import { array_values } from '../../src/php/array/array_values.ts'
import { call_user_func } from '../../src/php/funchand/call_user_func.ts'
import { echo } from '../../src/php/strings/echo.ts'
import { printf } from '../../src/php/strings/printf.ts'
import { sprintf } from '../../src/php/strings/sprintf.ts'

const atoiTyped: [number, Error | null] = Atoi('42')
const parseBoolTyped: [boolean, Error | null] = ParseBool('true')
const parseIntTyped: [number, Error | null] = ParseInt('42', 10, 64)
const sprintfTyped: string | false = sprintf('%s', 'value')
const printfTyped: number = printf('%s', 'value')
const reversedValuesTyped: string[] = array_reverse(['php', 'ts'])
const reversedKeysTyped: { [key: string]: string } = array_reverse(['php', 'ts'], true)
const slicedValuesTyped: string[] = array_slice(['a', 'b', 'c'], 1)
const slicedKeysTyped = array_slice(['a', 'b', 'c'], 1, 1, true)
const casedKeysTyped: { [key: string]: number } = array_change_key_case({ Foo: 1 })
const arrayValuesTyped: number[] = array_values({ one: 1, two: 2 })
const chunkTyped: Array<number[] | { [key: string]: number }> = array_chunk([1, 2, 3], 2) || []
const columnTyped: { [key: string]: unknown } | undefined = array_column([{ id: 1, label: 'a' }], 'label', 'id')
const replaceRecursiveTyped: unknown[] | { [key: string]: unknown } = array_replace_recursive({ a: [1] }, { a: [2] })
const callUserFuncTyped: boolean = call_user_func<boolean>('isNaN', 'value')
echo('hello', 'world')

describe('public type signatures', () => {
  it('matches tuple and variadic runtime contracts', () => {
    expect(atoiTyped[0]).toBe(42)
    expect(parseBoolTyped[0]).toBe(true)
    expect(parseIntTyped[0]).toBe(42)
    expect(sprintfTyped).toBe('value')
    expect(printfTyped).toBe(5)
    expect(reversedValuesTyped).toEqual(['ts', 'php'])
    expect(reversedKeysTyped).toEqual({ 1: 'ts', 0: 'php' })
    expect(slicedValuesTyped).toEqual(['b', 'c'])
    expect(slicedKeysTyped).toEqual({ 1: 'b' })
    expect(casedKeysTyped).toEqual({ foo: 1 })
    expect(arrayValuesTyped).toEqual([1, 2])
    expect(chunkTyped).toEqual([[1, 2], [3]])
    expect(columnTyped).toEqual({ 1: 'a' })
    expect(replaceRecursiveTyped).toEqual({ a: [2] })
    expect(callUserFuncTyped).toBe(true)
  })
})
