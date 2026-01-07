/**
 * Caching utilities for verification results
 */

import { createHash } from 'node:crypto'
import { existsSync, mkdirSync, readFileSync, writeFileSync } from 'node:fs'
import { join } from 'node:path'
import type { CacheEntry } from './types.ts'

export const CACHE_VERSION = 6

/**
 * Calculate hash of file, its dependencies, and verify script
 * Including verify script ensures cache invalidation when translation logic changes
 */
export function calculateHash(filePath: string, deps: string[], srcDir: string, verifyScriptPath: string): string {
  const hash = createHash('sha256')

  // Include verify script content so translation changes invalidate cache
  hash.update(readFileSync(verifyScriptPath))
  hash.update(readFileSync(filePath))

  for (const dep of deps) {
    const depPath = join(srcDir, dep)
    if (existsSync(depPath)) {
      hash.update(readFileSync(depPath))
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
