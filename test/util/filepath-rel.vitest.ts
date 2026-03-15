import { describe, expect, it } from 'vitest'

import { Rel } from '../../src/golang/filepath/Rel.ts'

describe('Rel edge cases', () => {
  it('preserves Go lexical behavior for empty and cleaned inputs', () => {
    expect(Rel('', 'a')).toBe('a')
    expect(Rel('a', '')).toBe('..')
    expect(Rel('a//b', 'a/b/c')).toBe('c')
    expect(Rel('../a', '../a/b')).toBe('b')
  })

  it('throws when rootedness does not match', () => {
    expect(() => Rel('/a', 'b')).toThrow(`Rel(): can't make b relative to /a`)
    expect(() => Rel('a', '/b')).toThrow(`Rel(): can't make /b relative to a`)
  })

  it('throws when unresolved parent segments remain in the unmatched base path', () => {
    expect(() => Rel('../a', 'b')).toThrow(`Rel(): can't make b relative to ../a`)
    expect(() => Rel('a/../../b', 'b/c')).toThrow(`Rel(): can't make b/c relative to a/../../b`)
  })
})
