import { describe, expect, it } from 'vitest'

import { ndiff } from '../../src/python/difflib/ndiff.ts'

describe('python difflib ndiff edge cases', () => {
  it('emits intraline guidance for near matches', () => {
    expect(ndiff(['spam\n', 'ham\n', 'eggs\n'], ['spam\n', 'jam\n', 'eggs\n'])).toEqual([
      '  spam\n',
      '- ham\n',
      '? ^\n',
      '+ jam\n',
      '? ^\n',
      '  eggs\n',
    ])
  })

  it('preserves whitespace when rendering hint lines', () => {
    expect(ndiff(['\tabcDefghiJkl\n'], ['\tabcdefGhijkl\n'])).toEqual([
      '- \tabcDefghiJkl\n',
      '? \t   ^  ^  ^\n',
      '+ \tabcdefGhijkl\n',
      '? \t   ^  ^  ^\n',
    ])
  })

  it('supports disabling the default charjunk filter', () => {
    expect(ndiff(['a b'], ['ab'], null, null)).toEqual(['- a b', '?  -\n', '+ ab'])
  })

  it('keeps unique anchor lines stable when repeated noise lines trigger autojunk', () => {
    const left = new Array(150).fill('common\n').concat(['R1\n', 'R2\n'], new Array(50).fill('common\n'))
    const right = new Array(50).fill('common\n').concat(['R1\n', 'R2\n'], new Array(150).fill('common\n'))

    const delta = ndiff(left, right)

    expect(delta).toContain('  R1\n')
    expect(delta).toContain('  R2\n')
    expect(delta).not.toContain('+ R1\n')
    expect(delta).not.toContain('- R1\n')
  })

  it('rejects non-callable junk predicates', () => {
    expect(() => ndiff(['a'], ['b'], 1 as unknown as null)).toThrow("'int' object is not callable")
    expect(() => ndiff(['a'], ['b'], null, 1 as unknown as null)).toThrow("'int' object is not callable")
  })

  it('treats falsy non-callables as disabled junk filters', () => {
    expect(ndiff(['a'], ['b'], 0 as unknown as null)).toEqual(['- a', '+ b'])
    expect(ndiff(['a b'], ['ab'], null, [] as unknown as null)).toEqual(['- a b', '?  -\n', '+ ab'])
  })

  it('still rejects truthy non-callables like NaN wrappers and sets', () => {
    expect(() => ndiff(['a'], ['b'], Number.NaN as unknown as null)).toThrow("'int' object is not callable")
    expect(() => ndiff(['a'], ['b'], null, new Set([1]) as unknown as null)).toThrow("'int' object is not callable")
  })

  it('rejects non-string input sequences', () => {
    expect(() => ndiff(['ok'], [1] as unknown as string[])).toThrow(TypeError)
    expect(() => ndiff('abc' as unknown as string[], ['abc'])).toThrow(TypeError)
  })
})
