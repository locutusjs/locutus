import { describe, expect, it } from 'vitest'
import { Atoi } from '../../src/golang/strconv/Atoi.ts'
import { ParseBool } from '../../src/golang/strconv/ParseBool.ts'
import { ParseInt } from '../../src/golang/strconv/ParseInt.ts'
import { array_change_key_case } from '../../src/php/array/array_change_key_case.ts'
import { array_chunk } from '../../src/php/array/array_chunk.ts'
import { array_column } from '../../src/php/array/array_column.ts'
import { array_combine } from '../../src/php/array/array_combine.ts'
import { array_fill_keys } from '../../src/php/array/array_fill_keys.ts'
import { array_keys } from '../../src/php/array/array_keys.ts'
import { array_map } from '../../src/php/array/array_map.ts'
import { array_merge } from '../../src/php/array/array_merge.ts'
import { array_pad } from '../../src/php/array/array_pad.ts'
import { array_push } from '../../src/php/array/array_push.ts'
import { array_rand } from '../../src/php/array/array_rand.ts'
import { array_reduce } from '../../src/php/array/array_reduce.ts'
import { array_replace } from '../../src/php/array/array_replace.ts'
import { array_replace_recursive } from '../../src/php/array/array_replace_recursive.ts'
import { array_reverse } from '../../src/php/array/array_reverse.ts'
import { array_shift } from '../../src/php/array/array_shift.ts'
import { array_slice } from '../../src/php/array/array_slice.ts'
import { array_unique } from '../../src/php/array/array_unique.ts'
import { array_values } from '../../src/php/array/array_values.ts'
import { array_walk } from '../../src/php/array/array_walk.ts'
import { array_walk_recursive } from '../../src/php/array/array_walk_recursive.ts'
import { call_user_func } from '../../src/php/funchand/call_user_func.ts'
import { getenv } from '../../src/php/info/getenv.ts'
import { json_decode } from '../../src/php/json/json_decode.ts'
import { echo } from '../../src/php/strings/echo.ts'
import { printf } from '../../src/php/strings/printf.ts'
import { sprintf } from '../../src/php/strings/sprintf.ts'
import { vprintf } from '../../src/php/strings/vprintf.ts'
import { is_callable } from '../../src/php/var/is_callable.ts'
import { isset } from '../../src/php/var/isset.ts'

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
const isCallableTyped: boolean | false = is_callable('is_callable')
const arrayMapTyped: unknown[] = array_map((v: unknown) => Number(v) * 2, [1, 2])
const shiftedTyped: number | null = array_shift([3, 4])
const paddedTyped: Array<number | string> = array_pad([7, 8], 4, 'x')
const pushTarget = [1, 2]
const pushedTyped: number = array_push(pushTarget, 3)
const randTyped: string | null = array_rand(['only']) as string | null
const replacedTyped: { [key: string]: number | undefined } = array_replace({ 0: 1, 1: 2 }, { 1: 9, 2: 5 })
const walked: number[] = []
const walkTyped: boolean = array_walk([1, 2], (value: number) => walked.push(value))
const walkedRecursive: number[] = []
const walkRecursiveTyped: boolean = array_walk_recursive([1, [2]], (value: number) => walkedRecursive.push(value))
const arrayReduceTyped: number = array_reduce([1, 2, 3, 4], (left, right) => Number(left) + Number(right))
const arrayKeysTyped: string[] = array_keys({ one: 1, two: 2 })
const arrayFillKeysTyped: { [key: string]: string } = array_fill_keys({ first: 'a', second: 'b' }, 'x')
const arrayCombineTyped: { [key: string]: string } | false = array_combine([1, 2], ['a', 'b'])
const arrayMergeTyped: number[] | { [key: string]: number } = array_merge([1, 2], [3, 4])
const arrayUniqueTyped: { [key: string]: string } | false = array_unique(['a', 'a', 'b'])
const jsonDecodeTyped: { foo: number } | null = json_decode<{ foo: number }>('{\"foo\":1}')
const getenvTyped: string | false = getenv('LC_ALL')
const vprintfTyped: number = vprintf('%01.2f', [123.1])
const issetTyped: boolean = isset('value', 1)
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
    expect(isCallableTyped).toBe(true)
    expect(arrayMapTyped).toEqual([2, 4])
    expect(shiftedTyped).toBe(3)
    expect(paddedTyped).toEqual([7, 8, 'x', 'x'])
    expect(pushedTyped).toBe(3)
    expect(pushTarget).toEqual([1, 2, 3])
    expect(randTyped).toBe('0')
    expect(replacedTyped).toEqual({ 0: 1, 1: 9, 2: 5 })
    expect(walkTyped).toBe(true)
    expect(walked).toEqual([1, 2])
    expect(walkRecursiveTyped).toBe(true)
    expect(walkedRecursive).toEqual([1, 2])
    expect(arrayReduceTyped).toBe(10)
    expect(arrayKeysTyped).toEqual(['one', 'two'])
    expect(arrayFillKeysTyped).toEqual({ a: 'x', b: 'x' })
    expect(arrayCombineTyped).toEqual({ 1: 'a', 2: 'b' })
    expect(arrayMergeTyped).toEqual([1, 2, 3, 4])
    expect(arrayUniqueTyped).toEqual({ 0: 'a', 2: 'b' })
    expect(jsonDecodeTyped).toEqual({ foo: 1 })
    expect(getenvTyped).toBe(false)
    expect(vprintfTyped).toBe(6)
    expect(issetTyped).toBe(true)
  })
})
