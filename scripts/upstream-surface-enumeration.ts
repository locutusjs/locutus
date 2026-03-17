import { mkdirSync, writeFileSync } from 'node:fs'
import { join } from 'node:path'

import YAML from 'js-yaml'

import { checkDockerAvailable, ensureDockerImage } from '../test/parity/lib/docker.ts'
import { getLanguageHandler, getSupportedLanguages } from '../test/parity/lib/languages/index.ts'
import {
  findUpstreamSurfaceScopeCoverageIssues,
  formatUpstreamSurfaceScopeIssues,
  resolveUpstreamSurfaceLanguages,
} from '../test/parity/lib/upstream-surface.ts'
import { loadUpstreamSurfaceScope } from '../test/parity/lib/upstream-surface-scope.ts'
import {
  getUpstreamSurfaceSnapshotPath,
  loadUpstreamSurfaceSnapshots,
} from '../test/parity/lib/upstream-surface-snapshots.ts'

export type UpstreamSurfaceEnumerationMode = 'all' | 'discoverable'

export interface UpstreamSurfaceEnumerationOptions {
  filters: string[]
  mode: UpstreamSurfaceEnumerationMode
  rootDir: string
  logger?: Pick<typeof console, 'log' | 'error'>
}

export function canEnumerateUpstreamSurfaceLanguage(language: string, mode: UpstreamSurfaceEnumerationMode, rootDir: string) {
  const handler = getLanguageHandler(language)
  if (handler?.upstreamSurface?.discover) {
    return true
  }

  if (mode === 'discoverable') {
    return false
  }

  const snapshotDir = join(rootDir, 'test', 'parity', 'fixtures', 'upstream-surface')
  const snapshots = loadUpstreamSurfaceSnapshots(snapshotDir)
  return snapshots.has(language)
}

export async function enumerateUpstreamSurfaceSnapshots({
  filters,
  mode,
  rootDir,
  logger = console,
}: UpstreamSurfaceEnumerationOptions): Promise<void> {
  const scopePath = join(rootDir, 'docs', 'upstream-surface-scope.yml')
  const snapshotDir = join(rootDir, 'test', 'parity', 'fixtures', 'upstream-surface')
  const scope = loadUpstreamSurfaceScope(scopePath)
  const snapshots = loadUpstreamSurfaceSnapshots(snapshotDir)
  const supportedLanguages = getSupportedLanguages()
  const resolution = resolveUpstreamSurfaceLanguages(filters, supportedLanguages, (language) => {
    const handler = getLanguageHandler(language)
    return !!handler?.upstreamSurface?.discover || (mode === 'all' && snapshots.has(language))
  })

  if (resolution.unknown.length) {
    logger.error(`Unknown language filter(s): ${resolution.unknown.join(', ')}`)
    process.exit(1)
  }

  if (resolution.unavailable.length) {
    const reason =
      mode === 'discoverable'
        ? 'Live upstream surface discovery is not implemented for'
        : 'Upstream surface snapshots or discovery are not available for'
    logger.error(`${reason}: ${resolution.unavailable.join(', ')}`)
    process.exit(1)
  }

  if (!resolution.selected.length) {
    const requested = filters.length ? filters.join(', ') : 'all supported languages'
    const reason =
      mode === 'discoverable'
        ? `No upstream surface adapters are available for ${requested}.`
        : `No upstream surface catalogs are available for ${requested}.`
    logger.error(reason)
    process.exit(1)
  }

  const needsDocker = resolution.selected.some((language) => !!getLanguageHandler(language)?.upstreamSurface?.discover)
  if (needsDocker && !checkDockerAvailable()) {
    logger.error('Docker is required for upstream surface enumeration.')
    process.exit(1)
  }

  mkdirSync(snapshotDir, { recursive: true })
  const enumeratedSnapshots = new Map(snapshots)

  for (const language of resolution.selected) {
    const handler = getLanguageHandler(language)
    const snapshotPath = getUpstreamSurfaceSnapshotPath(snapshotDir, language)

    if (handler?.upstreamSurface?.discover) {
      if (!ensureDockerImage(handler.dockerImage)) {
        logger.error(`Unable to pull Docker image for ${language}: ${handler.dockerImage}`)
        process.exit(1)
      }

      const snapshot = await handler.upstreamSurface.discover()
      writeFileSync(snapshotPath, YAML.dump(snapshot, { lineWidth: 120 }), 'utf8')
      enumeratedSnapshots.set(language, snapshot)
      logger.log(`Wrote ${snapshotPath} (discovered from ${snapshot.namespaces[0]?.sourceKind ?? 'runtime'})`)
      continue
    }

    const snapshot = snapshots.get(language)
    if (!snapshot) {
      logger.error(`No checked-in upstream surface snapshot is available for ${language}.`)
      process.exit(1)
    }

    enumeratedSnapshots.set(language, snapshot)
    logger.log(`Using ${snapshotPath} (kept ${snapshot.namespaces[0]?.sourceKind ?? 'manual'} snapshot)`)
  }

  const scopeIssues = findUpstreamSurfaceScopeCoverageIssues(enumeratedSnapshots, scope).filter((issue) =>
    resolution.selected.includes(issue.language),
  )
  if (scopeIssues.length > 0) {
    logger.error(formatUpstreamSurfaceScopeIssues(scopeIssues))
    process.exit(1)
  }
}
