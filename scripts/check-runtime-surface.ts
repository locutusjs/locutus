#!/usr/bin/env node

/**
 * Discover runtime surfaces from parity containers and compare them against the
 * Locutus functions currently shipped for those languages.
 */

import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'

import { checkDockerAvailable, ensureDockerImage } from '../test/parity/lib/docker.ts'
import { getLanguageHandler, getSupportedLanguages } from '../test/parity/lib/languages/index.ts'
import { findFunctionSources } from '../test/parity/lib/parser.ts'
import {
  compareRuntimeSurface,
  formatRuntimeSurfaceReport,
  resolveRuntimeSurfaceLanguages,
} from '../test/parity/lib/runtime-surface.ts'
import { getLanguageRuntimeSurfacePolicy, loadRuntimeSurfacePolicy } from '../test/parity/lib/runtime-surface-policy.ts'

const __dirname = dirname(fileURLToPath(import.meta.url))
const ROOT = join(__dirname, '..')
const SRC = join(ROOT, 'src')
const RUNTIME_SURFACE_POLICY_PATH = join(ROOT, 'docs', 'runtime-surface-policy.yml')

async function main() {
  const filters = process.argv.slice(2)

  if (!checkDockerAvailable()) {
    console.error('Docker is required for runtime surface checks.')
    process.exit(1)
  }

  const supportedLanguages = getSupportedLanguages()
  const resolution = resolveRuntimeSurfaceLanguages(filters, supportedLanguages, (language) => {
    const handler = getLanguageHandler(language)
    return !!handler?.runtimeSurface
  })

  if (resolution.unknown.length) {
    console.error(`Unknown language filter(s): ${resolution.unknown.join(', ')}`)
    process.exit(1)
  }

  if (resolution.unavailable.length) {
    console.error(`Runtime surface discovery is not implemented for: ${resolution.unavailable.join(', ')}`)
    process.exit(1)
  }

  const runnableLanguages = resolution.selected
  const runtimeSurfacePolicy = loadRuntimeSurfacePolicy(RUNTIME_SURFACE_POLICY_PATH)

  if (!runnableLanguages.length) {
    const requested = filters.length ? filters.join(', ') : 'all supported languages'
    console.error(`No runtime surface adapters are available for ${requested}.`)
    process.exit(1)
  }

  let failed = false

  for (const language of runnableLanguages) {
    const handler = getLanguageHandler(language)
    if (!handler?.runtimeSurface) {
      continue
    }

    if (!ensureDockerImage(handler.dockerImage)) {
      console.error(`Unable to pull Docker image for ${language}: ${handler.dockerImage}`)
      failed = true
      continue
    }

    const functions = findFunctionSources(SRC, language)
    const runtimeSurface = await handler.runtimeSurface.discover()
    const result = compareRuntimeSurface(
      functions,
      handler,
      runtimeSurface,
      getLanguageRuntimeSurfacePolicy(runtimeSurfacePolicy, language),
    )

    console.log(formatRuntimeSurfaceReport(result))
    console.log('')

    if (result.unexpectedExtras.length || result.duplicateEntries.length) {
      failed = true
    }
  }

  if (failed) {
    process.exit(1)
  }
}

main().catch((error) => {
  console.error(error instanceof Error ? error.message : String(error))
  process.exit(1)
})
