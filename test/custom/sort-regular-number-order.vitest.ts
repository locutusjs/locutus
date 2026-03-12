import { describe, expect, it } from 'vitest'
import { getPhpRuntimeEntry, setPhpLocaleDefault, setPhpRuntimeEntry } from '../../src/php/_helpers/_phpRuntimeState.ts'
import { arsort } from '../../src/php/array/arsort.ts'
import { asort } from '../../src/php/array/asort.ts'
import { rsort } from '../../src/php/array/rsort.ts'
import { sort } from '../../src/php/array/sort.ts'
import { ini_set } from '../../src/php/info/ini_set.ts'

describe('SORT_REGULAR numeric ordering', () => {
  it('keeps numeric comparison semantics for numeric values', () => {
    const sortInput: Record<string, number> = { 0: 10, 1: 2 }
    const rsortInput: Record<string, number> = { 0: 10, 1: 2 }
    const asortInput: Record<string, number> = { a: 10, b: 2 }
    const arsortInput: Record<string, number> = { a: 10, b: 2 }

    sort(sortInput, 'SORT_REGULAR')
    rsort(rsortInput, 'SORT_REGULAR')
    asort(asortInput, 'SORT_REGULAR')
    arsort(arsortInput, 'SORT_REGULAR')

    expect(Object.values(sortInput)).toEqual([2, 10])
    expect(Object.values(rsortInput)).toEqual([10, 2])
    expect(Object.entries(asortInput)).toEqual([
      ['b', 2],
      ['a', 10],
    ])
    expect(Object.entries(arsortInput)).toEqual([
      ['a', 10],
      ['b', 2],
    ])
  })

  it('reindexes JS arrays for value-sorting helpers when numeric keys cannot preserve PHP order', () => {
    const asortInput = [4, 1, 2, 3]
    const arsortInput = [4, 1, 2, 3]

    asort(asortInput, 'SORT_NUMERIC')
    arsort(arsortInput, 'SORT_NUMERIC')

    expect(asortInput).toEqual([1, 2, 3, 4])
    expect(arsortInput).toEqual([4, 3, 2, 1])
  })

  it('handles large array rebuilds without spreading the full array into push()', () => {
    const input = Array.from({ length: 120_000 }, (_, index) => 120_000 - index)

    expect(() => asort(input, 'SORT_NUMERIC')).not.toThrow()
    expect(input[0]).toBe(1)
    expect(input.at(-1)).toBe(120_000)
  })

  it('keeps descending numeric semantics for arsort', () => {
    const arsortInput: Record<string, number> = { a: 4, b: 1, c: 2, d: 3 }

    arsort(arsortInput, 'SORT_NUMERIC')

    expect(Object.entries(arsortInput)).toEqual([
      ['a', 4],
      ['d', 3],
      ['c', 2],
      ['b', 1],
    ])
  })

  it('does not collapse sparse or expando array keys into a dense reindexed list', () => {
    const input: string[] & { foo?: string } = []
    input[5] = 'b'
    input.foo = 'a'

    asort(input, 'SORT_STRING')

    expect(input.length).toBe(6)
    expect(input[5]).toBe('b')
    expect(input.foo).toBe('a')
  })

  it('returns array copies for expando arrays when sortByReference is off', () => {
    const previousSortByReference = ini_set('locutus.sortByReference', 'off')
    const asortInput: string[] & { foo?: string; bar?: string } = []
    const arsortInput: string[] & { foo?: string; bar?: string } = []

    asortInput.foo = 'b'
    asortInput.bar = 'a'
    arsortInput.foo = 'b'
    arsortInput.bar = 'a'

    try {
      const asortResult = asort(asortInput, 'SORT_STRING')
      const arsortResult = arsort(arsortInput, 'SORT_STRING')

      expect(Array.isArray(asortResult)).toBe(true)
      expect(asortResult).toMatchObject({ bar: 'a', foo: 'b' })
      expect(asortResult).toHaveLength(0)

      expect(Array.isArray(arsortResult)).toBe(true)
      expect(arsortResult).toMatchObject({ foo: 'b', bar: 'a' })
      expect(arsortResult).toHaveLength(0)
    } finally {
      ini_set('locutus.sortByReference', previousSortByReference ?? 'on')
    }
  })

  it('reverses locale-aware sorting for arsort SORT_LOCALE_STRING', () => {
    const input = { a: 'bbb', b: 'c', c: 'aa' }
    const previousLocales = getPhpRuntimeEntry('locales')
    const previousLocaleDefault = getPhpRuntimeEntry('locale_default')

    try {
      setPhpRuntimeEntry('locales', {
        sort_probe: {
          sorting: (left, right) => String(left).length - String(right).length,
        },
      })
      setPhpLocaleDefault('sort_probe')
      arsort(input, 'SORT_LOCALE_STRING')

      expect(Object.entries(input)).toEqual([
        ['a', 'bbb'],
        ['c', 'aa'],
        ['b', 'c'],
      ])
    } finally {
      setPhpRuntimeEntry('locales', previousLocales)
      if (typeof previousLocaleDefault === 'string') {
        setPhpLocaleDefault(previousLocaleDefault)
      } else {
        setPhpRuntimeEntry('locale_default', undefined)
      }
    }
  })
})
