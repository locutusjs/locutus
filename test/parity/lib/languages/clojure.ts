/**
 * Clojure language handler for verification
 */

import { extractAssignedVar } from '../runner.ts'
import type { LanguageHandler } from '../types.ts'

// Functions to skip (implementation differences, etc.)
export const CLOJURE_SKIP_LIST = new Set<string>([
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
 * Convert JS function call to Clojure S-expression
 * e.g., ceil(4.2) -> (Math/ceil 4.2) for Math functions
 * e.g., lower_case("HELLO") -> (clojure.string/lower-case "HELLO") for string functions
 */
function convertFunctionCall(code: string, funcName: string, category?: string): string {
  // Simple regex to match funcName(args)
  const regex = new RegExp(`${funcName}\\s*\\(([^)]+)\\)`, 'g')

  // Determine the namespace and convert function name
  if (category === 'string') {
    // String functions use clojure.string namespace and hyphens instead of underscores
    let cljFuncName = funcName.replace(/_/g, '-')
    // Clojure predicate functions use ? suffix (e.g., blank -> blank?)
    if (funcName === 'blank') {
      cljFuncName = 'blank?'
    }
    return code.replace(regex, `(clojure.string/${cljFuncName} $1)`)
  }
  // Default to Math namespace
  return code.replace(regex, `(Math/${funcName} $1)`)
}

/**
 * Convert a single JS line to Clojure
 */
function convertJsLineToClojure(line: string, funcName: string, category?: string): string {
  let clj = line.trim()
  if (!clj) {
    return ''
  }

  clj = stripTrailingComment(clj)
  clj = clj.replace(/;+$/, '')

  // Convert single-quoted strings to double-quoted (Clojure uses double quotes for strings)
  clj = clj.replace(/'([^'\\]*(\\.[^'\\]*)*)'/g, '"$1"')

  // JS → Clojure conversions
  clj = clj.replace(/\btrue\b/g, 'true')
  clj = clj.replace(/\bfalse\b/g, 'false')
  clj = clj.replace(/\bnull\b/g, 'nil')
  clj = clj.replace(/\bundefined\b/g, 'nil')

  // JS special values → Clojure
  clj = clj.replace(/\bInfinity\b/g, 'Double/POSITIVE_INFINITY')
  clj = clj.replace(/\bNaN\b/g, 'Double/NaN')

  // Convert function calls
  clj = convertFunctionCall(clj, funcName, category)

  return clj
}

/**
 * Convert JS example code to Clojure
 */
function jsToClojure(jsCode: string[], funcName: string, category?: string): string {
  const lines = jsCode.map((line) => convertJsLineToClojure(line, funcName, category)).filter(Boolean)
  if (!lines.length) {
    return ''
  }

  const originalLastLine = jsCode[jsCode.length - 1]
  const assignedVar = extractAssignedVar(originalLastLine)

  let result: string
  if (assignedVar) {
    // For assignment, use let binding then print
    // Parse "result = ceil(4.2)" -> "(let [result (Math/ceil 4.2)] (println result))"
    const lastLine = lines[lines.length - 1]
    const assignMatch = lastLine.match(/(\w+)\s*=\s*(.+)/)
    if (assignMatch) {
      const setup = lines.slice(0, -1)
      const prefix = setup.length ? setup.join('\n') + '\n' : ''
      result = `${prefix}(println ${assignMatch[2]})`
    } else {
      result = `(println ${lines[lines.length - 1]})`
    }
  } else {
    const setup = lines.slice(0, -1)
    const lastExpr = lines[lines.length - 1]
    const prefix = setup.length ? `${setup.join('\n')}\n` : ''
    result = `${prefix}(println ${lastExpr})`
  }

  return result
}

/**
 * Normalize Clojure output for comparison
 */
function normalizeClojureOutput(output: string, expected?: string): string {
  let result = output.trim()

  // Clojure Math/ceil returns a double, so 5.0 for ceil(4.2)
  // If expected is an integer string, convert
  if (expected && /^-?\d+$/.test(expected)) {
    // Expected is integer, Clojure returns float
    // Handle -0.0 -> 0 conversion
    if (result === '-0.0') {
      result = '0'
    } else if (/^-?\d+\.0$/.test(result)) {
      result = result.replace(/\.0$/, '')
    }
  }

  // String quoting: Clojure's println doesn't add quotes, but expected values have them
  if (expected && /^".*"$/.test(expected) && !/^".*"$/.test(result)) {
    result = `"${result}"`
  }

  return result
}

export const clojureHandler: LanguageHandler = {
  translate: jsToClojure,
  normalize: normalizeClojureOutput,
  skipList: CLOJURE_SKIP_LIST,
  dockerImage: 'clojure:temurin-21-tools-deps',
  displayName: 'Clojure',
  version: '1.12',
  get parityValue() {
    return `${this.displayName} ${this.version}`
  },
  dockerCmd: (code: string) => ['clojure', '-M', '-e', code],
  mountRepo: false,
}
