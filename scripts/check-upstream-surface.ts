#!/usr/bin/env node

/**
 * Compare Locutus' shipped symbols against checked-in upstream surface
 * snapshots plus the shared wishlist / non-goal inventory.
 */

import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'

import { getLanguageHandler, getSupportedLanguages } from '../test/parity/lib/languages/index.ts'
import { findFunctionSources } from '../test/parity/lib/parser.ts'
import {
  evaluateUpstreamSurface,
  formatInventoryCoverageIssues,
  formatUpstreamSurfaceReport,
  formatUpstreamSurfaceScopeIssues,
  hasBlockingUpstreamSurfaceIssues,
  resolveUpstreamSurfaceLanguages,
} from '../test/parity/lib/upstream-surface.ts'
import { loadUpstreamSurfaceInventory } from '../test/parity/lib/upstream-surface-inventory.ts'
import { loadUpstreamSurfaceScope } from '../test/parity/lib/upstream-surface-scope.ts'
import { loadUpstreamSurfaceSnapshots } from '../test/parity/lib/upstream-surface-snapshots.ts'

const __dirname = dirname(fileURLToPath(import.meta.url))
const ROOT = join(__dirname, '..')
const SRC = join(ROOT, 'src')
const INVENTORY_PATH = join(ROOT, 'docs', 'upstream-surface-inventory.yml')
const SCOPE_PATH = join(ROOT, 'docs', 'upstream-surface-scope.yml')
const SNAPSHOT_DIR = join(ROOT, 'test', 'parity', 'fixtures', 'upstream-surface')

function main() {
  const filters = process.argv.slice(2)
  const snapshots = loadUpstreamSurfaceSnapshots(SNAPSHOT_DIR)
  const supportedLanguages = getSupportedLanguages()
  const resolution = resolveUpstreamSurfaceLanguages(
    filters,
    supportedLanguages,
    (language) => snapshots.has(language) && !!getLanguageHandler(language)?.upstreamSurface,
  )

  if (resolution.unknown.length) {
    console.error(`Unknown language filter(s): ${resolution.unknown.join(', ')}`)
    process.exit(1)
  }

  if (resolution.unavailable.length) {
    console.error(`Upstream surface snapshots are not available for: ${resolution.unavailable.join(', ')}`)
    process.exit(1)
  }

  if (!resolution.selected.length) {
    const requested = filters.length ? filters.join(', ') : 'all supported languages'
    console.error(`No upstream surface snapshots are available for ${requested}.`)
    process.exit(1)
  }

  const inventory = loadUpstreamSurfaceInventory(INVENTORY_PATH)
  const scope = loadUpstreamSurfaceScope(SCOPE_PATH)
  const evaluation = evaluateUpstreamSurface({
    languages: resolution.selected,
    snapshots,
    inventory,
    scope,
    getHandler: getLanguageHandler,
    getFunctions: (language) => findFunctionSources(SRC, language),
  })
  if (evaluation.scopeIssues.length > 0) {
    console.error(formatUpstreamSurfaceScopeIssues(evaluation.scopeIssues))
    process.exit(1)
  }
  const coverageIssues = evaluation.coverageIssues
  if (coverageIssues.length > 0) {
    console.error(formatInventoryCoverageIssues(coverageIssues))
    process.exit(1)
  }

  let failed = false

  for (const language of evaluation.languages) {
    console.log(formatUpstreamSurfaceReport(language.result))
    console.log('')

    if (hasBlockingUpstreamSurfaceIssues(language.result)) {
      failed = true
    }
  }

  if (failed) {
    process.exit(1)
  }
}

try {
  main()
} catch (error: unknown) {
  console.error(error instanceof Error ? error.message : String(error))
  process.exit(1)
}
