import { describe, expect, it } from 'vitest'

import type { PhpFunctionValue } from '../../src/php/_helpers/_phpTypes.ts'
import { var_export } from '../../src/php/var/var_export.ts'

describe('php/var/var_export parity edge cases', () => {
  const closure: PhpFunctionValue = (...args) => Number(args[0] ?? 0) + Number(args[1] ?? 0)
  const php83ClosureExport = '\\Closure::__set_state(array(\n))'
  const php83NestedClosureExport = "array (\n  'fn' => \n  \\Closure::__set_state(array(\n  )),\n)"
  const php83NestedArrayExport = "array (\n  'test' => \n  array (\n    0 => 'a',\n    1 => 'b',\n  ),\n)"

  it('matches PHP 8.3 closure export output', () => {
    expect(var_export(closure, true)).toBe(php83ClosureExport)
  })

  it('matches PHP 8.3 nested closure formatting inside arrays', () => {
    expect(var_export({ fn: closure }, true)).toBe(php83NestedClosureExport)
  })

  it('matches PHP 8.3 nested array formatting inside arrays', () => {
    expect(var_export({ test: ['a', 'b'] }, true)).toBe(php83NestedArrayExport)
  })

  it('keeps function export stable when Locutus-only indentation is zero', () => {
    expect(var_export(closure, true, 0)).toBe(php83ClosureExport)
  })
})
