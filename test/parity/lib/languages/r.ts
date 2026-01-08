/**
 * R language handler for verification
 */

import { extractAssignedVar } from '../runner.ts'
import type { LanguageHandler } from '../types.ts'

// Functions to skip (implementation differences, etc.)
export const R_SKIP_LIST = new Set<string>([
  // None currently
])

/**
 * Strip trailing JS comments (// ...) that are not inside strings
 */
function stripTrailingComment(code: string): string {
  let inString: string | null = null
  let escaped = false

  for (let i = 0; i < code.length; i++) {
    const char = code[i]

    if (escaped) {
      escaped = false
      continue
    }

    if (char === '\\') {
      escaped = true
      continue
    }

    if (inString) {
      if (char === inString) {
        inString = null
      }
    } else {
      if (char === '"' || char === "'") {
        inString = char
      } else if (char === '/' && code[i + 1] === '/') {
        return code.slice(0, i).trim()
      }
    }
  }

  return code
}

/**
 * Convert a single JS line to R
 */
function convertJsLineToR(line: string, funcName: string): string {
  let r = line.trim()
  if (!r) {
    return ''
  }

  r = stripTrailingComment(r)
  r = r.replace(/;+$/, '')

  // Convert var/let/const - R uses <- for assignment
  r = r.replace(/^\s*(var|let|const)\s+/, '')
  r = r.replace(/\s*=\s*/, ' <- ')

  // JS → R conversions
  r = r.replace(/\btrue\b/g, 'TRUE')
  r = r.replace(/\bfalse\b/g, 'FALSE')
  r = r.replace(/\bnull\b/g, 'NULL')
  r = r.replace(/\bundefined\b/g, 'NA')

  // JS special values → R
  r = r.replace(/\bInfinity\b/g, 'Inf')
  r = r.replace(/\bNaN\b/g, 'NaN')

  // R's ceiling function - funcName is already the function name
  // No module prefix needed for base functions

  return r
}

/**
 * Convert JS example code to R
 */
function jsToR(jsCode: string[], funcName: string, _category?: string): string {
  const lines = jsCode.map((line) => convertJsLineToR(line, funcName)).filter(Boolean)
  if (!lines.length) {
    return ''
  }

  const originalLastLine = jsCode[jsCode.length - 1]
  const assignedVar = extractAssignedVar(originalLastLine)

  let result: string
  if (assignedVar) {
    result = `${lines.join('\n')}\ncat(${assignedVar})`
  } else {
    const setup = lines.slice(0, -1)
    const lastExpr = lines[lines.length - 1]
    const prefix = setup.length ? `${setup.join('\n')}\n` : ''
    result = `${prefix}cat(${lastExpr})`
  }

  return result
}

/**
 * Normalize R output for comparison
 */
function normalizeROutput(output: string, _expected?: string): string {
  let result = output.trim()
  // R sometimes outputs "[1] value" format - strip the prefix
  result = result.replace(/^\[\d+\]\s*/, '')
  // Strip trailing .0 from floats for integer comparison
  if (/^-?\d+\.?0*$/.test(result)) {
    result = result.replace(/\.0*$/, '')
  }
  return result
}

export const rHandler: LanguageHandler = {
  translate: jsToR,
  normalize: normalizeROutput,
  skipList: R_SKIP_LIST,
  dockerImage: 'r-base:4.4.2',
  displayName: 'R',
  version: '4.4',
  get parityValue() {
    return `${this.displayName} ${this.version}`
  },
  dockerCmd: (code: string) => ['Rscript', '-e', code],
  mountRepo: false,
}
