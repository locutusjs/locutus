import { describe, expect, it } from 'vitest'
import { max } from '../../src/php/math/max.ts'
import { min } from '../../src/php/math/min.ts'

describe('php/math min/max string regression', () => {
  it('matches PHP ordering for string-only collections', () => {
    expect(max({ 2: 'two', 1: 'one', 3: 'three', 5: 'five', 4: 'four' })).toBe('two')
    expect(min({ 2: 'two', 1: 'one', 3: 'three', 5: 'five', 4: 'four' })).toBe('five')
  })

  it('matches PHP ordering for string variadics', () => {
    expect(max('one', 'two')).toBe('two')
    expect(min('one', 'two')).toBe('one')
  })

  it('does not mutate array input while computing the result', () => {
    const maxInput = ['b', 'aa']
    const minInput = ['b', 'aa']

    expect(max(maxInput)).toBe('b')
    expect(min(minInput)).toBe('aa')
    expect(maxInput).toEqual(['b', 'aa'])
    expect(minInput).toEqual(['b', 'aa'])
  })
})
