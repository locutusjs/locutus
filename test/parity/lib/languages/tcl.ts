/**
 * Tcl language handler for verification
 */

import { runInDocker } from '../docker.ts'
import { extractAssignedVar } from '../runner.ts'
import type { LanguageHandler } from '../types.ts'
import { buildDiscoveredUpstreamSurfaceSnapshot } from '../upstream-surface-discovery.ts'

export const TCL_SKIP_LIST = new Set<string>([
  // None currently
])

const TCL_DOCKER_IMAGE = 'python:3.12'
const TCL_NAMESPACE_CATALOG_TARGET = 'Tcl 8.6'
const TCL_NAMESPACE_CATALOG_SOURCE_REF = 'python:3.12:tclsh-info-commands'

function discoverTclUpstreamNamespaces() {
  const code = [
    'set namespaces [list core]',
    'foreach command [lsort [info commands]] {',
    '  if {[string first "::" $command] != -1} {',
    '    continue',
    '  }',
    '  if {$command eq "package" || $command eq "zlib"} {',
    '    lappend namespaces $command',
    '  } elseif {[namespace ensemble exists $command]} {',
    '    lappend namespaces $command',
    '  }',
    '}',
    'puts [join [lsort -unique $namespaces] "\\n"]',
  ].join('\n')
  const result = runInDocker(TCL_DOCKER_IMAGE, [
    'sh',
    '-lc',
    `cat <<'__LOCUTUS_TCL__' | tclsh\n${code}\n__LOCUTUS_TCL__`,
  ])
  if (!result.success) {
    throw new Error(result.error || 'Unable to discover Tcl upstream namespaces')
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

function discoverTclUpstreamNamespaceCatalog() {
  return {
    target: TCL_NAMESPACE_CATALOG_TARGET,
    sourceKind: 'runtime' as const,
    sourceRef: TCL_NAMESPACE_CATALOG_SOURCE_REF,
    namespaces: discoverTclUpstreamNamespaces(),
  }
}

function discoverTclUpstreamSurface() {
  const catalog = discoverTclUpstreamNamespaceCatalog()
  type TclDiscoveredNamespace = {
    namespace: string
    entries: string[]
    sourceRef?: string
  }
  const discoverNamespace = (namespace: string) => {
    const code = [
      `set map [namespace ensemble configure ${namespace} -map]`,
      'puts [join [lsort [dict keys $map]] "\\n"]',
    ].join('\n')
    const result = runInDocker(TCL_DOCKER_IMAGE, [
      'sh',
      '-lc',
      `cat <<'__LOCUTUS_TCL__' | tclsh\n${code}\n__LOCUTUS_TCL__`,
    ])
    if (!result.success) {
      throw new Error(result.error || `Unable to discover Tcl upstream surface for ${namespace}`)
    }

    const entries = result.output
      .trim()
      .split('\n')
      .map((line) => line.trim())
      .filter(Boolean)
      .sort()

    return { namespace, entries }
  }

  const discoverCoreCommands = () => {
    const result = runInDocker(TCL_DOCKER_IMAGE, [
      'sh',
      '-lc',
      'cat <<\'__LOCUTUS_TCL__\' | tclsh\nputs [join [lsort [info commands]] "\\n"]\n__LOCUTUS_TCL__',
    ])
    if (!result.success) {
      throw new Error(result.error || 'Unable to discover Tcl upstream surface for core')
    }

    const excluded = new Set([
      'array',
      'binary',
      'chan',
      'clock',
      'dict',
      'encoding',
      'file',
      'info',
      'namespace',
      'package',
      'string',
      'zlib',
    ])

    const entries = result.output
      .trim()
      .split('\n')
      .map((line) => line.trim())
      .filter((line) => line && !excluded.has(line))
      .sort()

    return { namespace: 'core', entries }
  }

  const namespaces: TclDiscoveredNamespace[] = [
    discoverCoreCommands(),
    discoverNamespace('array'),
    discoverNamespace('binary'),
    discoverNamespace('chan'),
    discoverNamespace('clock'),
    discoverNamespace('dict'),
    discoverNamespace('encoding'),
    discoverNamespace('file'),
    discoverNamespace('info'),
    discoverNamespace('namespace'),
    {
      namespace: 'package',
      sourceRef: 'https://www.tcl-lang.org/man/tcl8.6/TclCmd/package.htm',
      entries: [
        'forget',
        'ifneeded',
        'names',
        'present',
        'provide',
        'require',
        'unknown',
        'vcompare',
        'versions',
        'vsatisfies',
      ],
    },
    discoverNamespace('string'),
    {
      namespace: 'zlib',
      sourceRef: 'https://www.tcl-lang.org/man/tcl8.6/TclCmd/zlib.htm',
      entries: ['adler32', 'compress', 'crc32', 'decompress', 'deflate', 'gunzip', 'gzip', 'inflate', 'push'],
    },
  ]

  return buildDiscoveredUpstreamSurfaceSnapshot({
    language: 'tcl',
    catalog,
    namespaces: namespaces.map((namespace) => ({
      ...namespace,
      title: namespace.namespace,
      sourceRef: namespace.sourceRef ?? `${TCL_DOCKER_IMAGE}:${namespace.namespace}`,
    })),
  })
}

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
    } else if (char === '"' || char === "'") {
      inString = char
    } else if (char === '/' && code[i + 1] === '/') {
      return code.slice(0, i).trim()
    }
  }

  return code
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

function normalizeVarName(name: string): string {
  return name.startsWith('$') ? name.slice(1) : name
}

function quoteTclString(value: string): string {
  return `"${value
    .replace(/\\/g, '\\\\')
    .replace(/"/g, '\\"')
    .replace(/\$/g, '\\$')
    .replace(/\[/g, '\\[')
    .replace(/\]/g, '\\]')}"`
}

function decodeJsString(token: string): string {
  const quote = token[0]
  if (!quote || (quote !== '"' && quote !== "'") || token[token.length - 1] !== quote) {
    return token
  }
  const inner = token.slice(1, -1)
  return inner.replace(/\\'/g, "'").replace(/\\"/g, '"').replace(/\\\\/g, '\\')
}

function convertArgument(arg: string, funcName: string): string {
  const trimmed = arg.trim()

  if (trimmed.startsWith('[') && trimmed.endsWith(']')) {
    const inner = trimmed.slice(1, -1).trim()
    if (!inner) {
      return '[list]'
    }
    const listItems = splitArgs(inner).map((item) => convertArgument(item, funcName))
    return `[list ${listItems.join(' ')}]`
  }

  if ((trimmed.startsWith("'") && trimmed.endsWith("'")) || (trimmed.startsWith('"') && trimmed.endsWith('"'))) {
    return quoteTclString(decodeJsString(trimmed))
  }

  if (trimmed === 'null' || trimmed === 'undefined') {
    return '""'
  }
  if (trimmed === 'true') {
    return '1'
  }
  if (trimmed === 'false') {
    return '0'
  }
  if (/^-?\d+(?:\.\d+)?$/.test(trimmed)) {
    return trimmed
  }

  const lengthMatch = trimmed.match(/^(\$?[A-Za-z_][\w$]*)\.length$/)
  if (lengthMatch?.[1]) {
    return `[string length $${normalizeVarName(lengthMatch[1])}]`
  }

  const nestedCallMatch = trimmed.match(/^([A-Za-z_]\w*)\s*\(([\s\S]*)\)$/)
  if (nestedCallMatch?.[1] && nestedCallMatch[1] === funcName) {
    const nestedArgs = splitArgs(nestedCallMatch[2] ?? '').map((item) => convertArgument(item, funcName))
    return `[string ${funcName} ${nestedArgs.join(' ')}]`
  }

  if (/^\$?[A-Za-z_][\w$]*$/.test(trimmed)) {
    return `$${normalizeVarName(trimmed)}`
  }

  return trimmed
}

function convertExpression(expr: string, funcName: string): string {
  const trimmed = expr.trim()
  const callMatch = trimmed.match(/^([A-Za-z_]\w*)\s*\(([\s\S]*)\)$/)
  if (callMatch?.[1] && callMatch[1] === funcName) {
    const args = splitArgs(callMatch[2] ?? '').map((arg) => convertArgument(arg, funcName))
    if (funcName === 'regsub') {
      while (args.length < 5) {
        args.push('0')
      }
      return `[locutus_regsub ${args.join(' ')}]`
    }
    return `[string ${funcName} ${args.join(' ')}]`
  }

  return convertArgument(trimmed, funcName)
}

function convertJsLineToTcl(line: string, funcName: string): string {
  let tcl = line.trim()
  if (!tcl) {
    return ''
  }

  tcl = stripTrailingComment(tcl)
  tcl = tcl.replace(/;+$/, '')
  if (!tcl) {
    return ''
  }

  const declarationMatch = tcl.match(/^(?:var|let|const)\s+(\$?[A-Za-z_][\w$]*)\s*=\s*([\s\S]+)$/)
  if (declarationMatch?.[1] && declarationMatch[2]) {
    return `set ${normalizeVarName(declarationMatch[1])} ${convertExpression(declarationMatch[2], funcName)}`
  }

  const assignmentMatch = tcl.match(/^(\$?[A-Za-z_][\w$]*)\s*=\s*([\s\S]+)$/)
  if (assignmentMatch?.[1] && assignmentMatch[2]) {
    return `set ${normalizeVarName(assignmentMatch[1])} ${convertExpression(assignmentMatch[2], funcName)}`
  }

  return convertExpression(tcl, funcName)
}

function jsToTcl(jsCode: string[], funcName: string, _category?: string): string {
  const lines = jsCode.map((line) => convertJsLineToTcl(line, funcName)).filter(Boolean)
  if (!lines.length) {
    return ''
  }

  const setupLines: string[] = []
  if (funcName === 'regsub') {
    setupLines.push(
      'proc locutus_regsub {pattern input replacement all nocase} {',
      '  set opts [list]',
      '  if {$all ne "0"} {lappend opts -all}',
      '  if {$nocase ne "0"} {lappend opts -nocase}',
      '  set out $input',
      '  regsub {*}$opts -- $pattern $input $replacement out',
      '  return $out',
      '}',
    )
  }

  const originalLastLine = jsCode[jsCode.length - 1]
  const assignedVar = extractAssignedVar(originalLastLine)

  if (assignedVar) {
    const normalizedVar = normalizeVarName(assignedVar)
    const prefix = setupLines.length ? `${setupLines.join('\n')}\n` : ''
    return `${prefix}${lines.join('\n')}\nputs $${normalizedVar}`
  }

  const setup = lines.slice(0, -1)
  const lastExpr = lines[lines.length - 1] ?? ''
  const withHelpers = setupLines.concat(setup)
  const prefix = withHelpers.length ? `${withHelpers.join('\n')}\n` : ''
  return `${prefix}puts ${lastExpr}`
}

function normalizeTclOutput(output: string, expected?: string): string {
  // Tcl `puts` appends a trailing newline; preserve meaningful whitespace.
  const result = output.replace(/\r?\n+$/, '')
  if (expected === 'true' && result === '1') {
    return 'true'
  }
  if (expected === 'false' && result === '0') {
    return 'false'
  }
  if (expected && /^".*"$/.test(expected) && !/^".*"$/.test(result)) {
    return `"${result}"`
  }
  return result
}

export const tclHandler: LanguageHandler = {
  translate: jsToTcl,
  normalize: normalizeTclOutput,
  skipList: TCL_SKIP_LIST,
  // python:3.12 includes tclsh (8.6.x) and is available on Docker Hub.
  dockerImage: TCL_DOCKER_IMAGE,
  displayName: 'Tcl',
  version: '8.6',
  get parityValue() {
    return `${this.displayName} ${this.version}`
  },
  dockerCmd: (code: string) => ['sh', '-lc', `cat <<'__LOCUTUS_TCL__' | tclsh\n${code}\n__LOCUTUS_TCL__`],
  mountRepo: false,
  upstreamSurface: {
    discover: discoverTclUpstreamSurface,
    discoverNamespaceCatalog: discoverTclUpstreamNamespaceCatalog,
    getLocutusEntry: (func) => ({
      namespace: func.category,
      name: func.name,
    }),
  },
}
