import { getLanguageHandler, getSupportedLanguages } from '../test/parity/lib/languages/index.ts'
import type { DiscoveredUpstreamSurfaceNamespaceCatalog } from '../test/parity/lib/types.ts'
import {
  findUpstreamSurfaceNamespaceCatalogIssues,
  formatUpstreamSurfaceNamespaceCatalogIssues,
  resolveUpstreamSurfaceLanguages,
} from '../test/parity/lib/upstream-surface.ts'
import { loadUpstreamSurfaceScope } from '../test/parity/lib/upstream-surface-scope.ts'

export interface UpstreamSurfaceScopeAuditOptions {
  filters?: string[]
  logger?: Pick<typeof console, 'log' | 'error'>
  rootDir: string
  selectedLanguages?: string[]
}

export async function auditUpstreamSurfaceScope({
  filters = [],
  logger = console,
  rootDir,
  selectedLanguages,
}: UpstreamSurfaceScopeAuditOptions): Promise<void> {
  const scope = loadUpstreamSurfaceScope(`${rootDir}/docs/upstream-surface-scope.yml`)
  const supportedLanguages = getSupportedLanguages()
  const resolution = resolveUpstreamSurfaceLanguages(filters, supportedLanguages, (language) => {
    const handler = getLanguageHandler(language)
    return !!handler?.upstreamSurface?.discoverNamespaceCatalog
  })

  if (resolution.unknown.length) {
    throw new Error(`Unknown language filter(s): ${resolution.unknown.join(', ')}`)
  }

  if (resolution.unavailable.length) {
    throw new Error(
      `Canonical upstream namespace discovery is not implemented for: ${resolution.unavailable.join(', ')}`,
    )
  }

  const requested = selectedLanguages ?? resolution.selected
  if (!requested.length) {
    const requestedLabel = filters.length ? filters.join(', ') : 'all supported languages'
    throw new Error(`No canonical upstream namespace discovery is available for ${requestedLabel}.`)
  }

  const discovered = new Map<string, DiscoveredUpstreamSurfaceNamespaceCatalog>()
  for (const language of requested) {
    const handler = getLanguageHandler(language)
    const catalog = await handler?.upstreamSurface?.discoverNamespaceCatalog?.()
    if (!catalog) {
      throw new Error(`Canonical upstream namespace discovery did not return a namespace catalog for ${language}.`)
    }
    discovered.set(language, {
      ...catalog,
      namespaces: [...new Set(catalog.namespaces)].sort(),
    })
  }

  const issues = findUpstreamSurfaceNamespaceCatalogIssues(discovered, scope).filter((issue) =>
    requested.includes(issue.language),
  )
  if (issues.length > 0) {
    throw new Error(formatUpstreamSurfaceNamespaceCatalogIssues(issues))
  }

  for (const language of requested) {
    const catalog = discovered.get(language)
    const namespaces = catalog?.namespaces ?? []
    logger.log(
      `${language}: ${namespaces.length} namespaces (${catalog?.sourceKind ?? 'unknown'} ${catalog?.sourceRef ?? 'unknown'})`,
    )
  }
}
