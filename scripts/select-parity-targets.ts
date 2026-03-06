#!/usr/bin/env node

import { execFileSync } from 'node:child_process'
import { readdirSync, readFileSync, statSync, writeFileSync } from 'node:fs'
import { join, relative } from 'node:path'
import { fileURLToPath } from 'node:url'
import ts from 'typescript'

import { Util } from '../src/_util/util.ts'
import { findFunctions } from '../test/parity/lib/parser.ts'
import type { FunctionInfo } from '../test/parity/lib/types.ts'

const ROOT = process.cwd()
const SRC_DIR = join(ROOT, 'src')

export const SMOKE_PARITY_TARGETS = [
  'php/array/array_flip',
  'elixir/Enum/group_by',
  'golang/net/ParseIP',
  'python/re/findall',
  'c/stdlib/strtol',
] as const

const FORCE_FULL_PATHS = new Set([
  '.github/workflows/ci.yml',
  'scripts/select-parity-targets.ts',
  'src/_util/cli.ts',
  'src/_util/headerSchema.ts',
  'src/_util/util.ts',
  'test/parity/index.ts',
  'test/parity/lib/config.ts',
  'test/parity/lib/runner.ts',
  'test/parity/lib/cache.ts',
  'test/parity/lib/docker.ts',
  'test/parity/lib/parser.ts',
  'test/parity/lib/types.ts',
])

const FORCE_FULL_PREFIXES = ['.github/workflows/', 'test/parity/lib/']

export interface ParitySelectionInput {
  changedFiles: string[]
  functionInfos: FunctionInfo[]
  reverseDependencies: Map<string, Set<string>>
}

export interface ParitySelection {
  mode: 'full' | 'selective'
  changedFiles: string[]
  fullReasons: string[]
  selectedTargets: string[]
  smokeTargets: string[]
  targets: string[]
  reasonsByTarget: Record<string, string[]>
}

function normalizePath(value: string): string {
  return value.replaceAll('\\', '/')
}

function isSourceModulePath(filePath: string): boolean {
  return filePath.startsWith('src/') && filePath.endsWith('.ts')
}

function isLanguageHandlerPath(filePath: string): boolean {
  return /^test\/parity\/lib\/languages\/[^/]+\.ts$/.test(filePath)
}

function isWebsiteOnlyPath(filePath: string): boolean {
  return (
    filePath.startsWith('website/') ||
    filePath.startsWith('docs/') ||
    filePath === 'README.md' ||
    filePath === 'CONTRIBUTING.md' ||
    filePath === 'AGENTS.md'
  )
}

function toModulePath(filePath: string): string {
  return filePath.replace(/^src\//, '').replace(/\.ts$/, '')
}

function listTsFiles(dir: string): string[] {
  const files: string[] = []

  for (const entry of readdirSync(dir)) {
    const fullPath = join(dir, entry)
    const stat = statSync(fullPath)
    if (stat.isDirectory()) {
      files.push(...listTsFiles(fullPath))
      continue
    }
    if (stat.isFile() && entry.endsWith('.ts')) {
      files.push(fullPath)
    }
  }

  return files
}

export function collectSourceDependencyGraph(rootDir: string): Map<string, Set<string>> {
  const util = new Util([])
  const srcDir = join(rootDir, 'src')
  const sourceFiles = listTsFiles(srcDir)
  const modulePaths = new Set(
    sourceFiles.map((fullPath) => normalizePath(relative(srcDir, fullPath)).replace(/\.ts$/, '')),
  )
  const graph = new Map<string, Set<string>>()

  for (const fullPath of sourceFiles) {
    const relPath = normalizePath(relative(srcDir, fullPath))
    const modulePath = relPath.replace(/\.ts$/, '')
    const sourceText = readFileSync(fullPath, 'utf8')
    const sourceFile = ts.createSourceFile(relPath, sourceText, ts.ScriptTarget.ES2022, true, ts.ScriptKind.TS)
    const deps = util
      ._extractDependencies(sourceFile, relPath)
      .filter((dep) => modulePaths.has(dep))
      .sort()

    graph.set(modulePath, new Set(deps))
  }

  return graph
}

export function buildReverseDependencies(graph: Map<string, Set<string>>): Map<string, Set<string>> {
  const reverse = new Map<string, Set<string>>()

  for (const [modulePath, deps] of graph.entries()) {
    if (!reverse.has(modulePath)) {
      reverse.set(modulePath, new Set())
    }
    for (const dep of deps) {
      const dependents = reverse.get(dep) ?? new Set<string>()
      dependents.add(modulePath)
      reverse.set(dep, dependents)
    }
  }

  return reverse
}

function addReason(reasonsByTarget: Record<string, string[]>, target: string, reason: string): void {
  if (!reasonsByTarget[target]) {
    reasonsByTarget[target] = []
  }
  if (!reasonsByTarget[target]?.includes(reason)) {
    reasonsByTarget[target]?.push(reason)
  }
}

function collectReverseFunctionDependents(
  startModule: string,
  functionPaths: Set<string>,
  reverseDependencies: Map<string, Set<string>>,
): string[] {
  const queue = [startModule]
  const visited = new Set<string>()
  const selected = new Set<string>()

  while (queue.length > 0) {
    const current = queue.shift()
    if (!current || visited.has(current)) {
      continue
    }
    visited.add(current)

    if (functionPaths.has(current)) {
      selected.add(current)
    }

    for (const dependent of reverseDependencies.get(current) ?? []) {
      if (!visited.has(dependent)) {
        queue.push(dependent)
      }
    }
  }

  return [...selected].sort()
}

function computeFullReasons(changedFiles: string[]): string[] {
  const reasons: string[] = []

  for (const changedFile of changedFiles) {
    if (isLanguageHandlerPath(changedFile)) {
      continue
    }

    if (FORCE_FULL_PATHS.has(changedFile)) {
      reasons.push(`force-full path changed: ${changedFile}`)
      continue
    }

    if (FORCE_FULL_PREFIXES.some((prefix) => changedFile.startsWith(prefix))) {
      reasons.push(`force-full area changed: ${changedFile}`)
      continue
    }

    if (changedFile === 'package.json') {
      reasons.push('force-full path changed: package.json')
    }
  }

  return [...new Set(reasons)]
}

export function computeParitySelection(input: ParitySelectionInput): ParitySelection {
  const changedFiles = [...new Set(input.changedFiles.map(normalizePath).filter(Boolean))].sort()
  const functionInfos = input.functionInfos
  const functionPaths = new Set(functionInfos.map((func) => func.path))
  const functionPathsByLanguage = new Map<string, string[]>()

  for (const func of functionInfos) {
    const existing = functionPathsByLanguage.get(func.language) ?? []
    existing.push(func.path)
    functionPathsByLanguage.set(func.language, existing)
  }
  for (const targets of functionPathsByLanguage.values()) {
    targets.sort()
  }

  const fullReasons = computeFullReasons(changedFiles)
  const reasonsByTarget: Record<string, string[]> = {}

  if (fullReasons.length > 0) {
    return {
      mode: 'full',
      changedFiles,
      fullReasons,
      selectedTargets: [],
      smokeTargets: [...SMOKE_PARITY_TARGETS],
      targets: [],
      reasonsByTarget,
    }
  }

  const selectedTargets = new Set<string>()

  for (const changedFile of changedFiles) {
    if (isLanguageHandlerPath(changedFile)) {
      const language = changedFile.match(/^test\/parity\/lib\/languages\/([^/]+)\.ts$/)?.[1]
      if (!language) {
        continue
      }

      for (const target of functionPathsByLanguage.get(language) ?? []) {
        selectedTargets.add(target)
        addReason(reasonsByTarget, target, `parity language handler changed: ${changedFile}`)
      }
      continue
    }

    if (!isSourceModulePath(changedFile)) {
      continue
    }

    const changedModule = toModulePath(changedFile)
    for (const target of collectReverseFunctionDependents(changedModule, functionPaths, input.reverseDependencies)) {
      selectedTargets.add(target)
      if (target === changedModule) {
        addReason(reasonsByTarget, target, `direct source change: ${changedFile}`)
      } else {
        addReason(reasonsByTarget, target, `depends on changed source: ${changedFile}`)
      }
    }
  }

  const smokeTargets = [...SMOKE_PARITY_TARGETS]
  const targets = [...new Set([...smokeTargets, ...[...selectedTargets].sort()])]

  return {
    mode: 'selective',
    changedFiles,
    fullReasons: [],
    selectedTargets: [...selectedTargets].sort(),
    smokeTargets,
    targets,
    reasonsByTarget,
  }
}

export function formatSelection(selection: ParitySelection): string {
  const lines: string[] = []
  lines.push('Selective parity target selection')
  lines.push('================================')
  lines.push(`Changed files: ${selection.changedFiles.length}`)

  if (selection.mode === 'full') {
    lines.push('Mode: full')
    for (const reason of selection.fullReasons) {
      lines.push(`- ${reason}`)
    }
    return lines.join('\n')
  }

  lines.push('Mode: selective')
  lines.push(`Smoke targets: ${selection.smokeTargets.length}`)
  lines.push(`Selected targets: ${selection.selectedTargets.length}`)
  lines.push(`Combined targets: ${selection.targets.length}`)

  if (selection.selectedTargets.length === 0) {
    if (selection.changedFiles.length > 0 && selection.changedFiles.every(isWebsiteOnlyPath)) {
      lines.push('- No dynamic targets selected: website/docs-only change set')
    } else {
      lines.push('- No dynamic targets selected')
    }
  }

  for (const target of selection.selectedTargets) {
    lines.push(`- ${target}`)
    for (const reason of selection.reasonsByTarget[target] ?? []) {
      lines.push(`  - ${reason}`)
    }
  }

  return lines.join('\n')
}

function writeGithubOutput(outputPath: string, selection: ParitySelection): void {
  const lines = [
    `mode=${selection.mode}`,
    `target_count=${selection.targets.length}`,
    'targets<<EOF',
    ...selection.targets,
    'EOF',
    'summary<<EOF',
    formatSelection(selection),
    'EOF',
  ]

  writeFileSync(outputPath, `${lines.join('\n')}\n`, 'utf8')
}

function getChangedFiles(baseRef: string): string[] {
  const output = execFileSync('git', ['diff', '--name-only', `${baseRef}...HEAD`], {
    cwd: ROOT,
    encoding: 'utf8',
  })

  return output
    .split('\n')
    .map((line) => line.trim())
    .filter(Boolean)
}

function parseArgs(args: string[]): {
  baseRef: string
  githubOutputPath: string | undefined
  format: 'text' | 'json'
} {
  let baseRef = 'origin/main'
  let githubOutputPath: string | undefined
  let format: 'text' | 'json' = 'text'

  for (let index = 0; index < args.length; index += 1) {
    const arg = args[index]
    if (arg === '--base-ref') {
      baseRef = args[index + 1] ?? baseRef
      index += 1
      continue
    }
    if (arg === '--github-output') {
      githubOutputPath = args[index + 1]
      index += 1
      continue
    }
    if (arg === '--format') {
      const next = args[index + 1]
      if (next === 'json') {
        format = 'json'
      }
      index += 1
    }
  }

  return { baseRef, githubOutputPath, format }
}

function main() {
  const { baseRef, githubOutputPath, format } = parseArgs(process.argv.slice(2))
  const changedFiles = getChangedFiles(baseRef)
  const functionInfos = findFunctions(SRC_DIR)
  const dependencyGraph = collectSourceDependencyGraph(ROOT)
  const reverseDependencies = buildReverseDependencies(dependencyGraph)
  const selection = computeParitySelection({ changedFiles, functionInfos, reverseDependencies })

  if (githubOutputPath) {
    writeGithubOutput(githubOutputPath, selection)
  }

  if (format === 'json') {
    console.log(JSON.stringify(selection, null, 2))
    return
  }

  console.log(formatSelection(selection))
}

if (process.argv[1] && normalizePath(process.argv[1]) === normalizePath(fileURLToPath(import.meta.url))) {
  try {
    main()
  } catch (error: unknown) {
    console.error(error)
    process.exit(1)
  }
}
