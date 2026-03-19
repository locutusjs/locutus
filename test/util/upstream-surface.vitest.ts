import { mkdirSync, mkdtempSync, rmSync, writeFileSync } from 'node:fs'
import { tmpdir } from 'node:os'
import { join } from 'node:path'

import { describe, expect, it, vi } from 'vitest'
import { canEnumerateUpstreamSurfaceLanguage } from '../../scripts/upstream-surface-enumeration.ts'
import { cHandler } from '../parity/lib/languages/c.ts'
import {
  getLanguageHandler,
  getParitySupportedLanguages,
  getSupportedLanguages,
  isLanguageSupported,
} from '../parity/lib/languages/index.ts'
import { findFunctionSources } from '../parity/lib/parser.ts'
import type { FunctionInfo, LanguageHandler, UpstreamSurfaceSnapshot } from '../parity/lib/types.ts'
import {
  buildUpstreamSurfaceSiteData,
  compareUpstreamSurface,
  evaluateRepoUpstreamSurface,
  findUpstreamSurfaceInventoryCoverageIssues,
  findUpstreamSurfaceNamespaceCatalogIssues,
  findUpstreamSurfaceScopeCoverageIssues,
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

  it('allows missing namespace inventory entries when the language defines a default namespace policy', () => {
    const issues = findUpstreamSurfaceInventoryCoverageIssues(
      new Map([
        [
          'python',
          {
            language: 'python',
            namespaces: [
              {
                namespace: 'datetime',
                title: 'datetime module',
                target: 'Python 3.12',
                sourceKind: 'runtime',
                sourceRef: 'python:3.12',
                entries: ['date', 'datetime', 'time', 'timedelta'],
              },
            ],
          },
        ],
      ]),
      {
        python: {
          defaultNamespace: {
            default: {
              decision: 'skip_runtime_model',
              note: 'new stdlib namespaces default conservative until explicitly triaged',
            },
          },
        },
      },
    )

    expect(issues).toEqual([])
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

  it('reports missing namespaces from canonical namespace discovery separately from per-namespace snapshots', () => {
    const issues = findUpstreamSurfaceNamespaceCatalogIssues(
      new Map([
        [
          'python',
          {
            target: 'Python 3.12',
            sourceKind: 'runtime',
            sourceRef: 'python:3.12:pkgutil-stdlib-modules',
            namespaces: ['builtins', 'datetime', 'math', 'urllib'],
          },
        ],
      ]),
      {
        python: {
          namespaceCatalog: {
            target: 'Python 3.12',
            sourceKind: 'runtime',
            sourceRef: 'python:3.12:sys.stdlib_module_names',
          },
          namespaces: {
            builtins: {
              target: 'Python 3.12',
              sourceKind: 'runtime',
              sourceRef: 'python:3.12',
            },
            math: {
              target: 'Python 3.12',
              sourceKind: 'runtime',
              sourceRef: 'python:3.12',
            },
            'urllib.parse': {
              catalogNamespace: 'urllib',
              target: 'Python 3.12',
              sourceKind: 'runtime',
              sourceRef: 'python:3.12',
            },
            random: {
              target: 'Python 3.12',
              sourceKind: 'runtime',
              sourceRef: 'python:3.12',
            },
          },
        },
      },
    )

    expect(issues).toEqual([
      {
        language: 'python',
        missingLanguageCatalog: false,
        missingNamespaces: ['datetime'],
        unexpectedNamespaces: ['random'],
        sourceRefMismatch: {
          expected: 'python:3.12:sys.stdlib_module_names',
          actual: 'python:3.12:pkgutil-stdlib-modules',
        },
      },
    ])
  })

  it('does not let discovered parent namespaces hide missing scoped child namespaces without explicit catalogNamespace mapping', () => {
    const issues = findUpstreamSurfaceNamespaceCatalogIssues(
      new Map([
        [
          'python',
          {
            target: 'Python 3.12',
            sourceKind: 'runtime',
            sourceRef: 'python:3.12:pkgutil-stdlib-modules',
            namespaces: ['urllib'],
          },
        ],
      ]),
      {
        python: {
          namespaceCatalog: {
            target: 'Python 3.12',
            sourceKind: 'runtime',
            sourceRef: 'python:3.12:pkgutil-stdlib-modules',
          },
          namespaces: {
            'urllib.parse': {
              target: 'Python 3.12',
              sourceKind: 'runtime',
              sourceRef: 'python:3.12',
            },
          },
        },
      },
    )

    expect(issues).toEqual([
      {
        language: 'python',
        missingLanguageCatalog: false,
        missingNamespaces: ['urllib'],
        unexpectedNamespaces: ['urllib.parse'],
      },
    ])
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

  it('treats canonical source-backed languages as live-discoverable even without parity execution', () => {
    expect(canEnumerateUpstreamSurfaceLanguage('swift', 'all', process.cwd())).toBe(true)
    expect(canEnumerateUpstreamSurfaceLanguage('swift', 'discoverable', process.cwd())).toBe(true)
    expect(canEnumerateUpstreamSurfaceLanguage('php', 'all', process.cwd())).toBe(true)
  })

  it('audits canonical namespace scope after enumeration writes discovered snapshots', async () => {
    const root = mkdtempSync(join(tmpdir(), 'locutus-upstream-enumeration-'))
    const snapshotDir = join(root, 'snapshots')
    const logger = { log: vi.fn(), error: vi.fn() }
    const auditUpstreamSurfaceScope = vi.fn().mockResolvedValue(undefined)

    try {
      vi.resetModules()
      vi.doMock('../../scripts/upstream-surface-scope-audit.ts', () => ({
        auditUpstreamSurfaceScope,
      }))
      vi.doMock('../parity/lib/languages/index.ts', () => ({
        getSupportedLanguages: () => ['swift'],
        getLanguageHandler: () => ({
          dockerImage: 'swift:6.0',
          upstreamSurface: {
            discover: async () => ({
              language: 'swift',
              namespaces: [
                {
                  namespace: 'Swift',
                  title: 'Swift',
                  target: 'Swift 6.0',
                  sourceKind: 'runtime',
                  sourceRef: 'swift:6.0',
                  entries: ['String'],
                },
              ],
            }),
            discoverMode: 'live',
            discoverUsesDocker: false,
          },
        }),
      }))
      vi.doMock('../parity/lib/upstream-surface.ts', async () => {
        const actual = await vi.importActual<typeof import('../parity/lib/upstream-surface.ts')>(
          '../parity/lib/upstream-surface.ts',
        )
        return {
          ...actual,
          resolveUpstreamSurfaceLanguages: () => ({
            unknown: [],
            unavailable: [],
            selected: ['swift'],
          }),
        }
      })
      vi.doMock('../parity/lib/docker.ts', async () => {
        const actual = await vi.importActual<typeof import('../parity/lib/docker.ts')>('../parity/lib/docker.ts')
        return {
          ...actual,
          checkDockerAvailable: () => true,
          ensureDockerImage: () => true,
        }
      })

      const { enumerateUpstreamSurfaceSnapshots } = await import('../../scripts/upstream-surface-enumeration.ts')
      await enumerateUpstreamSurfaceSnapshots({
        filters: [],
        mode: 'all',
        rootDir: root,
        snapshotDir,
        logger,
      })

      expect(auditUpstreamSurfaceScope).toHaveBeenCalledWith({
        logger,
        rootDir: root,
        selectedLanguages: ['swift'],
      })
    } finally {
      vi.doUnmock('../../scripts/upstream-surface-scope-audit.ts')
      vi.doUnmock('../parity/lib/languages/index.ts')
      vi.doUnmock('../parity/lib/upstream-surface.ts')
      vi.doUnmock('../parity/lib/docker.ts')
      vi.resetModules()
      rmSync(root, { recursive: true, force: true })
    }
  })

  it('pins Swift discovery to linux/arm64 to match the extracted symbolgraph target', async () => {
    const runInDocker = vi.fn().mockReturnValue({
      success: true,
      output: 'Swift\tString\u001fSubstring\n',
    })

    try {
      vi.resetModules()
      vi.doMock('../parity/lib/docker.ts', async () => {
        const actual = await vi.importActual<typeof import('../parity/lib/docker.ts')>('../parity/lib/docker.ts')
        return {
          ...actual,
          runInDocker,
        }
      })

      const { discoverSwiftUpstreamSurface } = await import('../parity/lib/upstream-surface-canonical.ts')
      const snapshot = await discoverSwiftUpstreamSurface()

      expect(runInDocker).toHaveBeenCalledWith(
        'swift:6.0',
        expect.any(Array),
        expect.objectContaining({ platform: 'linux/arm64' }),
      )
      expect(snapshot.namespaces).toEqual([
        expect.objectContaining({
          namespace: 'Swift',
          entries: ['String', 'Substring'],
        }),
      ])
    } finally {
      vi.doUnmock('../parity/lib/docker.ts')
      vi.resetModules()
    }
  })

  it('keeps inventory-only languages out of parity support even while tracking their upstream surface', () => {
    expect(getParitySupportedLanguages()).toContain('php')
    expect(getParitySupportedLanguages()).not.toContain('swift')
    expect(getParitySupportedLanguages()).not.toContain('kotlin')
    expect(getParitySupportedLanguages()).not.toContain('haskell')
    expect(isLanguageSupported('php')).toBe(true)
    expect(isLanguageSupported('swift')).toBe(false)
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
    expect(loaded.python?.namespaces?.math?.sourceRef).toBe('python:3.12:math')
    expect(loaded.python?.namespaceCatalog?.sourceRef).toBe('python:3.12:pkgutil-stdlib-modules')
    expect(loaded.python?.namespaces?.urllib?.sourceRef).toBe('python:3.12:urllib')
    expect(loaded.swift?.namespaces?.String?.sourceKind).toBe('runtime')
  })

  it('defines a canonical namespace catalog for every supported language', () => {
    const loaded = loadUpstreamSurfaceScope(join(process.cwd(), 'docs/upstream-surface-scope.yml'))

    for (const language of getSupportedLanguages()) {
      expect(loaded[language]?.namespaceCatalog).toBeDefined()
    }
  })

  it('exposes namespace-catalog discovery for every supported language', () => {
    for (const language of getSupportedLanguages()) {
      const handler = getLanguageHandler(language)
      expect(handler?.upstreamSurface?.discoverNamespaceCatalog).toBeTypeOf('function')
    }
  })

  it('exposes upstream-surface discovery for every supported language', () => {
    for (const language of getSupportedLanguages()) {
      const handler = getLanguageHandler(language)
      expect(handler?.upstreamSurface?.discover).toBeTypeOf('function')
    }
  })

  it('keeps Go package snapshots limited to package-level functions', () => {
    const loaded = loadUpstreamSurfaceSnapshot(join(process.cwd(), 'test/parity/fixtures/upstream-surface/golang.yml'))
    const bytesEntries = loaded.namespaces.find((namespace) => namespace.namespace === 'bytes')?.entries ?? []
    const bufioEntries = loaded.namespaces.find((namespace) => namespace.namespace === 'bufio')?.entries ?? []

    expect(bytesEntries).not.toContain('Available')
    expect(bytesEntries).not.toContain('Len')
    expect(bytesEntries).not.toContain('Read')
    expect(bytesEntries).not.toContain('Write')
    expect(bufioEntries).not.toContain('Available')
    expect(bufioEntries).not.toContain('Read')
    expect(bufioEntries).not.toContain('Write')
  })

  it('stores Go type namespaces as receiver methods instead of package functions', () => {
    const loaded = loadUpstreamSurfaceSnapshot(join(process.cwd(), 'test/parity/fixtures/upstream-surface/golang.yml'))
    const timeEntries = loaded.namespaces.find((namespace) => namespace.namespace === 'time.Time')?.entries ?? []
    const urlEntries = loaded.namespaces.find((namespace) => namespace.namespace === 'url.URL')?.entries ?? []
    const valuesEntries = loaded.namespaces.find((namespace) => namespace.namespace === 'url.Values')?.entries ?? []

    expect(timeEntries).toContain('Add')
    expect(timeEntries).toContain('Format')
    expect(timeEntries).not.toContain('Now')
    expect(timeEntries).not.toContain('Parse')
    expect(urlEntries).toContain('ResolveReference')
    expect(urlEntries).toContain('RequestURI')
    expect(urlEntries).not.toContain('ParseRequestURI')
    expect(valuesEntries).toContain('Encode')
    expect(valuesEntries).toContain('Get')
    expect(valuesEntries).not.toContain('ParseQuery')
  })

  it('keeps raw discovered Go catalogs aware of receiver-method namespaces', () => {
    const loaded = loadUpstreamSurfaceSnapshot(
      join(process.cwd(), 'test/parity/fixtures/upstream-surface-discovered/golang.yml'),
    )
    const namespaces = loaded.namespaces.map((namespace) => namespace.namespace)

    expect(namespaces).toContain('time.Time')
    expect(namespaces).toContain('url.URL')
    expect(namespaces).toContain('url.Values')
  })

  it('keeps the Go namespace catalog on package namespaces instead of receiver types', async () => {
    const catalog = await getLanguageHandler('golang')?.upstreamSurface?.discoverNamespaceCatalog?.()

    expect(catalog?.namespaces).toEqual(expect.arrayContaining(['time', 'url']))
    expect(catalog?.namespaces).not.toContain('time.Time')
    expect(catalog?.namespaces).not.toContain('url.URL')
    expect(catalog?.namespaces).not.toContain('url.Values')
  })

  it('keeps raw discovered PowerShell catalogs on comparable type namespaces instead of module names', () => {
    const loaded = loadUpstreamSurfaceSnapshot(
      join(process.cwd(), 'test/parity/fixtures/upstream-surface-discovered/powershell.yml'),
    )
    const namespaces = loaded.namespaces.map((namespace) => namespace.namespace)

    expect(namespaces).toEqual(expect.arrayContaining(['string', 'math', 'char', 'convert']))
    expect(namespaces).not.toContain('Microsoft.PowerShell.Utility')
    expect(namespaces).not.toContain('Microsoft.PowerShell.Management')
  })

  it('keeps raw discovered Clojure catalogs aligned with the comparable scope contract', () => {
    const loaded = loadUpstreamSurfaceSnapshot(
      join(process.cwd(), 'test/parity/fixtures/upstream-surface-discovered/clojure.yml'),
    )
    const namespaces = loaded.namespaces.map((namespace) => namespace.namespace)

    expect(loaded.catalog?.sourceKind).toBe('source_manifest')
    expect(loaded.catalog?.sourceRef).toBe('https://clojure.github.io/clojure/')
    expect(namespaces).toContain('Math')
    expect(namespaces).toContain('core')
    expect(namespaces).not.toContain('clojure.core')
    expect(namespaces).not.toContain("#'user/namespaces")
  })

  it('keeps raw discovered Kotlin catalogs free of version and parent-path pseudo namespaces', () => {
    const loaded = loadUpstreamSurfaceSnapshot(
      join(process.cwd(), 'test/parity/fixtures/upstream-surface-discovered/kotlin.yml'),
    )
    const namespaces = loaded.namespaces.map((namespace) => namespace.namespace)

    expect(namespaces).toContain('kotlin.text')
    expect(namespaces).not.toContain('..')
    expect(namespaces).not.toEqual(expect.arrayContaining(['...1.0.kotlin-stdlib', '...2.2.kotlin-stdlib']))
  })

  it('keeps raw discovered C catalogs limited to real synopsis functions', () => {
    const loaded = loadUpstreamSurfaceSnapshot(
      join(process.cwd(), 'test/parity/fixtures/upstream-surface-discovered/c.yml'),
    )
    const byNamespace = new Map(loaded.namespaces.map((namespace) => [namespace.namespace, namespace.entries]))

    expect(byNamespace.get('assert')).toEqual([])
    expect(byNamespace.get('complex')).toContain('cacos')
    expect(byNamespace.get('complex')).not.toEqual(expect.arrayContaining(['complex', 'imaginary', 'ctype']))
    expect(byNamespace.get('ctype')).toContain('isalnum')
    expect(byNamespace.get('ctype')).not.toEqual(expect.arrayContaining(['assert', 'byte', 'complex']))
  })

  it('keeps the checked-in scope aligned with raw discovered C and Clojure namespace catalogs', () => {
    const scope = loadUpstreamSurfaceScope(join(process.cwd(), 'docs/upstream-surface-scope.yml'))
    const buildCatalog = (language: 'c' | 'clojure') => {
      const snapshot = loadUpstreamSurfaceSnapshot(
        join(process.cwd(), `test/parity/fixtures/upstream-surface-discovered/${language}.yml`),
      )
      return {
        target: snapshot.catalog?.target ?? snapshot.namespaces[0]?.target ?? '',
        sourceKind: snapshot.catalog?.sourceKind ?? snapshot.namespaces[0]?.sourceKind ?? 'runtime',
        sourceRef: snapshot.catalog?.sourceRef ?? snapshot.namespaces[0]?.sourceRef ?? '',
        namespaces: snapshot.namespaces.map((namespace) => namespace.namespace),
      }
    }

    const issues = findUpstreamSurfaceNamespaceCatalogIssues(
      new Map([
        ['c', buildCatalog('c')],
        ['clojure', buildCatalog('clojure')],
      ]),
      scope,
    )

    expect(issues.filter((issue) => issue.language === 'c' || issue.language === 'clojure')).toEqual([])
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
              target: 'Python 3.12',
              sourceKind: 'runtime',
              sourceRef: 'python:3.12',
            },
            statistics: {
              target: 'Python 3.12',
              sourceKind: 'runtime',
              sourceRef: 'python:3.12',
            },
            random: {
              target: 'Python 3.12',
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

  it('includes canonical scope validation in the shared repository evaluation helper', () => {
    const root = mkdtempSync(join(tmpdir(), 'locutus-upstream-surface-eval-'))
    const docsDir = join(root, 'docs')
    const fixturesDir = join(root, 'test', 'parity', 'fixtures', 'upstream-surface')

    mkdirSync(docsDir, { recursive: true })
    mkdirSync(fixturesDir, { recursive: true })

    writeFileSync(
      join(docsDir, 'upstream-surface-inventory.yml'),
      ['python:', '  namespaces:', '    math:', '      default:', '        decision: wanted', ''].join('\n'),
      'utf8',
    )
    writeFileSync(
      join(docsDir, 'upstream-surface-scope.yml'),
      [
        'python:',
        '  namespaces:',
        '    math:',
        '      target: Python 3.12',
        '      sourceKind: runtime',
        '      sourceRef: python:3.12',
        '    statistics:',
        '      target: Python 3.12',
        '      sourceKind: runtime',
        '      sourceRef: python:3.12',
        '',
      ].join('\n'),
      'utf8',
    )
    writeFileSync(
      join(fixturesDir, 'python.yml'),
      [
        'language: python',
        'namespaces:',
        '  - namespace: math',
        '    title: math',
        '    target: Python 3.12',
        '    sourceKind: runtime',
        '    sourceRef: python:3.12',
        '    entries:',
        '      - sin',
        '',
      ].join('\n'),
      'utf8',
    )

    try {
      const evaluation = evaluateRepoUpstreamSurface({
        rootDir: root,
        languages: ['python'],
        getHandler: () => handler,
        getFunctions: () => [],
      })

      expect(evaluation.scopeIssues).toEqual([
        {
          language: 'python',
          missingLanguage: false,
          missingNamespaces: ['statistics'],
          unexpectedNamespaces: [],
          sourceMismatches: [],
        },
      ])
    } finally {
      rmSync(root, { recursive: true, force: true })
    }
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
    const asyncioEntries = snapshot.namespaces.find((namespace) => namespace.namespace === 'asyncio')?.entries ?? []
    const unittestEntries = snapshot.namespaces.find((namespace) => namespace.namespace === 'unittest')?.entries ?? []

    expect(mathEntries).toContain('ceil')
    expect(mathEntries).not.toContain('pi')
    expect(stringEntries).toContain('ascii_letters')
    expect(difflibEntries).toContain('get_close_matches')
    expect(difflibEntries).not.toContain('HtmlDiff')
    expect(asyncioEntries).toContain('run')
    expect(unittestEntries).toContain('main')
  })

  it('stores only Ruby methods owned by the target namespace in the checked-in snapshot', () => {
    const snapshot = loadUpstreamSurfaceSnapshot(join(process.cwd(), 'test/parity/fixtures/upstream-surface/ruby.yml'))
    const arrayEntries = snapshot.namespaces.find((namespace) => namespace.namespace === 'Array')?.entries ?? []
    const dirEntries = snapshot.namespaces.find((namespace) => namespace.namespace === 'Dir')?.entries ?? []
    const stringEntries = snapshot.namespaces.find((namespace) => namespace.namespace === 'String')?.entries ?? []

    expect(arrayEntries).toContain('bsearch')
    expect(arrayEntries).toContain('group_by')
    expect(arrayEntries).not.toContain('class')
    expect(arrayEntries).not.toContain('dup')
    expect(arrayEntries).not.toContain('new')
    expect(arrayEntries).not.toContain('try_convert')
    expect(dirEntries).toContain('pwd')
    expect(dirEntries).not.toContain('close')
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
