import { describe, expect, it } from 'vitest'

import { accumulate } from '../../src/python/itertools/accumulate.ts'
import { batched } from '../../src/python/itertools/batched.ts'
import { chain } from '../../src/python/itertools/chain.ts'
import { compress } from '../../src/python/itertools/compress.ts'
import { islice } from '../../src/python/itertools/islice.ts'
import { product } from '../../src/python/itertools/product.ts'
import { zip_longest } from '../../src/python/itertools/zip_longest.ts'

describe('python itertools harvest 1', () => {
  it('supports default accumulate semantics for scalars and strings', () => {
    expect(accumulate([1, 2, 3, 4])).toEqual([1, 3, 6, 10])
    expect(accumulate(['a', 'b', 'c'])).toEqual(['a', 'ab', 'abc'])
  })

  it('supports shared plain-value iterator helpers', () => {
    expect(chain([1, 2], 'ab', new Set([3, 4]))).toEqual([1, 2, 'a', 'b', 3, 4])
    expect(compress(['A', 'B', 'C', 'D'], [1, 0, true, null])).toEqual(['A', 'C'])
    expect(islice([0, 1, 2, 3, 4, 5], 1, 6, 2)).toEqual([1, 3, 5])
  })

  it('supports zip_longest fill values and product repeat', () => {
    expect(zip_longest([1, 2, 3], ['A', 'B'])).toEqual([
      [1, 'A'],
      [2, 'B'],
      [3, null],
    ])
    expect(zip_longest([1], [2, 3], { fillvalue: 'x' })).toEqual([
      [1, 2],
      ['x', 3],
    ])
    expect(product([1, 2], { repeat: 2 })).toEqual([
      [1, 1],
      [1, 2],
      [2, 1],
      [2, 2],
    ])
  })

  it('rejects invalid batch and slice sizes', () => {
    expect(() => batched([1, 2, 3], 0)).toThrow('n must be at least one')
    expect(() => islice([1, 2, 3], 0, 3, 0)).toThrow('step for islice() must be a positive integer or None')
  })
})
