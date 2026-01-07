/**
 * Python language handler for verification
 */

import { extractAssignedVar } from '../runner.ts'
import type { LanguageHandler } from '../types.ts'

// Python module mapping: function name → Python import path
const PYTHON_MODULES: Record<string, { module: string; isConstant?: boolean }> = {
  // string module constants
  ascii_letters: { module: 'string', isConstant: true },
  ascii_lowercase: { module: 'string', isConstant: true },
  ascii_uppercase: { module: 'string', isConstant: true },
  digits: { module: 'string', isConstant: true },
  hexdigits: { module: 'string', isConstant: true },
  octdigits: { module: 'string', isConstant: true },
  printable: { module: 'string', isConstant: true },
  punctuation: { module: 'string', isConstant: true },
  whitespace: { module: 'string', isConstant: true },
  // string module functions
  capwords: { module: 'string' },
  // math module functions
  factorial: { module: 'math' },
  gcd: { module: 'math' },
  isfinite: { module: 'math' },
  isinf: { module: 'math' },
  isnan: { module: 'math' },
  pow: { module: 'math' },
  sqrt: { module: 'math' },
}

// Functions to skip (implementation differences, etc.)
export const PYTHON_SKIP_LIST = new Set<string>([
  // None currently - all Python functions should be testable
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
        // Found // outside of string - strip from here
        return code.slice(0, i).trim()
      }
    }
  }

  return code
}

/**
 * Convert a single JS line to Python
 */
function convertJsLineToPython(line: string, funcName: string): string {
  let py = line.trim()
  if (!py) {
    return ''
  }

  py = stripTrailingComment(py)
  py = py.replace(/;+$/, '')
  py = py.replace(/^\s*(var|let|const)\s+/, '')

  // JS → Python boolean/null conversions
  py = py.replace(/\btrue\b/g, 'True')
  py = py.replace(/\bfalse\b/g, 'False')
  py = py.replace(/\bnull\b/g, 'None')
  py = py.replace(/\bundefined\b/g, 'None')

  // JS special values → Python
  py = py.replace(/\bInfinity\b/g, "float('inf')")
  py = py.replace(/-\s*float\('inf'\)/g, "float('-inf')")
  py = py.replace(/\bNaN\b/g, "float('nan')")

  // .length → len()
  py = py.replace(/(\w+)\.length\b/g, 'len($1)')

  // Handle function calls - prefix with module
  const mapping = PYTHON_MODULES[funcName]
  if (mapping) {
    if (mapping.isConstant) {
      // Constants like string.digits - replace funcName() with module.funcName
      py = py.replace(new RegExp(`\\b${funcName}\\s*\\(\\s*\\)`, 'g'), `${mapping.module}.${funcName}`)
    } else {
      // Functions like math.factorial - replace funcName( with module.funcName(
      py = py.replace(new RegExp(`\\b${funcName}\\s*\\(`, 'g'), `${mapping.module}.${funcName}(`)
    }
  }

  return py
}

/**
 * Convert JS example code to Python
 */
function jsToPython(jsCode: string[], funcName: string): string {
  const lines = jsCode.map((line) => convertJsLineToPython(line, funcName)).filter(Boolean)
  if (!lines.length) {
    return ''
  }

  // Determine which module to import
  const mapping = PYTHON_MODULES[funcName]
  const imports = mapping ? `import ${mapping.module}\nimport json\n` : 'import json\n'

  const originalLastLine = jsCode[jsCode.length - 1]
  const assignedVar = extractAssignedVar(originalLastLine)

  let result: string
  if (assignedVar) {
    result = `${imports}${lines.join('\n')}\nprint(json.dumps(${assignedVar}))`
  } else {
    const setup = lines.slice(0, -1)
    const lastExpr = lines[lines.length - 1]
    const prefix = setup.length ? `${setup.join('\n')}\n` : ''
    result = `${imports}${prefix}print(json.dumps(${lastExpr}))`
  }

  return result
}

/**
 * Normalize Python output for comparison
 */
function normalizePythonOutput(output: string): string {
  let result = output.trim()
  // Strip trailing .0 from floats for integer comparison
  if (/^-?\d+\.0$/.test(result)) {
    result = result.replace(/\.0$/, '')
  }
  return result
}

export const pythonHandler: LanguageHandler = {
  translate: jsToPython,
  normalize: normalizePythonOutput,
  skipList: PYTHON_SKIP_LIST,
  dockerImage: 'python:3.12',
  version: '3.12',
  dockerCmd: (code: string) => ['python3', '-c', code],
  mountRepo: false,
}
