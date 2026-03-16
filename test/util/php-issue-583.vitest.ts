import { describe, expect, it } from 'vitest'

import { array_merge_recursive } from '../../src/php/array/array_merge_recursive.ts'
import { ltrim } from '../../src/php/strings/ltrim.ts'
import { rtrim } from '../../src/php/strings/rtrim.ts'
import { strlen } from '../../src/php/strings/strlen.ts'
import { strtolower } from '../../src/php/strings/strtolower.ts'
import { strtoupper } from '../../src/php/strings/strtoupper.ts'
import { trim } from '../../src/php/strings/trim.ts'
import { strval } from '../../src/php/var/strval.ts'

describe('issue 583 PHP 8.3 parity', () => {
  it('treats trim(null) as an empty string instead of stringifying null', () => {
    expect(trim(null)).toBe('')
  })

  it('throws PHP-style missing-argument errors for string helpers', () => {
    expect(() => trim()).toThrow('trim() expects at least 1 argument, 0 given')
    expect(() => rtrim()).toThrow('rtrim() expects at least 1 argument, 0 given')
    expect(() => ltrim()).toThrow('ltrim() expects at least 1 argument, 0 given')
    expect(() => strval(undefined)).toThrow('strval() expects exactly 1 argument, 0 given')
    expect(() => strtolower()).toThrow('strtolower() expects exactly 1 argument, 0 given')
    expect(() => strtoupper()).toThrow('strtoupper() expects exactly 1 argument, 0 given')
    expect(() => strlen()).toThrow('strlen() expects exactly 1 argument, 0 given')
  })

  it('supports the variadic PHP contract for array_merge_recursive', () => {
    expect(array_merge_recursive()).toEqual({})
    expect(array_merge_recursive({ x: 1, 0: 2 })).toEqual({ x: 1, 0: 2 })
    expect(array_merge_recursive({ x: 1, 0: 2 }, { x: 3, 1: 4 }, { y: 5, 0: 6 })).toEqual({
      x: [1, 3],
      0: 2,
      1: 4,
      y: 5,
      2: 6,
    })
  })
})
