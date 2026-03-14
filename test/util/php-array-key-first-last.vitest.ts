import { describe, expect, it } from 'vitest'

import { array_key_first } from '../../src/php/array/array_key_first.ts'
import { array_key_last } from '../../src/php/array/array_key_last.ts'
import { current } from '../../src/php/array/current.ts'
import { end } from '../../src/php/array/end.ts'

describe('php/array/array_key_first and array_key_last', () => {
  it('returns boundary keys for associative objects', () => {
    const input = { alpha: 1, beta: 2, gamma: 3 }

    expect(array_key_first(input)).toBe('alpha')
    expect(array_key_last(input)).toBe('gamma')
  })

  it('returns numeric boundary keys for dense arrays', () => {
    const input = ['x', 'y', 'z']

    expect(array_key_first(input)).toBe(0)
    expect(array_key_last(input)).toBe(2)
  })

  it('returns the first and last existing keys for sparse arrays', () => {
    const input = [] as string[]
    input[2] = 'c'
    input[5] = 'f'

    expect(array_key_first(input)).toBe(2)
    expect(array_key_last(input)).toBe(5)
  })

  it('returns null for empty input', () => {
    expect(array_key_first([])).toBeNull()
    expect(array_key_last([])).toBeNull()
    expect(array_key_first({})).toBeNull()
    expect(array_key_last({})).toBeNull()
  })

  it('casts canonical integer-like string keys the way PHP does', () => {
    expect(array_key_first({ '-1': 'neg' })).toBe(-1)
    expect(array_key_last({ '2': 'two' })).toBe(2)
  })

  it('keeps non-canonical numeric-looking keys as strings', () => {
    expect(array_key_first({ '08': 'padded' })).toBe('08')
    expect(array_key_last({ '-0': 'negativeZero' })).toBe('-0')
  })

  it('does not mutate the internal array pointer', () => {
    const input = ['foot', 'bike', 'car']

    expect(end(input)).toBe('car')
    expect(array_key_first(input)).toBe(0)
    expect(array_key_last(input)).toBe(2)
    expect(current(input)).toBe('car')
  })
})
