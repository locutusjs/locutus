/**
 * Tests that parse_str resists prototype pollution even when
 * String.prototype.includes has been tampered with.
 *
 * See: https://github.com/locutusjs/locutus/issues/...
 */

import { afterEach, describe, expect, it } from 'vitest'
import { parse_str } from '../../src/php/strings/parse_str.ts'

describe('parse_str prototype pollution resistance', () => {
  const originalIncludes = String.prototype.includes

  afterEach(() => {
    // Restore includes so other tests aren't affected
    String.prototype.includes = originalIncludes
    // Clean up any pollution that occurred
    // @ts-expect-error - cleaning up pollution
    delete Object.prototype.polluted
  })

  it('should block __proto__ pollution even when String.prototype.includes is overridden', () => {
    String.prototype.includes = () => false
    const arr = {} as Record<string, unknown>
    parse_str('__proto__[polluted]=yes', arr)
    expect(({} as Record<string, unknown>).polluted).toBeUndefined()
  })

  it('should block constructor.prototype pollution even when String.prototype.includes is overridden', () => {
    String.prototype.includes = () => false
    const arr = {} as Record<string, unknown>
    parse_str('constructor[prototype][polluted]=yes', arr)
    expect(({} as Record<string, unknown>).polluted).toBeUndefined()
  })

  it('should still block __proto__ pollution with native includes intact', () => {
    const arr = {} as Record<string, unknown>
    parse_str('__proto__[polluted]=yes', arr)
    expect(({} as Record<string, unknown>).polluted).toBeUndefined()
  })

  it('should still block constructor.prototype pollution with native includes intact', () => {
    const arr = {} as Record<string, unknown>
    parse_str('constructor[prototype][polluted]=yes', arr)
    expect(({} as Record<string, unknown>).polluted).toBeUndefined()
  })
})
