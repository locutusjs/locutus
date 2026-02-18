import { describe, expect, it } from 'vitest'
import { Atoi } from '../../src/golang/strconv/Atoi.ts'
import { ParseBool } from '../../src/golang/strconv/ParseBool.ts'
import { ParseInt } from '../../src/golang/strconv/ParseInt.ts'
import { array_change_key_case } from '../../src/php/array/array_change_key_case.ts'
import { array_chunk } from '../../src/php/array/array_chunk.ts'
import { array_column } from '../../src/php/array/array_column.ts'
import { array_combine } from '../../src/php/array/array_combine.ts'
import { array_diff } from '../../src/php/array/array_diff.ts'
import { array_diff_assoc } from '../../src/php/array/array_diff_assoc.ts'
import { array_diff_key } from '../../src/php/array/array_diff_key.ts'
import { array_fill_keys } from '../../src/php/array/array_fill_keys.ts'
import { array_intersect } from '../../src/php/array/array_intersect.ts'
import { array_intersect_assoc } from '../../src/php/array/array_intersect_assoc.ts'
import { array_intersect_key } from '../../src/php/array/array_intersect_key.ts'
import { array_keys } from '../../src/php/array/array_keys.ts'
import { array_map } from '../../src/php/array/array_map.ts'
import { array_merge } from '../../src/php/array/array_merge.ts'
import { array_merge_recursive } from '../../src/php/array/array_merge_recursive.ts'
import { array_multisort } from '../../src/php/array/array_multisort.ts'
import { array_pad } from '../../src/php/array/array_pad.ts'
import { array_push } from '../../src/php/array/array_push.ts'
import { array_rand } from '../../src/php/array/array_rand.ts'
import { array_reduce } from '../../src/php/array/array_reduce.ts'
import { array_replace } from '../../src/php/array/array_replace.ts'
import { array_replace_recursive } from '../../src/php/array/array_replace_recursive.ts'
import { array_reverse } from '../../src/php/array/array_reverse.ts'
import { array_search } from '../../src/php/array/array_search.ts'
import { array_shift } from '../../src/php/array/array_shift.ts'
import { array_slice } from '../../src/php/array/array_slice.ts'
import { array_splice } from '../../src/php/array/array_splice.ts'
import { array_sum } from '../../src/php/array/array_sum.ts'
import { array_unique } from '../../src/php/array/array_unique.ts'
import { array_values } from '../../src/php/array/array_values.ts'
import { array_walk } from '../../src/php/array/array_walk.ts'
import { array_walk_recursive } from '../../src/php/array/array_walk_recursive.ts'
import { count } from '../../src/php/array/count.ts'
import { sizeof } from '../../src/php/array/sizeof.ts'
import { call_user_func } from '../../src/php/funchand/call_user_func.ts'
import { call_user_func_array } from '../../src/php/funchand/call_user_func_array.ts'
import { function_exists } from '../../src/php/funchand/function_exists.ts'
import { getenv } from '../../src/php/info/getenv.ts'
import type { IniValue } from '../../src/php/info/ini_set.ts'
import { ini_set } from '../../src/php/info/ini_set.ts'
import { json_decode } from '../../src/php/json/json_decode.ts'
import { echo } from '../../src/php/strings/echo.ts'
import { printf } from '../../src/php/strings/printf.ts'
import { sprintf } from '../../src/php/strings/sprintf.ts'
import { vprintf } from '../../src/php/strings/vprintf.ts'
import { gettype } from '../../src/php/var/gettype.ts'
import { is_array } from '../../src/php/var/is_array.ts'
import { is_callable } from '../../src/php/var/is_callable.ts'
import { isset } from '../../src/php/var/isset.ts'
import { var_dump } from '../../src/php/var/var_dump.ts'

type PhpValue = {} | null | undefined

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
const diffTyped: { [key: string]: string } = array_diff(['Kevin', 'van', 'Zonneveld'], ['van', 'Zonneveld'])
const diffAssocTyped: { [key: string]: string } = array_diff_assoc(
  { 0: 'Kevin', 1: 'van', 2: 'Zonneveld' },
  { 0: 'Kevin', 4: 'van', 5: 'Zonneveld' },
)
const diffKeyTyped: { [key: string]: number } = array_diff_key({ red: 1, green: 2, blue: 3 }, { red: 5 })
const intersectTyped: { [key: string]: string } = array_intersect(
  { a: 'green', 0: 'red', 1: 'blue' },
  { b: 'green', 0: 'yellow', 1: 'red' },
  ['green', 'red'],
)
const intersectAssocTyped: { [key: string]: string } = array_intersect_assoc(
  { a: 'green', b: 'brown', c: 'blue', 0: 'red' },
  { a: 'green', 0: 'yellow', 1: 'red' },
)
const intersectKeyTyped: { [key: string]: string } = array_intersect_key(
  { a: 'green', b: 'brown', c: 'blue', 0: 'red' },
  { a: 'green', 0: 'yellow', 1: 'red' },
)
const mergeRecursiveTyped = array_merge_recursive(
  { color: { favorite: 'red' }, 0: 5 },
  { 0: 10, color: { favorite: 'green', 0: 'blue' } },
)
const arrayValuesTyped: number[] = array_values({ one: 1, two: 2 })
const chunkTyped: Array<number[] | { [key: string]: number }> = array_chunk([1, 2, 3], 2) || []
const columnTyped: { [key: string]: PhpValue } | undefined = array_column([{ id: 1, label: 'a' }], 'label', 'id')
const replaceRecursiveTyped: PhpValue[] | { [key: string]: PhpValue } = array_replace_recursive({ a: [1] }, { a: [2] })
const callUserFuncTyped: boolean = call_user_func<boolean>('isNaN', 'value')
const callUserFuncArrayTyped: boolean = call_user_func_array<boolean, [string]>('isNaN', ['value'])
const functionExistsTyped: boolean = function_exists('isNaN')
const isCallableTyped: boolean | false = is_callable('is_callable')
const arrayMapTyped: PhpValue[] = array_map((v: PhpValue) => Number(v) * 2, [1, 2])
const shiftedTyped: number | null = array_shift([3, 4])
const paddedTyped: Array<number | string> = array_pad([7, 8], 4, 'x')
const pushTarget = [1, 2]
const pushedTyped: number = array_push(pushTarget, 3)
const randTyped: string | null = array_rand(['only']) as string | null
const replacedTyped: { [key: string]: number | undefined } = array_replace({ 0: 1, 1: 2 }, { 1: 9, 2: 5 })
const multisortNames = ['beta', 'alpha']
const multisortRanks = [2, 1]
const multisortTyped: boolean = array_multisort(multisortNames, 'SORT_ASC', multisortRanks, 'SORT_ASC')
const spliceInput = ['red', 'green', 'blue']
const splicedTyped: PhpValue[] | { [key: string]: PhpValue } = array_splice(spliceInput, 1, 1, ['purple'])
const sumTyped: number | null = array_sum({ a: 1, b: '2.5', c: true })
const countTyped: number = count({ one: [1, 2, 3] }, 'COUNT_RECURSIVE')
const sizeofTyped: number = sizeof({ one: [1, 2, 3] }, 'COUNT_RECURSIVE')
const searchTyped: string | false = array_search('zonneveld', { firstname: 'kevin', surname: 'zonneveld' })
const iniSetTyped: IniValue | undefined = ini_set('locutus.type-signatures', 'on')
const gettypeTyped: string = gettype(1)
const isArrayTyped: boolean = is_array({ 0: 'Kevin', 1: 'van' })
const varDumpTyped: string = var_dump({ ok: true })
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
    expect(diffTyped).toEqual({ 0: 'Kevin' })
    expect(diffAssocTyped).toEqual({ 1: 'van', 2: 'Zonneveld' })
    expect(diffKeyTyped).toEqual({ green: 2, blue: 3 })
    expect(intersectTyped).toEqual({ 0: 'red', a: 'green' })
    expect(intersectAssocTyped).toEqual({ a: 'green' })
    expect(intersectKeyTyped).toEqual({ 0: 'red', a: 'green' })
    expect(mergeRecursiveTyped).toEqual({ color: { 0: 'blue', favorite: ['red', 'green'] }, 0: 5, 1: 10 })
    expect(arrayValuesTyped).toEqual([1, 2])
    expect(chunkTyped).toEqual([[1, 2], [3]])
    expect(columnTyped).toEqual({ 1: 'a' })
    expect(replaceRecursiveTyped).toEqual({ a: [2] })
    expect(callUserFuncTyped).toBe(true)
    expect(callUserFuncArrayTyped).toBe(true)
    expect(functionExistsTyped).toBe(true)
    expect(isCallableTyped).toBe(true)
    expect(arrayMapTyped).toEqual([2, 4])
    expect(shiftedTyped).toBe(3)
    expect(paddedTyped).toEqual([7, 8, 'x', 'x'])
    expect(pushedTyped).toBe(3)
    expect(pushTarget).toEqual([1, 2, 3])
    expect(randTyped).toBe('0')
    expect(replacedTyped).toEqual({ 0: 1, 1: 9, 2: 5 })
    expect(multisortTyped).toBe(true)
    expect(multisortNames).toEqual(['alpha', 'beta'])
    expect(multisortRanks).toEqual([1, 2])
    expect(splicedTyped).toEqual(['green'])
    expect(spliceInput).toEqual(['red', 'purple', 'blue'])
    expect(sumTyped).toBe(3.5)
    expect(countTyped).toBe(4)
    expect(sizeofTyped).toBe(4)
    expect(searchTyped).toBe('surname')
    expect(iniSetTyped).toBeUndefined()
    expect(gettypeTyped).toBe('integer')
    expect(isArrayTyped).toBe(true)
    expect(varDumpTyped).toContain('array(1)')
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
