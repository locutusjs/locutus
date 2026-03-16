import { describe, expect, it } from 'vitest'

import { interpose } from '../../src/clojure/core/interpose.ts'
import { zip } from '../../src/elixir/Enum/zip.ts'
import { replace } from '../../src/elixir/String/replace.ts'
import { type as luaType } from '../../src/lua/math/type.ts'
import { gsub } from '../../src/lua/string/gsub.ts'
import { array_is_list } from '../../src/php/array/array_is_list.ts'
import { trimend } from '../../src/powershell/string/trimend.ts'
import { trimstart } from '../../src/powershell/string/trimstart.ts'
import { isqrt } from '../../src/python/math/isqrt.ts'
import { normalizeLuaOutput } from '../parity/lib/languages/lua.ts'

describe('wishlist harvest 2 edge cases', () => {
  it('keeps PHP array_is_list aligned with dense key order', () => {
    expect(array_is_list(['a', 'b', 'c'])).toBe(true)
    expect(array_is_list({ 0: 'a', 2: 'b' })).toBe(false)
    expect(array_is_list({ '08': 'a' })).toBe(false)
    expect(array_is_list({})).toBe(true)
  })

  it('supports Lua gsub capture replacements and replacement limits', () => {
    expect(gsub('123-456', '(%d+)', '[%1]', 1)).toEqual(['[123]-456', 1])
    expect(gsub('abc', '%a', 'x')).toEqual(['xxx', 3])
    expect(gsub('a+b+c', '%+', '-')).toEqual(['a-b-c', 2])
  })

  it('translates Lua pattern classes and anchors without leaking JS regex semantics', () => {
    expect(gsub('a_b', '%w', 'x')).toEqual(['x_x', 2])
    expect(gsub('a_b', '[%a_]', 'x')).toEqual(['xxx', 3])
    expect(gsub('a1!', '[%A]', 'x')).toEqual(['axx', 2])
    expect(gsub('a1!', '[%D]', 'x')).toEqual(['x1x', 2])
    expect(gsub('abc', '[a-z]', 'x')).toEqual(['xxx', 3])
    expect(gsub(']a]', '[]a]', 'x')).toEqual(['xxx', 3])
    expect(gsub('a-b', '-', 'x')).toEqual(['axb', 1])
    expect(gsub('a^b a$b', 'a^b', 'x')).toEqual(['x a$b', 1])
    expect(gsub('a^b a$b', 'a$b', 'x')).toEqual(['a^b x', 1])
    expect(gsub('a-z', '[a%-z]', 'x')).toEqual(['xxx', 3])
    expect(gsub('m', '[a%-z]', 'x')).toEqual(['m', 0])
    expect(gsub('A1-', '[^%A]', 'x')).toEqual(['x1-', 1])
    expect(gsub('!5a', '[%w%D]', 'x')).toEqual(['xxx', 3])
    expect(gsub('z-', '[z-%a]', 'x')).toEqual(['xx', 2])
  })

  it('throws for invalid Lua capture references in replacement strings', () => {
    expect(() => gsub('abc', '(a)', '%2')).toThrow('invalid capture index %2')
    expect(() => gsub('abc', '[]', 'x')).toThrow('malformed Lua pattern')
  })

  it('classifies Lua numbers as integer or float', () => {
    expect(luaType(1)).toBe('integer')
    expect(luaType(1.5)).toBe('float')
    expect(luaType(9007199254740992)).toBe('integer')
    expect(luaType(1e20)).toBe('float')
    expect(luaType('1')).toBeNull()
  })

  it('trims PowerShell prefix and suffix character sets', () => {
    expect(trimstart('__hello__', '_')).toBe('hello__')
    expect(trimend('__hello__', '_')).toBe('__hello')
    expect(trimstart('  hello', undefined)).toBe('hello')
    expect(trimend('hello  ', undefined)).toBe('hello')
  })

  it('supports Elixir zip for two lists and list-of-lists input', () => {
    expect(zip([1, 2], ['a', 'b'])).toEqual([
      [1, 'a'],
      [2, 'b'],
    ])
    expect(
      zip([
        [1, 2],
        ['a', 'b'],
        [true, false],
      ]),
    ).toEqual([
      [1, 'a', true],
      [2, 'b', false],
    ])
  })

  it('interposes separators without mutating the value order', () => {
    expect(interpose('-', ['a', 'b', 'c'])).toEqual(['a', '-', 'b', '-', 'c'])
    expect(interpose(0, [1, 2, 3])).toEqual([1, 0, 2, 0, 3])
  })

  it('treats Elixir string replacements literally for plain string patterns', () => {
    expect(replace('aba', 'a', '$&$&')).toBe('$&$&b$&$&')
    expect(replace('aba', 'a', '$1')).toBe('$1b$1')
    expect(replace('abc', '', 'x')).toBe('xaxbxcx')
    expect(replace('', '', 'x')).toBe('x')
  })

  it('rejects isqrt string inputs whose roots exceed JS safe integers', () => {
    const beyondSafeRoot = (BigInt(Number.MAX_SAFE_INTEGER) + 1n) ** 2n
    expect(() => isqrt(beyondSafeRoot.toString())).toThrow(RangeError)
  })

  it('accepts large isqrt inputs whose floored root is still safe', () => {
    const maxSafe = BigInt(Number.MAX_SAFE_INTEGER)
    const justBelowNextSquare = (maxSafe + 1n) ** 2n - 1n
    expect(isqrt(justBelowNextSquare.toString())).toBe(Number.MAX_SAFE_INTEGER)
  })

  it('normalizes Lua quoted strings with embedded newlines back into JSON', () => {
    expect(normalizeLuaOutput('["line1\\\nline2",1]', JSON.stringify(['line1\nline2', 1]))).toBe(
      JSON.stringify(['line1\nline2', 1]),
    )
  })

  it('normalizes Lua numeric scalar precision drift against expected JSON numbers', () => {
    expect(normalizeLuaOutput('0.54030230586814', '0.5403023058681398')).toBe('0.5403023058681398')
    expect(normalizeLuaOutput('1.4142135623731', '1.4142135623730951')).toBe('1.4142135623730951')
  })

  it('normalizes Lua numeric precision drift inside JSON arrays', () => {
    expect(normalizeLuaOutput('[0.8414709848079,1.4142135623731]', '[0.8414709848078965,1.4142135623730951]')).toBe(
      '[0.8414709848078965,1.4142135623730951]',
    )
  })
})
