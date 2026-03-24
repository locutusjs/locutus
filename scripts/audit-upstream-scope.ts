#!/usr/bin/env node

/**
 * Audit canonical upstream namespace scope against language-level discovery.
 *
 * This catches missing official namespaces in docs/upstream-surface-scope.yml
 * before per-namespace function discovery even runs.
 */

import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'

import { auditUpstreamSurfaceScope } from './upstream-surface-scope-audit.ts'

const __dirname = dirname(fileURLToPath(import.meta.url))
const ROOT = join(__dirname, '..')

async function main() {
  await auditUpstreamSurfaceScope({
    filters: process.argv.slice(2),
    rootDir: ROOT,
  })
}

main().catch((error: unknown) => {
  console.error(error instanceof Error ? error.message : String(error))
  process.exit(1)
})
