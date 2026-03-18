#!/usr/bin/env node

/**
 * Audit canonical upstream namespace scope against language-level discovery.
 *
 * This catches missing official namespaces in docs/upstream-surface-scope.yml
 * before per-namespace function discovery even runs.
 */

import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'

import { getLanguageHandler, getSupportedLanguages } from '../test/parity/lib/languages/index.ts'
import type { DiscoveredUpstreamSurfaceNamespaceCatalog } from '../test/parity/lib/types.ts'
import {
  findUpstreamSurfaceNamespaceCatalogIssues,
  formatUpstreamSurfaceNamespaceCatalogIssues,
  resolveUpstreamSurfaceLanguages,
} from '../test/parity/lib/upstream-surface.ts'
import { loadUpstreamSurfaceScope } from '../test/parity/lib/upstream-surface-scope.ts'

const __dirname = dirname(fileURLToPath(import.meta.url))
const ROOT = join(__dirname, '..')

async function main() {
  const filters = process.argv.slice(2)
  const scope = loadUpstreamSurfaceScope(join(ROOT, 'docs', 'upstream-surface-scope.yml'))
  const supportedLanguages = getSupportedLanguages()
  const resolution = resolveUpstreamSurfaceLanguages(filters, supportedLanguages, (language) => {
    const handler = getLanguageHandler(language)
    return !!handler?.upstreamSurface?.discoverNamespaceCatalog
  })

  if (resolution.unknown.length) {
    console.error(`Unknown language filter(s): ${resolution.unknown.join(', ')}`)
    process.exit(1)
  }

  if (resolution.unavailable.length) {
    console.error(`Canonical upstream namespace discovery is not implemented for: ${resolution.unavailable.join(', ')}`)
    process.exit(1)
  }

  if (!resolution.selected.length) {
    const requested = filters.length ? filters.join(', ') : 'all supported languages'
    console.error(`No canonical upstream namespace discovery is available for ${requested}.`)
    process.exit(1)
  }

  const discovered = new Map<string, DiscoveredUpstreamSurfaceNamespaceCatalog>()
  for (const language of resolution.selected) {
    const handler = getLanguageHandler(language)
    const catalog = await handler?.upstreamSurface?.discoverNamespaceCatalog?.()
    if (!catalog) {
      console.error(`Canonical upstream namespace discovery did not return a namespace catalog for ${language}.`)
      process.exit(1)
    }
    discovered.set(language, {
      ...catalog,
      namespaces: [...new Set(catalog.namespaces)].sort(),
    })
  }

  const issues = findUpstreamSurfaceNamespaceCatalogIssues(discovered, scope).filter((issue) =>
    resolution.selected.includes(issue.language),
  )
  if (issues.length > 0) {
    console.error(formatUpstreamSurfaceNamespaceCatalogIssues(issues))
    process.exit(1)
  }

  for (const language of resolution.selected) {
    const catalog = discovered.get(language)
    const namespaces = catalog?.namespaces ?? []
    console.log(
      `${language}: ${namespaces.length} namespaces (${catalog?.sourceKind ?? 'unknown'} ${catalog?.sourceRef ?? 'unknown'})`,
    )
  }
}

main().catch((error: unknown) => {
  console.error(error instanceof Error ? error.message : String(error))
  process.exit(1)
})
