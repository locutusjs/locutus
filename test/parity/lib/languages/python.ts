/**
 * Python language handler for verification
 */

import { extractAssignedVar } from '../runner.ts'
import type { LanguageHandler } from '../types.ts'

// String module constants (called without parentheses in Python)
const STRING_CONSTANTS = new Set([
  'ascii_letters',
  'ascii_lowercase',
  'ascii_uppercase',
  'digits',
  'hexdigits',
  'octdigits',
  'printable',
  'punctuation',
  'whitespace',
])

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
 * @param line - The JS line to convert
 * @param funcName - The function name (e.g., "ceil")
 * @param module - The Python module (inferred from category, e.g., "math")
 */
function convertJsLineToPython(line: string, funcName: string, module: string): string {
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

  // Handle function calls - prefix with module (inferred from category/directory)
  if (STRING_CONSTANTS.has(funcName)) {
    // Constants like string.digits - replace funcName() with module.funcName
    py = py.replace(new RegExp(`\\b${funcName}\\s*\\(\\s*\\)`, 'g'), `${module}.${funcName}`)
  } else {
    // Functions like math.factorial - replace funcName( with module.funcName(
    py = py.replace(new RegExp(`\\b${funcName}\\s*\\(`, 'g'), `${module}.${funcName}(`)
  }

  return py
}

/**
 * Convert JS example code to Python
 * @param jsCode - Array of JS code lines
 * @param funcName - The function name (e.g., "ceil")
 * @param category - The category/directory (e.g., "math") - used as Python module name
 */
function jsToPython(jsCode: string[], funcName: string, category?: string): string {
  // Category is the Python module (e.g., "math" from src/python/math/ceil.js)
  const module = category || 'builtins'
  const lines = jsCode.map((line) => convertJsLineToPython(line, funcName, module)).filter(Boolean)
  if (!lines.length) {
    return ''
  }

  // Import the module (category name = Python module name)
  const imports = `import ${module}\nimport json\n`

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
function normalizePythonOutput(output: string, _expected?: string): string {
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
  displayName: 'Python',
  version: '3.12',
  get parityValue() {
    return `${this.displayName} ${this.version}`
  },
  dockerCmd: (code: string) => ['python3', '-c', code],
  mountRepo: false,
}
