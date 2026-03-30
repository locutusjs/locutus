import { describe, expect, it } from 'vitest'

import { bisect } from '../../src/python/bisect/bisect.ts'
import { bisect_left } from '../../src/python/bisect/bisect_left.ts'
import { bisect_right } from '../../src/python/bisect/bisect_right.ts'

describe('python bisect harvest 1', () => {
  it('returns left and right insertion points for duplicate values', () => {
    expect(bisect_left([1, 2, 2, 4], 2)).toBe(1)
    expect(bisect_right([1, 2, 2, 4], 2)).toBe(3)
    expect(bisect([1, 2, 2, 4], 2)).toBe(3)
  })

  it('supports lo/hi bounds and string sequences', () => {
    expect(bisect_left([1, 2, 3, 4, 5], 3, 2)).toBe(2)
    expect(bisect_right([1, 2, 3, 4, 5], 3, 0, null)).toBe(3)
    expect(bisect_left('ace', 'b')).toBe(1)
  })

  it('preserves Python edge cases for bounds and incomparable values', () => {
    expect(() => bisect_left([1, 2], 1, -1)).toThrow('lo must be non-negative')
    expect(() => bisect_left([1, 2], 2, 0, 99)).toThrow('list index out of range')
    expect(() => bisect_left([1, 2], '1')).toThrow(/not supported between instances of 'int' and 'str'/)
  })
})
