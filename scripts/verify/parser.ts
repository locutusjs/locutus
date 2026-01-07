/**
 * Function file parsing utilities
 */

import { existsSync, readdirSync, readFileSync, statSync } from 'node:fs'
import { createRequire } from 'node:module'
import { basename, join } from 'node:path'
import type { Example, FunctionInfo } from './types.ts'

const require = createRequire(import.meta.url)

/**
 * Parse example/returns from function file comments (fallback parser)
 */
export function parseExamples(filePath: string): Example[] {
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
      if (!exampleMatches[num]) {
        exampleMatches[num] = []
      }
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

/**
 * Parse depends on from function file
 */
export function parseDependsOn(filePath: string): string[] {
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

/**
 * Parse verified versions from function file
 * Format: // verified: 8.3 or // verified: 8.3, 8.2
 */
export function parseVerified(filePath: string): string[] {
  const content = readFileSync(filePath, 'utf8')
  const verified: string[] = []

  const lines = content.split('\n')
  for (const line of lines) {
    const match = line.match(/\/\/\s+verified:\s*(.+)/)
    if (match) {
      // Split by comma and trim each version
      const versions = match[1].split(',').map((v) => v.trim())
      verified.push(...versions)
    }
  }

  return verified
}

/**
 * Parse depends on from headKeys (util.js output)
 */
export function parseDependsOnFromHeadKeys(headKeys: Record<string, string[][]>): string[] {
  const depends = headKeys['depends on'] || []
  return depends.map((lines) => lines.join('\n').trim()).filter(Boolean)
}

/**
 * Parse verified versions from headKeys (util.js output)
 */
export function parseVerifiedFromHeadKeys(headKeys: Record<string, string[][]>): string[] {
  const verified = headKeys.verified || []
  // Each entry is an array of lines, but verified should be single values
  return verified
    .flatMap((lines) =>
      lines
        .join(',')
        .split(',')
        .map((v) => v.trim()),
    )
    .filter(Boolean)
}

/**
 * Parse examples from headKeys (util.js output)
 */
export function parseExamplesFromHeadKeys(headKeys: Record<string, string[][]>): Example[] {
  const examples = headKeys.example || []
  const returns = headKeys.returns || []
  const parsed: Example[] = []

  for (let i = 0; i < examples.length; i++) {
    if (!returns[i]) {
      continue
    }
    parsed.push({
      number: i + 1,
      code: examples[i],
      expectedRaw: returns[i].join('\n'),
    })
  }

  return parsed
}

/**
 * Parse function using util.js (more accurate than regex)
 */
export function parseFunctionWithUtil(
  funcPath: string,
  srcDir: string,
  rootDir: string,
): Promise<{ examples: Example[]; dependsOn: string[]; verified: string[] }> {
  const Util = require(join(rootDir, 'src/_util/util.js'))
  const util = new Util([])

  return new Promise((resolve, reject) => {
    const relPath = `${funcPath}.js`
    const fullPath = join(srcDir, relPath)
    const code = readFileSync(fullPath, 'utf8')

    util._parse(relPath, code, (err: Error | null, params: { headKeys: Record<string, string[][]> }) => {
      if (err || !params) {
        reject(err || new Error(`Unable to parse ${relPath}`))
        return
      }
      resolve({
        examples: parseExamplesFromHeadKeys(params.headKeys),
        dependsOn: parseDependsOnFromHeadKeys(params.headKeys),
        verified: parseVerifiedFromHeadKeys(params.headKeys),
      })
    })
  })
}

/**
 * Find all function files matching optional filter
 */
export function findFunctions(srcDir: string, filter?: string): FunctionInfo[] {
  const functions: FunctionInfo[] = []

  const languages = readdirSync(srcDir).filter((d) => {
    const stat = statSync(join(srcDir, d))
    return stat.isDirectory() && !d.startsWith('_')
  })

  for (const language of languages) {
    if (filter && !filter.startsWith(language) && filter !== language) {
      continue
    }

    const langDir = join(srcDir, language)
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

        if (filter && filter.length > language.length && !funcPath.startsWith(filter)) {
          continue
        }

        const fullPath = join(catDir, file)
        const examples = parseExamples(fullPath)
        const dependsOn = parseDependsOn(fullPath)
        const verified = parseVerified(fullPath)

        if (examples.length > 0) {
          functions.push({
            path: funcPath,
            language,
            category,
            name: funcName,
            examples,
            dependsOn,
            verified,
          })
        }
      }
    }
  }

  return functions
}
