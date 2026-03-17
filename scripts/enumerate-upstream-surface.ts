#!/usr/bin/env node

/**
 * Enumerate the full tracked upstream catalog across all language sources.
 *
 * - runtime-discovered languages refresh from their parity target
 * - docs/source/manual languages validate and reuse their checked-in snapshots
 *
 * This is the "full vision" command for inspecting tracked scope before
 * deciding whether to narrow discovery or apply broader inventory defaults.
 */

import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'

import { enumerateUpstreamSurfaceSnapshots } from './upstream-surface-enumeration.ts'

const __dirname = dirname(fileURLToPath(import.meta.url))
const ROOT = join(__dirname, '..')

async function main() {
  await enumerateUpstreamSurfaceSnapshots({
    filters: process.argv.slice(2),
    mode: 'all',
    rootDir: ROOT,
  })
}

main().catch((error) => {
  console.error(error instanceof Error ? error.message : String(error))
  process.exit(1)
})
