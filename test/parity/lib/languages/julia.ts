/**
 * Julia language handler for verification
 */

import { extractAssignedVar } from '../runner.ts'
import type { LanguageHandler } from '../types.ts'

// Functions to skip (implementation differences, etc.)
export const JULIA_SKIP_LIST = new Set<string>([
  // None currently
])

function splitArgs(argsText: string): string[] {
  const args: string[] = []
  let current = ''
  let inString: string | null = null
  let escaped = false
  let depthParen = 0
  let depthBracket = 0
  let depthBrace = 0

  for (let i = 0; i < argsText.length; i++) {
    const char = argsText[i] ?? ''

    if (escaped) {
      current += char
      escaped = false
      continue
    }

    if (char === '\\') {
      current += char
      escaped = true
      continue
    }

    if (inString) {
      current += char
      if (char === inString) {
        inString = null
      }
      continue
    }

    if (char === '"' || char === "'") {
      inString = char
      current += char
      continue
    }

    if (char === '(') {
      depthParen++
      current += char
      continue
    }
    if (char === ')') {
      depthParen--
      current += char
      continue
    }
    if (char === '[') {
      depthBracket++
      current += char
      continue
    }
    if (char === ']') {
      depthBracket--
      current += char
      continue
    }
    if (char === '{') {
      depthBrace++
      current += char
      continue
    }
    if (char === '}') {
      depthBrace--
      current += char
      continue
    }

    if (char === ',' && depthParen === 0 && depthBracket === 0 && depthBrace === 0) {
      const trimmed = current.trim()
      if (trimmed) {
        args.push(trimmed)
      }
      current = ''
      continue
    }

    current += char
  }

  const tail = current.trim()
  if (tail) {
    args.push(tail)
  }
  return args
}

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

  // Convert single-quoted strings to double-quoted (Julia uses single quotes only for chars)
  jl = jl.replace(/'([^'\\]*(\\.[^'\\]*)*)'/g, '"$1"')

  // JS → Julia conversions
  jl = jl.replace(/\btrue\b/g, 'true')
  jl = jl.replace(/\bfalse\b/g, 'false')
  jl = jl.replace(/\bnull\b/g, 'nothing')
  jl = jl.replace(/\bundefined\b/g, 'nothing')

  // JS special values → Julia
  jl = jl.replace(/\bInfinity\b/g, 'Inf')
  jl = jl.replace(/\bNaN\b/g, 'NaN')

  // sortperm uses keyword arguments in Julia (`rev=true`) instead of positional booleans.
  if (funcName === 'sortperm') {
    jl = jl.replace(/sortperm\s*\(([\s\S]*)\)$/g, (_match: string, argsText: string) => {
      const args = splitArgs(argsText)
      if (args.length === 2) {
        return `sortperm(${args[0]}; rev=${args[1]})`
      }
      return `sortperm(${argsText})`
    })
  }

  // partialsortperm(v, k[, rev]) in locutus maps to partialsortperm(v, 1:k; rev=...)
  if (funcName === 'partialsortperm') {
    jl = jl.replace(/partialsortperm\s*\(([\s\S]*)\)$/g, (_match: string, argsText: string) => {
      const args = splitArgs(argsText)
      if (args.length >= 2) {
        const base = `partialsortperm(${args[0]}, 1:${args[1]}`
        if (args.length >= 3) {
          return `${base}; rev=${args[2]})`
        }
        return `${base})`
      }
      return `partialsortperm(${argsText})`
    })
  }

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

  // Normalize Julia array rendering spacing: `[1, 2, 3]` -> `[1,2,3]`.
  if (expected && /^\[.*\]$/.test(expected) && /^\[.*\]$/.test(result)) {
    result = result.replace(/,\s+/g, ',')
  }

  // String quoting: Julia's print() doesn't add quotes, but expected values have them
  if (expected && /^".*"$/.test(expected) && !/^".*"$/.test(result)) {
    result = `"${result}"`
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
