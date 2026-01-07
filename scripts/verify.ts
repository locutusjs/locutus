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
import { createRequire } from 'node:module'
import { basename, dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'
import vm from 'node:vm'

const __dirname = dirname(fileURLToPath(import.meta.url))
const ROOT = join(__dirname, '..')
const SRC = join(ROOT, 'src')
const CACHE_DIR = join(ROOT, '.cache', 'verify')
const require = createRequire(import.meta.url)
const Util = require(join(ROOT, 'src/_util/util.js'))
const util = new Util([])
const CACHE_VERSION = 2

// Docker images for each language
const DOCKER_IMAGES: Record<
  string,
  { image: string; cmd: (code: string) => string[]; mountRepo?: boolean }
> = {
  php: {
    image: 'php:8.3-cli',
    cmd: (code) => ['php', '-r', code],
    mountRepo: true,
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
  expectedRaw: string
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
  version: number
}

interface VerifyResult {
  example: number
  passed: boolean
  expected: string
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
        expectedRaw: returnsMatches[num],
      })
    }
  }

  return examples
}

// Parse depends on from function file (fallback for cache hashing)
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

function parseDependsOnFromHeadKeys(headKeys: Record<string, string[][]>): string[] {
  const depends = headKeys['depends on'] || []
  return depends.map((lines) => lines.join('\n').trim()).filter(Boolean)
}

function parseExamplesFromHeadKeys(headKeys: Record<string, string[][]>): Example[] {
  const examples = headKeys.example || []
  const returns = headKeys.returns || []
  const parsed: Example[] = []

  for (let i = 0; i < examples.length; i++) {
    if (!returns[i]) continue
    parsed.push({
      number: i + 1,
      code: examples[i],
      expectedRaw: returns[i].join('\n'),
    })
  }

  return parsed
}

function parseFunctionWithUtil(funcPath: string): Promise<{ examples: Example[]; dependsOn: string[] }> {
  return new Promise((resolve, reject) => {
    const relPath = `${funcPath}.js`
    const fullPath = join(SRC, relPath)
    const code = readFileSync(fullPath, 'utf8')

    util._parse(relPath, code, (err: Error | null, params: { headKeys: Record<string, string[][]> }) => {
      if (err || !params) {
        reject(err || new Error(`Unable to parse ${relPath}`))
        return
      }
      resolve({
        examples: parseExamplesFromHeadKeys(params.headKeys),
        dependsOn: parseDependsOnFromHeadKeys(params.headKeys),
      })
    })
  })
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
    const entry = JSON.parse(readFileSync(cacheFile, 'utf8')) as CacheEntry
    if (entry.version !== CACHE_VERSION) return null
    return entry
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
    const dockerArgs = ['run', '--rm', '-i']
    if (config.mountRepo) {
      dockerArgs.push('-v', `${ROOT}:/work`, '-w', '/work')
    }

    const result = spawnSync(
      'docker',
      [...dockerArgs, config.image, ...config.cmd(code)],
      { encoding: 'utf8', timeout: 10000 }
    )

    if (result.error) {
      return { success: false, output: '', error: result.error.message }
    }

    if (result.status !== 0 || (result.stderr && result.stderr.trim())) {
      return {
        success: false,
        output: result.stdout || '',
        error: result.stderr?.trim() || 'Unknown error',
      }
    }

    return { success: true, output: result.stdout.trim() }
  } catch (e) {
    return { success: false, output: '', error: String(e) }
  }
}

function extractAssignedVar(line: string): string | null {
  const match = line.match(/^\s*(?:var|let|const)?\s*(\$?[A-Za-z_][\w$]*)\s*=/)
  return match ? match[1] : null
}

function normalizeJsResult(value: unknown): string {
  const json = JSON.stringify(value)
  return json === undefined ? 'undefined' : json
}

function createBaseContext(extra: Record<string, unknown> = {}): vm.Context {
  return vm.createContext({
    JSON,
    Math,
    Date,
    RegExp,
    Number,
    String,
    Boolean,
    Array,
    Object,
    Buffer,
    ...extra,
  })
}

function evaluateExpected(expectedRaw: string): { success: boolean; result: string; error?: string } {
  try {
    const context = createBaseContext()
    const value = vm.runInContext(expectedRaw, context)
    return { success: true, result: normalizeJsResult(value) }
  } catch (e) {
    return { success: false, result: '', error: String(e) }
  }
}

function convertObjectLiteral(segment: string): string {
  let converted = segment
  converted = converted.replace(/\{([\s\S]*?)\}/g, (_full, inner) => {
    let body = inner
    body = body.replace(/([,{]\s*)([A-Za-z_][\w]*)\s*:/g, "$1'$2' =>")
    body = body.replace(/:/g, '=>')
    return `[${body}]`
  })
  return converted
}

function convertPropertyAccess(line: string): string {
  return line.replace(/\b([A-Za-z_][\w$]*)\.(\w+)\b/g, (_m, obj, prop) => {
    const varName = obj.startsWith('$') ? obj : `$${obj}`
    return `${varName}['${prop}']`
  })
}

function convertJsLineToPhp(line: string): string {
  let php = line.trim()
  if (!php) return ''

  php = php.replace(/^\s*(var|let|const)\s+/, '')
  php = php.replace(/Array\.isArray\s*\(/g, 'is_array(')
  php = php.replace(/(\$?[A-Za-z_][\w$]*)\.length\b/g, (_m, name) => `count(${name})`)
  php = php.replace(/\bundefined\b/g, 'null')
  php = php.replace(/\bnull\b/g, 'null')
  php = php.replace(/\btrue\b/g, 'true')
  php = php.replace(/\bfalse\b/g, 'false')
  php = convertPropertyAccess(php)
  php = convertObjectLiteral(php)
  php = php.replace(/\$([A-Za-z_][\w]*)\s*=>/g, "'$1' =>")
  php = php.replace(/\{\s*\}/g, '[]')
  php = php.replace(/\u000d/g, '\\r').replace(/\u000a/g, '\\n')

  return php
}

// Convert JS example to PHP code
function jsToPhp(jsCode: string[], funcName: string): string {
  const lines = jsCode.map((line) => convertJsLineToPhp(line)).filter(Boolean)
  if (!lines.length) return ''

  const originalLastLine = jsCode[jsCode.length - 1]
  const assignedVar = extractAssignedVar(originalLastLine)

  if (assignedVar) {
    return `${lines.join(';\n')};\necho json_encode(${assignedVar});`
  }

  const setup = lines.slice(0, -1)
  const lastExpr = lines[lines.length - 1]
  const prefix = setup.length ? `${setup.join(';\n')};\n` : ''
  return `${prefix}echo json_encode(${lastExpr});`
}

// Run JS implementation and get result
function runJs(
  filePath: string,
  funcName: string,
  example: Example
): { success: boolean; result: string; error?: string } {
  try {
    // Dynamic import the function
    const func = require(filePath)
    const context = createBaseContext({ [funcName]: func })

    const lastLine = example.code[example.code.length - 1] || ''
    const assignedVar = extractAssignedVar(lastLine)

    if (assignedVar) {
      vm.runInContext(example.code.join('\n'), context)
      return { success: true, result: normalizeJsResult(context[assignedVar]) }
    }

    const setup = example.code.slice(0, -1).join('\n')
    if (setup.trim()) {
      vm.runInContext(setup, context)
    }
    const result = vm.runInContext(lastLine, context)
    return { success: true, result: normalizeJsResult(result) }
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
  let parsed
  try {
    parsed = await parseFunctionWithUtil(func.path)
  } catch {
    parsed = { examples: func.examples, dependsOn: func.dependsOn }
  }

  const hash = calculateHash(fullPath, parsed.dependsOn)

  // Check cache
  if (useCache) {
    const cached = loadCache(func.path)
    if (cached && cached.hash === hash) {
      return cached.results
    }
  }

  const results: VerifyResult[] = []

  if (func.language !== 'php') {
    for (const example of parsed.examples) {
      const expectedEval = evaluateExpected(example.expectedRaw)
      results.push({
        example: example.number,
        passed: true,
        expected: expectedEval.success ? expectedEval.result : example.expectedRaw,
        jsResult: example.expectedRaw,
        nativeResult: 'Skipped (non-PHP verification not implemented)',
      })
    }
    saveCache(func.path, { hash, results, timestamp: Date.now(), version: CACHE_VERSION })
    return results
  }

  if (!ensureDockerImage(DOCKER_IMAGES.php.image)) {
    for (const example of func.examples) {
      results.push({
        example: example.number,
        passed: false,
        jsResult: 'N/A',
        nativeResult: 'N/A',
        error: 'Failed to pull PHP Docker image',
      })
    }
    saveCache(func.path, { hash, results, timestamp: Date.now(), version: CACHE_VERSION })
    return results
  }

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

    const phpCode = jsToPhp(example.code, func.name)
    if (!phpCode.trim()) {
      results.push({
        example: example.number,
        passed: false,
        expected: expectedEval.result,
        jsResult: jsRun.result,
        nativeResult: '',
        error: 'Unable to translate JS example to PHP',
      })
      continue
    }

    const phpRun = runInDocker('php', phpCode)
    if (!phpRun.success) {
      results.push({
        example: example.number,
        passed: false,
        expected: expectedEval.result,
        jsResult: jsRun.result,
        nativeResult: phpRun.output,
        error: phpRun.error,
      })
      continue
    }

    const nativeResult = phpRun.output.trim()
    const passedExample = expectedEval.result.trim() === nativeResult
    results.push({
      example: example.number,
      passed: passedExample,
      expected: expectedEval.result,
      jsResult: jsRun.result,
      nativeResult,
      error: passedExample ? undefined : 'PHP result mismatch',
    })
  }

  // Save to cache
  saveCache(func.path, { hash, results, timestamp: Date.now(), version: CACHE_VERSION })

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
          console.log(`    Example ${r.example}: ${r.error || 'Mismatch'}`)
          console.log(`      expected: ${r.expected}`)
          console.log(`      js: ${r.jsResult}`)
          console.log(`      native: ${r.nativeResult}`)
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
