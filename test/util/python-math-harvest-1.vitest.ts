import { describe, expect, it } from 'vitest'

import { copysign } from '../../src/python/math/copysign.ts'
import { hypot } from '../../src/python/math/hypot.ts'

describe('python math harvest 1', () => {
  it('copysign preserves negative zero and sign-source semantics', () => {
    expect(copysign(1, -0)).toBe(-1)
    expect(Object.is(copysign(0, -2), -0)).toBe(true)
    expect(copysign(-3, 4)).toBe(3)
  })

  it('hypot accepts Python-style variadic coordinates', () => {
    expect(hypot()).toBe(0)
    expect(hypot(3, 4)).toBe(5)
    expect(hypot(3, 4, 12)).toBe(13)
  })
})
