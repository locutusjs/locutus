/**
 * Caching utilities for parity test results
 */

import { createHash } from 'node:crypto'
import { existsSync, mkdirSync, readFileSync, writeFileSync } from 'node:fs'
import { dirname, join } from 'node:path'
import type { CacheEntry } from './types.ts'

export const CACHE_VERSION = 9

/**
 * Strip comments and blank lines from code for hashing
 * This makes caching resilient to trivial changes like adding comments
 */
export function stripForHashing(content: string): string {
  return content
    .split('\n')
    .filter((line) => {
      const trimmed = line.trim()
      // Keep lines that have actual code (not just comments or blank)
      if (!trimmed) {
        return false
      }
      if (trimmed.startsWith('//')) {
        return false
      }
      // Keep lines even if they have inline comments
      return true
    })
    .join('\n')
}

/**
 * Calculate hash of file, its dependencies, parity scripts, and Docker image digests
 * Strips comments/whitespace so trivial changes don't invalidate cache
 * Docker digests ensure cache invalidates when the underlying Docker image changes
 */
export function calculateHash(
  filePath: string,
  deps: string[],
  srcDir: string,
  verifyScriptPath: string,
  dockerDigests: Record<string, string> = {},
): string {
  const hash = createHash('sha256')

  // Include Docker image digests so cache invalidates when images update
  // Sort keys for deterministic hash
  for (const [image, digest] of Object.entries(dockerDigests).sort()) {
    hash.update(`${image}:${digest}`)
  }

  // Include parity script directory content so translation changes invalidate cache
  const verifyDir = dirname(verifyScriptPath)
  const verifyFiles = ['verify.ts', 'cache.ts', 'docker.ts', 'parser.ts', 'runner.ts']
  for (const file of verifyFiles) {
    const fullPath = join(verifyDir, file)
    if (existsSync(fullPath)) {
      hash.update(stripForHashing(readFileSync(fullPath, 'utf8')))
    }
  }

  // Include language handlers
  const langDir = join(verifyDir, 'lib', 'languages')
  if (existsSync(langDir)) {
    for (const file of ['index.ts', 'php.ts', 'python.ts']) {
      const fullPath = join(langDir, file)
      if (existsSync(fullPath)) {
        hash.update(stripForHashing(readFileSync(fullPath, 'utf8')))
      }
    }
  }

  // Hash the function file (stripped)
  hash.update(stripForHashing(readFileSync(filePath, 'utf8')))

  // Hash dependencies (stripped)
  for (const dep of deps) {
    const depPath = join(srcDir, dep)
    if (existsSync(depPath)) {
      hash.update(stripForHashing(readFileSync(depPath, 'utf8')))
    }
  }

  return hash.digest('hex').slice(0, 16)
}

/**
 * Load cached verification results for a function
 */
export function loadCache(funcPath: string, cacheDir: string): CacheEntry | null {
  const cacheFile = join(cacheDir, funcPath.replace(/\//g, '_') + '.json')
  if (!existsSync(cacheFile)) {
    return null
  }

  try {
    const entry = JSON.parse(readFileSync(cacheFile, 'utf8')) as CacheEntry
    if (entry.version !== CACHE_VERSION) {
      return null
    }
    return entry
  } catch {
    return null
  }
}

/**
 * Save verification results to cache
 */
export function saveCache(funcPath: string, entry: CacheEntry, cacheDir: string): void {
  mkdirSync(cacheDir, { recursive: true })
  const cacheFile = join(cacheDir, funcPath.replace(/\//g, '_') + '.json')
  writeFileSync(cacheFile, JSON.stringify(entry, null, 2))
}
