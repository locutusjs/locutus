/**
 * Function file parsing utilities for parity tests
 */

import { existsSync, readdirSync, readFileSync, statSync } from 'node:fs'
import { basename, join } from 'node:path'
import type { Example, FunctionInfo } from './types.ts'

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
 * Parse parity verified from function file
 * Format: // parity verified: PHP 8.3 or // parity verified: impossible
 */
export function parseVerified(filePath: string): { verified: string[]; isImpossible: boolean } {
  const content = readFileSync(filePath, 'utf8')
  const verified: string[] = []
  let isImpossible = false

  const lines = content.split('\n')
  for (const line of lines) {
    const match = line.match(/\/\/\s+parity verified:\s*(.+)/)
    if (match) {
      // Split by comma and trim each value (e.g., "PHP 8.3, Python 3.12")
      const versions = match[1].split(',').map((v) => v.trim())
      for (const v of versions) {
        if (v === 'impossible') {
          isImpossible = true
        } else {
          verified.push(v)
        }
      }
    }
  }

  return { verified, isImpossible }
}

/**
 * Parse depends on from headKeys (util.js output)
 */
export function parseDependsOnFromHeadKeys(headKeys: Record<string, string[][]>): string[] {
  const depends = headKeys['depends on'] || []
  return depends.map((lines) => lines.join('\n').trim()).filter(Boolean)
}

/**
 * Parse parity verified from headKeys (util.js output)
 */
export function parseVerifiedFromHeadKeys(headKeys: Record<string, string[][]>): {
  verified: string[]
  isImpossible: boolean
} {
  const verifiedRaw = headKeys['parity verified'] || []
  const verified: string[] = []
  let isImpossible = false

  // Each entry is an array of lines, but parity verified should be single values like "PHP 8.3"
  const allValues = verifiedRaw
    .flatMap((lines) =>
      lines
        .join(',')
        .split(',')
        .map((v) => v.trim()),
    )
    .filter(Boolean)

  for (const v of allValues) {
    if (v === 'impossible') {
      isImpossible = true
    } else {
      verified.push(v)
    }
  }

  return { verified, isImpossible }
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
export async function parseFunctionWithUtil(
  funcPath: string,
  srcDir: string,
  rootDir: string,
): Promise<{ examples: Example[]; dependsOn: string[]; verified: string[]; isImpossible: boolean }> {
  // Dynamic import for runtime path resolution (ESM-compatible)
  const { Util } = await import(join(rootDir, 'src/_util/util.ts'))
  const util = new Util([])

  const relPath = `${funcPath}.js`
  const fullPath = join(srcDir, relPath)
  const code = readFileSync(fullPath, 'utf8')

  const params = await util._parse(relPath, code)
  const { verified, isImpossible } = parseVerifiedFromHeadKeys(params.headKeys)
  return {
    examples: parseExamplesFromHeadKeys(params.headKeys),
    dependsOn: parseDependsOnFromHeadKeys(params.headKeys),
    verified,
    isImpossible,
  }
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
        const { verified, isImpossible } = parseVerified(fullPath)

        if (examples.length > 0) {
          functions.push({
            path: funcPath,
            language,
            category,
            name: funcName,
            examples,
            dependsOn,
            verified,
            isImpossible,
          })
        }
      }
    }
  }

  return functions
}
