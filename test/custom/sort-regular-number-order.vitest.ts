import { describe, expect, it } from 'vitest'
import { arsort } from '../../src/php/array/arsort.ts'
import { asort } from '../../src/php/array/asort.ts'
import { rsort } from '../../src/php/array/rsort.ts'
import { sort } from '../../src/php/array/sort.ts'

describe('SORT_REGULAR numeric ordering', () => {
  it('keeps numeric comparison semantics for numeric values', () => {
    const sortInput: Record<string, number> = { 0: 10, 1: 2 }
    const rsortInput: Record<string, number> = { 0: 10, 1: 2 }
    const asortInput: Record<string, number> = { a: 10, b: 2 }
    const arsortInput: Record<string, number> = { a: 10, b: 2 }

    sort(sortInput, 'SORT_REGULAR')
    rsort(rsortInput, 'SORT_REGULAR')
    asort(asortInput, 'SORT_REGULAR')
    arsort(arsortInput, 'SORT_REGULAR')

    expect(Object.values(sortInput)).toEqual([2, 10])
    expect(Object.values(rsortInput)).toEqual([10, 2])
    expect(Object.entries(asortInput)).toEqual([
      ['b', 2],
      ['a', 10],
    ])
    expect(Object.entries(arsortInput)).toEqual([
      ['a', 10],
      ['b', 2],
    ])
  })
})
