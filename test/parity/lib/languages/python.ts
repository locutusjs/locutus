/**
 * Python language handler for verification
 */

import { runInDocker } from '../docker.ts'
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

const PYTHON_DOCKER_IMAGE = 'python:3.12'
function discoverPythonUpstreamSurface() {
  const script = `
import difflib
import inspect
import json
import math
import re
import string

modules = {
  "math": math,
  "re": re,
  "string": string,
  "difflib": difflib,
}

snapshots = []
for namespace, module in modules.items():
  entries = sorted(
    name
    for name in dir(module)
    if not name.startswith("_")
    and (
      name in ${JSON.stringify([...STRING_CONSTANTS].sort())}
      or inspect.isroutine(getattr(module, name))
    )
  )
  snapshots.append({
    "namespace": namespace,
    "title": namespace,
    "target": "Python 3.12",
    "sourceKind": "runtime",
    "sourceRef": "${PYTHON_DOCKER_IMAGE}",
    "entries": entries,
  })

print(json.dumps({"language": "python", "namespaces": snapshots}))
`.trim()
  const result = runInDocker(PYTHON_DOCKER_IMAGE, ['python3', '-c', script])

  if (!result.success) {
    throw new Error(result.error || 'Unable to discover Python upstream surface')
  }

  const parsed = JSON.parse(result.output) as unknown
  if (!parsed || typeof parsed !== 'object') {
    throw new Error('Python upstream surface output was not an object')
  }

  return parsed as {
    language: string
    namespaces: Array<{
      namespace: string
      title: string
      target: string
      sourceKind: 'runtime'
      sourceRef: string
      entries: string[]
    }>
  }
}

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

  if (funcName === 'fsum') {
    py = py.replace(/\bfsum\s*\(([^)]*)\)/g, (match, argsText) => {
      const args = splitArgs(argsText)
      if (args.length === 0) {
        return `${module}.fsum([])`
      }
      if (args.length === 1) {
        return `${module}.fsum([${args[0]}])`
      }
      return `${module}.fsum([${args.join(', ')}])`
    })
    return py
  }

  if (funcName === 'isclose') {
    py = py.replace(/\bisclose\s*\(([^)]*)\)/g, (match, argsText) => {
      const args = splitArgs(argsText)
      const left = args[0]
      const right = args[1]
      if (!left || !right) {
        return match
      }
      if (args.length === 2) {
        return `${module}.isclose(${left}, ${right})`
      }
      if (args.length === 3) {
        const relTol = args[2]
        return `${module}.isclose(${left}, ${right}, rel_tol=${relTol})`
      }
      const relTol = args[2]
      const absTol = args[3]
      return `${module}.isclose(${left}, ${right}, rel_tol=${relTol}, abs_tol=${absTol})`
    })
    return py
  }

  if (funcName === 'prod') {
    py = py.replace(/\bprod\s*\(([\s\S]*)\)$/g, (match, argsText) => {
      const args = splitArgs(argsText)
      if (args.length === 0) {
        return `${module}.prod([])`
      }
      if (args.length === 1) {
        return `${module}.prod(${args[0]})`
      }
      return `${module}.prod(${args[0]}, start=${args[1]})`
    })
    return py
  }

  if (funcName === 'finditer') {
    py = py.replace(/\bfinditer\s*\(([\s\S]*)\)$/g, (match, argsText) => {
      const args = splitArgs(argsText)
      const pattern = args[0]
      const source = args[1]
      const flags = args[2]
      if (!pattern || !source) {
        return match
      }

      const call = flags
        ? `${module}.finditer(${pattern}, ${source}, ${flags})`
        : `${module}.finditer(${pattern}, ${source})`
      return `[{"match": __m.group(0), "index": __m.start(), "groups": list(__m.groups())} for __m in ${call}]`
    })
    return py
  }

  if (funcName === 'ndiff') {
    py = py.replace(/\bndiff\s*\(([\s\S]*)\)$/g, (match, argsText) => {
      const args = splitArgs(argsText)
      return `list(${module}.ndiff(${args.join(', ')}))`
    })
    return py
  }

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

  // Python json.dumps includes spaces after commas/colons by default.
  // Canonicalize JSON-like output for stable string comparison.
  try {
    const parsed = JSON.parse(result)
    result = JSON.stringify(parsed)
  } catch {
    // Non-JSON output: keep original normalization behavior.
  }

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
  dockerImage: PYTHON_DOCKER_IMAGE,
  displayName: 'Python',
  version: '3.12',
  get parityValue() {
    return `${this.displayName} ${this.version}`
  },
  dockerCmd: (code: string) => ['python3', '-c', code],
  mountRepo: false,
  upstreamSurface: {
    discover: discoverPythonUpstreamSurface,
    getLocutusEntry: (func) => ({
      namespace: func.category,
      name: func.name,
    }),
  },
}
