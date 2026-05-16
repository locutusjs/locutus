import { describe, expect, it } from 'vitest'

import { cor } from '../../src/r/stats/cor.ts'
import { cov } from '../../src/r/stats/cov.ts'
import { fivenum } from '../../src/r/stats/fivenum.ts'
import { mad } from '../../src/r/stats/mad.ts'
import { median } from '../../src/r/stats/median.ts'
import { quantile } from '../../src/r/stats/quantile.ts'
import { sd } from '../../src/r/stats/sd.ts'
import { variance } from '../../src/r/stats/variance.ts'
import { weighted_mean } from '../../src/r/stats/weighted_mean.ts'

describe('R stats harvest', () => {
  it('computes vector medians, quantiles, and five-number summaries', () => {
    expect(median([4, 1, 3, 2])).toBe(2.5)
    expect(quantile([1, 2, 3, 4])).toEqual([1, 1.75, 2.5, 3.25, 4])
    expect(quantile([1, 2, 3], [0.1, 0.9])).toEqual([1.2, 2.8])
    expect(fivenum([1, 2, 3, 4])).toEqual([1, 1.5, 2.5, 3.5, 4])
    expect(fivenum([1, 2, 3, 4, 5, 6])).toEqual([1, 2, 3.5, 5, 6])
  })

  it('computes spread and association statistics with R sample semantics', () => {
    expect(variance([1, 2, 3])).toBe(1)
    expect(variance([1, 2, 3, 4])).toBeCloseTo(1.6666666666666667)
    expect(sd([1, 2, 3, 4])).toBeCloseTo(1.2909944487358056)
    expect(cov([1, 2, 3], [1, 5, 7])).toBe(3)
    expect(cor([1, 2, 3], [1, 5, 7])).toBeCloseTo(0.9819805060619656)
    expect(cor([1, 2, 3], [7, 5, 3])).toBe(-1)
  })

  it('supports robust and weighted summaries', () => {
    expect(mad([1, 2, 3, 4])).toBeCloseTo(1.4826)
    expect(mad([1, 2, 4, 8], undefined, 1)).toBe(1.5)
    expect(mad([1, 2, 4, 8], undefined, 1, true)).toBe(1)
    expect(mad([1, 2, 4, 8], undefined, 1, false, true)).toBe(2)
    expect(weighted_mean([1, 2, 3])).toBe(2)
    expect(weighted_mean([1, 2, 3, 4], [1, 1, 1, 2])).toBe(2.8)
    expect(weighted_mean([1, 2, 3], [0, 0, 1])).toBe(3)
  })

  it('matches R-like degenerate outcomes for plain vectors', () => {
    expect(Number.isNaN(median([]))).toBe(true)
    expect(quantile([]).every(Number.isNaN)).toBe(true)
    expect(fivenum([]).every(Number.isNaN)).toBe(true)
    expect(Number.isNaN(variance([1]))).toBe(true)
    expect(Number.isNaN(sd([1]))).toBe(true)
    expect(Number.isNaN(cov([1], [2]))).toBe(true)
    expect(Number.isNaN(cor([1, 1, 1], [1, 2, 3]))).toBe(true)
    expect(Number.isNaN(weighted_mean([1, 2], [0, 0]))).toBe(true)
    expect(() => mad([1, 2, 4, 8], undefined, 1, true, true)).toThrow("mad() 'low' and 'high' cannot both be true")
    expect(() => weighted_mean([1, 2], [1])).toThrow("weighted_mean() 'x' and 'w' must have the same length")
  })
})
