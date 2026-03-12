/**
 * Runtime surface discovery and comparison utilities.
 *
 * These checks are parity-adjacent: they compare the functions Locutus ships
 * for a language against the callable/runtime surface exposed by the parity
 * target container for that language.
 */

import type {
  LanguageHandler,
  RuntimeSurfaceAdapter,
  RuntimeSurfaceLanguagePolicy,
  RuntimeSurfaceLocutusFunction,
  RuntimeSurfacePolicyEntry,
  RuntimeSurfaceSnapshot,
} from './types.ts'

export interface RuntimeSurfaceCheckResult {
  language: string
  target: string
  runtimeSurface: RuntimeSurfaceSnapshot
  locutusFunctions: number
  locutusEntries: string[]
  ignoredFunctions: string[]
  duplicateEntries: string[]
  classifiedExtras: RuntimeSurfacePolicyMatch[]
  unexpectedExtras: string[]
  classifiedRuntimeOnly: RuntimeSurfacePolicyMatch[]
  unclassifiedRuntimeOnly: string[]
  staleLocutusExtraPolicy: RuntimeSurfacePolicyMatch[]
  staleRuntimeOnlyPolicy: RuntimeSurfacePolicyMatch[]
}

export interface RuntimeSurfaceLanguageResolution {
  selected: string[]
  unknown: string[]
  unavailable: string[]
}

export interface RuntimeSurfacePolicyMatch extends RuntimeSurfacePolicyEntry {
  name: string
}

export function resolveRuntimeSurfaceLanguages(
  requestedLanguages: string[],
  supportedLanguages: string[],
  hasRuntimeSurface: (language: string) => boolean,
): RuntimeSurfaceLanguageResolution {
  if (!requestedLanguages.length) {
    return {
      selected: supportedLanguages.filter(hasRuntimeSurface),
      unknown: [],
      unavailable: [],
    }
  }

  const supported = new Set(supportedLanguages)
  const selected: string[] = []
  const unknown: string[] = []
  const unavailable: string[] = []

  for (const language of requestedLanguages) {
    if (!supported.has(language)) {
      unknown.push(language)
      continue
    }

    if (!hasRuntimeSurface(language)) {
      unavailable.push(language)
      continue
    }

    selected.push(language)
  }

  return {
    selected: [...new Set(selected)],
    unknown: [...new Set(unknown)].sort(),
    unavailable: [...new Set(unavailable)].sort(),
  }
}

export function collectLocutusSurfaceEntries(
  functions: RuntimeSurfaceLocutusFunction[],
  adapter: RuntimeSurfaceAdapter,
): { entries: string[]; duplicates: string[]; ignoredFunctions: string[] } {
  const entriesByName = new Map<string, string[]>()
  const ignoredFunctions: string[] = []

  for (const func of functions) {
    const entry = adapter.getLocutusEntry(func)
    if (!entry) {
      ignoredFunctions.push(func.path)
      continue
    }

    const paths = entriesByName.get(entry) ?? []
    paths.push(func.path)
    entriesByName.set(entry, paths)
  }

  const entries = [...entriesByName.keys()].sort()
  const duplicates = [...entriesByName.entries()]
    .filter(([, paths]) => paths.length > 1)
    .map(([entry, paths]) => `${entry}: ${paths.join(', ')}`)
    .sort()

  return {
    entries,
    duplicates,
    ignoredFunctions: ignoredFunctions.sort(),
  }
}

export function compareRuntimeSurface(
  functions: RuntimeSurfaceLocutusFunction[],
  handler: LanguageHandler,
  runtimeSurface: RuntimeSurfaceSnapshot,
  policy: RuntimeSurfaceLanguagePolicy = {},
): RuntimeSurfaceCheckResult {
  if (!handler.runtimeSurface) {
    throw new Error(`Language ${handler.displayName} does not define a runtime surface adapter`)
  }

  const { entries, duplicates, ignoredFunctions } = collectLocutusSurfaceEntries(functions, handler.runtimeSurface)
  const runtimeEntries = [...new Set(runtimeSurface.functions)].sort()
  const runtimeSet = new Set(runtimeEntries)
  const locutusSet = new Set(entries)
  const classifiedExtras: RuntimeSurfacePolicyMatch[] = []
  const unexpectedExtras: string[] = []
  const seenLocutusExtraPolicy = new Set<string>()

  for (const entry of entries) {
    if (runtimeSet.has(entry)) {
      continue
    }

    const policyEntry = policy.locutusExtras?.[entry]
    if (policyEntry) {
      seenLocutusExtraPolicy.add(entry)
      classifiedExtras.push({ name: entry, ...policyEntry })
      continue
    }

    unexpectedExtras.push(entry)
  }

  const classifiedRuntimeOnly: RuntimeSurfacePolicyMatch[] = []
  const unclassifiedRuntimeOnly: string[] = []
  const seenRuntimeOnlyPolicy = new Set<string>()

  for (const entry of runtimeEntries) {
    if (locutusSet.has(entry)) {
      continue
    }

    const policyEntry = policy.runtimeOnly?.[entry]
    if (policyEntry) {
      seenRuntimeOnlyPolicy.add(entry)
      classifiedRuntimeOnly.push({ name: entry, ...policyEntry })
      continue
    }

    unclassifiedRuntimeOnly.push(entry)
  }

  const staleLocutusExtraPolicy = Object.entries(policy.locutusExtras ?? {})
    .filter(([name]) => !seenLocutusExtraPolicy.has(name))
    .map(([name, entry]) => ({ name, ...entry }))
    .sort((a, b) => a.name.localeCompare(b.name))

  const staleRuntimeOnlyPolicy = Object.entries(policy.runtimeOnly ?? {})
    .filter(([name]) => !seenRuntimeOnlyPolicy.has(name))
    .map(([name, entry]) => ({ name, ...entry }))
    .sort((a, b) => a.name.localeCompare(b.name))

  return {
    language: runtimeSurface.language,
    target: runtimeSurface.target,
    runtimeSurface: {
      ...runtimeSurface,
      functions: runtimeEntries,
    },
    locutusFunctions: functions.length,
    locutusEntries: entries,
    ignoredFunctions,
    duplicateEntries: duplicates,
    classifiedExtras: classifiedExtras.sort((a, b) => a.name.localeCompare(b.name)),
    unexpectedExtras,
    classifiedRuntimeOnly: classifiedRuntimeOnly.sort((a, b) => a.name.localeCompare(b.name)),
    unclassifiedRuntimeOnly,
    staleLocutusExtraPolicy,
    staleRuntimeOnlyPolicy,
  }
}

function formatList(name: string, values: string[], maxItems = 12): string[] {
  if (!values.length) {
    return []
  }

  const lines = [`  ${name}: ${values.length}`]
  for (const value of values.slice(0, maxItems)) {
    lines.push(`    - ${value}`)
  }
  if (values.length > maxItems) {
    lines.push(`    - ... (${values.length - maxItems} more)`)
  }
  return lines
}

function formatPolicyMatches(label: string, matches: RuntimeSurfacePolicyMatch[], maxItems = 12): string[] {
  if (!matches.length) {
    return []
  }

  const grouped = new Map<string, RuntimeSurfacePolicyMatch[]>()
  for (const match of matches) {
    const existing = grouped.get(match.status) ?? []
    existing.push(match)
    grouped.set(match.status, existing)
  }

  const lines: string[] = []
  for (const status of [...grouped.keys()].sort()) {
    const entries = grouped.get(status)?.sort((left, right) => left.name.localeCompare(right.name)) ?? []
    lines.push(`  ${label} [${status}]: ${entries.length}`)
    for (const entry of entries.slice(0, maxItems)) {
      lines.push(`    - ${entry.name} (${entry.reason})`)
    }
    if (entries.length > maxItems) {
      lines.push(`    - ... (${entries.length - maxItems} more)`)
    }
  }

  return lines
}

export function formatRuntimeSurfaceReport(result: RuntimeSurfaceCheckResult): string {
  const lines = [
    `${result.language} runtime surface (${result.target})`,
    `  runtime functions: ${result.runtimeSurface.functions.length}`,
    `  locutus functions: ${result.locutusFunctions}`,
    `  comparable entries: ${result.locutusEntries.length}`,
  ]

  lines.push(...formatPolicyMatches('locutus extras', result.classifiedExtras))
  lines.push(...formatList('unexpected extras', result.unexpectedExtras))
  lines.push(...formatPolicyMatches('runtime-only backlog', result.classifiedRuntimeOnly))
  lines.push(...formatList('runtime-only ideas', result.unclassifiedRuntimeOnly))
  lines.push(...formatPolicyMatches('stale locutus-extra policy', result.staleLocutusExtraPolicy))
  lines.push(...formatPolicyMatches('stale runtime-only policy', result.staleRuntimeOnlyPolicy))
  lines.push(...formatList('duplicate locutus entries', result.duplicateEntries))
  lines.push(...formatList('ignored locutus functions', result.ignoredFunctions))

  return lines.join('\n')
}
