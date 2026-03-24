/**
 * R language handler for verification
 */

import { runInDocker } from '../docker.ts'
import { extractAssignedVar } from '../runner.ts'
import type { LanguageHandler } from '../types.ts'
import { buildDiscoveredUpstreamSurfaceSnapshot } from '../upstream-surface-discovery.ts'

// Functions to skip (implementation differences, etc.)
export const R_SKIP_LIST = new Set<string>([
  // None currently
])

const R_DOCKER_IMAGE = 'r-base:4.4.2'
const R_NAMESPACE_CATALOG_TARGET = 'R 4.4'
const R_NAMESPACE_CATALOG_SOURCE_REF = 'r-base:4.4.2:priority-base-recommended-packages'

function discoverRUpstreamNamespaces() {
  const result = runInDocker(
    R_DOCKER_IMAGE,
    [
      'Rscript',
      '-e',
      "ip <- installed.packages(priority = c('base','recommended'))[, 'Package']; cat(sort(unique(ip)), sep='\\n')",
    ],
    {
      timeout: 120000,
      maxBuffer: 8 * 1024 * 1024,
    },
  )
  if (!result.success) {
    throw new Error(result.error || 'Unable to discover R upstream namespaces')
  }

  return [
    ...new Set(
      result.output
        .trim()
        .split('\n')
        .map((line) => line.trim())
        .filter(Boolean),
    ),
  ].sort()
}

function discoverRUpstreamNamespaceCatalog() {
  return {
    target: R_NAMESPACE_CATALOG_TARGET,
    sourceKind: 'runtime' as const,
    sourceRef: R_NAMESPACE_CATALOG_SOURCE_REF,
    namespaces: discoverRUpstreamNamespaces(),
  }
}

function discoverRUpstreamSurface() {
  const catalog = discoverRUpstreamNamespaceCatalog()
  const namespaces = catalog.namespaces
  const quotedNamespaces = namespaces.map((namespace) => `"${namespace}"`).join(', ')
  const code = `
packages <- c(${quotedNamespaces})

discover_package <- function(pkg) {
  if (pkg == "base") {
    vals <- ls(baseenv())
    is_fun <- vapply(vals, function(name) is.function(get(name, envir = baseenv())), logical(1))
    return(sort(vals[is_fun]))
  }

  if (pkg == "tcltk") {
    suppressWarnings(suppressPackageStartupMessages(loadNamespace("tcltk")))
  } else if (pkg %in% c("class", "cluster", "foreign", "KernSmooth", "lattice", "MASS", "Matrix", "mgcv", "nlme", "nnet", "rpart", "spatial", "survival")) {
    suppressPackageStartupMessages(library(pkg, character.only = TRUE))
  } else {
    library(pkg, character.only = TRUE)
  }

  ns <- asNamespace(pkg)
  vals <- ls(ns)
  is_fun <- vapply(vals, function(name) is.function(get(name, envir = ns)), logical(1))
  sort(vals[is_fun])
}

for (pkg in packages) {
  entries <- discover_package(pkg)
  cat(pkg, "\\t", paste(entries, collapse = "\\u001f"), "\\n", sep = "")
}
`.trim()

  const result = runInDocker(R_DOCKER_IMAGE, ['Rscript', '-e', code], {
    timeout: 120000,
  })
  if (!result.success) {
    throw new Error(result.error || 'Unable to discover R upstream surface')
  }

  return buildDiscoveredUpstreamSurfaceSnapshot({
    language: 'r',
    catalog,
    namespaces: result.output
      .trim()
      .split('\n')
      .map((line) => line.trim())
      .filter(Boolean)
      .map((line) => {
        const [namespace, encodedEntries = ''] = line.split('\t')
        if (!namespace) {
          throw new Error('Unable to parse R upstream surface row')
        }
        return {
          namespace,
          title: namespace,
          sourceRef: `${R_DOCKER_IMAGE}:${namespace}`,
          entries: encodedEntries ? encodedEntries.split('\u001f').filter(Boolean).sort() : [],
        }
      }),
  })
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

  // Convert single-quoted strings to double-quoted (R uses double quotes for strings)
  r = r.replace(/'([^'\\]*(\\.[^'\\]*)*)'/g, '"$1"')

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
function normalizeROutput(output: string, expected?: string): string {
  let result = output.trim()
  // R sometimes outputs "[1] value" format - strip the prefix
  result = result.replace(/^\[\d+\]\s*/, '')
  // Strip trailing .0 from floats for integer comparison
  if (/^-?\d+\.?0*$/.test(result)) {
    result = result.replace(/\.0*$/, '')
  }

  // Float precision: R may print fewer decimal places
  if (expected && /^-?\d+\.\d+$/.test(expected) && /^-?\d+\.\d+$/.test(result)) {
    const expectedNum = parseFloat(expected)
    const resultNum = parseFloat(result)
    if (Math.abs(expectedNum - resultNum) < 1e-6) {
      result = expected
    }
  }

  // String quoting: R's cat() doesn't add quotes, but expected values have them
  if (expected && /^".*"$/.test(expected) && !/^".*"$/.test(result)) {
    result = `"${result}"`
  }

  return result
}

export const rHandler: LanguageHandler = {
  translate: jsToR,
  normalize: normalizeROutput,
  skipList: R_SKIP_LIST,
  dockerImage: R_DOCKER_IMAGE,
  displayName: 'R',
  version: '4.4',
  get parityValue() {
    return `${this.displayName} ${this.version}`
  },
  dockerCmd: (code: string) => ['Rscript', '-e', code],
  mountRepo: false,
  upstreamSurface: {
    discover: discoverRUpstreamSurface,
    discoverNamespaceCatalog: discoverRUpstreamNamespaceCatalog,
    getLocutusEntry: (func) => ({
      namespace: func.category,
      name: func.name,
    }),
  },
}
