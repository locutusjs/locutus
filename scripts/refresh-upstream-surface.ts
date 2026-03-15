#!/usr/bin/env node

/**
 * Refresh checked-in upstream surface snapshots from live runtime / source
 * adapters. Languages without adapters keep their curated manual snapshots.
 */

import { mkdirSync, writeFileSync } from 'node:fs'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'

import YAML from 'js-yaml'

import { checkDockerAvailable, ensureDockerImage } from '../test/parity/lib/docker.ts'
import { getLanguageHandler, getSupportedLanguages } from '../test/parity/lib/languages/index.ts'
import { resolveUpstreamSurfaceLanguages } from '../test/parity/lib/upstream-surface.ts'
import { getUpstreamSurfaceSnapshotPath } from '../test/parity/lib/upstream-surface-snapshots.ts'

const __dirname = dirname(fileURLToPath(import.meta.url))
const ROOT = join(__dirname, '..')
const SNAPSHOT_DIR = join(ROOT, 'test', 'parity', 'fixtures', 'upstream-surface')

async function main() {
  const filters = process.argv.slice(2)
  const supportedLanguages = getSupportedLanguages()
  const resolution = resolveUpstreamSurfaceLanguages(filters, supportedLanguages, (language) => {
    const handler = getLanguageHandler(language)
    return !!handler?.upstreamSurface?.discover
  })

  if (resolution.unknown.length) {
    console.error(`Unknown language filter(s): ${resolution.unknown.join(', ')}`)
    process.exit(1)
  }

  if (resolution.unavailable.length) {
    console.error(`Live upstream surface discovery is not implemented for: ${resolution.unavailable.join(', ')}`)
    process.exit(1)
  }

  if (!resolution.selected.length) {
    const requested = filters.length ? filters.join(', ') : 'all supported languages'
    console.error(`No upstream surface adapters are available for ${requested}.`)
    process.exit(1)
  }

  if (!checkDockerAvailable()) {
    console.error('Docker is required for upstream surface refresh.')
    process.exit(1)
  }

  mkdirSync(SNAPSHOT_DIR, { recursive: true })

  for (const language of resolution.selected) {
    const handler = getLanguageHandler(language)
    if (!handler?.upstreamSurface?.discover) {
      continue
    }

    if (!ensureDockerImage(handler.dockerImage)) {
      console.error(`Unable to pull Docker image for ${language}: ${handler.dockerImage}`)
      process.exit(1)
    }

    const snapshot = await handler.upstreamSurface.discover()
    const snapshotPath = getUpstreamSurfaceSnapshotPath(SNAPSHOT_DIR, language)
    writeFileSync(snapshotPath, YAML.dump(snapshot, { lineWidth: 120 }), 'utf8')
    console.log(`Wrote ${snapshotPath}`)
  }
}

main().catch((error) => {
  console.error(error instanceof Error ? error.message : String(error))
  process.exit(1)
})
