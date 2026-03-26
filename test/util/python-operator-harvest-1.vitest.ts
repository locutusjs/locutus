import { describe, expect, it } from 'vitest'

import { and_ } from '../../src/python/operator/and_.ts'
import { contains } from '../../src/python/operator/contains.ts'
import { countOf } from '../../src/python/operator/countOf.ts'
import { eq } from '../../src/python/operator/eq.ts'
import { floordiv } from '../../src/python/operator/floordiv.ts'
import { ge } from '../../src/python/operator/ge.ts'
import { getitem } from '../../src/python/operator/getitem.ts'
import { gt } from '../../src/python/operator/gt.ts'
import { inv } from '../../src/python/operator/inv.ts'
import { is_ } from '../../src/python/operator/is_.ts'
import { le } from '../../src/python/operator/le.ts'
import { lshift } from '../../src/python/operator/lshift.ts'
import { lt } from '../../src/python/operator/lt.ts'
import { mod } from '../../src/python/operator/mod.ts'
import { mul } from '../../src/python/operator/mul.ts'
import { not_ } from '../../src/python/operator/not_.ts'
import { or_ } from '../../src/python/operator/or_.ts'
import { pow } from '../../src/python/operator/pow.ts'
import { rshift } from '../../src/python/operator/rshift.ts'
import { truediv } from '../../src/python/operator/truediv.ts'
import { truth } from '../../src/python/operator/truth.ts'
import { xor } from '../../src/python/operator/xor.ts'

describe('python operator harvest 1', () => {
  it('matches Python floor division and modulo semantics', () => {
    expect(floordiv(-7, 3)).toBe(-3)
    expect(mod(-7, 3)).toBe(2)
    expect(mod(7, -3)).toBe(-2)
  })

  it('supports Python truthiness and identity-oriented helpers', () => {
    expect(truth({})).toBe(false)
    expect(truth({ a: 1 })).toBe(true)
    expect(truth(NaN)).toBe(true)
    expect(not_(NaN)).toBe(false)
    expect(is_([], [])).toBe(false)
  })

  it('supports membership, indexing, and repetition helpers', () => {
    expect(contains({ a: 1, b: 2 }, 'b')).toBe(true)
    expect(countOf('banana', 'a')).toBe(3)
    expect(getitem(['a', 'b', 'c'], -1)).toBe('c')
    expect(getitem('abc', -2)).toBe('b')
    expect(mul('ha', 3)).toBe('hahaha')
    expect(mul([1, 2], 2)).toEqual([1, 2, 1, 2])
  })

  it('preserves Python-style equality and bitwise behavior for plain values', () => {
    expect(eq([1, true], [1, 1])).toBe(true)
    expect(and_(true, false)).toBe(false)
    expect(or_(true, false)).toBe(true)
    expect(xor(true, false)).toBe(true)
    expect(inv(true)).toBe(-2)
  })

  it('raises Python-style errors for zero division and negative shifts', () => {
    expect(() => truediv(1, 0)).toThrow()
    expect(() => floordiv(1, 0)).toThrow()
    expect(() => mod(1, 0)).toThrow()
    expect(() => pow(0, -1)).toThrow()
    expect(() => lshift(1, -1)).toThrow()
    expect(() => rshift(8, -1)).toThrow()
  })

  it('handles NaN ordering, bigint equality, and Python string operand rules', () => {
    expect(gt(NaN, 1)).toBe(false)
    expect(ge(NaN, 1)).toBe(false)
    expect(lt(NaN, 1)).toBe(false)
    expect(le(NaN, 1)).toBe(false)
    expect(eq(9007199254740992n, 9007199254740993n)).toBe(false)
    expect(() => contains('123', 1)).toThrow()
    expect(() => countOf('123', 1)).toThrow()
  })

  it('uses Python-style truthiness for sets, maps, and ordinary objects', () => {
    expect(truth(new Set())).toBe(false)
    expect(truth(new Set([1]))).toBe(true)
    expect(truth(new Map())).toBe(false)
    expect(truth(new Map([['k', 'v']]))).toBe(true)
    expect(truth(new Date(0))).toBe(true)
  })
})
