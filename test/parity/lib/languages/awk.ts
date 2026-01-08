/**
 * AWK language handler for verification
 */

import { extractAssignedVar } from '../runner.ts'
import type { LanguageHandler } from '../types.ts'

// Functions to skip (implementation differences, etc.)
export const AWK_SKIP_LIST = new Set<string>([
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
 * Convert a single JS line to AWK
 */
function convertJsLineToAwk(line: string, funcName: string): string {
  let awk = line.trim()
  if (!awk) {
    return ''
  }

  awk = stripTrailingComment(awk)
  awk = awk.replace(/;+$/, '')

  // Remove var/let/const - AWK just uses name = value
  awk = awk.replace(/^\s*(var|let|const)\s+/, '')

  // JS → AWK conversions (AWK uses 1/0 for true/false)
  awk = awk.replace(/\btrue\b/g, '1')
  awk = awk.replace(/\bfalse\b/g, '0')
  awk = awk.replace(/\bnull\b/g, '""')
  awk = awk.replace(/\bundefined\b/g, '""')

  // Convert single quotes to double quotes for AWK strings
  // AWK uses double quotes for strings
  awk = awk.replace(/'([^']*)'/g, '"$1"')

  return awk
}

/**
 * Convert JS example code to AWK
 */
function jsToAwk(jsCode: string[], funcName: string, _category?: string): string {
  const lines = jsCode.map((line) => convertJsLineToAwk(line, funcName)).filter(Boolean)
  if (!lines.length) {
    return ''
  }

  const originalLastLine = jsCode[jsCode.length - 1]
  const assignedVar = extractAssignedVar(originalLastLine)

  let result: string
  if (assignedVar) {
    result = `BEGIN { ${lines.join('; ')}; print ${assignedVar} }`
  } else {
    const setup = lines.slice(0, -1)
    const lastExpr = lines[lines.length - 1]
    const prefix = setup.length ? `${setup.join('; ')}; ` : ''
    result = `BEGIN { ${prefix}print ${lastExpr} }`
  }

  return result
}

/**
 * Normalize AWK output for comparison
 */
function normalizeAwkOutput(output: string, expected?: string): string {
  const result = output.trim()

  // If expected is a quoted string, wrap the native output in quotes
  // AWK print outputs strings without quotes, but JS JSON.stringify adds them
  if (expected && /^".*"$/.test(expected) && !/^".*"$/.test(result)) {
    return `"${result}"`
  }

  return result
}

export const awkHandler: LanguageHandler = {
  translate: jsToAwk,
  normalize: normalizeAwkOutput,
  skipList: AWK_SKIP_LIST,
  dockerImage: 'alpine:3.21',
  displayName: 'GNU AWK',
  version: '5.3',
  get parityValue() {
    return `${this.displayName} ${this.version}`
  },
  dockerCmd: (code: string) => ['awk', code, '/dev/null'],
  mountRepo: false,
}
