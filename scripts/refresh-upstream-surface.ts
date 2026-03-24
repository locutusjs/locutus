#!/usr/bin/env node

/**
 * Refresh only the live-discoverable upstream surface snapshots.
 *
 * For a full tracked-catalog enumeration across runtime and canonical
 * docs/source discovery, use `scripts/enumerate-upstream-surface.ts` instead.
 */

import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'

import { enumerateUpstreamSurfaceSnapshots } from './upstream-surface-enumeration.ts'

const __dirname = dirname(fileURLToPath(import.meta.url))
const ROOT = join(__dirname, '..')

async function main() {
  await enumerateUpstreamSurfaceSnapshots({
    filters: process.argv.slice(2),
    mode: 'discoverable',
    rootDir: ROOT,
  })
}

main().catch((error) => {
  console.error(error instanceof Error ? error.message : String(error))
  process.exit(1)
})
