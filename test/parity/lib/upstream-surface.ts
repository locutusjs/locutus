/**
 * Upstream surface comparison utilities.
 *
 * These checks compare the Locutus symbols we currently ship for a language
 * against a version-tagged upstream symbol catalog for that language.
 */

import { join } from 'node:path'

import type {
  LanguageHandler,
  RuntimeSurfaceLocutusFunction,
  UpstreamSurfaceCatalogDecisionRule,
  UpstreamSurfaceDecisionEntry,
  UpstreamSurfaceInventory,
  UpstreamSurfaceLanguageInventory,
  UpstreamSurfaceLanguageScope,
  UpstreamSurfaceNamespaceInventory,
  UpstreamSurfaceNamespaceScope,
  UpstreamSurfaceNamespaceSnapshot,
  UpstreamSurfaceScope,
  UpstreamSurfaceSnapshot,
} from './types.ts'
import {
  isKeepDecision,
  isSkipDecision,
  isWantedDecision,
  loadUpstreamSurfaceInventory,
} from './upstream-surface-inventory.ts'
import { loadUpstreamSurfaceScope } from './upstream-surface-scope.ts'
import { loadUpstreamSurfaceSnapshots } from './upstream-surface-snapshots.ts'

export interface UpstreamSurfaceNamespacePolicyMatch extends UpstreamSurfaceDecisionEntry {
  name: string
}

export interface UpstreamSurfaceNamespaceResult {
  namespace: string
  title: string
  target: string
  sourceKind: string
  sourceRef: string
  catalogEntries: string[]
  shippedEntries: string[]
  ignoredLocutusFunctions: string[]
  duplicateLocutusEntries: string[]
  keptExtras: UpstreamSurfaceNamespacePolicyMatch[]
  unexpectedExtras: string[]
  wantedEntries: UpstreamSurfaceNamespacePolicyMatch[]
  skippedEntries: UpstreamSurfaceNamespacePolicyMatch[]
  untriagedEntries: string[]
  staleDecisions: UpstreamSurfaceNamespacePolicyMatch[]
}

export interface UpstreamSurfaceCheckResult {
  language: string
  namespaces: UpstreamSurfaceNamespaceResult[]
}

export interface UpstreamSurfaceLanguageResolution {
  selected: string[]
  unknown: string[]
  unavailable: string[]
}

export interface UpstreamSurfaceInventoryCoverageIssue {
  language: string
  missingLanguage: boolean
  missingNamespaces: string[]
}

export interface UpstreamSurfaceScopeSourceMismatch {
  namespace: string
  expectedSourceKind: string
  actualSourceKind: string
  expectedSourceRef: string
  actualSourceRef: string
}

export interface UpstreamSurfaceScopeCoverageIssue {
  language: string
  missingLanguage: boolean
  missingNamespaces: string[]
  unexpectedNamespaces: string[]
  sourceMismatches: UpstreamSurfaceScopeSourceMismatch[]
}

export interface UpstreamSurfaceNamespaceSiteData extends UpstreamSurfaceNamespaceResult {
  categories: string[]
  catalogShippedCount: number
  coveragePercent: number | null
}

export interface UpstreamSurfaceLanguageSiteData {
  language: string
  title: string
  scopeNote?: string
  namespaceCount: number
  shippedCount: number
  catalogCount: number
  catalogShippedCount: number
  keptExtraCount: number
  unexpectedExtraCount: number
  wantedCount: number
  skippedCount: number
  untriagedCount: number
  coveragePercent: number | null
  namespaces: UpstreamSurfaceNamespaceSiteData[]
}

export interface UpstreamSurfaceSiteData {
  generatedAt: string
  languages: Record<string, UpstreamSurfaceLanguageSiteData>
}

export interface EvaluatedUpstreamSurfaceLanguage {
  language: string
  functions: RuntimeSurfaceLocutusFunction[]
  handler: LanguageHandler
  inventory: UpstreamSurfaceLanguageInventory
  snapshot: UpstreamSurfaceSnapshot
  result: UpstreamSurfaceCheckResult
}

export interface EvaluateUpstreamSurfaceInput {
  languages: string[]
  snapshots: Map<string, UpstreamSurfaceSnapshot>
  inventory: UpstreamSurfaceInventory
  scope?: UpstreamSurfaceScope
  getHandler: (language: string) => LanguageHandler | undefined
  getFunctions: (language: string) => RuntimeSurfaceLocutusFunction[]
}

export interface EvaluateRepoUpstreamSurfaceInput {
  rootDir: string
  languages: string[]
  getHandler: (language: string) => LanguageHandler | undefined
  getFunctions: (language: string) => RuntimeSurfaceLocutusFunction[]
}

export interface EvaluatedUpstreamSurface {
  scopeIssues: UpstreamSurfaceScopeCoverageIssue[]
  coverageIssues: UpstreamSurfaceInventoryCoverageIssue[]
  languages: EvaluatedUpstreamSurfaceLanguage[]
}

interface NamespaceEntryCollection {
  entries: string[]
  duplicates: string[]
  ignoredFunctions: string[]
}

interface NamespaceCategoryCollection {
  categories: string[]
}

function compileInventoryRulePattern(pattern: string): RegExp {
  const escaped = pattern.replace(/[|\\{}()[\]^$+?.]/g, '\\$&').replace(/\*/g, '.*')
  return new RegExp(`^${escaped}$`)
}

interface CatalogDecisionMatch {
  entry: UpstreamSurfaceDecisionEntry
  matchedRuleIndex?: number
  usedDefault?: boolean
}

function findCatalogDecision(
  name: string,
  decisions: Record<string, UpstreamSurfaceDecisionEntry>,
  rules: UpstreamSurfaceCatalogDecisionRule[],
  defaultDecision: UpstreamSurfaceDecisionEntry | undefined,
): CatalogDecisionMatch | undefined {
  if (Object.prototype.hasOwnProperty.call(decisions, name)) {
    const decision = decisions[name]
    if (!decision) {
      return undefined
    }
    return {
      entry: decision,
    }
  }

  for (const [index, rule] of rules.entries()) {
    if (compileInventoryRulePattern(rule.match).test(name)) {
      return {
        entry: {
          decision: rule.decision,
          note: rule.note,
        },
        matchedRuleIndex: index,
      }
    }
  }

  if (!defaultDecision) {
    return undefined
  }

  return {
    entry: defaultDecision,
    usedDefault: true,
  }
}

export function resolveUpstreamSurfaceLanguages(
  requestedLanguages: string[],
  supportedLanguages: string[],
  hasUpstreamSurface: (language: string) => boolean,
): UpstreamSurfaceLanguageResolution {
  if (!requestedLanguages.length) {
    return {
      selected: supportedLanguages.filter(hasUpstreamSurface),
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

    if (!hasUpstreamSurface(language)) {
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

function collectLocutusNamespaceEntries(
  functions: RuntimeSurfaceLocutusFunction[],
  handler: LanguageHandler,
): Map<string, NamespaceEntryCollection> {
  if (!handler.upstreamSurface) {
    throw new Error(`Language ${handler.displayName} does not define an upstream surface adapter`)
  }

  const namespacePaths = new Map<string, Map<string, string[]>>()
  const ignoredByNamespace = new Map<string, string[]>()

  for (const func of functions) {
    const entry = handler.upstreamSurface.getLocutusEntry(func)
    if (!entry) {
      const ignored = ignoredByNamespace.get('__ignored__') ?? []
      ignored.push(func.path)
      ignoredByNamespace.set('__ignored__', ignored)
      continue
    }

    const entries = namespacePaths.get(entry.namespace) ?? new Map<string, string[]>()
    const paths = entries.get(entry.name) ?? []
    paths.push(func.path)
    entries.set(entry.name, paths)
    namespacePaths.set(entry.namespace, entries)
  }

  const collections = new Map<string, NamespaceEntryCollection>()
  for (const [namespace, entries] of namespacePaths.entries()) {
    const duplicateEntries = [...entries.entries()]
      .filter(([, paths]) => paths.length > 1)
      .map(([name, paths]) => `${name}: ${paths.join(', ')}`)
      .sort()

    collections.set(namespace, {
      entries: [...entries.keys()].sort(),
      duplicates: duplicateEntries,
      ignoredFunctions: [],
    })
  }

  const ignoredFunctions = (ignoredByNamespace.get('__ignored__') ?? []).sort()
  if (ignoredFunctions.length) {
    collections.set('__ignored__', {
      entries: [],
      duplicates: [],
      ignoredFunctions,
    })
  }

  return collections
}

function collectLocutusNamespaceCategories(
  functions: RuntimeSurfaceLocutusFunction[],
  handler: LanguageHandler,
): Map<string, NamespaceCategoryCollection> {
  if (!handler.upstreamSurface) {
    throw new Error(`Language ${handler.displayName} does not define an upstream surface adapter`)
  }

  const categoriesByNamespace = new Map<string, Set<string>>()

  for (const func of functions) {
    const entry = handler.upstreamSurface.getLocutusEntry(func)
    if (!entry) {
      continue
    }

    const categories = categoriesByNamespace.get(entry.namespace) ?? new Set<string>()
    categories.add(func.category)
    categoriesByNamespace.set(entry.namespace, categories)
  }

  const collections = new Map<string, NamespaceCategoryCollection>()
  for (const [namespace, categories] of categoriesByNamespace.entries()) {
    collections.set(namespace, {
      categories: [...categories].sort(),
    })
  }

  return collections
}

function compareNamespace(
  namespaceSnapshot: UpstreamSurfaceNamespaceSnapshot,
  shippedEntries: NamespaceEntryCollection | undefined,
  namespaceInventory: UpstreamSurfaceNamespaceInventory | undefined,
): UpstreamSurfaceNamespaceResult {
  const catalogEntries = [...new Set(namespaceSnapshot.entries)].sort()
  const catalogSet = new Set(catalogEntries)
  const shipped = shippedEntries?.entries ?? []
  const shippedSet = new Set(shipped)
  const decisions: Record<string, UpstreamSurfaceDecisionEntry> = namespaceInventory?.decisions ?? {}
  const rules = namespaceInventory?.rules ?? []
  const defaultDecision = namespaceInventory?.default
  const seenDecisionNames = new Set<string>()
  const seenRuleIndexes = new Set<number>()
  let usedDefaultDecision = false
  const keptExtras: UpstreamSurfaceNamespacePolicyMatch[] = []
  const unexpectedExtras: string[] = []
  const wantedEntries: UpstreamSurfaceNamespacePolicyMatch[] = []
  const skippedEntries: UpstreamSurfaceNamespacePolicyMatch[] = []
  const untriagedEntries: string[] = []
  for (const entry of shipped) {
    if (catalogSet.has(entry)) {
      continue
    }

    const decision = Object.prototype.hasOwnProperty.call(decisions, entry) ? decisions[entry] : undefined
    if (!decision || !isKeepDecision(decision.decision)) {
      unexpectedExtras.push(entry)
      continue
    }

    seenDecisionNames.add(entry)
    keptExtras.push({ name: entry, ...decision })
  }

  for (const entry of catalogEntries) {
    if (shippedSet.has(entry)) {
      continue
    }

    const match = findCatalogDecision(entry, decisions, rules, defaultDecision)
    if (!match) {
      untriagedEntries.push(entry)
      continue
    }

    const decision = match.entry
    if (match.matchedRuleIndex !== undefined) {
      seenRuleIndexes.add(match.matchedRuleIndex)
    }
    if (match.usedDefault) {
      usedDefaultDecision = true
    }
    if (Object.prototype.hasOwnProperty.call(decisions, entry)) {
      seenDecisionNames.add(entry)
    }

    if (isWantedDecision(decision.decision)) {
      wantedEntries.push({ name: entry, ...decision })
      continue
    }

    if (isSkipDecision(decision.decision)) {
      skippedEntries.push({ name: entry, ...decision })
      continue
    }

    untriagedEntries.push(entry)
  }

  const staleDecisions = Object.entries(decisions)
    .filter(([name]) => !seenDecisionNames.has(name))
    .map(([name, entry]) => ({ name, ...entry }))

  for (const [index, rule] of rules.entries()) {
    if (!seenRuleIndexes.has(index)) {
      staleDecisions.push({
        name: `rule: ${rule.match}`,
        decision: rule.decision,
        note: rule.note,
      })
    }
  }

  if (defaultDecision && !usedDefaultDecision) {
    staleDecisions.push({
      name: 'default',
      decision: defaultDecision.decision,
      note: defaultDecision.note,
    })
  }

  staleDecisions.sort((left, right) => left.name.localeCompare(right.name))

  return {
    namespace: namespaceSnapshot.namespace,
    title: namespaceSnapshot.title ?? namespaceSnapshot.namespace,
    target: namespaceSnapshot.target,
    sourceKind: namespaceSnapshot.sourceKind,
    sourceRef: namespaceSnapshot.sourceRef,
    catalogEntries,
    shippedEntries: shipped,
    ignoredLocutusFunctions:
      namespaceSnapshot.namespace === '__ignored__' ? (shippedEntries?.ignoredFunctions ?? []) : [],
    duplicateLocutusEntries: shippedEntries?.duplicates ?? [],
    keptExtras: keptExtras.sort((left, right) => left.name.localeCompare(right.name)),
    unexpectedExtras,
    wantedEntries: wantedEntries.sort((left, right) => left.name.localeCompare(right.name)),
    skippedEntries: skippedEntries.sort((left, right) => left.name.localeCompare(right.name)),
    untriagedEntries,
    staleDecisions,
  }
}

function createLocutusOnlyNamespaceSnapshot(
  namespace: string,
  namespaceInventory: UpstreamSurfaceNamespaceInventory | undefined,
): UpstreamSurfaceNamespaceSnapshot {
  return {
    namespace,
    title: namespaceInventory?.title ?? namespace,
    target: 'Locutus only',
    sourceKind: 'manual',
    sourceRef: 'no upstream catalog',
    entries: [],
  }
}

export function compareUpstreamSurface(
  functions: RuntimeSurfaceLocutusFunction[],
  handler: LanguageHandler,
  snapshot: UpstreamSurfaceSnapshot,
  inventory: UpstreamSurfaceLanguageInventory = {},
): UpstreamSurfaceCheckResult {
  const locutusEntries = collectLocutusNamespaceEntries(functions, handler)
  const namespaces = snapshot.namespaces
    .map((namespaceSnapshot) =>
      compareNamespace(
        namespaceSnapshot,
        locutusEntries.get(namespaceSnapshot.namespace),
        inventory.namespaces?.[namespaceSnapshot.namespace],
      ),
    )
    .sort((left, right) => left.namespace.localeCompare(right.namespace))

  const remainingNamespaces = [...locutusEntries.keys()]
    .filter(
      (namespace) => namespace !== '__ignored__' && !snapshot.namespaces.some((item) => item.namespace === namespace),
    )
    .sort()

  for (const namespace of remainingNamespaces) {
    const shippedEntries = locutusEntries.get(namespace)
    if (!shippedEntries) {
      continue
    }

    namespaces.push(
      compareNamespace(
        createLocutusOnlyNamespaceSnapshot(namespace, inventory.namespaces?.[namespace]),
        shippedEntries,
        inventory.namespaces?.[namespace],
      ),
    )
  }

  return {
    language: snapshot.language,
    namespaces,
  }
}

export function findUpstreamSurfaceInventoryCoverageIssues(
  snapshots: Map<string, UpstreamSurfaceSnapshot>,
  inventory: UpstreamSurfaceInventory,
): UpstreamSurfaceInventoryCoverageIssue[] {
  const issues: UpstreamSurfaceInventoryCoverageIssue[] = []

  for (const [language, snapshot] of snapshots.entries()) {
    const languageInventory = inventory[language]
    const missingNamespaces = snapshot.namespaces
      .map((namespace) => namespace.namespace)
      .filter(
        (namespace) =>
          !languageInventory?.namespaces ||
          !Object.prototype.hasOwnProperty.call(languageInventory.namespaces, namespace),
      )
      .sort()

    if (!languageInventory || missingNamespaces.length > 0) {
      issues.push({
        language,
        missingLanguage: !languageInventory,
        missingNamespaces,
      })
    }
  }

  return issues.sort((left, right) => left.language.localeCompare(right.language))
}

function compareNamespaceScope(
  namespace: string,
  snapshotNamespace: UpstreamSurfaceNamespaceSnapshot | undefined,
  scopeNamespace: UpstreamSurfaceNamespaceScope | undefined,
): UpstreamSurfaceScopeSourceMismatch | undefined {
  if (!snapshotNamespace || !scopeNamespace) {
    return undefined
  }

  if (
    snapshotNamespace.sourceKind === scopeNamespace.sourceKind &&
    snapshotNamespace.sourceRef === scopeNamespace.sourceRef
  ) {
    return undefined
  }

  return {
    namespace,
    expectedSourceKind: scopeNamespace.sourceKind,
    actualSourceKind: snapshotNamespace.sourceKind,
    expectedSourceRef: scopeNamespace.sourceRef,
    actualSourceRef: snapshotNamespace.sourceRef,
  }
}

export function findUpstreamSurfaceScopeCoverageIssues(
  snapshots: Map<string, UpstreamSurfaceSnapshot>,
  scope: UpstreamSurfaceScope,
): UpstreamSurfaceScopeCoverageIssue[] {
  const issues: UpstreamSurfaceScopeCoverageIssue[] = []
  const allLanguages = [...new Set([...snapshots.keys(), ...Object.keys(scope)])].sort()

  for (const language of allLanguages) {
    const snapshot = snapshots.get(language)
    const languageScope = scope[language]
    const snapshotNamespaces = new Map(snapshot?.namespaces.map((namespace) => [namespace.namespace, namespace]) ?? [])
    const scopeNamespaces = languageScope?.namespaces ?? {}

    const missingNamespaces = Object.keys(scopeNamespaces)
      .filter((namespace) => !snapshotNamespaces.has(namespace))
      .sort()
    const unexpectedNamespaces = [...snapshotNamespaces.keys()]
      .filter((namespace) => !Object.prototype.hasOwnProperty.call(scopeNamespaces, namespace))
      .sort()
    const sourceMismatches = Object.keys(scopeNamespaces)
      .map((namespace) =>
        compareNamespaceScope(namespace, snapshotNamespaces.get(namespace), languageScope?.namespaces?.[namespace]),
      )
      .filter((issue): issue is UpstreamSurfaceScopeSourceMismatch => !!issue)
      .sort((left, right) => left.namespace.localeCompare(right.namespace))

    if (
      !languageScope ||
      !snapshot ||
      missingNamespaces.length ||
      unexpectedNamespaces.length ||
      sourceMismatches.length
    ) {
      issues.push({
        language,
        missingLanguage: !languageScope || !snapshot,
        missingNamespaces,
        unexpectedNamespaces,
        sourceMismatches,
      })
    }
  }

  return issues
}

export function selectUpstreamSurfaceScopeCoverageIssues(
  snapshots: Map<string, UpstreamSurfaceSnapshot>,
  scope: UpstreamSurfaceScope,
  languages: string[],
): UpstreamSurfaceScopeCoverageIssue[] {
  const selected = new Set(languages)
  return findUpstreamSurfaceScopeCoverageIssues(snapshots, scope).filter((issue) => selected.has(issue.language))
}

export function evaluateUpstreamSurface(input: EvaluateUpstreamSurfaceInput): EvaluatedUpstreamSurface {
  const scopeIssues = input.scope
    ? selectUpstreamSurfaceScopeCoverageIssues(input.snapshots, input.scope, input.languages)
    : []
  const coverageIssues = findUpstreamSurfaceInventoryCoverageIssues(input.snapshots, input.inventory)
  const languages = input.languages.map((language) => {
    const handler = input.getHandler(language)
    const snapshot = input.snapshots.get(language)

    if (!handler?.upstreamSurface || !snapshot) {
      throw new Error(`Upstream surface checker is misconfigured for ${language}: missing handler adapter or snapshot.`)
    }

    const functions = input.getFunctions(language)
    const languageInventory = input.inventory[language] ?? {}

    return {
      language,
      functions,
      handler,
      inventory: languageInventory,
      snapshot,
      result: compareUpstreamSurface(functions, handler, snapshot, languageInventory),
    }
  })

  return {
    scopeIssues,
    coverageIssues,
    languages,
  }
}

export function evaluateRepoUpstreamSurface(input: EvaluateRepoUpstreamSurfaceInput): EvaluatedUpstreamSurface {
  return evaluateUpstreamSurface({
    languages: input.languages,
    snapshots: loadUpstreamSurfaceSnapshots(join(input.rootDir, 'test', 'parity', 'fixtures', 'upstream-surface')),
    inventory: loadUpstreamSurfaceInventory(join(input.rootDir, 'docs', 'upstream-surface-inventory.yml')),
    scope: loadUpstreamSurfaceScope(join(input.rootDir, 'docs', 'upstream-surface-scope.yml')),
    getHandler: input.getHandler,
    getFunctions: input.getFunctions,
  })
}

export function hasBlockingUpstreamSurfaceIssues(result: UpstreamSurfaceCheckResult): boolean {
  return result.namespaces.some(
    (namespace) =>
      namespace.unexpectedExtras.length > 0 ||
      namespace.duplicateLocutusEntries.length > 0 ||
      namespace.staleDecisions.length > 0,
  )
}

export function buildUpstreamSurfaceSiteData(input: {
  generatedAt?: string
  languages: Array<{
    language: string
    functions: RuntimeSurfaceLocutusFunction[]
    handler: LanguageHandler
    inventory?: UpstreamSurfaceLanguageInventory
    result: UpstreamSurfaceCheckResult
  }>
}): UpstreamSurfaceSiteData {
  const languages: Record<string, UpstreamSurfaceLanguageSiteData> = {}

  for (const item of input.languages) {
    const categoriesByNamespace = collectLocutusNamespaceCategories(item.functions, item.handler)
    const namespaces = item.result.namespaces
      .map((namespace) => {
        const catalogShippedCount = namespace.catalogEntries.filter((entry) =>
          namespace.shippedEntries.includes(entry),
        ).length
        return {
          ...namespace,
          categories: categoriesByNamespace.get(namespace.namespace)?.categories ?? [],
          catalogShippedCount,
          coveragePercent:
            namespace.catalogEntries.length > 0
              ? Math.round((catalogShippedCount / namespace.catalogEntries.length) * 100)
              : null,
        }
      })
      .sort((left, right) => left.namespace.localeCompare(right.namespace))

    const shippedCount = namespaces.reduce((sum, namespace) => sum + namespace.shippedEntries.length, 0)
    const catalogCount = namespaces.reduce((sum, namespace) => sum + namespace.catalogEntries.length, 0)
    const catalogShippedCount = namespaces.reduce((sum, namespace) => sum + namespace.catalogShippedCount, 0)
    const keptExtraCount = namespaces.reduce((sum, namespace) => sum + namespace.keptExtras.length, 0)
    const unexpectedExtraCount = namespaces.reduce((sum, namespace) => sum + namespace.unexpectedExtras.length, 0)
    const wantedCount = namespaces.reduce((sum, namespace) => sum + namespace.wantedEntries.length, 0)
    const skippedCount = namespaces.reduce((sum, namespace) => sum + namespace.skippedEntries.length, 0)
    const untriagedCount = namespaces.reduce((sum, namespace) => sum + namespace.untriagedEntries.length, 0)

    languages[item.language] = {
      language: item.language,
      title: item.inventory?.title ?? item.handler.displayName,
      ...(item.inventory?.scopeNote ? { scopeNote: item.inventory.scopeNote } : {}),
      namespaceCount: namespaces.length,
      shippedCount,
      catalogCount,
      catalogShippedCount,
      keptExtraCount,
      unexpectedExtraCount,
      wantedCount,
      skippedCount,
      untriagedCount,
      coveragePercent: catalogCount > 0 ? Math.round((catalogShippedCount / catalogCount) * 100) : null,
      namespaces,
    }
  }

  return {
    generatedAt: input.generatedAt ?? new Date().toISOString(),
    languages,
  }
}

function formatList(label: string, values: string[], maxItems = 12): string[] {
  if (!values.length) {
    return []
  }

  const lines = [`    ${label}: ${values.length}`]
  for (const value of values.slice(0, maxItems)) {
    lines.push(`      - ${value}`)
  }
  if (values.length > maxItems) {
    lines.push(`      - ... (${values.length - maxItems} more)`)
  }
  return lines
}

function formatMatches(label: string, values: UpstreamSurfaceNamespacePolicyMatch[], maxItems = 12): string[] {
  if (!values.length) {
    return []
  }

  const grouped = new Map<string, UpstreamSurfaceNamespacePolicyMatch[]>()
  for (const value of values) {
    const existing = grouped.get(value.decision) ?? []
    existing.push(value)
    grouped.set(value.decision, existing)
  }

  const lines: string[] = []
  for (const decision of [...grouped.keys()].sort()) {
    const matches = grouped.get(decision)?.sort((left, right) => left.name.localeCompare(right.name)) ?? []
    lines.push(`    ${label} [${decision}]: ${matches.length}`)
    for (const match of matches.slice(0, maxItems)) {
      lines.push(`      - ${match.name}${match.note ? ` (${match.note})` : ''}`)
    }
    if (matches.length > maxItems) {
      lines.push(`      - ... (${matches.length - maxItems} more)`)
    }
  }

  return lines
}

export function formatUpstreamSurfaceReport(result: UpstreamSurfaceCheckResult): string {
  const lines = [`${result.language} upstream surface`]

  for (const namespace of result.namespaces) {
    lines.push(
      `  ${namespace.namespace} (${namespace.target}; ${namespace.sourceKind} ${namespace.sourceRef})`,
      `    catalog entries: ${namespace.catalogEntries.length}`,
      `    shipped entries: ${namespace.shippedEntries.length}`,
    )
    lines.push(...formatMatches('kept extras', namespace.keptExtras))
    lines.push(...formatList('unexpected extras', namespace.unexpectedExtras))
    lines.push(...formatMatches('wanted', namespace.wantedEntries))
    lines.push(...formatMatches('skipped', namespace.skippedEntries))
    lines.push(...formatList('untriaged', namespace.untriagedEntries))
    lines.push(...formatMatches('stale decisions', namespace.staleDecisions))
    lines.push(...formatList('duplicate locutus entries', namespace.duplicateLocutusEntries))
    lines.push(...formatList('ignored locutus functions', namespace.ignoredLocutusFunctions))
  }

  return lines.join('\n')
}

export function formatInventoryCoverageIssues(issues: UpstreamSurfaceInventoryCoverageIssue[]): string {
  if (issues.length === 0) {
    return ''
  }

  const lines = ['Inventory coverage issues']
  for (const issue of issues) {
    lines.push(`  ${issue.language}`)
    if (issue.missingLanguage) {
      lines.push('    - missing language section')
    }
    for (const namespace of issue.missingNamespaces) {
      lines.push(`    - missing namespace section: ${namespace}`)
    }
  }

  return lines.join('\n')
}

export function formatUpstreamSurfaceScopeIssues(issues: UpstreamSurfaceScopeCoverageIssue[]): string {
  if (issues.length === 0) {
    return ''
  }

  const lines = ['Upstream surface scope issues']
  for (const issue of issues) {
    lines.push(`  ${issue.language}`)
    if (issue.missingLanguage) {
      lines.push('    - missing language scope or snapshot')
    }
    for (const namespace of issue.missingNamespaces) {
      lines.push(`    - missing namespace from snapshot: ${namespace}`)
    }
    for (const namespace of issue.unexpectedNamespaces) {
      lines.push(`    - unexpected namespace in snapshot: ${namespace}`)
    }
    for (const mismatch of issue.sourceMismatches) {
      lines.push(
        `    - source mismatch for ${mismatch.namespace}: expected ${mismatch.expectedSourceKind} ${mismatch.expectedSourceRef}, got ${mismatch.actualSourceKind} ${mismatch.actualSourceRef}`,
      )
    }
  }

  return lines.join('\n')
}
