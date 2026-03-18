import { mkdirSync, writeFileSync } from 'node:fs'
import { join } from 'node:path'

import YAML from 'js-yaml'

import { checkDockerAvailable, ensureDockerImage } from '../test/parity/lib/docker.ts'
import { getLanguageHandler, getSupportedLanguages } from '../test/parity/lib/languages/index.ts'
import { resolveUpstreamSurfaceLanguages } from '../test/parity/lib/upstream-surface.ts'
import { getUpstreamSurfaceSnapshotPath } from '../test/parity/lib/upstream-surface-snapshots.ts'

export type UpstreamSurfaceEnumerationMode = 'all' | 'discoverable'

export interface UpstreamSurfaceEnumerationOptions {
  filters: string[]
  mode: UpstreamSurfaceEnumerationMode
  rootDir: string
  snapshotDir?: string
  logger?: Pick<typeof console, 'log' | 'error'>
}

export function canEnumerateUpstreamSurfaceLanguage(
  language: string,
  _mode: UpstreamSurfaceEnumerationMode,
  _rootDir: string,
) {
  const handler = getLanguageHandler(language)
  return !!handler?.upstreamSurface?.discover && (handler.upstreamSurface.discoverMode ?? 'live') !== 'snapshot'
}

export async function enumerateUpstreamSurfaceSnapshots({
  filters,
  mode,
  rootDir,
  snapshotDir: configuredSnapshotDir,
  logger = console,
}: UpstreamSurfaceEnumerationOptions): Promise<void> {
  const snapshotDir =
    configuredSnapshotDir ?? join(rootDir, 'test', 'parity', 'fixtures', 'upstream-surface-discovered')
  const supportedLanguages = getSupportedLanguages()
  const resolution = resolveUpstreamSurfaceLanguages(filters, supportedLanguages, (language) => {
    const handler = getLanguageHandler(language)
    return !!handler?.upstreamSurface?.discover && (handler.upstreamSurface.discoverMode ?? 'live') !== 'snapshot'
  })

  if (resolution.unknown.length) {
    logger.error(`Unknown language filter(s): ${resolution.unknown.join(', ')}`)
    process.exit(1)
  }

  if (resolution.unavailable.length) {
    const reason = 'Canonical upstream surface discovery is not implemented for'
    logger.error(`${reason}: ${resolution.unavailable.join(', ')}`)
    process.exit(1)
  }

  if (!resolution.selected.length) {
    const requested = filters.length ? filters.join(', ') : 'all supported languages'
    logger.error(`No canonical upstream surface discovery is available for ${requested}.`)
    process.exit(1)
  }

  const needsDocker = resolution.selected.some((language) => {
    const handler = getLanguageHandler(language)
    return (
      !!handler?.upstreamSurface?.discover &&
      handler.upstreamSurface.discoverMode !== 'snapshot' &&
      (handler.upstreamSurface.discoverUsesDocker ?? true)
    )
  })
  if (needsDocker && !checkDockerAvailable()) {
    logger.error('Docker is required for upstream surface enumeration.')
    process.exit(1)
  }

  mkdirSync(snapshotDir, { recursive: true })

  for (const language of resolution.selected) {
    const handler = getLanguageHandler(language)
    const snapshotPath = getUpstreamSurfaceSnapshotPath(snapshotDir, language)

    if (handler?.upstreamSurface?.discover) {
      if (
        handler.upstreamSurface.discoverMode !== 'snapshot' &&
        (handler.upstreamSurface.discoverUsesDocker ?? true) &&
        !ensureDockerImage(handler.dockerImage)
      ) {
        logger.error(`Unable to pull Docker image for ${language}: ${handler.dockerImage}`)
        process.exit(1)
      }

      const snapshot = await handler.upstreamSurface.discover()
      writeFileSync(snapshotPath, YAML.dump(snapshot, { lineWidth: 120 }), 'utf8')
      logger.log(`Wrote ${snapshotPath} (discovered from ${snapshot.namespaces[0]?.sourceKind ?? 'runtime'})`)
      continue
    }
  }
}
