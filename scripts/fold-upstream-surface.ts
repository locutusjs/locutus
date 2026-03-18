#!/usr/bin/env node

import { copyFileSync, existsSync, mkdirSync } from 'node:fs'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'

import { getSupportedLanguages } from '../test/parity/lib/languages/index.ts'
import { resolveUpstreamSurfaceLanguages } from '../test/parity/lib/upstream-surface.ts'
import { getUpstreamSurfaceSnapshotPath } from '../test/parity/lib/upstream-surface-snapshots.ts'

const __dirname = dirname(fileURLToPath(import.meta.url))
const ROOT = join(__dirname, '..')
const DISCOVERED_DIR = join(ROOT, 'test', 'parity', 'fixtures', 'upstream-surface-discovered')
const TRACKED_DIR = join(ROOT, 'test', 'parity', 'fixtures', 'upstream-surface')

function main() {
  const filters = process.argv.slice(2)
  const supportedLanguages = getSupportedLanguages()
  const resolution = resolveUpstreamSurfaceLanguages(filters, supportedLanguages, (language) =>
    existsSync(getUpstreamSurfaceSnapshotPath(DISCOVERED_DIR, language)),
  )

  if (resolution.unknown.length) {
    console.error(`Unknown language filter(s): ${resolution.unknown.join(', ')}`)
    process.exit(1)
  }

  if (resolution.unavailable.length) {
    console.error(`No discovered upstream surface snapshot is available for: ${resolution.unavailable.join(', ')}`)
    process.exit(1)
  }

  if (!resolution.selected.length) {
    const requested = filters.length ? filters.join(', ') : 'all supported languages'
    console.error(`No discovered upstream surface snapshots are available for ${requested}.`)
    process.exit(1)
  }

  mkdirSync(TRACKED_DIR, { recursive: true })

  for (const language of resolution.selected) {
    const sourcePath = getUpstreamSurfaceSnapshotPath(DISCOVERED_DIR, language)
    const targetPath = getUpstreamSurfaceSnapshotPath(TRACKED_DIR, language)
    copyFileSync(sourcePath, targetPath)
    console.log(`Folded ${sourcePath} -> ${targetPath}`)
  }
}

main()
