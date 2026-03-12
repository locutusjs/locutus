import { mkdirSync, mkdtempSync, rmSync, writeFileSync } from 'node:fs'
import { tmpdir } from 'node:os'
import { join } from 'node:path'

import { describe, expect, it } from 'vitest'

import { findFunctionSources } from '../parity/lib/parser.ts'
import { compareRuntimeSurface, resolveRuntimeSurfaceLanguages } from '../parity/lib/runtime-surface.ts'
import { loadRuntimeSurfacePolicy } from '../parity/lib/runtime-surface-policy.ts'
import type {
  FunctionInfo,
  LanguageHandler,
  RuntimeSurfaceLanguagePolicy,
  RuntimeSurfaceSnapshot,
} from '../parity/lib/types.ts'

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

const runtimeSurface: RuntimeSurfaceSnapshot = {
  language: 'php',
  target: 'PHP 8.3',
  functions: ['array_values', 'sort'],
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
  runtimeSurface: {
    discover: async () => runtimeSurface,
    getLocutusEntry: (func) => func.name,
  },
}

const policy: RuntimeSurfaceLanguagePolicy = {
  locutusExtras: {
    money_format: {
      status: 'legacy_keep',
      reason: 'removed upstream but intentionally retained',
    },
  },
  runtimeOnly: {
    sort: {
      status: 'wanted',
      reason: 'useful array helper',
    },
  },
}

describe('runtime surface guardrail', () => {
  it('allows explicitly classified Locutus extras and reports runtime-only ideas', () => {
    const result = compareRuntimeSurface(
      [
        makeFunction('php/array/array_values', 'array_values'),
        makeFunction('php/strings/money_format', 'money_format'),
      ],
      handler,
      runtimeSurface,
      policy,
    )

    expect(result.classifiedExtras).toEqual([
      { name: 'money_format', reason: 'removed upstream but intentionally retained', status: 'legacy_keep' },
    ])
    expect(result.unexpectedExtras).toEqual([])
    expect(result.classifiedRuntimeOnly).toEqual([{ name: 'sort', reason: 'useful array helper', status: 'wanted' }])
    expect(result.unclassifiedRuntimeOnly).toEqual([])
  })

  it('fails unclassified Locutus extras', () => {
    const result = compareRuntimeSurface(
      [
        makeFunction('php/array/array_values', 'array_values'),
        makeFunction('php/misc/create_function', 'create_function'),
      ],
      handler,
      runtimeSurface,
      policy,
    )

    expect(result.unexpectedExtras).toEqual(['create_function'])
  })

  it('rejects mistyped or unsupported requested languages instead of silently ignoring them', () => {
    const resolution = resolveRuntimeSurfaceLanguages(
      ['php', 'phpp', 'python'],
      ['php', 'python'],
      (language) => language === 'php',
    )

    expect(resolution.selected).toEqual(['php'])
    expect(resolution.unknown).toEqual(['phpp'])
    expect(resolution.unavailable).toEqual(['python'])
  })

  it('includes source functions even when they do not define examples', () => {
    const root = mkdtempSync(join(tmpdir(), 'locutus-runtime-surface-'))
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

  it('loads the shared runtime surface policy inventory', () => {
    const loaded = loadRuntimeSurfacePolicy(join(process.cwd(), 'docs/runtime-surface-policy.yml'))

    expect(loaded.php?.locutusExtras?.money_format?.status).toBe('legacy_keep')
    expect(loaded.php?.runtimeOnly?.array_is_list?.status).toBe('wanted')
    expect(loaded.php?.runtimeOnly?.chdir?.status).toBe('out_of_scope')
  })

  it('rejects unknown keys in policy sections', () => {
    const root = mkdtempSync(join(tmpdir(), 'locutus-runtime-surface-policy-'))
    const policyPath = join(root, 'runtime-surface-policy.yml')

    writeFileSync(
      policyPath,
      [
        'php:',
        '  runtimeOnyl:',
        '    array_is_list:',
        '      status: wanted',
        '      reason: typo should fail',
        '',
      ].join('\n'),
      'utf8',
    )

    try {
      expect(() => loadRuntimeSurfacePolicy(policyPath)).toThrow(/unrecognized key/i)
    } finally {
      rmSync(root, { recursive: true, force: true })
    }
  })

  it('rejects runtime-only statuses under locutusExtras', () => {
    const root = mkdtempSync(join(tmpdir(), 'locutus-runtime-surface-policy-'))
    const policyPath = join(root, 'runtime-surface-policy.yml')

    writeFileSync(
      policyPath,
      [
        'php:',
        '  locutusExtras:',
        '    money_format:',
        '      status: wanted',
        '      reason: wrong section should fail',
        '',
      ].join('\n'),
      'utf8',
    )

    try {
      expect(() => loadRuntimeSurfacePolicy(policyPath)).toThrow(/invalid/i)
    } finally {
      rmSync(root, { recursive: true, force: true })
    }
  })

  it('treats empty policy sections as empty maps instead of failing', () => {
    const root = mkdtempSync(join(tmpdir(), 'locutus-runtime-surface-policy-'))
    const policyPath = join(root, 'runtime-surface-policy.yml')

    writeFileSync(policyPath, ['php:', '  locutusExtras:', '  runtimeOnly:', ''].join('\n'), 'utf8')

    try {
      expect(loadRuntimeSurfacePolicy(policyPath)).toEqual({
        php: {},
      })
    } finally {
      rmSync(root, { recursive: true, force: true })
    }
  })

  it('reports stale policy entries that no longer match either surface', () => {
    const result = compareRuntimeSurface(
      [
        makeFunction('php/array/array_values', 'array_values'),
        makeFunction('php/strings/money_format', 'money_format'),
      ],
      handler,
      runtimeSurface,
      {
        locutusExtras: {
          money_format: {
            status: 'legacy_keep',
            reason: 'removed upstream but intentionally retained',
          },
          create_function: {
            status: 'removed_upstream',
            reason: 'stale extra should be reported',
          },
        },
        runtimeOnly: {
          sort: {
            status: 'wanted',
            reason: 'useful array helper',
          },
          array_is_list: {
            status: 'wanted',
            reason: 'stale todo should be reported',
          },
        },
      },
    ) as {
      staleLocutusExtraPolicy: Array<{ name: string; reason: string; status: string }>
      staleRuntimeOnlyPolicy: Array<{ name: string; reason: string; status: string }>
    }

    expect(result.staleLocutusExtraPolicy).toEqual([
      { name: 'create_function', reason: 'stale extra should be reported', status: 'removed_upstream' },
    ])
    expect(result.staleRuntimeOnlyPolicy).toEqual([
      { name: 'array_is_list', reason: 'stale todo should be reported', status: 'wanted' },
    ])
  })
})
