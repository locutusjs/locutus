import { describe, expect, it } from 'vitest'

import { fmean } from '../../src/python/statistics/fmean.ts'
import { mean } from '../../src/python/statistics/mean.ts'
import { median } from '../../src/python/statistics/median.ts'
import { median_high } from '../../src/python/statistics/median_high.ts'
import { median_low } from '../../src/python/statistics/median_low.ts'
import { mode } from '../../src/python/statistics/mode.ts'
import { multimode } from '../../src/python/statistics/multimode.ts'
import { pstdev } from '../../src/python/statistics/pstdev.ts'
import { pvariance } from '../../src/python/statistics/pvariance.ts'
import { stdev } from '../../src/python/statistics/stdev.ts'
import { variance } from '../../src/python/statistics/variance.ts'

describe('python statistics harvest 1', () => {
  it('preserves Python integer exactness where applicable', () => {
    expect(mean([1, 2, 3])).toBe(2)
    expect(variance([1, 2, 3])).toBe(1)
    expect(pvariance([1])).toBe(0)
  })

  it('keeps float-only APIs floaty and supports optional precomputed centers', () => {
    expect(fmean([1, 2, 3])).toBe(2)
    expect(fmean([3.5, 4, 5.25], [2, 3, 5])).toBe(4.525)
    expect(stdev([1, 2, 3], 2)).toBe(1)
    expect(pstdev([1, 2, 3], 2)).toBeCloseTo(0.816496580927726)
  })

  it('matches Python median family semantics for numeric and string data', () => {
    expect(median([1, 2, 3, 4])).toBe(2.5)
    expect(median(['b', 'a', 'c'])).toBe('b')
    expect(median_low(['d', 'c', 'b', 'a'])).toBe('b')
    expect(median_high(['d', 'c', 'b', 'a'])).toBe('c')
    expect(() => median(['a', 'b', 'c', 'd'])).toThrow(TypeError)
  })

  it('uses first-seen ordering for mode and multimode', () => {
    expect(mode([1, 1, 2, 2, 3])).toBe(1)
    expect(multimode([1, 1, 2, 2, 3])).toEqual([1, 2])
    expect(multimode(['a', 'b', 'a', 'b'])).toEqual(['a', 'b'])
  })

  it('raises Python-style empty-data errors', () => {
    expect(() => mean([])).toThrow('mean requires at least one data point')
    expect(() => fmean([])).toThrow('fmean requires at least one data point')
    expect(() => mode([])).toThrow('no mode for empty data')
    expect(multimode([])).toEqual([])
    expect(() => variance([1])).toThrow('variance requires at least two data points')
  })
})
