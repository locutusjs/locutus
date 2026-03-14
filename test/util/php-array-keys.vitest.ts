import { describe, expect, it } from 'vitest'

import { array_keys } from '../../src/php/array/array_keys.ts'

describe('php/array/array_keys', () => {
  it('returns numeric keys as numbers for dense arrays', () => {
    expect(array_keys(['alpha', 'beta', 'gamma'])).toEqual([0, 1, 2])
  })

  it('casts canonical integer-like object keys the way PHP does', () => {
    expect(array_keys({ 2: 'two', '-1': 'minus one', label: 'value' })).toEqual([2, -1, 'label'])
  })

  it('keeps non-canonical numeric-looking keys as strings', () => {
    expect(array_keys({ '08': 'padded', '-0': 'negative zero', plain: 'text' })).toEqual(['08', '-0', 'plain'])
  })

  it('keeps large integer keys as strings when JavaScript cannot represent them safely', () => {
    expect(array_keys({ '9007199254740993': 'first', '9007199254740995': 'last' })).toEqual([
      '9007199254740993',
      '9007199254740995',
    ])
  })
})
