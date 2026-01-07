#!/usr/bin/env node

/**
 * Parity tests for locutus functions
 *
 * Tests that JS implementations produce identical output to native language
 * runtimes (PHP, Python, etc.) via Docker.
 *
 * Caches results based on file content hashes and Docker image digests
 * for fast subsequent runs. Cache invalidates when Docker images update.
 *
 * Usage:
 *   yarn test:parity                       # Test functions with 'verified:' header (CI mode)
 *   yarn test:parity --all                 # Include unverified functions
 *   yarn test:parity php                   # Filter to PHP only
 *   yarn test:parity php/strings/sprintf   # Test specific function
 *   yarn test:parity --no-cache            # Skip cache
 *   yarn test:parity --summary             # Show counts only, don't run tests
 */

import { availableParallelism } from 'node:os'
import { dirname, join } from 'node:path'
import { performance } from 'node:perf_hooks'
import { fileURLToPath } from 'node:url'
import pMap from 'p-map'

import { CACHE_VERSION, calculateHash, loadCache, saveCache } from './lib/cache.ts'
import { checkDockerAvailable, ensureDockerImage, getDockerDigest, runInDocker } from './lib/docker.ts'
import { getLanguageHandler, isLanguageSupported } from './lib/languages/index.ts'
import { findFunctions, parseFunctionWithUtil } from './lib/parser.ts'
import { evaluateExpected, runJs } from './lib/runner.ts'
import type { FunctionInfo, ParitySummary, VerifyOptions, VerifyResult } from './lib/types.ts'

const __dirname = dirname(fileURLToPath(import.meta.url))
const ROOT = join(__dirname, '../..')
const SRC = join(ROOT, 'src')
const CACHE_DIR = join(ROOT, '.cache', 'parity')
const PARITY_SCRIPT_PATH = fileURLToPath(import.meta.url)

// Emojis for output
const EMOJI = {
  pass: '\x1b[32m✓\x1b[0m', // Green checkmark
  fail: '\x1b[31m✗\x1b[0m', // Red X
  impossible: '\x1b[32m⊘\x1b[0m', // Green circle-slash (intentionally untestable)
  unverified: '\x1b[33m⚠\x1b[0m', // Yellow warning
  error: '\x1b[33m?\x1b[0m', // Yellow question mark
  cached: '\x1b[36m⚡\x1b[0m', // Cyan lightning bolt (cache hit)
}

// Track cache statistics
let cacheHits = 0
let cacheMisses = 0

/**
 * Run parity test for a single function against its native runtime
 * Returns results and whether it was a cache hit
 */
async function runParityTest(
  func: FunctionInfo,
  options: VerifyOptions,
): Promise<{ results: VerifyResult[]; cached: boolean }> {
  const fullPath = join(SRC, func.path + '.js')

  // Parse function with util.js for accurate example extraction
  let parsed: { examples: typeof func.examples; dependsOn: string[]; verified: string[]; isImpossible: boolean }
  try {
    parsed = await parseFunctionWithUtil(func.path, SRC, ROOT)
  } catch {
    parsed = {
      examples: func.examples,
      dependsOn: func.dependsOn,
      verified: func.verified,
      isImpossible: func.isImpossible,
    }
  }

  const hash = calculateHash(fullPath, parsed.dependsOn, SRC, PARITY_SCRIPT_PATH, options.dockerDigests)

  // Check cache
  if (options.useCache) {
    const cached = loadCache(func.path, CACHE_DIR)
    if (cached && cached.hash === hash) {
      cacheHits++
      return { results: cached.results, cached: true }
    }
  }
  cacheMisses++

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
        nativeResult: 'Skipped (parity test not implemented)',
      })
    }
    saveCache(func.path, { hash, results, timestamp: Date.now(), version: CACHE_VERSION }, CACHE_DIR)
    return { results, cached: false }
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
    return { results, cached: false }
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
    return { results, cached: false }
  }

  // Test each example
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

    // Run in Docker with 10s timeout per test
    const nativeRun = runInDocker(handler.dockerImage, handler.dockerCmd(nativeCode), {
      mountRepo: handler.mountRepo,
      repoPath: ROOT,
      timeout: 10000,
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
  return { results, cached: false }
}

interface TestResult {
  func: FunctionInfo
  results: VerifyResult[]
  error: unknown
  category: 'verified' | 'impossible' | 'unverified'
  cached: boolean
}

/**
 * Print parity test results with emoji indicators
 */
function printResults(allResults: TestResult[], options: VerifyOptions): ParitySummary {
  const summary: ParitySummary = { passed: 0, failed: 0, skipped: 0, impossible: 0, unverified: 0 }
  const failedVerified: TestResult[] = []

  for (const result of allResults) {
    const { func, results, error, category, cached } = result
    const cacheIndicator = cached ? ` ${EMOJI.cached}` : ''
    process.stdout.write(`  ${func.path}...`)

    // Handle impossible functions (intentionally untestable)
    if (category === 'impossible') {
      console.log(` ${EMOJI.impossible} (impossible to test)`)
      summary.impossible++
      continue
    }

    // Handle errors
    if (error) {
      console.log(` ${EMOJI.error}`)
      summary.skipped++
      continue
    }

    const allPassed = results.every((r) => r.passed)

    if (allPassed) {
      if (category === 'unverified') {
        // Unverified but would pass - show warning that it should get header
        console.log(` ${EMOJI.pass}${cacheIndicator} (unverified - add header!)`)
        summary.unverified++
      } else {
        console.log(` ${EMOJI.pass}${cacheIndicator}`)
        summary.passed++
      }
    } else {
      if (category === 'verified') {
        // Verified but failing - this is a regression!
        console.log(` ${EMOJI.fail} (REGRESSION)`)
        failedVerified.push(result)
        summary.failed++
      } else {
        // Unverified and failing - just informational
        console.log(` ${EMOJI.unverified} (fails parity)`)
        summary.unverified++
      }
      // Show failure details
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
 * Format duration in human-readable format
 */
function formatDuration(ms: number): string {
  if (ms < 1000) {
    return `${Math.round(ms)}ms`
  }
  if (ms < 60000) {
    return `${(ms / 1000).toFixed(1)}s`
  }
  return `${Math.floor(ms / 60000)}m ${Math.round((ms % 60000) / 1000)}s`
}

/**
 * Main entry point
 */
async function main() {
  const startTime = performance.now()
  const args = process.argv.slice(2)

  // Parse options (dockerDigests will be populated after image pulls)
  const options: VerifyOptions = {
    useCache: !args.includes('--no-cache'),
    includeUnverified: args.includes('--all') || args.includes('--include-unverified'),
    filter: args.find((a) => !a.startsWith('-')),
    dockerDigests: {}, // Will be populated after image pulls
  }

  const summaryOnly = args.includes('--summary')

  console.log('Locutus Parity Tests')
  console.log('====================\n')

  // Check Docker availability
  if (!checkDockerAvailable()) {
    console.error('Error: Docker is required but not available')
    process.exit(1)
  }

  // Pull images, collect digests for cache invalidation, and show versions
  const dockerDigests: Record<string, string> = {}
  console.log('Docker images:')
  if (ensureDockerImage('php:8.3-cli')) {
    dockerDigests['php:8.3-cli'] = getDockerDigest('php:8.3-cli')
    const phpVersion = runInDocker('php:8.3-cli', ['php', '-v'], {})
    if (phpVersion.success) {
      console.log(`  PHP: ${phpVersion.output.split('\n')[0]}`)
    }
  }
  if (ensureDockerImage('python:3.12')) {
    dockerDigests['python:3.12'] = getDockerDigest('python:3.12')
    const pyVersion = runInDocker('python:3.12', ['python', '--version'], {})
    if (pyVersion.success) {
      console.log(`  Python: ${pyVersion.output.trim()}`)
    }
  }
  console.log('')

  // Assign collected digests to options for cache invalidation
  options.dockerDigests = dockerDigests

  // Find all functions
  const allFunctions = findFunctions(SRC, options.filter)

  // Categorize functions
  const verifiedFunctions: FunctionInfo[] = []
  const impossibleFunctions: FunctionInfo[] = []
  const unverifiedFunctions: FunctionInfo[] = []

  for (const func of allFunctions) {
    // Check for impossible first
    if (func.isImpossible) {
      impossibleFunctions.push(func)
      continue
    }

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
    console.log(`  ${EMOJI.pass} Verified: ${verifiedFunctions.length}`)
    console.log(`  ${EMOJI.impossible} Impossible: ${impossibleFunctions.length}`)
    console.log(`  ${EMOJI.unverified} Unverified: ${unverifiedFunctions.length}`)
    console.log(`  Total: ${allFunctions.length}`)

    // Break down by language
    const byLanguage: Record<string, { verified: number; impossible: number; unverified: number }> = {}
    for (const func of allFunctions) {
      if (!byLanguage[func.language]) {
        byLanguage[func.language] = { verified: 0, impossible: 0, unverified: 0 }
      }
    }
    for (const func of verifiedFunctions) {
      byLanguage[func.language].verified++
    }
    for (const func of impossibleFunctions) {
      byLanguage[func.language].impossible++
    }
    for (const func of unverifiedFunctions) {
      byLanguage[func.language].unverified++
    }

    console.log('\nBy language:')
    for (const [lang, counts] of Object.entries(byLanguage).sort()) {
      const supported = isLanguageSupported(lang) ? '' : ' (not supported)'
      console.log(
        `  ${lang}: ${counts.verified} verified, ${counts.impossible} impossible, ${counts.unverified} unverified${supported}`,
      )
    }

    // List unverified functions
    if (unverifiedFunctions.length > 0) {
      console.log(`\n${EMOJI.unverified} Unverified functions:`)
      for (const func of unverifiedFunctions.slice(0, 50)) {
        console.log(`    ${func.path}`)
      }
      if (unverifiedFunctions.length > 50) {
        console.log(`    ... and ${unverifiedFunctions.length - 50} more`)
      }
    }

    process.exit(0)
  }

  // Determine which functions to test
  const functionsToTest: Array<{ func: FunctionInfo; category: 'verified' | 'impossible' | 'unverified' }> = []

  // Always include verified functions
  for (const func of verifiedFunctions) {
    functionsToTest.push({ func, category: 'verified' })
  }

  // Always show impossible functions (no actual test needed)
  for (const func of impossibleFunctions) {
    functionsToTest.push({ func, category: 'impossible' })
  }

  // Include unverified only with --all
  if (options.includeUnverified) {
    for (const func of unverifiedFunctions) {
      functionsToTest.push({ func, category: 'unverified' })
    }
  }

  const concurrency = Math.min(availableParallelism(), 8)
  console.log(`Found ${functionsToTest.length} functions to test (concurrency: ${concurrency})`)
  console.log(`  ${EMOJI.pass} ${verifiedFunctions.length} verified`)
  console.log(`  ${EMOJI.impossible} ${impossibleFunctions.length} impossible`)
  if (options.includeUnverified) {
    console.log(`  ${EMOJI.unverified} ${unverifiedFunctions.length} unverified`)
  } else {
    console.log(`  ${EMOJI.unverified} ${unverifiedFunctions.length} unverified (use --all to include)`)
  }
  console.log('')

  // Run parity tests in parallel
  const allResults = await pMap(
    functionsToTest,
    async ({ func, category }): Promise<TestResult> => {
      // Skip actual testing for impossible functions
      if (category === 'impossible') {
        return { func, results: [], error: null, category, cached: false }
      }

      try {
        const { results, cached } = await runParityTest(func, options)
        return { func, results, error: null, category, cached }
      } catch (e) {
        return { func, results: [], error: e, category, cached: false }
      }
    },
    { concurrency },
  )

  // Print results
  const summary = printResults(allResults, options)

  // Calculate timing
  const endTime = performance.now()
  const duration = endTime - startTime

  // Print summary line
  console.log('')
  console.log(
    `Results: ${summary.passed} ${EMOJI.pass}, ${summary.failed} ${EMOJI.fail}, ${summary.impossible} ${EMOJI.impossible}, ${summary.unverified} ${EMOJI.unverified}`,
  )
  console.log(`Cache: ${cacheHits} ${EMOJI.cached} hits, ${cacheMisses} misses`)
  console.log(`Time: ${formatDuration(duration)}`)

  // Show unverified functions list if not using --all
  if (!options.includeUnverified && unverifiedFunctions.length > 0) {
    console.log(`\n${EMOJI.unverified} Unverified functions (${unverifiedFunctions.length}):`)
    for (const func of unverifiedFunctions) {
      console.log(`    ${func.path}`)
    }
  }

  // Exit with error ONLY if verified functions failed (regressions)
  // Unverified failures are informational and don't fail CI
  if (summary.failed > 0) {
    console.log(`\n${EMOJI.fail} FAILURE: ${summary.failed} verified function(s) failed parity tests!`)
    process.exit(1)
  }

  process.exit(0)
}

main().catch(console.error)
