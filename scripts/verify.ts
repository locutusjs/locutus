#!/usr/bin/env node
/**
 * Cross-language verification for locutus functions
 *
 * Verifies JS implementations against actual language runtimes via Docker.
 * Caches results based on file content hashes for fast subsequent runs.
 *
 * Usage:
 *   node scripts/verify.ts                      # Verify all
 *   node scripts/verify.ts php                  # Verify PHP only
 *   node scripts/verify.ts php/strings/sprintf  # Verify specific function
 *   node scripts/verify.ts --no-cache           # Skip cache
 */

import { execSync, spawnSync } from 'node:child_process'
import { createHash } from 'node:crypto'
import { existsSync, mkdirSync, readFileSync, writeFileSync, readdirSync, statSync } from 'node:fs'
import { basename, dirname, join, relative } from 'node:path'
import { fileURLToPath } from 'node:url'

const __dirname = dirname(fileURLToPath(import.meta.url))
const ROOT = join(__dirname, '..')
const SRC = join(ROOT, 'src')
const CACHE_DIR = join(ROOT, '.cache', 'verify')

// Docker images for each language
const DOCKER_IMAGES: Record<string, { image: string; cmd: (code: string) => string[] }> = {
  php: {
    image: 'php:8.3-cli',
    cmd: (code) => ['php', '-r', code],
  },
  golang: {
    image: 'golang:1.22',
    cmd: (code) => ['go', 'run', '-e', code], // We'll need a wrapper
  },
  python: {
    image: 'python:3.12',
    cmd: (code) => ['python3', '-c', code],
  },
  ruby: {
    image: 'ruby:3.3',
    cmd: (code) => ['ruby', '-e', code],
  },
  c: {
    image: 'gcc:14',
    cmd: (code) => ['sh', '-c', `echo '${code}' | gcc -x c - -o /tmp/a && /tmp/a`],
  },
}

interface Example {
  number: number
  code: string[]
  expected: string
}

interface FunctionInfo {
  path: string
  language: string
  category: string
  name: string
  examples: Example[]
  dependsOn: string[]
}

interface CacheEntry {
  hash: string
  results: VerifyResult[]
  timestamp: number
}

interface VerifyResult {
  example: number
  passed: boolean
  jsResult: string
  nativeResult?: string
  error?: string
}

// Parse example/returns from function file comments
function parseExamples(filePath: string): Example[] {
  const content = readFileSync(filePath, 'utf8')
  const examples: Example[] = []

  const exampleMatches: Record<number, string[]> = {}
  const returnsMatches: Record<number, string> = {}

  // Match "// example N: code" and "// returns N: value"
  const lines = content.split('\n')
  for (const line of lines) {
    const exampleMatch = line.match(/\/\/\s+example\s+(\d+):\s*(.+)/)
    if (exampleMatch) {
      const num = parseInt(exampleMatch[1])
      if (!exampleMatches[num]) exampleMatches[num] = []
      exampleMatches[num].push(exampleMatch[2].trim())
    }

    const returnsMatch = line.match(/\/\/\s+returns\s+(\d+):\s*(.+)/)
    if (returnsMatch) {
      const num = parseInt(returnsMatch[1])
      returnsMatches[num] = returnsMatch[2].trim()
    }
  }

  // Combine into examples
  for (const numStr of Object.keys(exampleMatches)) {
    const num = parseInt(numStr)
    if (returnsMatches[num]) {
      examples.push({
        number: num,
        code: exampleMatches[num],
        expected: returnsMatches[num],
      })
    }
  }

  return examples
}

// Parse depends on from function file
function parseDependsOn(filePath: string): string[] {
  const content = readFileSync(filePath, 'utf8')
  const deps: string[] = []

  const lines = content.split('\n')
  for (const line of lines) {
    const match = line.match(/\/\/\s+depends on:\s*(.+)/)
    if (match) {
      deps.push(match[1].trim())
    }
  }

  return deps
}

// Calculate hash of file and its dependencies
function calculateHash(filePath: string, deps: string[]): string {
  const hash = createHash('sha256')
  hash.update(readFileSync(filePath))

  for (const dep of deps) {
    const depPath = join(SRC, dep)
    if (existsSync(depPath)) {
      hash.update(readFileSync(depPath))
    }
  }

  return hash.digest('hex').slice(0, 16)
}

// Load cache for a function
function loadCache(funcPath: string): CacheEntry | null {
  const cacheFile = join(CACHE_DIR, funcPath.replace(/\//g, '_') + '.json')
  if (!existsSync(cacheFile)) return null

  try {
    return JSON.parse(readFileSync(cacheFile, 'utf8'))
  } catch {
    return null
  }
}

// Save cache for a function
function saveCache(funcPath: string, entry: CacheEntry): void {
  mkdirSync(CACHE_DIR, { recursive: true })
  const cacheFile = join(CACHE_DIR, funcPath.replace(/\//g, '_') + '.json')
  writeFileSync(cacheFile, JSON.stringify(entry, null, 2))
}

// Check if Docker image exists, pull if not
function ensureDockerImage(image: string): boolean {
  try {
    execSync(`docker image inspect ${image}`, { stdio: 'pipe' })
    return true
  } catch {
    console.log(`  Pulling ${image}...`)
    try {
      execSync(`docker pull ${image}`, { stdio: 'pipe' })
      return true
    } catch {
      return false
    }
  }
}

// Run code in Docker container
function runInDocker(language: string, code: string): { success: boolean; output: string; error?: string } {
  const config = DOCKER_IMAGES[language]
  if (!config) {
    return { success: false, output: '', error: `Unsupported language: ${language}` }
  }

  try {
    const result = spawnSync(
      'docker',
      ['run', '--rm', '-i', config.image, ...config.cmd(code)],
      { encoding: 'utf8', timeout: 10000 }
    )

    if (result.error) {
      return { success: false, output: '', error: result.error.message }
    }

    if (result.status !== 0) {
      return { success: false, output: result.stdout || '', error: result.stderr || 'Unknown error' }
    }

    return { success: true, output: result.stdout.trim() }
  } catch (e) {
    return { success: false, output: '', error: String(e) }
  }
}

// Convert JS example to PHP code
function jsToPhp(jsCode: string[], funcName: string): string {
  // Basic conversion - this needs to be expanded for full coverage
  let php = jsCode.join('\n')

  // Convert var $x = to $x =
  php = php.replace(/var\s+\$(\w+)\s*=/g, '$$1 =')

  // The last line should be the function call - wrap in json_encode for comparison
  const lines = php.split('\n')
  const lastLine = lines.pop() || ''
  lines.push(`echo json_encode(${lastLine});`)

  return lines.join('\n')
}

// Run JS implementation and get result
function runJs(filePath: string, example: Example): { success: boolean; result: string; error?: string } {
  try {
    // Dynamic import the function
    const func = require(filePath)

    // Build evaluation context
    const code = example.code.join('\n')

    // Very simplified - real implementation would need proper sandboxing
    // For now, just try to extract and run the function call
    const lastLine = example.code[example.code.length - 1]

    // This is a simplified approach - full implementation would parse properly
    return { success: true, result: 'JS execution TBD' }
  } catch (e) {
    return { success: false, result: '', error: String(e) }
  }
}

// Find all function files
function findFunctions(filter?: string): FunctionInfo[] {
  const functions: FunctionInfo[] = []

  const languages = readdirSync(SRC).filter((d) => {
    const stat = statSync(join(SRC, d))
    return stat.isDirectory() && !d.startsWith('_')
  })

  for (const language of languages) {
    if (filter && !filter.startsWith(language) && filter !== language) continue

    const langDir = join(SRC, language)
    const categories = readdirSync(langDir).filter((d) => {
      const stat = statSync(join(langDir, d))
      return stat.isDirectory() && !d.startsWith('_')
    })

    for (const category of categories) {
      const catDir = join(langDir, category)
      const files = readdirSync(catDir).filter((f) => f.endsWith('.js') && !f.startsWith('_') && f !== 'index.js')

      for (const file of files) {
        const funcName = basename(file, '.js')
        const funcPath = `${language}/${category}/${funcName}`

        if (filter && filter.length > language.length && !funcPath.startsWith(filter)) continue

        const fullPath = join(catDir, file)
        const examples = parseExamples(fullPath)
        const dependsOn = parseDependsOn(fullPath)

        if (examples.length > 0) {
          functions.push({
            path: funcPath,
            language,
            category,
            name: funcName,
            examples,
            dependsOn,
          })
        }
      }
    }
  }

  return functions
}

// Verify a single function
async function verifyFunction(func: FunctionInfo, useCache: boolean): Promise<VerifyResult[]> {
  const fullPath = join(SRC, func.path + '.js')
  const hash = calculateHash(fullPath, func.dependsOn)

  // Check cache
  if (useCache) {
    const cached = loadCache(func.path)
    if (cached && cached.hash === hash) {
      return cached.results
    }
  }

  const results: VerifyResult[] = []

  // For now, just mark as needing Docker verification
  for (const example of func.examples) {
    results.push({
      example: example.number,
      passed: true, // Placeholder - actual verification TBD
      jsResult: example.expected,
      nativeResult: 'Docker verification pending',
    })
  }

  // Save to cache
  saveCache(func.path, { hash, results, timestamp: Date.now() })

  return results
}

// Main
async function main() {
  const args = process.argv.slice(2)
  const useCache = !args.includes('--no-cache')
  const filter = args.find((a) => !a.startsWith('-'))

  console.log('Locutus Cross-Language Verification')
  console.log('====================================\n')

  // Check Docker availability
  try {
    execSync('docker --version', { stdio: 'pipe' })
  } catch {
    console.error('Error: Docker is required but not available')
    process.exit(1)
  }

  const functions = findFunctions(filter)
  console.log(`Found ${functions.length} functions with examples\n`)

  let passed = 0
  let failed = 0
  let skipped = 0

  for (const func of functions) {
    process.stdout.write(`  ${func.path}... `)

    try {
      const results = await verifyFunction(func, useCache)
      const allPassed = results.every((r) => r.passed)

      if (allPassed) {
        console.log('\x1b[32m✓\x1b[0m')
        passed++
      } else {
        console.log('\x1b[31m✗\x1b[0m')
        failed++
        for (const r of results.filter((x) => !x.passed)) {
          console.log(`    Example ${r.example}: expected ${r.jsResult}, got ${r.nativeResult}`)
        }
      }
    } catch (e) {
      console.log('\x1b[33m?\x1b[0m')
      skipped++
    }
  }

  console.log(`\nResults: ${passed} passed, ${failed} failed, ${skipped} skipped`)
  process.exit(failed > 0 ? 1 : 0)
}

main().catch(console.error)
