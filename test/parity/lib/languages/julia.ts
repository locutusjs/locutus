/**
 * Julia language handler for verification
 */

import { extractAssignedVar } from '../runner.ts'
import type { LanguageHandler } from '../types.ts'

// Functions to skip (implementation differences, etc.)
export const JULIA_SKIP_LIST = new Set<string>([
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
 * Convert a single JS line to Julia
 */
function convertJsLineToJulia(line: string, funcName: string): string {
  let jl = line.trim()
  if (!jl) {
    return ''
  }

  jl = stripTrailingComment(jl)
  jl = jl.replace(/;+$/, '')

  // Remove var/let/const - Julia just uses name = value
  jl = jl.replace(/^\s*(var|let|const)\s+/, '')

  // JS → Julia conversions
  jl = jl.replace(/\btrue\b/g, 'true')
  jl = jl.replace(/\bfalse\b/g, 'false')
  jl = jl.replace(/\bnull\b/g, 'nothing')
  jl = jl.replace(/\bundefined\b/g, 'nothing')

  // JS special values → Julia
  jl = jl.replace(/\bInfinity\b/g, 'Inf')
  jl = jl.replace(/\bNaN\b/g, 'NaN')

  // Julia's ceil returns an integer when called on Int, float otherwise
  // For float input we need ceil(x) which returns same type

  return jl
}

/**
 * Convert JS example code to Julia
 */
function jsToJulia(jsCode: string[], funcName: string, _category?: string): string {
  const lines = jsCode.map((line) => convertJsLineToJulia(line, funcName)).filter(Boolean)
  if (!lines.length) {
    return ''
  }

  const originalLastLine = jsCode[jsCode.length - 1]
  const assignedVar = extractAssignedVar(originalLastLine)

  let result: string
  if (assignedVar) {
    result = `${lines.join('\n')}\nprint(${assignedVar})`
  } else {
    const setup = lines.slice(0, -1)
    const lastExpr = lines[lines.length - 1]
    const prefix = setup.length ? `${setup.join('\n')}\n` : ''
    result = `${prefix}print(${lastExpr})`
  }

  return result
}

/**
 * Normalize Julia output for comparison
 */
function normalizeJuliaOutput(output: string, expected?: string): string {
  let result = output.trim()

  // Handle -0 -> 0 conversion (for ceil(-0.5) which returns -0 in Julia)
  if ((result === '-0' || result === '-0.0') && (expected === '0' || expected === '0.0')) {
    return expected || '0'
  }

  // Strip trailing .0 from floats for integer comparison
  if (expected && /^-?\d+$/.test(expected) && /^-?\d+\.0$/.test(result)) {
    result = result.replace(/\.0$/, '')
  }
  return result
}

export const juliaHandler: LanguageHandler = {
  translate: jsToJulia,
  normalize: normalizeJuliaOutput,
  skipList: JULIA_SKIP_LIST,
  dockerImage: 'julia:1.11',
  displayName: 'Julia',
  version: '1.11',
  get parityValue() {
    return `${this.displayName} ${this.version}`
  },
  dockerCmd: (code: string) => ['julia', '-e', code],
  mountRepo: false,
}
