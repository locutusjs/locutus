import { mkdirSync, mkdtempSync, rmSync, writeFileSync } from 'node:fs'
import { tmpdir } from 'node:os'
import { join } from 'node:path'

import { describe, expect, it } from 'vitest'

import { findFunctionSources } from '../parity/lib/parser.ts'
import { compareRuntimeSurface, resolveRuntimeSurfaceLanguages } from '../parity/lib/runtime-surface.ts'
import type { FunctionInfo, LanguageHandler, RuntimeSurfaceSnapshot } from '../parity/lib/types.ts'

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
    allowedExtras: new Map([['money_format', 'removed upstream but intentionally retained']]),
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
    )

    expect(result.allowedExtras).toEqual([
      { name: 'money_format', reason: 'removed upstream but intentionally retained' },
    ])
    expect(result.unexpectedExtras).toEqual([])
    expect(result.runtimeOnly).toEqual(['sort'])
  })

  it('fails unclassified Locutus extras', () => {
    const result = compareRuntimeSurface(
      [
        makeFunction('php/array/array_values', 'array_values'),
        makeFunction('php/misc/create_function', 'create_function'),
      ],
      handler,
      runtimeSurface,
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
})
