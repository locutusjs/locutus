import { describe, expect, it } from 'vitest'
import {
  buildReverseDependencies,
  computeParitySelection,
  computeUpstreamSurfaceLanguages,
  SMOKE_PARITY_TARGETS,
} from '../../scripts/select-parity-targets.ts'
import type { FunctionInfo } from '../parity/lib/types.ts'

const functionInfos: FunctionInfo[] = [
  {
    path: 'php/array/array_flip',
    language: 'php',
    category: 'array',
    name: 'array_flip',
    examples: [],
    dependsOn: [],
    verified: ['PHP 8.3'],
    isImpossible: false,
  },
  {
    path: 'php/array/array_sum',
    language: 'php',
    category: 'array',
    name: 'array_sum',
    examples: [],
    dependsOn: [],
    verified: ['PHP 8.3'],
    isImpossible: false,
  },
  {
    path: 'golang/net/ParseIP',
    language: 'golang',
    category: 'net',
    name: 'ParseIP',
    examples: [],
    dependsOn: [],
    verified: ['Go 1.23'],
    isImpossible: false,
  },
]

describe('select-parity-targets', () => {
  it('selects a directly changed function and keeps smoke targets', () => {
    const reverseDependencies = buildReverseDependencies(
      new Map([
        ['php/array/array_flip', new Set()],
        ['php/array/array_sum', new Set()],
      ]),
    )

    const selection = computeParitySelection({
      changedFiles: ['src/php/array/array_flip.ts'],
      functionInfos,
      reverseDependencies,
    })

    expect(selection.mode).toBe('selective')
    expect(selection.selectedTargets).toEqual(['php/array/array_flip'])
    expect(selection.targets).toEqual(expect.arrayContaining([...SMOKE_PARITY_TARGETS, 'php/array/array_flip']))
    expect(selection.reasonsByTarget['php/array/array_flip']).toContain(
      'direct source change: src/php/array/array_flip.ts',
    )
  })

  it('selects reverse dependents when a helper changes', () => {
    const reverseDependencies = buildReverseDependencies(
      new Map([
        ['php/_helpers/_phpTypes', new Set()],
        ['php/array/array_flip', new Set(['php/_helpers/_phpTypes'])],
        ['php/array/array_sum', new Set(['php/_helpers/_phpTypes'])],
      ]),
    )

    const selection = computeParitySelection({
      changedFiles: ['src/php/_helpers/_phpTypes.ts'],
      functionInfos,
      reverseDependencies,
    })

    expect(selection.mode).toBe('selective')
    expect(selection.selectedTargets).toEqual(['php/array/array_flip', 'php/array/array_sum'])
    expect(selection.reasonsByTarget['php/array/array_flip']).toContain(
      'depends on changed source: src/php/_helpers/_phpTypes.ts',
    )
    expect(selection.reasonsByTarget['php/array/array_sum']).toContain(
      'depends on changed source: src/php/_helpers/_phpTypes.ts',
    )
  })

  it('forces full parity for parity core changes', () => {
    const selection = computeParitySelection({
      changedFiles: ['test/parity/lib/runner.ts'],
      functionInfos,
      reverseDependencies: new Map(),
    })

    expect(selection.mode).toBe('full')
    expect(selection.fullReasons).toContain('force-full path changed: test/parity/lib/runner.ts')
  })

  it('selects all functions for a language handler change', () => {
    const selection = computeParitySelection({
      changedFiles: ['test/parity/lib/languages/golang.ts'],
      functionInfos,
      reverseDependencies: new Map(),
    })

    expect(selection.mode).toBe('selective')
    expect(selection.selectedTargets).toEqual(['golang/net/ParseIP'])
    expect(selection.reasonsByTarget['golang/net/ParseIP']).toContain(
      'parity language handler changed: test/parity/lib/languages/golang.ts',
    )
  })

  it('falls back to smoke-only for website changes', () => {
    const selection = computeParitySelection({
      changedFiles: ['website/source/index.html', 'docs/prompts/selective-parity-ci-plan.md'],
      functionInfos,
      reverseDependencies: new Map(),
    })

    expect(selection.mode).toBe('selective')
    expect(selection.selectedTargets).toEqual([])
    expect(selection.targets).toEqual([...SMOKE_PARITY_TARGETS])
  })

  it('only requests upstream-surface checks for relevant PR changes', () => {
    expect(
      computeUpstreamSurfaceLanguages(['website/source/index.html', 'docs/prompts/selective-parity-ci-plan.md']),
    ).toEqual([])

    expect(computeUpstreamSurfaceLanguages(['src/php/array/array_flip.ts'])).toEqual(['php'])
    expect(computeUpstreamSurfaceLanguages(['test/parity/lib/upstream-surface.ts'])).toEqual([
      'awk',
      'c',
      'clojure',
      'elixir',
      'golang',
      'haskell',
      'julia',
      'kotlin',
      'lua',
      'perl',
      'php',
      'powershell',
      'python',
      'r',
      'rust',
      'ruby',
      'swift',
      'tcl',
    ])
    expect(computeUpstreamSurfaceLanguages(['docs/upstream-surface-inventory.yml'])).toEqual([
      'awk',
      'c',
      'clojure',
      'elixir',
      'golang',
      'haskell',
      'julia',
      'kotlin',
      'lua',
      'perl',
      'php',
      'powershell',
      'python',
      'r',
      'rust',
      'ruby',
      'swift',
      'tcl',
    ])
    expect(computeUpstreamSurfaceLanguages(['test/parity/fixtures/upstream-surface/php.yml'])).toEqual(['php'])
  })
})
