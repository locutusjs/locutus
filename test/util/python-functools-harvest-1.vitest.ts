import { describe, expect, it } from 'vitest'

import { reduce } from '../../src/python/functools/reduce.ts'

describe('python functools harvest 1', () => {
  it('reduces iterables with and without an initializer', () => {
    expect(reduce((a, b) => Number(a) + Number(b), [1, 2, 3, 4])).toBe(10)
    expect(reduce((a, b) => Number(a) + Number(b), [1, 2, 3], 10)).toBe(16)
  })

  it('supports string iterables and empty iterables with an initializer', () => {
    expect(reduce((a, b) => String(a) + String(b), 'abc')).toBe('abc')
    expect(reduce((a, b) => Number(a) + Number(b), [], 10)).toBe(10)
  })

  it('raises the Python empty-sequence error without an initializer', () => {
    expect(() => reduce((a, b) => Number(a) + Number(b), [])).toThrow(
      'reduce() of empty sequence with no initial value',
    )
  })

  it('consumes iterators lazily and stops pulling values once the reducer throws', () => {
    const seen: number[] = []

    function* values(): Generator<number, void, unknown> {
      seen.push(1)
      yield 1
      seen.push(2)
      yield 2
      seen.push(3)
      yield 3
    }

    expect(() =>
      reduce(() => {
        throw new Error('stop')
      }, values()),
    ).toThrow('stop')
    expect(seen).toEqual([1, 2])
  })
})
