import { describe, expect, it } from 'vitest'

import { correlation } from '../../src/python/statistics/correlation.ts'
import { covariance } from '../../src/python/statistics/covariance.ts'
import { geometric_mean } from '../../src/python/statistics/geometric_mean.ts'
import { harmonic_mean } from '../../src/python/statistics/harmonic_mean.ts'
import { linear_regression } from '../../src/python/statistics/linear_regression.ts'
import { median_grouped } from '../../src/python/statistics/median_grouped.ts'
import { quantiles } from '../../src/python/statistics/quantiles.ts'

describe('python statistics harvest 2', () => {
  it('matches geometric and harmonic mean edge cases', () => {
    expect(geometric_mean([54, 24, 36])).toBeCloseTo(36.000000000000014)
    expect(harmonic_mean([40, 60])).toBeCloseTo(48)
    expect(harmonic_mean([40, 60], [5, 30])).toBe(56)
    expect(harmonic_mean([0, 10])).toBe(0)
    expect(() => geometric_mean([1, 0, 4])).toThrow(
      'geometric mean requires a non-empty dataset containing positive numbers',
    )
    expect(() => harmonic_mean([1, -2])).toThrow('harmonic mean does not support negative values')
  })

  it('supports grouped medians and both quantile interpolation modes', () => {
    expect(median_grouped([52, 52, 53, 54])).toBe(52.5)
    expect(median_grouped([52, 52, 53, 54], 2)).toBe(52)
    expect(quantiles([1, 2, 3, 4, 5])).toEqual([1.5, 3, 4.5])
    expect(quantiles([1, 2, 3, 4, 5], 4, 'inclusive')).toEqual([2, 3, 4])
    expect(quantiles([1, 2], 4)).toEqual([0.75, 1.5, 2.25])
  })

  it('computes covariance and correlation with linear and ranked modes', () => {
    expect(covariance([1, 2, 3], [1, 5, 7])).toBe(3)
    expect(correlation([1, 2, 3], [1, 5, 7])).toBeCloseTo(0.9819805060619656)
    expect(correlation([1, 2, 3], [7, 5, 3])).toBe(-1)
    expect(correlation([1, 2, 3], [3, 2, 1], 'ranked')).toBe(-1)
  })

  it('computes linear regression with and without a proportional intercept', () => {
    expect(linear_regression([1, 2, 3], [2, 4, 6])).toEqual({ slope: 2, intercept: 0 })
    expect(linear_regression([1, 2, 3], [1, 2, 2])).toEqual({ slope: 0.5, intercept: 0.6666666666666667 })
    expect(linear_regression([1, 2, 3], [2, 4, 6], true)).toEqual({ slope: 2, intercept: 0 })
    expect(linear_regression([true, false, true], [1, 2, 3])).toEqual({ slope: 0, intercept: 2 })
  })

  it('raises Python-style statistics errors for invalid shapes', () => {
    expect(() => quantiles([1], 4)).toThrow('must have at least two data points')
    expect(() => covariance([1], [2])).toThrow('covariance requires at least two data points')
    expect(() => correlation([1, 1, 1], [1, 2, 3])).toThrow('at least one of the inputs is constant')
    expect(() => correlation([1, 2], [1])).toThrow(
      'correlation requires that both inputs have same number of data points',
    )
    expect(() => linear_regression([1, 1, 1], [1, 2, 3])).toThrow('x is constant')
  })
})
