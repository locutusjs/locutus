import { describe, expect, it } from 'vitest'
import { array_values } from '../../src/php/array/array_values.ts'

describe('array_values reindexing', () => {
  it('reindexes sparse array inputs into a dense list', () => {
    const sparse: string[] = []
    sparse[1] = 'value'

    const result = array_values(sparse)

    expect(result).toEqual(['value'])
    expect(Object.keys(result)).toEqual(['0'])
  })
})
