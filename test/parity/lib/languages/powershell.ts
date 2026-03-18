/**
 * PowerShell language handler for verification
 */

import { extractAssignedVar } from '../runner.ts'
import type { LanguageHandler } from '../types.ts'
import { discoverPowerShellUpstreamSurface } from '../upstream-surface-canonical.ts'
import { discoverUpstreamSurfaceNamespaceCatalogFromScope } from '../upstream-surface-scope.ts'

export const POWERSHELL_SKIP_LIST = new Set<string>([
  // None currently
])

const POWERSHELL_DOCKER_IMAGE = 'mcr.microsoft.com/powershell:7.4-ubuntu-22.04'
const POWERSHELL_MEMBER_NAMES: Record<string, string> = {
  contains: 'Contains',
  endswith: 'EndsWith',
  indexof: 'IndexOf',
  insert: 'Insert',
  lastindexof: 'LastIndexOf',
  length: 'Length',
  padleft: 'PadLeft',
  padright: 'PadRight',
  remove: 'Remove',
  replace: 'Replace',
  split: 'Split',
  startswith: 'StartsWith',
  substring: 'Substring',
  tolower: 'ToLower',
  toupper: 'ToUpper',
  trim: 'Trim',
  trimend: 'TrimEnd',
  trimstart: 'TrimStart',
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

function toPsVar(name: string): string {
  return `$${normalizeVarName(name)}`
}

function decodeJsString(token: string): string {
  const quote = token[0]
  if (!quote || (quote !== '"' && quote !== "'") || token[token.length - 1] !== quote) {
    return token
  }
  try {
    const evaluate = new Function(`return (${token});`)
    const value = evaluate()
    return String(value)
  } catch {
    const inner = token.slice(1, -1)
    return inner.replace(/\\'/g, "'").replace(/\\"/g, '"').replace(/\\\\/g, '\\')
  }
}

function quotePsString(value: string): string {
  return `'${value.replace(/'/g, "''")}'`
}

function convertArgument(arg: string): string {
  const trimmed = arg.trim()

  if ((trimmed.startsWith("'") && trimmed.endsWith("'")) || (trimmed.startsWith('"') && trimmed.endsWith('"'))) {
    return quotePsString(decodeJsString(trimmed))
  }

  if (trimmed === 'null' || trimmed === 'undefined') {
    return '$null'
  }
  if (trimmed === 'true') {
    return '$true'
  }
  if (trimmed === 'false') {
    return '$false'
  }
  if (/^-?\d+(?:\.\d+)?$/.test(trimmed)) {
    return trimmed
  }

  const lengthMatch = trimmed.match(/^(\$?[A-Za-z_][\w$]*)\.length$/)
  if (lengthMatch?.[1]) {
    return `([string]${toPsVar(lengthMatch[1])}).Length`
  }

  if (/^\$?[A-Za-z_][\w$]*$/.test(trimmed)) {
    return toPsVar(trimmed)
  }

  return trimmed
}

function buildNativeCall(funcName: string, args: string[]): string {
  switch (funcName) {
    case 'contains': {
      const needle = args[0] ?? '$null'
      const haystack = args[1] ?? '$null'
      return `(([string]${haystack}).IndexOf(${needle}, [System.StringComparison]::Ordinal) -ge 0)`
    }
    case 'startswith': {
      const prefix = args[0] ?? '$null'
      const source = args[1] ?? '$null'
      return `([string]${source}).StartsWith(${prefix}, [System.StringComparison]::Ordinal)`
    }
    case 'endswith': {
      const suffix = args[0] ?? '$null'
      const source = args[1] ?? '$null'
      return `([string]${source}).EndsWith(${suffix}, [System.StringComparison]::Ordinal)`
    }
    case 'indexof': {
      const needle = args[0] ?? '$null'
      const source = args[1] ?? '$null'
      const start = args[2]
      if (start === undefined) {
        return `([string]${source}).IndexOf(${needle}, [System.StringComparison]::Ordinal)`
      }
      return `([string]${source}).IndexOf(${needle}, [int]${start}, [System.StringComparison]::Ordinal)`
    }
    case 'insert': {
      const source = args[0] ?? '$null'
      const start = args[1] ?? '0'
      const value = args[2] ?? "''"
      return `([string]${source}).Insert([int]${start}, [string]${value})`
    }
    case 'lastindexof': {
      const needle = args[0] ?? '$null'
      const source = args[1] ?? '$null'
      const start = args[2]
      if (start === undefined) {
        return `([string]${source}).LastIndexOf(${needle}, [System.StringComparison]::Ordinal)`
      }
      return `([string]${source}).LastIndexOf(${needle}, [int]${start}, [System.StringComparison]::Ordinal)`
    }
    case 'length': {
      const value = args[0] ?? '$null'
      return `([string]${value}).Length`
    }
    case 'padleft': {
      const source = args[0] ?? '$null'
      const width = args[1] ?? '0'
      const padChar = args[2]
      if (padChar === undefined) {
        return `([string]${source}).PadLeft([int]${width})`
      }
      return `([string]${source}).PadLeft([int]${width}, [char]${padChar})`
    }
    case 'padright': {
      const source = args[0] ?? '$null'
      const width = args[1] ?? '0'
      const padChar = args[2]
      if (padChar === undefined) {
        return `([string]${source}).PadRight([int]${width})`
      }
      return `([string]${source}).PadRight([int]${width}, [char]${padChar})`
    }
    case 'replace': {
      const source = args[0] ?? '$null'
      const from = args[1] ?? '$null'
      const to = args[2] ?? '$null'
      return `([string]${source}).Replace(${from}, ${to})`
    }
    case 'remove': {
      const source = args[0] ?? '$null'
      const start = args[1] ?? '0'
      const count = args[2]
      if (count === undefined) {
        return `([string]${source}).Remove([int]${start})`
      }
      return `([string]${source}).Remove([int]${start}, [int]${count})`
    }
    case 'split': {
      const source = args[0] ?? '$null'
      const delimiter = args[1] ?? "''"
      const limit = args[2]
      if (limit === undefined) {
        return `@(([string]${source}).Split(@([string]${delimiter}), [System.StringSplitOptions]::None))`
      }
      return `@(([string]${source}).Split(@([string]${delimiter}), ([int]${limit}) + 1, [System.StringSplitOptions]::None) | Select-Object -First ([int]${limit}))`
    }
    case 'tolower': {
      const value = args[0] ?? '$null'
      return `([string]${value}).ToLowerInvariant()`
    }
    case 'toupper': {
      const value = args[0] ?? '$null'
      return `([string]${value}).ToUpperInvariant()`
    }
    case 'trim': {
      const value = args[0] ?? '$null'
      return `([string]${value}).Trim()`
    }
    case 'trimend': {
      const value = args[0] ?? '$null'
      const chars = args[1]
      if (chars === undefined) {
        return `([string]${value}).TrimEnd()`
      }
      return `([string]${value}).TrimEnd(([string]${chars}).ToCharArray())`
    }
    case 'trimstart': {
      const value = args[0] ?? '$null'
      const chars = args[1]
      if (chars === undefined) {
        return `([string]${value}).TrimStart()`
      }
      return `([string]${value}).TrimStart(([string]${chars}).ToCharArray())`
    }
    case 'substring': {
      const source = args[0] ?? '$null'
      const start = args[1] ?? '0'
      const length = args[2]
      if (length === undefined) {
        return `([string]${source}).Substring([int]${start})`
      }
      return `([string]${source}).Substring([int]${start}, [int]${length})`
    }
    default: {
      return `${funcName}(${args.join(', ')})`
    }
  }
}

function convertExpression(expr: string, funcName: string): string {
  const trimmed = expr.trim()
  const callMatch = trimmed.match(/^([A-Za-z_]\w*)\s*\(([\s\S]*)\)$/)
  if (callMatch?.[1] && callMatch[1] === funcName) {
    const convertedArgs = splitArgs(callMatch[2] ?? '').map(convertArgument)
    return buildNativeCall(funcName, convertedArgs)
  }
  return convertArgument(trimmed)
}

function convertJsLineToPowerShell(line: string, funcName: string): string {
  let ps = line.trim()
  if (!ps) {
    return ''
  }

  ps = stripTrailingComment(ps)
  ps = ps.replace(/;+$/, '')
  if (!ps) {
    return ''
  }

  const declarationMatch = ps.match(/^(?:var|let|const)\s+(\$?[A-Za-z_][\w$]*)\s*=\s*([\s\S]+)$/)
  if (declarationMatch?.[1] && declarationMatch[2]) {
    return `${toPsVar(declarationMatch[1])} = ${convertExpression(declarationMatch[2], funcName)}`
  }

  const assignmentMatch = ps.match(/^(\$?[A-Za-z_][\w$]*)\s*=\s*([\s\S]+)$/)
  if (assignmentMatch?.[1] && assignmentMatch[2]) {
    return `${toPsVar(assignmentMatch[1])} = ${convertExpression(assignmentMatch[2], funcName)}`
  }

  return convertExpression(ps, funcName)
}

function jsToPowerShell(jsCode: string[], funcName: string): string {
  const lines = jsCode.map((line) => convertJsLineToPowerShell(line, funcName)).filter(Boolean)
  if (!lines.length) {
    return ''
  }

  const prelude = [
    '[Console]::OutputEncoding = [System.Text.Encoding]::UTF8',
    '$OutputEncoding = [System.Text.Encoding]::UTF8',
  ]

  const originalLastLine = jsCode[jsCode.length - 1]
  const assignedVar = extractAssignedVar(originalLastLine)

  if (assignedVar) {
    return `${prelude.join('\n')}\n${lines.join('\n')}\n${toPsVar(assignedVar)} | ConvertTo-Json -Compress -Depth 20`
  }

  const setup = lines.slice(0, -1)
  const lastExpr = lines[lines.length - 1] ?? ''
  const body = [...setup, `$__locutus_result = ${lastExpr}`, '$__locutus_result | ConvertTo-Json -Compress -Depth 20']
  return `${prelude.join('\n')}\n${body.join('\n')}`
}

function normalizePowerShellOutput(output: string): string {
  return output.trim()
}

export const powershellHandler: LanguageHandler = {
  translate: jsToPowerShell,
  normalize: normalizePowerShellOutput,
  skipList: POWERSHELL_SKIP_LIST,
  dockerImage: POWERSHELL_DOCKER_IMAGE,
  displayName: 'PowerShell',
  version: '7.4',
  get parityValue() {
    return `${this.displayName} ${this.version}`
  },
  dockerCmd: (code: string) => ['pwsh', '-NoLogo', '-NoProfile', '-Command', code],
  mountRepo: false,
  upstreamSurface: {
    discover: discoverPowerShellUpstreamSurface,
    discoverMode: 'live',
    discoverUsesDocker: false,
    discoverNamespaceCatalog: () => discoverUpstreamSurfaceNamespaceCatalogFromScope('powershell'),
    getLocutusEntry: (func) => ({
      namespace: func.category,
      name: POWERSHELL_MEMBER_NAMES[func.name] ?? func.name,
    }),
  },
}
