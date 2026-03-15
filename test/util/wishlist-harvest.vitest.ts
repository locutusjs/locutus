import { describe, expect, it } from 'vitest'

import { Join } from '../../src/golang/filepath/Join.ts'
import { isqrt } from '../../src/python/math/isqrt.ts'
import { prod } from '../../src/python/math/prod.ts'
import { sub } from '../../src/python/re/sub.ts'
import { subn } from '../../src/python/re/subn.ts'
import { pythonHandler } from '../parity/lib/languages/python.ts'

describe('wishlist harvest edge cases', () => {
  it('ignores empty filepath join elements like Go', () => {
    expect(Join('', 'a')).toBe('a')
    expect(Join('', '', 'a')).toBe('a')
  })

  it('supports Python prod string repetition and rejects unsafe integer inputs', () => {
    expect(prod(['x'])).toBe('x')
    expect(prod(['123', 3])).toBe('123123123')
    expect(prod(['9007199254740993', 2])).toBe('90071992547409939007199254740993')
    expect(prod([9007199254740992, 0])).toBe(0)
  })

  it('rejects integer square roots beyond JS safe integer precision', () => {
    expect(() => isqrt('100000000000000020000000000000001')).toThrow(/safe integer/i)
    expect(isqrt('1000000000000000000000000000001')).toBe(1000000000000000)
  })

  it('supports \\g<0> replacement tokens in subn', () => {
    expect(subn('(\\d+)', '<\\g<0>>', 'a1b22')).toEqual(['a<1>b<22>', 2])
    expect(subn('(\\d+)', '<\\0>', 'a1b22')).toEqual([`a<\0>b<\0>`, 2])
  })

  it('keeps sub replacement escape handling aligned with subn', () => {
    expect(sub('(\\d+)', '<\\g<0>>', 'a1b22')).toBe('a<1>b<22>')
    expect(sub('(\\d+)', '\\01', 'a1b22')).toBe(`a${String.fromCharCode(1)}b${String.fromCharCode(1)}`)
    expect(sub('(\\d+)', '\\07', 'a1b22')).toBe(`a${String.fromCharCode(7)}b${String.fromCharCode(7)}`)
    expect(sub('(\\d+)', '\\041', 'a1b22')).toBe('a!b!')
  })

  it('translates prod start arguments as Python keyword-only start values', () => {
    const translated = pythonHandler.translate(['prod([1, (2 + 3)], 3)'], 'prod', 'math')

    expect(translated).toContain('math.prod([1, (2 + 3)], start=3)')
  })
})
