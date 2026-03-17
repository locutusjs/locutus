import { mkdirSync, mkdtempSync, rmSync, writeFileSync } from 'node:fs'
import { tmpdir } from 'node:os'
import { join } from 'node:path'

import { describe, expect, it } from 'vitest'
import { canEnumerateUpstreamSurfaceLanguage } from '../../scripts/upstream-surface-enumeration.ts'
import { cHandler } from '../parity/lib/languages/c.ts'
import { findFunctionSources } from '../parity/lib/parser.ts'
import type { FunctionInfo, LanguageHandler, UpstreamSurfaceSnapshot } from '../parity/lib/types.ts'
import {
  buildUpstreamSurfaceSiteData,
  compareUpstreamSurface,
  findUpstreamSurfaceScopeCoverageIssues,
  findUpstreamSurfaceInventoryCoverageIssues,
  formatUpstreamSurfaceScopeIssues,
  resolveUpstreamSurfaceLanguages,
} from '../parity/lib/upstream-surface.ts'
import { loadUpstreamSurfaceInventory } from '../parity/lib/upstream-surface-inventory.ts'
import { loadUpstreamSurfaceScope } from '../parity/lib/upstream-surface-scope.ts'
import { loadUpstreamSurfaceSnapshot } from '../parity/lib/upstream-surface-snapshots.ts'

function makeFunction(path: string, name: string): FunctionInfo {
  return {
    path,
    language: 'php',
    category: 'array',
    name,
    examples: [],
    dependsOn: [],
    verified: ['PHP 8.3'],
    isImpossible: false,
  }
}

const snapshot: UpstreamSurfaceSnapshot = {
  language: 'php',
  namespaces: [
    {
      namespace: '__global',
      title: 'Global functions',
      target: 'PHP 8.3',
      sourceKind: 'runtime',
      sourceRef: 'php:8.3-cli',
      entries: ['array_values', 'sort'],
    },
  ],
}

const handler: LanguageHandler = {
  translate: () => '',
  normalize: (output) => output,
  skipList: new Set(),
  dockerImage: 'php:8.3-cli',
  displayName: 'PHP',
  version: '8.3',
  get parityValue() {
    return 'PHP 8.3'
  },
  dockerCmd: () => ['php', '-r', ''],
  upstreamSurface: {
    discover: async () => snapshot,
    getLocutusEntry: (func) => ({ namespace: '__global', name: func.name }),
  },
}

describe('upstream surface inventory', () => {
  it('allows classified Locutus extras and reports wanted and skipped upstream entries', () => {
    const result = compareUpstreamSurface(
      [
        makeFunction('php/array/array_values', 'array_values'),
        makeFunction('php/strings/money_format', 'money_format'),
      ],
      handler,
      snapshot,
      {
        namespaces: {
          __global: {
            decisions: {
              money_format: {
                decision: 'keep_legacy',
                note: 'removed upstream but intentionally retained',
              },
              sort: {
                decision: 'wanted',
                note: 'useful array helper',
              },
            },
          },
        },
      },
    )

    expect(result.namespaces).toHaveLength(1)
    expect(result.namespaces[0]?.keptExtras).toEqual([
      {
        name: 'money_format',
        decision: 'keep_legacy',
        note: 'removed upstream but intentionally retained',
      },
    ])
    expect(result.namespaces[0]?.unexpectedExtras).toEqual([])
    expect(result.namespaces[0]?.wantedEntries).toEqual([
      {
        name: 'sort',
        decision: 'wanted',
        note: 'useful array helper',
      },
    ])
    expect(result.namespaces[0]?.skippedEntries).toEqual([])
    expect(result.namespaces[0]?.untriagedEntries).toEqual([])
  })

  it('applies namespace rules and defaults before leaving upstream entries untriaged', () => {
    const result = compareUpstreamSurface(
      [makeFunction('php/array/array_values', 'array_values')],
      handler,
      {
        language: 'php',
        namespaces: [
          {
            namespace: '__global',
            title: 'Global functions',
            target: 'PHP 8.3',
            sourceKind: 'runtime',
            sourceRef: 'php:8.3-cli',
            entries: ['array_chunk', 'curl_exec', 'sort'],
          },
        ],
      },
      {
        namespaces: {
          __global: {
            default: {
              decision: 'skip_runtime_model',
              note: 'broad PHP runtime helper default',
            },
            rules: [
              {
                match: 'array_*',
                decision: 'wanted',
                note: 'array helpers stay on the shortlist',
              },
              {
                match: 'curl_*',
                decision: 'skip_environment',
                note: 'network-bound runtime helpers are out of scope',
              },
            ],
          },
        },
      },
    )

    expect(result.namespaces[0]?.wantedEntries).toEqual([
      {
        name: 'array_chunk',
        decision: 'wanted',
        note: 'array helpers stay on the shortlist',
      },
    ])
    expect(result.namespaces[0]?.skippedEntries).toEqual([
      {
        name: 'curl_exec',
        decision: 'skip_environment',
        note: 'network-bound runtime helpers are out of scope',
      },
      {
        name: 'sort',
        decision: 'skip_runtime_model',
        note: 'broad PHP runtime helper default',
      },
    ])
    expect(result.namespaces[0]?.untriagedEntries).toEqual([])
  })

  it('lets explicit decisions override broader namespace rules', () => {
    const result = compareUpstreamSurface(
      [makeFunction('php/array/array_values', 'array_values')],
      handler,
      {
        language: 'php',
        namespaces: [
          {
            namespace: '__global',
            title: 'Global functions',
            target: 'PHP 8.3',
            sourceKind: 'runtime',
            sourceRef: 'php:8.3-cli',
            entries: ['array_is_list'],
          },
        ],
      },
      {
        namespaces: {
          __global: {
            default: {
              decision: 'skip_runtime_model',
              note: 'broad default',
            },
            rules: [
              {
                match: 'array_*',
                decision: 'wanted',
                note: 'array helpers stay on the shortlist',
              },
            ],
            decisions: {
              array_is_list: {
                decision: 'skip_low_value',
                note: 'explicit exact override wins over wildcard',
              },
            },
          },
        },
      },
    )

    expect(result.namespaces[0]?.wantedEntries).toEqual([])
    expect(result.namespaces[0]?.skippedEntries).toEqual([
      {
        name: 'array_is_list',
        decision: 'skip_low_value',
        note: 'explicit exact override wins over wildcard',
      },
    ])
  })

  it('fails unclassified Locutus extras and reports untriaged upstream entries', () => {
    const result = compareUpstreamSurface(
      [
        makeFunction('php/array/array_values', 'array_values'),
        makeFunction('php/misc/create_function', 'create_function'),
      ],
      handler,
      snapshot,
      {},
    )

    expect(result.namespaces[0]?.unexpectedExtras).toEqual(['create_function'])
    expect(result.namespaces[0]?.untriagedEntries).toEqual(['sort'])
  })

  it('rejects mistyped or unsupported requested languages instead of silently ignoring them', () => {
    const resolution = resolveUpstreamSurfaceLanguages(
      ['php', 'phpp', 'python'],
      ['php', 'python'],
      (language) => language === 'php',
    )

    expect(resolution.selected).toEqual(['php'])
    expect(resolution.unknown).toEqual(['phpp'])
    expect(resolution.unavailable).toEqual(['python'])
  })

  it('treats manual snapshots as enumerable even when they are not live-discoverable', () => {
    expect(canEnumerateUpstreamSurfaceLanguage('swift', 'all', process.cwd())).toBe(true)
    expect(canEnumerateUpstreamSurfaceLanguage('swift', 'discoverable', process.cwd())).toBe(false)
    expect(canEnumerateUpstreamSurfaceLanguage('php', 'all', process.cwd())).toBe(true)
  })

  it('includes source functions even when they do not define examples', () => {
    const root = mkdtempSync(join(tmpdir(), 'locutus-upstream-surface-'))
    const srcDir = join(root, 'src')
    const categoryDir = join(srcDir, 'php', 'array')

    mkdirSync(categoryDir, { recursive: true })
    writeFileSync(
      join(categoryDir, 'array_values.ts'),
      'export function array_values(input: unknown) { return input }\n',
      'utf8',
    )

    try {
      const functions = findFunctionSources(srcDir, 'php')

      expect(functions.map((func) => func.path)).toEqual(['php/array/array_values'])
    } finally {
      rmSync(root, { recursive: true, force: true })
    }
  })

  it('loads the shared upstream surface inventory', () => {
    const loaded = loadUpstreamSurfaceInventory(join(process.cwd(), 'docs/upstream-surface-inventory.yml'))

    expect(loaded.php?.namespaces?.__global?.decisions?.money_format?.decision).toBe('keep_legacy')
    expect(loaded.php?.namespaces?.__global?.decisions?.array_is_list).toBeUndefined()
    expect(loaded.php?.namespaces?.__global?.default?.decision).toBe('skip_runtime_model')
    expect(loaded.php?.namespaces?.__global?.rules?.[0]?.match).toBe('curl_*')
    expect(loaded.python?.namespaces?.difflib?.default?.decision).toBe('wanted')
    expect(loaded.python?.namespaces?.difflib?.decisions?.diff_bytes?.decision).toBe('skip_plain_value_mismatch')
    expect(loaded.golang?.namespaces?.filepath?.default?.decision).toBe('wanted')
  })

  it('loads the shared upstream surface scope manifest', () => {
    const loaded = loadUpstreamSurfaceScope(join(process.cwd(), 'docs/upstream-surface-scope.yml'))

    expect(loaded.php?.namespaces?.__global?.sourceKind).toBe('runtime')
    expect(loaded.python?.namespaces?.math?.sourceRef).toBe('python:3.12')
    expect(loaded.swift?.namespaces?.String?.sourceKind).toBe('manual')
  })

  it('rejects unknown keys in namespace sections', () => {
    const root = mkdtempSync(join(tmpdir(), 'locutus-upstream-surface-policy-'))
    const inventoryPath = join(root, 'upstream-surface-inventory.yml')

    writeFileSync(
      inventoryPath,
      [
        'php:',
        '  namespaces:',
        '    __global:',
        '      decsions:',
        '        array_is_list:',
        '          decision: wanted',
        '          note: typo should fail',
        '',
      ].join('\n'),
      'utf8',
    )

    try {
      expect(() => loadUpstreamSurfaceInventory(inventoryPath)).toThrow(/unrecognized key/i)
    } finally {
      rmSync(root, { recursive: true, force: true })
    }
  })

  it('treats empty decisions sections as empty maps instead of failing', () => {
    const root = mkdtempSync(join(tmpdir(), 'locutus-upstream-surface-policy-'))
    const inventoryPath = join(root, 'upstream-surface-inventory.yml')

    writeFileSync(inventoryPath, ['php:', '  namespaces:', '    __global:', '      decisions:', ''].join('\n'), 'utf8')

    try {
      expect(loadUpstreamSurfaceInventory(inventoryPath)).toEqual({
        php: {
          namespaces: {
            __global: {},
          },
        },
      })
    } finally {
      rmSync(root, { recursive: true, force: true })
    }
  })

  it('reports stale decisions that no longer match either shipped or upstream entries', () => {
    const result = compareUpstreamSurface(
      [
        makeFunction('php/array/array_values', 'array_values'),
        makeFunction('php/strings/money_format', 'money_format'),
      ],
      handler,
      snapshot,
      {
        namespaces: {
          __global: {
            decisions: {
              money_format: {
                decision: 'keep_legacy',
                note: 'removed upstream but intentionally retained',
              },
              create_function: {
                decision: 'keep_legacy',
                note: 'stale extra should be reported',
              },
              sort: {
                decision: 'wanted',
                note: 'useful array helper',
              },
              array_is_list: {
                decision: 'wanted',
                note: 'stale todo should be reported',
              },
            },
          },
        },
      },
    )

    expect(result.namespaces[0]?.staleDecisions).toEqual([
      {
        name: 'array_is_list',
        decision: 'wanted',
        note: 'stale todo should be reported',
      },
      {
        name: 'create_function',
        decision: 'keep_legacy',
        note: 'stale extra should be reported',
      },
    ])
  })

  it('flags missing, unexpected, and mismatched namespaces against the canonical scope', () => {
    const issues = findUpstreamSurfaceScopeCoverageIssues(
      new Map([
        [
          'python',
          {
            language: 'python',
            namespaces: [
              {
                namespace: 'math',
                title: 'math',
                target: 'Python 3.12',
                sourceKind: 'runtime',
                sourceRef: 'python:3.12',
                entries: ['sin'],
              },
              {
                namespace: 'random',
                title: 'random',
                target: 'Python 3.12',
                sourceKind: 'runtime',
                sourceRef: 'python:3.12',
                entries: ['random'],
              },
            ],
          },
        ],
      ]),
      {
        python: {
          namespaces: {
            math: {
              sourceKind: 'runtime',
              sourceRef: 'python:3.12',
            },
            statistics: {
              sourceKind: 'runtime',
              sourceRef: 'python:3.12',
            },
            random: {
              sourceKind: 'source_manifest',
              sourceRef: 'cpython/v3.12.0',
            },
          },
        },
      },
    )

    expect(issues).toEqual([
      {
        language: 'python',
        missingLanguage: false,
        missingNamespaces: ['statistics'],
        unexpectedNamespaces: [],
        sourceMismatches: [
          {
            namespace: 'random',
            expectedSourceKind: 'source_manifest',
            actualSourceKind: 'runtime',
            expectedSourceRef: 'cpython/v3.12.0',
            actualSourceRef: 'python:3.12',
          },
        ],
      },
    ])
    expect(formatUpstreamSurfaceScopeIssues(issues)).toContain('missing namespace from snapshot: statistics')
  })

  it('reports stale wildcard rules and unused defaults when they never match any upstream entry', () => {
    const result = compareUpstreamSurface(
      [makeFunction('php/array/array_values', 'array_values')],
      handler,
      {
        language: 'php',
        namespaces: [
          {
            namespace: '__global',
            title: 'Global functions',
            target: 'PHP 8.3',
            sourceKind: 'runtime',
            sourceRef: 'php:8.3-cli',
            entries: ['array_chunk'],
          },
        ],
      },
      {
        namespaces: {
          __global: {
            default: {
              decision: 'skip_runtime_model',
              note: 'unused fallback should be reported',
            },
            rules: [
              {
                match: 'curl_*',
                decision: 'skip_environment',
                note: 'unused wildcard should be reported',
              },
              {
                match: 'array_*',
                decision: 'wanted',
                note: 'matched wildcard should not be reported',
              },
            ],
          },
        },
      },
    )

    expect(result.namespaces[0]?.staleDecisions).toEqual([
      {
        name: 'default',
        decision: 'skip_runtime_model',
        note: 'unused fallback should be reported',
      },
      {
        name: 'rule: curl_*',
        decision: 'skip_environment',
        note: 'unused wildcard should be reported',
      },
    ])
  })

  it('loads version-tagged upstream surface snapshots', () => {
    const loaded = loadUpstreamSurfaceSnapshot(join(process.cwd(), 'test/parity/fixtures/upstream-surface/php.yml'))

    expect(loaded.language).toBe('php')
    expect(loaded.namespaces[0]?.namespace).toBe('__global')
    expect(loaded.namespaces[0]?.sourceKind).toBe('runtime')
  })

  it('stores only parity-relevant Python upstream entries in the checked-in snapshot', () => {
    const snapshot = loadUpstreamSurfaceSnapshot(
      join(process.cwd(), 'test/parity/fixtures/upstream-surface/python.yml'),
    )
    const mathEntries = snapshot.namespaces.find((namespace) => namespace.namespace === 'math')?.entries ?? []
    const stringEntries = snapshot.namespaces.find((namespace) => namespace.namespace === 'string')?.entries ?? []
    const difflibEntries = snapshot.namespaces.find((namespace) => namespace.namespace === 'difflib')?.entries ?? []

    expect(mathEntries).toContain('ceil')
    expect(mathEntries).not.toContain('pi')
    expect(stringEntries).toContain('ascii_letters')
    expect(difflibEntries).toContain('get_close_matches')
    expect(difflibEntries).not.toContain('HtmlDiff')
  })

  it('stores only Ruby methods owned by the target namespace in the checked-in snapshot', () => {
    const snapshot = loadUpstreamSurfaceSnapshot(join(process.cwd(), 'test/parity/fixtures/upstream-surface/ruby.yml'))
    const arrayEntries = snapshot.namespaces.find((namespace) => namespace.namespace === 'Array')?.entries ?? []
    const stringEntries = snapshot.namespaces.find((namespace) => namespace.namespace === 'String')?.entries ?? []

    expect(arrayEntries).toContain('bsearch')
    expect(arrayEntries).toContain('group_by')
    expect(arrayEntries).not.toContain('class')
    expect(arrayEntries).not.toContain('dup')
    expect(stringEntries).toContain('downcase')
    expect(stringEntries).not.toContain('clone')
  })

  it('keeps C abs only in stdlib inventory', () => {
    const snapshot = loadUpstreamSurfaceSnapshot(join(process.cwd(), 'test/parity/fixtures/upstream-surface/c.yml'))
    const mathEntries = snapshot.namespaces.find((namespace) => namespace.namespace === 'math')?.entries ?? []
    const stdlibEntries = snapshot.namespaces.find((namespace) => namespace.namespace === 'stdlib')?.entries ?? []

    expect(mathEntries).not.toContain('abs')
    expect(stdlibEntries).toContain('abs')
  })

  it('maps C abs to stdlib for upstream-surface comparisons', () => {
    expect(
      cHandler.upstreamSurface?.getLocutusEntry?.({
        path: 'c/math/abs',
        language: 'c',
        category: 'math',
        name: 'abs',
      }),
    ).toEqual({
      namespace: 'stdlib',
      name: 'abs',
    })
  })

  it('respects keep decisions for Locutus-only namespaces with no upstream catalog', () => {
    const customHandler: LanguageHandler = {
      ...handler,
      upstreamSurface: {
        discover: async () => snapshot,
        getLocutusEntry: (func) => {
          if (func.name === 'custom_only') {
            return { namespace: 'custom', name: func.name }
          }
          return { namespace: '__global', name: func.name }
        },
      },
    }

    const result = compareUpstreamSurface(
      [makeFunction('php/array/array_values', 'array_values'), makeFunction('php/custom/custom_only', 'custom_only')],
      customHandler,
      snapshot,
      {
        namespaces: {
          custom: {
            title: 'Custom namespace',
            decisions: {
              custom_only: {
                decision: 'keep_locutus_only',
                note: 'intentionally retained without upstream equivalent',
              },
            },
          },
        },
      },
    )

    expect(result.namespaces[1]).toMatchObject({
      namespace: 'custom',
      keptExtras: [
        {
          name: 'custom_only',
          decision: 'keep_locutus_only',
          note: 'intentionally retained without upstream equivalent',
        },
      ],
      unexpectedExtras: [],
    })
  })

  it('flags missing language and namespace inventory coverage', () => {
    const issues = findUpstreamSurfaceInventoryCoverageIssues(
      new Map<string, UpstreamSurfaceSnapshot>([
        [
          'php',
          {
            language: 'php',
            namespaces: [
              {
                namespace: '__global',
                title: 'Global functions',
                target: 'PHP 8.3',
                sourceKind: 'runtime',
                sourceRef: 'php:8.3-cli',
                entries: ['array_values'],
              },
            ],
          },
        ],
        [
          'ruby',
          {
            language: 'ruby',
            namespaces: [
              {
                namespace: 'Array',
                title: 'Array instance methods',
                target: 'Ruby 3.4',
                sourceKind: 'runtime',
                sourceRef: 'ruby:3.4',
                entries: ['bsearch'],
              },
            ],
          },
        ],
      ]),
      {
        php: {
          namespaces: {
            __global: {},
          },
        },
      },
    )

    expect(issues).toEqual([
      {
        language: 'ruby',
        missingLanguage: true,
        missingNamespaces: ['Array'],
      },
    ])
  })

  it('builds website-facing summary data with counts and category mapping', () => {
    const result = compareUpstreamSurface(
      [
        makeFunction('php/array/array_values', 'array_values'),
        makeFunction('php/strings/money_format', 'money_format'),
      ],
      handler,
      snapshot,
      {
        namespaces: {
          __global: {
            decisions: {
              money_format: {
                decision: 'keep_legacy',
                note: 'removed upstream but intentionally retained',
              },
              sort: {
                decision: 'wanted',
                note: 'useful array helper',
              },
            },
          },
        },
      },
    )

    const siteData = buildUpstreamSurfaceSiteData({
      generatedAt: '2026-03-15T00:00:00.000Z',
      languages: [
        {
          language: 'php',
          functions: [
            makeFunction('php/array/array_values', 'array_values'),
            makeFunction('php/strings/money_format', 'money_format'),
          ],
          handler,
          inventory: {
            title: 'PHP',
            namespaces: {
              __global: {
                title: 'Global functions',
              },
            },
          },
          result,
        },
      ],
    })

    expect(siteData.generatedAt).toBe('2026-03-15T00:00:00.000Z')
    expect(siteData.languages.php?.title).toBe('PHP')
    expect(siteData.languages.php?.catalogCount).toBe(2)
    expect(siteData.languages.php?.catalogShippedCount).toBe(1)
    expect(siteData.languages.php?.wantedCount).toBe(1)
    expect(siteData.languages.php?.keptExtraCount).toBe(1)
    expect(siteData.languages.php?.namespaces[0]?.categories).toEqual(['array'])
    expect(siteData.languages.php?.namespaces[0]?.coveragePercent).toBe(50)
  })
})
