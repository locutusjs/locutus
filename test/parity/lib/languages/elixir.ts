/**
 * Elixir language handler for verification
 */

import { extractAssignedVar } from '../runner.ts'
import type { LanguageHandler } from '../types.ts'

// Functions to skip (implementation differences, etc.)
export const ELIXIR_SKIP_LIST = new Set<string>([
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
 * Convert a single JS line to Elixir
 */
function convertJsLineToElixir(line: string, funcName: string, module: string): string {
  let ex = line.trim()
  if (!ex) {
    return ''
  }

  ex = stripTrailingComment(ex)
  ex = ex.replace(/;+$/, '')

  // Remove var/let/const - Elixir just uses name = value
  ex = ex.replace(/^\s*(var|let|const)\s+/, '')

  // JS → Elixir conversions
  ex = ex.replace(/\btrue\b/g, 'true')
  ex = ex.replace(/\bfalse\b/g, 'false')
  ex = ex.replace(/\bnull\b/g, 'nil')
  ex = ex.replace(/\bundefined\b/g, 'nil')

  // JS special values → Elixir (Elixir doesn't have native Infinity)
  ex = ex.replace(/\bInfinity\b/g, ':infinity')
  ex = ex.replace(/\bNaN\b/g, ':nan')

  // Handle function calls - for Float functions, ensure inputs are floats
  // Float.ceil(3) fails in Elixir (needs Float.ceil(3.0)), so use Float.ceil(x / 1)
  // Kernel functions are auto-imported, so no prefix needed
  if (module === 'Float') {
    ex = ex.replace(new RegExp(`\\b${funcName}\\s*\\(([^)]+)\\)`, 'g'), `${module}.${funcName}($1 / 1)`)
  } else if (module === 'Kernel') {
    // Kernel is auto-imported, so just use bare function name
    // No transformation needed - function name stays as is
  } else {
    ex = ex.replace(new RegExp(`\\b${funcName}\\s*\\(`, 'g'), `${module}.${funcName}(`)
  }

  return ex
}

/**
 * Convert JS example code to Elixir
 */
function jsToElixir(jsCode: string[], funcName: string, category?: string): string {
  const module = category || 'Float'
  const lines = jsCode.map((line) => convertJsLineToElixir(line, funcName, module)).filter(Boolean)
  if (!lines.length) {
    return ''
  }

  const originalLastLine = jsCode[jsCode.length - 1]
  const assignedVar = extractAssignedVar(originalLastLine)

  // For Kernel functions, don't use trunc() as they may return floats
  // For Float functions like ceil/floor, use trunc() to get integer output
  const outputFn = module === 'Kernel' ? 'IO.puts' : 'IO.puts(trunc'
  const outputEnd = module === 'Kernel' ? ')' : '))'

  let result: string
  if (assignedVar) {
    result = `${lines.join('\n')}\n${outputFn}(${assignedVar}${outputEnd}`
  } else {
    const setup = lines.slice(0, -1)
    const lastExpr = lines[lines.length - 1]
    const prefix = setup.length ? `${setup.join('\n')}\n` : ''
    result = `${prefix}${outputFn}(${lastExpr}${outputEnd}`
  }

  return result
}

/**
 * Normalize Elixir output for comparison
 */
function normalizeElixirOutput(output: string, _expected?: string): string {
  let result = output.trim()
  // Strip trailing .0 from floats for integer comparison
  if (/^-?\d+\.0$/.test(result)) {
    result = result.replace(/\.0$/, '')
  }
  return result
}

export const elixirHandler: LanguageHandler = {
  translate: jsToElixir,
  normalize: normalizeElixirOutput,
  skipList: ELIXIR_SKIP_LIST,
  dockerImage: 'elixir:1.18',
  displayName: 'Elixir',
  version: '1.18',
  get parityValue() {
    return `${this.displayName} ${this.version}`
  },
  dockerCmd: (code: string) => ['elixir', '-e', code],
  mountRepo: false,
}
