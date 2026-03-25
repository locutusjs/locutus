/**
 * Python language handler for verification
 */

import { runInDocker } from '../docker.ts'
import { extractAssignedVar } from '../runner.ts'
import type { LanguageHandler } from '../types.ts'
import { fetchText } from '../upstream-surface-canonical.ts'
import { buildDiscoveredUpstreamSurfaceSnapshot } from '../upstream-surface-discovery.ts'

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
const PYTHON_NAMESPACE_CATALOG_TARGET = 'Python 3.12'
const PYTHON_NAMESPACE_CATALOG_SOURCE_REF =
  'https://docs.python.org/3.12/py-modindex.html ∩ python:3.12:importable-documented-modules'
const PYTHON_NAMESPACE_EXCLUDES = new Set(['antigravity'])
const PYTHON_MODULE_INDEX_URL = 'https://docs.python.org/3.12/py-modindex.html'

const PYTHON_NAMESPACE_CONFIG: Record<
  string,
  {
    importName?: string
    allowedModules?: string[]
  }
> = {
  bisect: { allowedModules: ['bisect', '_bisect'] },
  builtins: { allowedModules: ['builtins', 'io'] },
  csv: { allowedModules: ['csv', '_csv'] },
  functools: { allowedModules: ['functools', '_functools'] },
  hashlib: { allowedModules: ['hashlib', '_hashlib'] },
  heapq: { allowedModules: ['heapq', '_heapq'] },
  operator: { allowedModules: ['operator', '_operator'] },
  random: { allowedModules: ['random', '_random'] },
  'urllib.parse': { importName: 'urllib.parse', allowedModules: ['urllib.parse'] },
}

async function discoverPythonUpstreamSurface() {
  const catalog = await discoverPythonUpstreamNamespaceCatalog()
  const namespaces = catalog.namespaces
  const namespaceConfigs = namespaces.map((namespace) => {
    const config = PYTHON_NAMESPACE_CONFIG[namespace] ?? {}
    return {
      namespace,
      importName: config.importName ?? namespace,
      allowedModules: [...new Set(config.allowedModules ?? [config.importName ?? namespace])].sort(),
    }
  })
  const script = `
import builtins
import contextlib
import io
import importlib
import inspect
import json
import string

modules = ${JSON.stringify(namespaceConfigs)}

snapshots = []
for config in modules:
  namespace = config["namespace"]
  if namespace == "builtins":
    module = builtins
    is_package = False
  else:
    with contextlib.redirect_stdout(io.StringIO()), contextlib.redirect_stderr(io.StringIO()):
      module = importlib.import_module(config["importName"])
    is_package = hasattr(module, "__path__")
  allowed_modules = set(config["allowedModules"])
  entries = sorted(
    name
    for name in dir(module)
    if not name.startswith("_")
    and (
      name in ${JSON.stringify([...STRING_CONSTANTS].sort())}
      or (
        callable(getattr(module, name))
        and not name[:1].isupper()
        and (
          getattr(getattr(module, name), "__module__", namespace) in allowed_modules
          or (
            is_package and getattr(getattr(module, name), "__module__", namespace).startswith(namespace + ".")
          )
        )
      )
    )
  )
  snapshots.append({
    "namespace": namespace,
    "entries": entries,
  })

print(json.dumps({"language": "python", "namespaces": snapshots}))
`.trim()
  const result = runInDocker(PYTHON_DOCKER_IMAGE, ['python3', '-c', script], {
    timeout: 120000,
    maxBuffer: 32 * 1024 * 1024,
  })

  if (!result.success) {
    throw new Error(result.error || 'Unable to discover Python upstream surface')
  }

  const parsed = JSON.parse(result.output) as unknown
  if (!parsed || typeof parsed !== 'object') {
    throw new Error('Python upstream surface output was not an object')
  }

  const scoped = parsed as {
    language: string
    namespaces: Array<{
      namespace: string
      entries: string[]
    }>
  }

  return buildDiscoveredUpstreamSurfaceSnapshot({
    language: 'python',
    catalog,
    namespaces: scoped.namespaces.map((namespace) => {
      const config = PYTHON_NAMESPACE_CONFIG[namespace.namespace] ?? {}
      return {
        namespace: namespace.namespace,
        title: namespace.namespace,
        sourceRef: `${PYTHON_DOCKER_IMAGE}:${config.importName ?? namespace.namespace}`,
        entries: namespace.entries,
      }
    }),
  })
}

async function fetchPythonDocumentedNamespaces(): Promise<string[]> {
  const html = await fetchText(PYTHON_MODULE_INDEX_URL)
  const documented = [...html.matchAll(/<code class="xref">([^<]+)<\/code>/g)]
    .map((match) => match[1]?.trim() ?? '')
    .filter((entry) => entry && !entry.startsWith('_') && !entry.startsWith('xx'))

  return [...new Set(documented.concat('builtins'))].filter((entry) => !PYTHON_NAMESPACE_EXCLUDES.has(entry)).sort()
}

function discoverImportablePythonNamespaces(documentedNamespaces: string[]): string[] {
  const script = `
import contextlib
import importlib
import io
import json

documented_namespaces = ${JSON.stringify(documentedNamespaces)}
importable_namespaces = []

for namespace in documented_namespaces:
  if namespace == "builtins":
    importable_namespaces.append(namespace)
    continue
  try:
    with contextlib.redirect_stdout(io.StringIO()), contextlib.redirect_stderr(io.StringIO()):
      importlib.import_module(namespace)
  except Exception:
    continue
  importable_namespaces.append(namespace)

print(json.dumps(sorted(set(importable_namespaces))))
`.trim()
  const result = runInDocker(PYTHON_DOCKER_IMAGE, ['python3', '-c', script], {
    timeout: 120000,
    maxBuffer: 8 * 1024 * 1024,
  })

  if (!result.success) {
    throw new Error(result.error || 'Unable to determine importable Python upstream namespaces')
  }

  const parsed = JSON.parse(result.output) as unknown
  if (!Array.isArray(parsed)) {
    throw new Error('Python upstream namespace output was not an array')
  }

  return parsed
    .filter((entry): entry is string => typeof entry === 'string')
    .filter((entry) => !PYTHON_NAMESPACE_EXCLUDES.has(entry))
    .sort()
}

async function discoverPythonUpstreamNamespaces(): Promise<string[]> {
  const documentedNamespaces = await fetchPythonDocumentedNamespaces()
  return discoverImportablePythonNamespaces(documentedNamespaces)
}

async function discoverPythonUpstreamNamespaceCatalog() {
  return {
    target: PYTHON_NAMESPACE_CATALOG_TARGET,
    sourceKind: 'source_manifest' as const,
    sourceRef: PYTHON_NAMESPACE_CATALOG_SOURCE_REF,
    namespaces: await discoverPythonUpstreamNamespaces(),
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

  if (funcName === 'quantiles') {
    py = py.replace(/\bquantiles\s*\(([\s\S]*)\)$/g, (match, argsText) => {
      const args = splitArgs(argsText)
      const data = args[0]
      if (!data) {
        return match
      }
      if (args.length === 1) {
        return `${module}.quantiles(${data})`
      }
      if (args.length === 2) {
        return `${module}.quantiles(${data}, n=${args[1]})`
      }
      return `${module}.quantiles(${data}, n=${args[1]}, method=${args[2]})`
    })
    return py
  }

  if (funcName === 'correlation') {
    py = py.replace(/\bcorrelation\s*\(([\s\S]*)\)$/g, (match, argsText) => {
      const args = splitArgs(argsText)
      const left = args[0]
      const right = args[1]
      if (!left || !right) {
        return match
      }
      if (args.length === 2) {
        return `${module}.correlation(${left}, ${right})`
      }
      return `${module}.correlation(${left}, ${right}, method=${args[2]})`
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
function normalizePythonValue(value: unknown, expected: unknown): unknown {
  if (typeof value === 'number' && typeof expected === 'number') {
    if (Number.isFinite(value) && Number.isFinite(expected) && Math.abs(value - expected) < 1e-12) {
      return expected
    }
    return value
  }

  if (Array.isArray(value) && Array.isArray(expected)) {
    return value.map((entry, index) => normalizePythonValue(entry, expected[index]))
  }

  if (
    value &&
    expected &&
    typeof value === 'object' &&
    typeof expected === 'object' &&
    !Array.isArray(value) &&
    !Array.isArray(expected)
  ) {
    const normalized: Record<string, unknown> = {}
    for (const [key, entry] of Object.entries(value)) {
      normalized[key] = normalizePythonValue(entry, (expected as Record<string, unknown>)[key])
    }
    return normalized
  }

  return value
}

function normalizePythonOutput(output: string, expected?: string): string {
  let result = output.trim()

  // Python json.dumps includes spaces after commas/colons by default.
  // Canonicalize JSON-like output for stable string comparison.
  try {
    const parsed = JSON.parse(result)
    if (expected) {
      try {
        const parsedExpected = JSON.parse(expected)
        result = JSON.stringify(normalizePythonValue(parsed, parsedExpected))
      } catch {
        result = JSON.stringify(parsed)
      }
    } else {
      result = JSON.stringify(parsed)
    }
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
    discoverNamespaceCatalog: discoverPythonUpstreamNamespaceCatalog,
    getLocutusEntry: (func) => ({
      namespace: func.category,
      name: func.name,
    }),
  },
}
