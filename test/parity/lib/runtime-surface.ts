/**
 * Runtime surface discovery and comparison utilities.
 *
 * These checks are parity-adjacent: they compare the functions Locutus ships
 * for a language against the callable/runtime surface exposed by the parity
 * target container for that language.
 */

import type {
  FunctionInfo,
  LanguageHandler,
  RuntimeSurfaceAdapter,
  RuntimeSurfaceExtra,
  RuntimeSurfaceLocutusFunction,
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
  allowedExtras: RuntimeSurfaceExtra[]
  unexpectedExtras: string[]
  runtimeOnly: string[]
}

export interface RuntimeSurfaceLanguageResolution {
  selected: string[]
  unknown: string[]
  unavailable: string[]
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
): RuntimeSurfaceCheckResult {
  if (!handler.runtimeSurface) {
    throw new Error(`Language ${handler.displayName} does not define a runtime surface adapter`)
  }

  const { entries, duplicates, ignoredFunctions } = collectLocutusSurfaceEntries(functions, handler.runtimeSurface)
  const runtimeEntries = [...new Set(runtimeSurface.functions)].sort()
  const runtimeSet = new Set(runtimeEntries)
  const locutusSet = new Set(entries)
  const allowedExtras: RuntimeSurfaceExtra[] = []
  const unexpectedExtras: string[] = []

  for (const entry of entries) {
    if (runtimeSet.has(entry)) {
      continue
    }

    const reason = handler.runtimeSurface.allowedExtras?.get(entry)
    if (reason) {
      allowedExtras.push({ name: entry, reason })
      continue
    }

    unexpectedExtras.push(entry)
  }

  const runtimeOnly = runtimeEntries.filter((entry) => !locutusSet.has(entry))

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
    allowedExtras: allowedExtras.sort((a, b) => a.name.localeCompare(b.name)),
    unexpectedExtras,
    runtimeOnly,
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

export function formatRuntimeSurfaceReport(result: RuntimeSurfaceCheckResult): string {
  const lines = [
    `${result.language} runtime surface (${result.target})`,
    `  runtime functions: ${result.runtimeSurface.functions.length}`,
    `  locutus functions: ${result.locutusFunctions}`,
    `  comparable entries: ${result.locutusEntries.length}`,
  ]

  lines.push(
    ...formatList(
      'allowed extras',
      result.allowedExtras.map((extra) => `${extra.name} (${extra.reason})`),
    ),
  )
  lines.push(...formatList('unexpected extras', result.unexpectedExtras))
  lines.push(...formatList('runtime-only ideas', result.runtimeOnly))
  lines.push(...formatList('duplicate locutus entries', result.duplicateEntries))
  lines.push(...formatList('ignored locutus functions', result.ignoredFunctions))

  return lines.join('\n')
}
