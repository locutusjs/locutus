/**
 * Custom edge case tests for C abs() function
 *
 * The main examples test integer behavior (parity-verified against C).
 * These tests verify JavaScript-specific edge cases: floats and strings.
 */

import { describe, expect, it } from 'vitest'
// @ts-expect-error - CJS module
import abs from '../../src/c/math/abs.js'

describe('c/math/abs edge cases', () => {
  it('handles positive floats', () => {
    expect(abs(4.2)).toBe(4.2)
  })

  it('handles negative floats', () => {
    expect(abs(-4.2)).toBe(4.2)
  })

  it('handles non-numeric strings gracefully', () => {
    expect(abs('_argos')).toBe(0)
  })

  it('handles numeric strings', () => {
    expect(abs('-123')).toBe(123)
  })
})
