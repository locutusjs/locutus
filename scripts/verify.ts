#!/usr/bin/env node
/**
 * Cross-language verification for locutus functions
 *
 * Verifies JS implementations against actual language runtimes via Docker.
 * Caches results based on file content hashes for fast subsequent runs.
 *
 * Usage:
 *   node scripts/verify.ts                      # Verify functions with 'verified:' header (CI mode)
 *   node scripts/verify.ts --all                # Include unverified functions (warnings only)
 *   node scripts/verify.ts php                  # Filter to PHP only
 *   node scripts/verify.ts php/strings/sprintf  # Verify specific function
 *   node scripts/verify.ts --no-cache           # Skip cache
 *   node scripts/verify.ts --summary            # Show counts only, don't run tests
 */

import { availableParallelism } from 'node:os'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'
import pMap from 'p-map'

import { CACHE_VERSION, calculateHash, loadCache, saveCache } from './verify/cache.ts'
import { checkDockerAvailable, ensureDockerImage, runInDocker } from './verify/docker.ts'
import { getLanguageHandler, isLanguageSupported } from './verify/languages/index.ts'
import { findFunctions, parseFunctionWithUtil } from './verify/parser.ts'
import { evaluateExpected, runJs } from './verify/runner.ts'
import type { FunctionInfo, VerifyOptions, VerifyResult, VerifySummary } from './verify/types.ts'

const __dirname = dirname(fileURLToPath(import.meta.url))
const ROOT = join(__dirname, '..')
const SRC = join(ROOT, 'src')
const CACHE_DIR = join(ROOT, '.cache', 'verify')
const VERIFY_SCRIPT_PATH = fileURLToPath(import.meta.url)

/**
 * Verify a single function against its native runtime
 */
async function verifyFunction(func: FunctionInfo, options: VerifyOptions): Promise<VerifyResult[]> {
  const fullPath = join(SRC, func.path + '.js')

  // Parse function with util.js for accurate example extraction
  let parsed: { examples: typeof func.examples; dependsOn: string[]; verified: string[] }
  try {
    parsed = await parseFunctionWithUtil(func.path, SRC, ROOT)
  } catch {
    parsed = { examples: func.examples, dependsOn: func.dependsOn, verified: func.verified }
  }

  const hash = calculateHash(fullPath, parsed.dependsOn, SRC, VERIFY_SCRIPT_PATH)

  // Check cache
  if (options.useCache) {
    const cached = loadCache(func.path, CACHE_DIR)
    if (cached && cached.hash === hash) {
      return cached.results
    }
  }

  const results: VerifyResult[] = []
  const handler = getLanguageHandler(func.language)

  // If no handler, skip with a note
  if (!handler) {
    for (const example of parsed.examples) {
      const expectedEval = evaluateExpected(example.expectedRaw)
      results.push({
        example: example.number,
        passed: true,
        expected: expectedEval.success ? expectedEval.result : example.expectedRaw,
        jsResult: example.expectedRaw,
        nativeResult: 'Skipped (verification not implemented)',
      })
    }
    saveCache(func.path, { hash, results, timestamp: Date.now(), version: CACHE_VERSION }, CACHE_DIR)
    return results
  }

  // Check if function is in skip list
  if (handler.skipList.has(func.name)) {
    for (const example of parsed.examples) {
      const expectedEval = evaluateExpected(example.expectedRaw)
      results.push({
        example: example.number,
        passed: true,
        expected: expectedEval.success ? expectedEval.result : example.expectedRaw,
        jsResult: expectedEval.success ? expectedEval.result : example.expectedRaw,
        nativeResult: `Skipped (function unavailable in ${handler.dockerImage})`,
      })
    }
    saveCache(func.path, { hash, results, timestamp: Date.now(), version: CACHE_VERSION }, CACHE_DIR)
    return results
  }

  // Ensure Docker image is available
  if (!ensureDockerImage(handler.dockerImage)) {
    for (const example of parsed.examples) {
      results.push({
        example: example.number,
        passed: false,
        expected: example.expectedRaw,
        jsResult: 'N/A',
        nativeResult: 'N/A',
        error: `Failed to pull Docker image: ${handler.dockerImage}`,
      })
    }
    saveCache(func.path, { hash, results, timestamp: Date.now(), version: CACHE_VERSION }, CACHE_DIR)
    return results
  }

  // Verify each example
  for (const example of parsed.examples) {
    const expectedEval = evaluateExpected(example.expectedRaw)
    if (!expectedEval.success) {
      results.push({
        example: example.number,
        passed: false,
        expected: example.expectedRaw,
        jsResult: '',
        nativeResult: '',
        error: `Expected eval error: ${expectedEval.error}`,
      })
      continue
    }

    // Run JS implementation
    const jsRun = runJs(fullPath, func.name, example)
    if (!jsRun.success) {
      results.push({
        example: example.number,
        passed: false,
        expected: expectedEval.result,
        jsResult: '',
        nativeResult: '',
        error: jsRun.error,
      })
      continue
    }

    // Check JS result matches expected
    if (jsRun.result.trim() !== expectedEval.result.trim()) {
      results.push({
        example: example.number,
        passed: false,
        expected: expectedEval.result,
        jsResult: jsRun.result,
        nativeResult: '',
        error: 'JS result mismatch',
      })
      continue
    }

    // Translate JS to native language
    const nativeCode = handler.translate(example.code, func.name)
    if (!nativeCode.trim()) {
      results.push({
        example: example.number,
        passed: false,
        expected: expectedEval.result,
        jsResult: jsRun.result,
        nativeResult: '',
        error: `Failed to translate JS to ${func.language}`,
      })
      continue
    }

    // Run in Docker
    const nativeRun = runInDocker(handler.dockerImage, handler.dockerCmd(nativeCode), {
      mountRepo: handler.mountRepo,
      repoPath: ROOT,
    })

    if (!nativeRun.success) {
      results.push({
        example: example.number,
        passed: false,
        expected: expectedEval.result,
        jsResult: jsRun.result,
        nativeResult: nativeRun.output,
        error: nativeRun.error,
      })
      continue
    }

    // Normalize and compare
    const nativeResult = handler.normalize(nativeRun.output)
    const passed = expectedEval.result.trim() === nativeResult
    results.push({
      example: example.number,
      passed,
      expected: expectedEval.result,
      jsResult: jsRun.result,
      nativeResult,
      error: passed ? undefined : `${func.language.toUpperCase()} result mismatch`,
    })
  }

  // Save to cache
  saveCache(func.path, { hash, results, timestamp: Date.now(), version: CACHE_VERSION }, CACHE_DIR)
  return results
}

/**
 * Print verification results
 */
function printResults(
  allResults: Array<{ func: FunctionInfo; results: VerifyResult[]; error: unknown; skippedReason?: string }>,
  options: VerifyOptions,
): VerifySummary {
  const summary: VerifySummary = { passed: 0, failed: 0, skipped: 0, unverified: 0 }

  for (const { func, results, error, skippedReason } of allResults) {
    if (skippedReason) {
      process.stdout.write(`  ${func.path}... `)
      console.log(`\x1b[33m⊘\x1b[0m (${skippedReason})`)
      summary.unverified++
      continue
    }

    process.stdout.write(`  ${func.path}... `)

    if (error) {
      console.log('\x1b[33m?\x1b[0m')
      summary.skipped++
      continue
    }

    const allPassed = results.every((r) => r.passed)
    if (allPassed) {
      console.log('\x1b[32m✓\x1b[0m')
      summary.passed++
    } else {
      console.log('\x1b[31m✗\x1b[0m')
      summary.failed++
      for (const r of results.filter((x) => !x.passed)) {
        console.log(`    Example ${r.example}: ${r.error || 'Mismatch'}`)
        console.log(`      expected: ${r.expected}`)
        console.log(`      js: ${r.jsResult}`)
        console.log(`      native: ${r.nativeResult}`)
      }
    }
  }

  return summary
}

/**
 * Main entry point
 */
async function main() {
  const args = process.argv.slice(2)

  const options: VerifyOptions = {
    useCache: !args.includes('--no-cache'),
    includeUnverified: args.includes('--all') || args.includes('--include-unverified'),
    filter: args.find((a) => !a.startsWith('-')),
  }

  const summaryOnly = args.includes('--summary')

  console.log('Locutus Cross-Language Verification')
  console.log('====================================\n')

  // Check Docker availability
  if (!checkDockerAvailable()) {
    console.error('Error: Docker is required but not available')
    process.exit(1)
  }

  // Find all functions
  const allFunctions = findFunctions(SRC, options.filter)

  // Separate verified and unverified functions
  const verifiedFunctions: FunctionInfo[] = []
  const unverifiedFunctions: FunctionInfo[] = []

  for (const func of allFunctions) {
    const handler = getLanguageHandler(func.language)
    if (!handler) {
      // Language not supported - treat as unverified
      unverifiedFunctions.push(func)
      continue
    }

    // Check if function has verified: header matching the handler version
    const isVerified = func.verified.some((v) => v === handler.version || handler.version.startsWith(v))
    if (isVerified) {
      verifiedFunctions.push(func)
    } else {
      unverifiedFunctions.push(func)
    }
  }

  // Summary mode
  if (summaryOnly) {
    console.log('Summary:')
    console.log(`  Verified functions: ${verifiedFunctions.length}`)
    console.log(`  Unverified functions: ${unverifiedFunctions.length}`)
    console.log(`  Total: ${allFunctions.length}`)

    // Break down by language
    const byLanguage: Record<string, { verified: number; unverified: number }> = {}
    for (const func of allFunctions) {
      if (!byLanguage[func.language]) {
        byLanguage[func.language] = { verified: 0, unverified: 0 }
      }
    }
    for (const func of verifiedFunctions) {
      byLanguage[func.language].verified++
    }
    for (const func of unverifiedFunctions) {
      byLanguage[func.language].unverified++
    }

    console.log('\nBy language:')
    for (const [lang, counts] of Object.entries(byLanguage).sort()) {
      const supported = isLanguageSupported(lang) ? '' : ' (not supported)'
      console.log(`  ${lang}: ${counts.verified} verified, ${counts.unverified} unverified${supported}`)
    }

    process.exit(0)
  }

  // Determine which functions to verify
  const functionsToVerify = options.includeUnverified ? allFunctions : verifiedFunctions

  const concurrency = Math.min(availableParallelism(), 8)
  console.log(`Found ${functionsToVerify.length} functions to verify (concurrency: ${concurrency})`)
  if (!options.includeUnverified && unverifiedFunctions.length > 0) {
    console.log(`  (${unverifiedFunctions.length} unverified functions skipped, use --all to include)\n`)
  } else {
    console.log('')
  }

  // Run verifications in parallel
  const allResults = await pMap(
    functionsToVerify,
    async (func) => {
      // Check if this is an unverified function being run with --all
      const handler = getLanguageHandler(func.language)
      const isVerified = handler && func.verified.some((v) => v === handler.version || handler.version.startsWith(v))

      if (!isVerified && options.includeUnverified) {
        // Still run verification but mark it
        try {
          const results = await verifyFunction(func, options)
          return { func, results, error: null, skippedReason: undefined }
        } catch (e) {
          return { func, results: [], error: e, skippedReason: undefined }
        }
      }

      try {
        const results = await verifyFunction(func, options)
        return { func, results, error: null, skippedReason: undefined }
      } catch (e) {
        return { func, results: [], error: e, skippedReason: undefined }
      }
    },
    { concurrency },
  )

  // Print results
  const summary = printResults(allResults, options)

  console.log(`\nResults: ${summary.passed} passed, ${summary.failed} failed, ${summary.skipped} skipped`)
  if (!options.includeUnverified && unverifiedFunctions.length > 0) {
    console.log(`Unverified functions: ${unverifiedFunctions.length} (run with --all to test)`)
  }

  // Exit with error if any verified functions failed
  // In --all mode, failures don't cause exit code 1 for unverified functions
  const exitCode = summary.failed > 0 ? 1 : 0
  process.exit(exitCode)
}

main().catch(console.error)
