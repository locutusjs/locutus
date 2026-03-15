/**
 * Go language handler for verification
 */

import { runInDocker } from '../docker.ts'
import { extractAssignedVar } from '../runner.ts'
import type { LanguageHandler } from '../types.ts'

// Go package mapping: function name → Go package
const GO_PACKAGES: Record<string, string> = {
  // strings package
  Compare: 'strings',
  Contains: 'strings',
  ContainsAny: 'strings',
  Count: 'strings',
  EqualFold: 'strings',
  Fields: 'strings',
  HasPrefix: 'strings',
  HasSuffix: 'strings',
  Index: 'strings',
  Index2: 'strings', // Our alias for Index
  IndexAny: 'strings',
  Join: 'strings',
  LastIndex: 'strings',
  LastIndexAny: 'strings',
  Repeat: 'strings',
  Replace: 'strings',
  ReplaceAll: 'strings',
  Split: 'strings',
  SplitN: 'strings',
  ToLower: 'strings',
  ToUpper: 'strings',
  Trim: 'strings',
  TrimLeft: 'strings',
  TrimPrefix: 'strings',
  TrimRight: 'strings',
  TrimSpace: 'strings',
  TrimSuffix: 'strings',
  Cut: 'strings',
  CutPrefix: 'strings',
  CutSuffix: 'strings',
  // sort package
  SearchStrings: 'sort',
  StringsAreSorted: 'sort',
  // strconv package
  Atoi: 'strconv',
  FormatBool: 'strconv',
  FormatFloat: 'strconv',
  FormatInt: 'strconv',
  Itoa: 'strconv',
  ParseBool: 'strconv',
  ParseFloat: 'strconv',
  ParseInt: 'strconv',
  Quote: 'strconv',
  Unquote: 'strconv',
  // time package
  Add: 'time',
  AddDate: 'time',
  After: 'time',
  Before: 'time',
  Date: 'time',
  Equal: 'time',
  Format: 'time',
  ParseInLocation: 'time',
  ParseDuration: 'time',
  Round: 'time',
  Sub: 'time',
  Truncate: 'time',
  Unix: 'time',
  UnixMicro: 'time',
  UnixMilli: 'time',
  // path package
  Base: 'path',
  Clean: 'path',
  Dir: 'path',
  Ext: 'path',
  Rel: 'filepath',
  IsAbs: 'path',
  Match: 'path',
  // net/url package
  JoinPath: 'url',
  ParseQuery: 'url',
  EncodeQuery: 'url',
  PathEscape: 'url',
  QueryEscape: 'url',
  QueryUnescape: 'url',
  ResolveReference: 'url',
  // net package
  JoinHostPort: 'net',
  ParseCIDR: 'net',
  ParseIP: 'net',
  SplitHostPort: 'net',
  // crypto/subtle package
  ConstantTimeCompare: 'subtle',
  ConstantTimeCopy: 'subtle',
  ConstantTimeEq: 'subtle',
  ConstantTimeSelect: 'subtle',
}

const GO_DOCKER_IMAGE = 'golang:1.23'
const GO_NAMESPACE_PACKAGES: Record<string, { packagePath: string; title: string }> = {
  filepath: { packagePath: 'path/filepath', title: 'path/filepath package' },
  net: { packagePath: 'net', title: 'net package' },
  path: { packagePath: 'path', title: 'path package' },
  sort: { packagePath: 'sort', title: 'sort package' },
  strconv: { packagePath: 'strconv', title: 'strconv package' },
  strings: { packagePath: 'strings', title: 'strings package' },
  subtle: { packagePath: 'crypto/subtle', title: 'crypto/subtle package' },
  time: { packagePath: 'time', title: 'time package' },
  url: { packagePath: 'net/url', title: 'net/url package' },
}

function parseGoDocFunctions(output: string): string[] {
  return output
    .split('\n')
    .map((line) => line.trim())
    .filter((line) => line.startsWith('func '))
    .map(
      (line) =>
        line
          .replace(/^func\s+/, '')
          .split('(')[0]
          ?.trim() ?? '',
    )
    .filter(Boolean)
    .sort()
}

function parseGoDocMethods(output: string): string[] {
  return output
    .split('\n')
    .map((line) => line.trim())
    .filter((line) => line.startsWith('func ('))
    .map(
      (line) =>
        line
          .replace(/^func\s+\([^)]*\)\s+/, '')
          .split('(')[0]
          ?.trim() ?? '',
    )
    .filter(Boolean)
    .sort()
}

function discoverGoUpstreamSurface() {
  const namespaces = Object.entries(GO_NAMESPACE_PACKAGES).map(([namespace, config]) => {
    const result = runInDocker(GO_DOCKER_IMAGE, ['go', 'doc', config.packagePath])
    if (!result.success) {
      throw new Error(result.error || `Unable to discover Go upstream surface for ${config.packagePath}`)
    }

    const entries = parseGoDocFunctions(result.output)

    if (namespace === 'time') {
      const methodResult = runInDocker(GO_DOCKER_IMAGE, ['go', 'doc', 'time.Time'])
      if (!methodResult.success) {
        throw new Error(methodResult.error || 'Unable to discover Go time.Time methods')
      }
      entries.push(...parseGoDocMethods(methodResult.output))
    }

    if (namespace === 'url') {
      const urlMethodResult = runInDocker(GO_DOCKER_IMAGE, ['go', 'doc', 'net/url.URL'])
      if (!urlMethodResult.success) {
        throw new Error(urlMethodResult.error || 'Unable to discover Go net/url.URL methods')
      }
      const valuesMethodResult = runInDocker(GO_DOCKER_IMAGE, ['go', 'doc', 'net/url.Values'])
      if (!valuesMethodResult.success) {
        throw new Error(valuesMethodResult.error || 'Unable to discover Go net/url.Values methods')
      }
      entries.push(...parseGoDocMethods(urlMethodResult.output))
      entries.push(...parseGoDocMethods(valuesMethodResult.output))
    }

    return {
      namespace,
      title: config.title,
      target: 'Go 1.23',
      sourceKind: 'runtime' as const,
      sourceRef: `${GO_DOCKER_IMAGE}:${config.packagePath}`,
      entries: [...new Set(entries)].sort(),
    }
  })

  return {
    language: 'golang',
    namespaces,
  }
}

const GO_PACKAGE_OVERRIDES: Record<string, string> = {
  'filepath/Base': 'filepath',
  'filepath/Clean': 'filepath',
  'filepath/Dir': 'filepath',
  'filepath/Ext': 'filepath',
  'filepath/IsAbs': 'filepath',
  'filepath/Join': 'filepath',
  'filepath/Rel': 'filepath',
  'path/Join': 'path',
  'url/Parse': 'url',
}

const getGoPackage = (funcName: string, category?: string): string | undefined => {
  if (category) {
    const scoped = GO_PACKAGE_OVERRIDES[`${category}/${funcName}`]
    if (scoped) {
      return scoped
    }
  }

  return GO_PACKAGES[funcName]
}

// Functions to skip (implementation differences, etc.)
export const GO_SKIP_LIST = new Set<string>([
  // These return [value, error] arrays in JS but (value, error) tuples in Go
  // The example code uses array indexing [0] which doesn't translate to Go
  'Atoi',
  'ParseBool',
  'ParseInt',
  // Index2 is our alias for Index - the examples call Index() not Index2()
  'Index2',
  // TrimSpace example uses escape sequences (\t\n\r) that get mangled in shell escaping
  'TrimSpace',
  // ConstantTimeCopy mutates destination in Go and returns nothing; locutus returns updated array.
  'ConstantTimeCopy',
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
 * Parse function arguments, handling nested structures and quoted strings.
 */
function parseArguments(argsStr: string): string[] {
  const args: string[] = []
  let current = ''
  let depth = 0
  let inString: string | null = null
  let escaped = false

  for (const char of argsStr) {
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
      current += char
      inString = char
      continue
    }

    if (char === '[' || char === '(' || char === '{') {
      depth++
      current += char
      continue
    }

    if (char === ']' || char === ')' || char === '}') {
      depth--
      current += char
      continue
    }

    if (char === ',' && depth === 0) {
      args.push(current.trim())
      current = ''
      continue
    }

    current += char
  }

  if (current.trim()) {
    args.push(current.trim())
  }

  return args
}

/**
 * Convert Locutus time/Format calls to helper call for parity runtime.
 * Go does not expose time.Format as a package function (it's a method on time.Time),
 * so we route through a small helper.
 */
function convertFormatCalls(code: string): string {
  return code.replace(/\bFormat\s*\(([^)]+)\)/g, (match, argsStr) => {
    const args = parseArguments(argsStr)
    const value = args[0]
    const layout = args[1]
    if (!value || !layout) {
      return match
    }
    return `locutusTimeFormat(${value}, ${layout})`
  })
}

/**
 * Convert Locutus time/Parse calls to helper call for parity runtime.
 * Go returns (time.Time, error), while locutus Parse returns Date.
 */
function convertParseCalls(code: string): string {
  return code.replace(/\bParse\s*\(([^)]+)\)/g, (match, argsStr) => {
    const args = parseArguments(argsStr)
    const layout = args[0]
    const value = args[1]
    if (!layout || !value) {
      return match
    }
    return `locutusTimeParse(${layout}, ${value})`
  })
}

/**
 * Convert Locutus time/ParseInLocation calls to helper calls for parity runtime.
 * Go returns (time.Time, error), while locutus ParseInLocation returns Date.
 */
function convertParseInLocationCalls(code: string): string {
  return replaceCallExpression(code, 'ParseInLocation', (argsStr, match) => {
    const args = parseArguments(argsStr)
    const layout = args[0]
    const value = args[1]
    const location = args[2]
    if (!layout || !value || !location) {
      return match
    }
    return `locutusTimeParseInLocation(${layout}, ${value}, ${location})`
  })
}

function replaceCallExpression(
  code: string,
  functionName: string,
  replacer: (argsStr: string, match: string) => string,
): string {
  let output = ''
  let cursor = 0

  while (cursor < code.length) {
    const matchIndex = code.indexOf(functionName, cursor)
    if (matchIndex === -1) {
      output += code.slice(cursor)
      break
    }

    const prevChar = matchIndex > 0 ? code[matchIndex - 1] : ''
    if (/\w/.test(prevChar ?? '')) {
      output += code.slice(cursor, matchIndex + functionName.length)
      cursor = matchIndex + functionName.length
      continue
    }

    let argsStart = matchIndex + functionName.length
    while (/\s/.test(code[argsStart] ?? '')) {
      argsStart += 1
    }

    if (code[argsStart] !== '(') {
      output += code.slice(cursor, matchIndex + functionName.length)
      cursor = matchIndex + functionName.length
      continue
    }

    let depth = 0
    let inString: '"' | "'" | '`' | null = null
    let argsEnd = -1

    for (let i = argsStart; i < code.length; i += 1) {
      const char = code[i]
      if (char === undefined) {
        break
      }

      if (inString) {
        if (char === inString && !isEscapedByOddBackslashes(code, i)) {
          inString = null
        }
        continue
      }

      if (char === '"' || char === "'" || char === '`') {
        inString = char
        continue
      }

      if (char === '(') {
        depth += 1
        continue
      }

      if (char === ')') {
        depth -= 1
        if (depth === 0) {
          argsEnd = i
          break
        }
      }
    }

    if (argsEnd === -1) {
      output += code.slice(cursor)
      break
    }

    const match = code.slice(matchIndex, argsEnd + 1)
    const argsStr = code.slice(argsStart + 1, argsEnd)
    output += code.slice(cursor, matchIndex)
    output += replacer(argsStr, match)
    cursor = argsEnd + 1
  }

  return output
}

function isEscapedByOddBackslashes(code: string, index: number): boolean {
  let backslashCount = 0
  for (let i = index - 1; i >= 0 && code[i] === '\\'; i -= 1) {
    backslashCount += 1
  }
  return backslashCount % 2 === 1
}

/**
 * Convert Locutus url/Parse calls to helper calls.
 * Go returns (*url.URL, error), while locutus Parse returns plain parts.
 */
function convertUrlParseCalls(code: string): string {
  return code.replace(/\bParse\s*\(([^)]+)\)/g, (match, argsStr) => {
    const args = parseArguments(argsStr)
    const value = args[0]
    if (!value) {
      return match
    }
    return `locutusUrlParse(${value})`
  })
}

/**
 * Convert Locutus strconv/ParseFloat calls to helper calls.
 * Go returns (float64, error), while locutus ParseFloat returns [value, error].
 */
function convertParseFloatCalls(code: string): string {
  return code.replace(/\bParseFloat\s*\(([^)]+)\)/g, (match, argsStr) => {
    const args = parseArguments(argsStr)
    const value = args[0]
    const bitSize = args[1]
    if (!value || !bitSize) {
      return match
    }
    return `locutusParseFloat(${value}, ${bitSize})`
  })
}

/**
 * Convert Locutus strconv/FormatFloat calls to helper calls.
 * Go expects format as a byte/rune, while locutus accepts string.
 */
function convertFormatFloatCalls(code: string): string {
  return code.replace(/\bFormatFloat\s*\(([^)]+)\)/g, (match, argsStr) => {
    const args = parseArguments(argsStr)
    const value = args[0]
    const format = args[1]
    const precision = args[2]
    const bitSize = args[3]
    if (!value || !format || !precision || !bitSize) {
      return match
    }
    return `locutusFormatFloat(${value}, ${format}, ${precision}, ${bitSize})`
  })
}

/**
 * Convert Locutus strconv/Unquote calls to helper calls.
 * Go returns (string, error), while locutus Unquote returns [value, error].
 */
function convertUnquoteCalls(code: string): string {
  const firstValue = code.replace(/\bUnquote\s*\(([^)]+)\)\s*\[\s*0\s*\]/g, (match, argsStr) => {
    const args = parseArguments(argsStr)
    const value = args[0]
    if (!value) {
      return match
    }
    return `locutusUnquote(${value})`
  })

  return firstValue
}

/**
 * Convert Locutus time/Unix calls to helper call for parity runtime.
 * Go returns time.Time JSON with RFC3339 (no millisecond padding), while
 * locutus examples often use Date.toISOString() with fixed milliseconds.
 */
function convertUnixCalls(code: string): string {
  const withIso = code.replace(/\bUnix\s*\(([^)]+)\)\.toISOString\(\)/g, (match, argsStr) => {
    const args = parseArguments(argsStr)
    const sec = args[0]
    const nsec = args[1] ?? '0'
    if (!sec) {
      return match
    }
    return `locutusTimeUnix(${sec}, ${nsec})`
  })

  return withIso.replace(/\bUnix\s*\(([^)]+)\)/g, (match, argsStr) => {
    const args = parseArguments(argsStr)
    const sec = args[0]
    const nsec = args[1] ?? '0'
    if (!sec) {
      return match
    }
    return `locutusTimeUnix(${sec}, ${nsec})`
  })
}

/**
 * Convert Locutus time/UnixMilli calls to helper call for parity runtime.
 */
function convertUnixMilliCalls(code: string): string {
  const withIso = code.replace(/\bUnixMilli\s*\(([^)]+)\)\.toISOString\(\)/g, (match, argsStr) => {
    const args = parseArguments(argsStr)
    const millis = args[0]
    if (!millis) {
      return match
    }
    return `locutusTimeUnixMilli(${millis})`
  })

  return withIso.replace(/\bUnixMilli\s*\(([^)]+)\)/g, (match, argsStr) => {
    const args = parseArguments(argsStr)
    const millis = args[0]
    if (!millis) {
      return match
    }
    return `locutusTimeUnixMilli(${millis})`
  })
}

/**
 * Convert Locutus time/UnixMicro calls to helper call for parity runtime.
 */
function convertUnixMicroCalls(code: string): string {
  const withIso = code.replace(/\bUnixMicro\s*\(([^)]+)\)\.toISOString\(\)/g, (match, argsStr) => {
    const args = parseArguments(argsStr)
    const micros = args[0]
    if (!micros) {
      return match
    }
    return `locutusTimeUnixMicro(${micros})`
  })

  return withIso.replace(/\bUnixMicro\s*\(([^)]+)\)/g, (match, argsStr) => {
    const args = parseArguments(argsStr)
    const micros = args[0]
    if (!micros) {
      return match
    }
    return `locutusTimeUnixMicro(${micros})`
  })
}

/**
 * Convert Locutus time/ParseDuration calls to helper call for parity runtime.
 */
function convertParseDurationCalls(code: string): string {
  return code.replace(/\bParseDuration\s*\(([^)]+)\)/g, (match, argsStr) => {
    const args = parseArguments(argsStr)
    const value = args[0]
    if (!value) {
      return match
    }
    return `locutusParseDuration(${value})`
  })
}

/**
 * Convert Locutus time/Date calls to helper calls.
 * Go exposes time.Date as a package function with location; locutus accepts offset minutes.
 */
function convertDateCalls(code: string): string {
  const withIso = code.replace(/\bDate\s*\(([^)]+)\)\.toISOString\(\)/g, (match, argsStr) => {
    const args = parseArguments(argsStr)
    const year = args[0] ?? '0'
    const month = args[1] ?? '1'
    const day = args[2] ?? '1'
    const hour = args[3] ?? '0'
    const minute = args[4] ?? '0'
    const second = args[5] ?? '0'
    const nsec = args[6] ?? '0'
    const offsetMinutes = args[7] ?? '0'
    return `locutusTimeDate(${year}, ${month}, ${day}, ${hour}, ${minute}, ${second}, ${nsec}, ${offsetMinutes})`
  })

  return withIso.replace(/\bDate\s*\(([^)]+)\)/g, (match, argsStr) => {
    const args = parseArguments(argsStr)
    const year = args[0] ?? '0'
    const month = args[1] ?? '1'
    const day = args[2] ?? '1'
    const hour = args[3] ?? '0'
    const minute = args[4] ?? '0'
    const second = args[5] ?? '0'
    const nsec = args[6] ?? '0'
    const offsetMinutes = args[7] ?? '0'
    return `locutusTimeDate(${year}, ${month}, ${day}, ${hour}, ${minute}, ${second}, ${nsec}, ${offsetMinutes})`
  })
}

/**
 * Convert Locutus time/Add calls to helper calls.
 */
function convertAddCalls(code: string): string {
  const withIso = code.replace(/\bAdd\s*\(([^)]+)\)\.toISOString\(\)/g, (match, argsStr) => {
    const args = parseArguments(argsStr)
    const value = args[0]
    const duration = args[1] ?? '0'
    if (!value) {
      return match
    }
    return `locutusTimeAdd(${value}, ${duration})`
  })

  return withIso.replace(/\bAdd\s*\(([^)]+)\)/g, (match, argsStr) => {
    const args = parseArguments(argsStr)
    const value = args[0]
    const duration = args[1] ?? '0'
    if (!value) {
      return match
    }
    return `locutusTimeAdd(${value}, ${duration})`
  })
}

/**
 * Convert Locutus time/Equal calls to helper calls.
 */
function convertEqualCalls(code: string): string {
  return code.replace(/\bEqual\s*\(([^)]+)\)/g, (match, argsStr) => {
    const args = parseArguments(argsStr)
    const left = args[0]
    const right = args[1]
    if (!left || !right) {
      return match
    }
    return `locutusTimeEqual(${left}, ${right})`
  })
}

/**
 * Convert Locutus time/Round calls to helper calls.
 */
function convertRoundCalls(code: string): string {
  const withIso = code.replace(/\bRound\s*\(([^)]+)\)\.toISOString\(\)/g, (match, argsStr) => {
    const args = parseArguments(argsStr)
    const value = args[0]
    const unitMs = args[1] ?? '1'
    if (!value) {
      return match
    }
    return `locutusTimeRound(${value}, ${unitMs})`
  })

  return withIso.replace(/\bRound\s*\(([^)]+)\)/g, (match, argsStr) => {
    const args = parseArguments(argsStr)
    const value = args[0]
    const unitMs = args[1] ?? '1'
    if (!value) {
      return match
    }
    return `locutusTimeRound(${value}, ${unitMs})`
  })
}

/**
 * Convert Locutus time/Truncate calls to helper calls.
 */
function convertTruncateCalls(code: string): string {
  const withIso = code.replace(/\bTruncate\s*\(([^)]+)\)\.toISOString\(\)/g, (match, argsStr) => {
    const args = parseArguments(argsStr)
    const value = args[0]
    const unitMs = args[1] ?? '1'
    if (!value) {
      return match
    }
    return `locutusTimeTruncate(${value}, ${unitMs})`
  })

  return withIso.replace(/\bTruncate\s*\(([^)]+)\)/g, (match, argsStr) => {
    const args = parseArguments(argsStr)
    const value = args[0]
    const unitMs = args[1] ?? '1'
    if (!value) {
      return match
    }
    return `locutusTimeTruncate(${value}, ${unitMs})`
  })
}

/**
 * Convert Locutus time/AddDate calls to helper calls.
 * Go exposes AddDate as a method on time.Time, while locutus takes date-like input.
 */
function convertAddDateCalls(code: string): string {
  const withIso = code.replace(/\bAddDate\s*\(([^)]+)\)\.toISOString\(\)/g, (match, argsStr) => {
    const args = parseArguments(argsStr)
    const value = args[0]
    const years = args[1] ?? '0'
    const months = args[2] ?? '0'
    const days = args[3] ?? '0'
    if (!value) {
      return match
    }
    return `locutusTimeAddDate(${value}, ${years}, ${months}, ${days})`
  })

  return withIso.replace(/\bAddDate\s*\(([^)]+)\)/g, (match, argsStr) => {
    const args = parseArguments(argsStr)
    const value = args[0]
    const years = args[1] ?? '0'
    const months = args[2] ?? '0'
    const days = args[3] ?? '0'
    if (!value) {
      return match
    }
    return `locutusTimeAddDate(${value}, ${years}, ${months}, ${days})`
  })
}

/**
 * Convert Locutus time/Sub calls to helper calls.
 */
function convertSubCalls(code: string): string {
  return code.replace(/\bSub\s*\(([^)]+)\)/g, (match, argsStr) => {
    const args = parseArguments(argsStr)
    const left = args[0]
    const right = args[1]
    if (!left || !right) {
      return match
    }
    return `locutusTimeSub(${left}, ${right})`
  })
}

/**
 * Convert Locutus time/Before calls to helper calls.
 */
function convertBeforeCalls(code: string): string {
  return code.replace(/\bBefore\s*\(([^)]+)\)/g, (match, argsStr) => {
    const args = parseArguments(argsStr)
    const left = args[0]
    const right = args[1]
    if (!left || !right) {
      return match
    }
    return `locutusTimeBefore(${left}, ${right})`
  })
}

/**
 * Convert Locutus time/After calls to helper calls.
 */
function convertAfterCalls(code: string): string {
  return code.replace(/\bAfter\s*\(([^)]+)\)/g, (match, argsStr) => {
    const args = parseArguments(argsStr)
    const left = args[0]
    const right = args[1]
    if (!left || !right) {
      return match
    }
    return `locutusTimeAfter(${left}, ${right})`
  })
}

/**
 * Convert Locutus strings/Cut calls to helper calls.
 * Go returns (before, after, found), while locutus Cut returns [before, after, found].
 */
function convertCutCalls(code: string): string {
  return code.replace(/\bCut\s*\(([^)]+)\)/g, (match, argsStr) => {
    const args = parseArguments(argsStr)
    const value = args[0]
    const sep = args[1]
    if (!value || !sep) {
      return match
    }
    return `locutusStringsCut(${value}, ${sep})`
  })
}

/**
 * Convert Locutus strings/CutPrefix calls to helper calls.
 * Go returns (after, found), while locutus CutPrefix returns [after, found].
 */
function convertCutPrefixCalls(code: string): string {
  return code.replace(/\bCutPrefix\s*\(([^)]+)\)/g, (match, argsStr) => {
    const args = parseArguments(argsStr)
    const value = args[0]
    const prefix = args[1]
    if (!value || !prefix) {
      return match
    }
    return `locutusStringsCutPrefix(${value}, ${prefix})`
  })
}

/**
 * Convert Locutus strings/CutSuffix calls to helper calls.
 * Go returns (before, found), while locutus CutSuffix returns [before, found].
 */
function convertCutSuffixCalls(code: string): string {
  return code.replace(/\bCutSuffix\s*\(([^)]+)\)/g, (match, argsStr) => {
    const args = parseArguments(argsStr)
    const value = args[0]
    const suffix = args[1]
    if (!value || !suffix) {
      return match
    }
    return `locutusStringsCutSuffix(${value}, ${suffix})`
  })
}

/**
 * Convert Locutus subtle/ConstantTimeCompare calls to helper calls.
 * Go subtle.ConstantTimeCompare operates on []byte; locutus signature uses strings.
 */
function convertConstantTimeCompareCalls(code: string): string {
  return code.replace(/\bConstantTimeCompare\s*\(([^)]+)\)/g, (match, argsStr) => {
    const args = parseArguments(argsStr)
    const left = args[0]
    const right = args[1]
    if (!left || !right) {
      return match
    }
    return `locutusConstantTimeCompare(${left}, ${right})`
  })
}

/**
 * Convert Locutus url/QueryUnescape calls to helper calls.
 * Go returns (string, error), while locutus QueryUnescape returns string.
 */
function convertQueryUnescapeCalls(code: string): string {
  return code.replace(/\bQueryUnescape\s*\(([^)]+)\)/g, (match, argsStr) => {
    const args = parseArguments(argsStr)
    const value = args[0]
    if (!value) {
      return match
    }
    return `locutusQueryUnescape(${value})`
  })
}

/**
 * Convert Locutus url/ParseQuery calls to helper calls.
 * Go returns (Values, error), while locutus ParseQuery returns plain object.
 */
function convertParseQueryCalls(code: string): string {
  return code.replace(/\bParseQuery\s*\(([^)]+)\)/g, (match, argsStr) => {
    const args = parseArguments(argsStr)
    const value = args[0]
    if (!value) {
      return match
    }
    return `locutusParseQuery(${value})`
  })
}

/**
 * Convert Locutus url/EncodeQuery calls to helper calls.
 * Go uses url.Values.Encode method, while locutus exposes a function.
 */
function convertEncodeQueryCalls(code: string): string {
  return code.replace(/\bEncodeQuery\s*\(([^)]+)\)/g, (match, argsStr) => {
    const args = parseArguments(argsStr)
    const value = args[0]
    if (!value) {
      return match
    }
    return `locutusEncodeQuery(${value})`
  })
}

/**
 * Convert Locutus url/JoinPath calls to helper calls.
 * Go returns (string, error), while locutus JoinPath returns string.
 */
function convertJoinPathCalls(code: string): string {
  return code.replace(/\bJoinPath\s*\(([^)]*)\)/g, (match, argsStr) => {
    const args = parseArguments(argsStr)
    if (args.length === 0) {
      return match
    }
    return `locutusUrlJoinPath(${args.join(', ')})`
  })
}

/**
 * Convert Locutus url/ResolveReference calls to helper calls.
 * Go resolves references via URL methods rather than package-level functions.
 */
function convertResolveReferenceCalls(code: string): string {
  return code.replace(/\bResolveReference\s*\(([^)]+)\)/g, (match, argsStr) => {
    const args = parseArguments(argsStr)
    const base = args[0]
    const reference = args[1]
    if (!base || !reference) {
      return match
    }
    return `locutusResolveReference(${base}, ${reference})`
  })
}

/**
 * Convert Locutus net/SplitHostPort calls to helper calls.
 * Go returns (host, port, error), while locutus SplitHostPort returns [host, port].
 */
function convertSplitHostPortCalls(code: string): string {
  return code.replace(/\bSplitHostPort\s*\(([^)]+)\)/g, (match, argsStr) => {
    const args = parseArguments(argsStr)
    const value = args[0]
    if (!value) {
      return match
    }
    return `locutusSplitHostPort(${value})`
  })
}

/**
 * Convert Locutus net/ParseIP calls to helper calls.
 * Go returns nil for invalid IP and net.IP marshals to base64-ish byte JSON by default.
 */
function convertParseIPCalls(code: string): string {
  return code.replace(/\bParseIP\s*\(([^)]+)\)/g, (match, argsStr) => {
    const args = parseArguments(argsStr)
    const value = args[0]
    if (!value) {
      return match
    }
    return `locutusParseIP(${value})`
  })
}

/**
 * Convert Locutus net/ParseCIDR calls to helper calls.
 * Go returns (IP, *IPNet, error), while locutus returns {ip, maskBits} | null.
 */
function convertParseCIDRCalls(code: string): string {
  return code.replace(/\bParseCIDR\s*\(([^)]+)\)/g, (match, argsStr) => {
    const args = parseArguments(argsStr)
    const value = args[0]
    if (!value) {
      return match
    }
    return `locutusParseCIDR(${value})`
  })
}

/**
 * Convert Locutus path/Match calls to helper calls.
 * Go returns (bool, error), while locutus Match returns bool.
 */
function convertMatchCalls(code: string): string {
  return code.replace(/\bMatch\s*\(([^)]+)\)/g, (match, argsStr) => {
    const args = parseArguments(argsStr)
    const pattern = args[0]
    const name = args[1]
    if (!pattern || !name) {
      return match
    }
    return `locutusPathMatch(${pattern}, ${name})`
  })
}

/**
 * Convert Locutus filepath/Rel calls to helper calls.
 * Go returns (string, error), while locutus Rel returns string.
 */
function convertRelCalls(code: string): string {
  return replaceCallExpression(code, 'Rel', (argsStr, match) => {
    const args = parseArguments(argsStr)
    const basePath = args[0]
    const targetPath = args[1]
    if (!basePath || !targetPath) {
      return match
    }
    return `locutusFilepathRel(${basePath}, ${targetPath})`
  })
}

/**
 * Convert a single JS line to Go
 */
function convertJsLineToGo(line: string, funcName: string, category?: string): string {
  let go = line.trim()
  if (!go) {
    return ''
  }

  go = stripTrailingComment(go)
  go = go.replace(/;+$/, '')

  // var/let/const → var (Go uses := for short declaration but we'll use var for clarity)
  go = go.replace(/^\s*(var|let|const)\s+(\w+)\s*=/, 'var $2 =')

  // JS → Go boolean/null conversions
  go = go.replace(/\btrue\b/g, 'true')
  go = go.replace(/\bfalse\b/g, 'false')
  go = go.replace(/\bnull\b/g, 'nil')
  go = go.replace(/\bundefined\b/g, 'nil')

  // Single quotes → double quotes (Go uses double quotes for strings)
  // Also handle escaped single quotes: \' → ' (valid in JS single-quoted, but not needed in Go double-quoted)
  go = go.replace(/'([^'\\]*(\\.[^'\\]*)*)'/g, (match, content) => {
    // Remove unnecessary \' escapes (they become just ')
    const cleaned = content.replace(/\\'/g, "'")
    return `"${cleaned}"`
  })

  // Handle array indexing: result[0] stays as result[0]
  // Handle array literals: ['a', 'b'] → []string{"a", "b"}
  // Only convert if it starts with [ and contains quoted strings (array literal)
  go = go.replace(/\[(['"][^'"]*['"](?:\s*,\s*['"][^'"]*['"])*)\]/g, (match, contents) => {
    return `[]string{${contents}}`
  })

  if (funcName === 'Format') {
    go = convertFormatCalls(go)
  } else if (funcName === 'Parse' && category === 'time') {
    go = convertParseCalls(go)
  } else if (funcName === 'ParseInLocation' && category === 'time') {
    go = convertParseInLocationCalls(go)
  } else if (funcName === 'Parse' && category === 'url') {
    go = convertUrlParseCalls(go)
  } else if (funcName === 'ParseFloat') {
    go = convertParseFloatCalls(go)
  } else if (funcName === 'FormatFloat') {
    go = convertFormatFloatCalls(go)
  } else if (funcName === 'Unquote') {
    go = convertUnquoteCalls(go)
  } else if (funcName === 'Unix') {
    go = convertUnixCalls(go)
  } else if (funcName === 'UnixMilli') {
    go = convertUnixMilliCalls(go)
  } else if (funcName === 'UnixMicro') {
    go = convertUnixMicroCalls(go)
  } else if (funcName === 'ParseDuration') {
    go = convertParseDurationCalls(go)
  } else if (funcName === 'Date') {
    go = convertDateCalls(go)
  } else if (funcName === 'Add') {
    go = convertAddCalls(go)
  } else if (funcName === 'Equal') {
    go = convertEqualCalls(go)
  } else if (funcName === 'Round') {
    go = convertRoundCalls(go)
  } else if (funcName === 'Truncate') {
    go = convertTruncateCalls(go)
  } else if (funcName === 'AddDate') {
    go = convertAddDateCalls(go)
  } else if (funcName === 'Sub') {
    go = convertSubCalls(go)
  } else if (funcName === 'Before') {
    go = convertBeforeCalls(go)
  } else if (funcName === 'After') {
    go = convertAfterCalls(go)
  } else if (funcName === 'Cut') {
    go = convertCutCalls(go)
  } else if (funcName === 'CutPrefix') {
    go = convertCutPrefixCalls(go)
  } else if (funcName === 'CutSuffix') {
    go = convertCutSuffixCalls(go)
  } else if (funcName === 'ConstantTimeCompare') {
    go = convertConstantTimeCompareCalls(go)
  } else if (funcName === 'QueryUnescape') {
    go = convertQueryUnescapeCalls(go)
  } else if (funcName === 'ParseQuery') {
    go = convertParseQueryCalls(go)
  } else if (funcName === 'EncodeQuery') {
    go = convertEncodeQueryCalls(go)
  } else if (funcName === 'JoinPath') {
    go = convertJoinPathCalls(go)
  } else if (funcName === 'ResolveReference') {
    go = convertResolveReferenceCalls(go)
  } else if (funcName === 'SplitHostPort') {
    go = convertSplitHostPortCalls(go)
  } else if (funcName === 'ParseIP') {
    go = convertParseIPCalls(go)
  } else if (funcName === 'ParseCIDR') {
    go = convertParseCIDRCalls(go)
  } else if (funcName === 'Match') {
    go = convertMatchCalls(go)
  } else if (funcName === 'Rel' && category === 'filepath') {
    go = convertRelCalls(go)
  }

  // Handle function calls - prefix with package
  const pkg = getGoPackage(funcName, category)
  if (
    pkg &&
    funcName !== 'Format' &&
    funcName !== 'Parse' &&
    funcName !== 'ParseFloat' &&
    funcName !== 'FormatFloat' &&
    funcName !== 'Unquote' &&
    funcName !== 'Unix' &&
    funcName !== 'UnixMilli' &&
    funcName !== 'UnixMicro' &&
    funcName !== 'ParseDuration' &&
    funcName !== 'Date' &&
    funcName !== 'Add' &&
    funcName !== 'Equal' &&
    funcName !== 'Round' &&
    funcName !== 'Truncate' &&
    funcName !== 'AddDate' &&
    funcName !== 'Sub' &&
    funcName !== 'Before' &&
    funcName !== 'After' &&
    funcName !== 'Cut' &&
    funcName !== 'CutPrefix' &&
    funcName !== 'CutSuffix' &&
    funcName !== 'ConstantTimeCompare' &&
    funcName !== 'QueryUnescape' &&
    funcName !== 'ParseQuery' &&
    funcName !== 'EncodeQuery' &&
    funcName !== 'JoinPath' &&
    funcName !== 'ResolveReference' &&
    funcName !== 'SplitHostPort' &&
    funcName !== 'ParseIP' &&
    funcName !== 'ParseCIDR' &&
    funcName !== 'Match' &&
    !(funcName === 'Rel' && category === 'filepath')
  ) {
    // Index2 is our alias for Index
    const goFuncName = funcName === 'Index2' ? 'Index' : funcName
    go = go.replace(new RegExp(`\\b${funcName}\\s*\\(`, 'g'), `${pkg}.${goFuncName}(`)
  }

  // Handle -1 as last argument for Replace (Go uses -1 for "replace all")
  // JS: Replace(s, old, new, n) where n=-1 means all
  // Go: strings.Replace(s, old, new, n)

  return go
}

/**
 * Determine which packages need to be imported
 */
function getRequiredImports(goCode: string): string[] {
  const imports: Set<string> = new Set(['fmt', 'encoding/json'])

  const hasPackageCall = (pkg: string) => new RegExp(`\\b${pkg}\\.`, 'm').test(goCode)

  if (
    hasPackageCall('strings') ||
    goCode.includes('locutusStringsCut(') ||
    goCode.includes('locutusStringsCutPrefix(') ||
    goCode.includes('locutusStringsCutSuffix(')
  ) {
    imports.add('strings')
  }
  if (
    hasPackageCall('strconv') ||
    goCode.includes('locutusParseFloat(') ||
    goCode.includes('locutusFormatFloat(') ||
    goCode.includes('locutusUnquote(')
  ) {
    imports.add('strconv')
  }
  if (hasPackageCall('path') || goCode.includes('locutusPathMatch(')) {
    imports.add('path')
  }
  if (hasPackageCall('filepath') || goCode.includes('locutusFilepathRel(')) {
    imports.add('path/filepath')
  }
  if (hasPackageCall('sort')) {
    imports.add('sort')
  }
  if (
    hasPackageCall('url') ||
    goCode.includes('locutusQueryUnescape(') ||
    goCode.includes('locutusParseQuery(') ||
    goCode.includes('locutusEncodeQuery(') ||
    goCode.includes('locutusUrlJoinPath(') ||
    goCode.includes('locutusUrlParse(') ||
    goCode.includes('locutusResolveReference(')
  ) {
    imports.add('net/url')
  }
  if (
    hasPackageCall('net') ||
    goCode.includes('locutusSplitHostPort(') ||
    goCode.includes('locutusParseIP(') ||
    goCode.includes('locutusParseCIDR(')
  ) {
    imports.add('net')
  }
  if (goCode.includes('locutusConstantTimeCompare(') || hasPackageCall('subtle')) {
    imports.add('crypto/subtle')
  }
  if (
    hasPackageCall('time') ||
    goCode.includes('locutusTimeFormat(') ||
    goCode.includes('locutusTimeParse(') ||
    goCode.includes('locutusTimeParseInLocation(') ||
    goCode.includes('locutusTimeUnix(') ||
    goCode.includes('locutusTimeUnixMilli(') ||
    goCode.includes('locutusTimeUnixMicro(') ||
    goCode.includes('locutusParseDuration(') ||
    goCode.includes('locutusTimeDate(') ||
    goCode.includes('locutusTimeAdd(') ||
    goCode.includes('locutusTimeEqual(') ||
    goCode.includes('locutusTimeRound(') ||
    goCode.includes('locutusTimeTruncate(') ||
    goCode.includes('locutusTimeAddDate(') ||
    goCode.includes('locutusTimeSub(') ||
    goCode.includes('locutusTimeBefore(') ||
    goCode.includes('locutusTimeAfter(')
  ) {
    imports.add('time')
  }

  return Array.from(imports)
}

/**
 * Convert JS example code to Go
 */
function jsToGo(jsCode: string[], funcName: string, category?: string): string {
  const lines = jsCode.map((line) => convertJsLineToGo(line, funcName, category)).filter(Boolean)
  if (!lines.length) {
    return ''
  }

  const originalLastLine = jsCode[jsCode.length - 1]
  const assignedVar = extractAssignedVar(originalLastLine)

  let mainBody: string
  if (assignedVar) {
    mainBody = `${lines.join('\n\t')}\n\tresult, _ := json.Marshal(${assignedVar})\n\tfmt.Println(string(result))`
  } else {
    const setup = lines.slice(0, -1)
    const lastExpr = lines[lines.length - 1]
    const prefix = setup.length ? `${setup.join('\n\t')}\n\t` : ''
    mainBody = `${prefix}result, _ := json.Marshal(${lastExpr})\n\tfmt.Println(string(result))`
  }

  const imports = getRequiredImports(mainBody)
  const importBlock = imports.length === 1 ? `import "${imports[0]}"` : `import (\n\t"${imports.join('"\n\t"')}"\n)`
  const helperBlock =
    funcName === 'Format'
      ? `func locutusTimeFormat(value string, layout string) string {
\tt, err := time.Parse(time.RFC3339Nano, value)
\tif err != nil {
\t\treturn ""
\t}
\treturn t.UTC().Format(layout)
}

`
      : funcName === 'Parse' && category === 'time'
        ? `func locutusTimeParse(layout string, value string) string {
\tt, err := time.Parse(layout, value)
\tif err != nil {
\t\treturn ""
\t}
\treturn t.UTC().Format("2006-01-02T15:04:05.000Z07:00")
}

`
        : funcName === 'ParseInLocation' && category === 'time'
          ? `func locutusTimeParseInLocation(layout string, value string, location string) string {
\tloc, err := time.LoadLocation(location)
\tif err != nil {
\t\treturn ""
\t}
\tt, err := time.ParseInLocation(layout, value, loc)
\tif err != nil {
\t\treturn ""
\t}
\treturn t.UTC().Format("2006-01-02T15:04:05.000Z07:00")
}

`
          : funcName === 'Parse' && category === 'url'
            ? `type locutusParsedURL struct {
\tScheme   string \`json:"scheme"\`
\tHost     string \`json:"host"\`
\tPath     string \`json:"path"\`
\tRawQuery string \`json:"rawQuery"\`
\tFragment string \`json:"fragment"\`
}

func locutusUrlParse(value string) locutusParsedURL {
\tparsed, err := url.Parse(value)
\tif err != nil || parsed == nil {
\t\treturn locutusParsedURL{}
\t}
\treturn locutusParsedURL{
\t\tScheme: parsed.Scheme,
\t\tHost: parsed.Host,
\t\tPath: parsed.Path,
\t\tRawQuery: parsed.RawQuery,
\t\tFragment: parsed.Fragment,
\t}
}

`
            : funcName === 'ParseFloat'
              ? `func locutusParseFloat(value string, bitSize int) []interface{} {
\tparsed, err := strconv.ParseFloat(value, bitSize)
\tif err != nil {
\t\treturn []interface{}{0, err.Error()}
\t}
\treturn []interface{}{parsed, nil}
}

`
              : funcName === 'FormatFloat'
                ? `func locutusFormatFloat(value float64, format string, precision int, bitSize int) string {
\tif len(format) == 0 {
\t\treturn ""
\t}
\treturn strconv.FormatFloat(value, format[0], precision, bitSize)
}

`
                : funcName === 'Unquote'
                  ? `func locutusUnquote(value string) string {
\tunquoted, err := strconv.Unquote(value)
\tif err != nil {
\t\treturn ""
\t}
\treturn unquoted
}

`
                  : funcName === 'Unix'
                    ? `func locutusTimeUnix(sec float64, nsec float64) string {
\tseconds := int64(sec)
\tnanoseconds := int64(nsec)
\treturn time.Unix(seconds, nanoseconds).UTC().Format("2006-01-02T15:04:05.000Z07:00")
}

`
                    : funcName === 'UnixMilli'
                      ? `func locutusTimeUnixMilli(millis float64) string {
\treturn time.UnixMilli(int64(millis)).UTC().Format("2006-01-02T15:04:05.000Z07:00")
}

`
                      : funcName === 'UnixMicro'
                        ? `func locutusTimeUnixMicro(micros float64) string {
\treturn time.UnixMicro(int64(micros)).UTC().Format("2006-01-02T15:04:05.000Z07:00")
}

`
                        : funcName === 'ParseDuration'
                          ? `func locutusParseDuration(value string) float64 {
\td, err := time.ParseDuration(value)
\tif err != nil {
\t\treturn 0
\t}
\treturn float64(d) / float64(time.Millisecond)
}

`
                          : funcName === 'Date'
                            ? `func locutusTimeDate(year float64, month float64, day float64, hour float64, minute float64, second float64, nsec float64, offsetMinutes float64) string {
\tlocation := time.FixedZone("locutus", int(offsetMinutes)*60)
\tt := time.Date(int(year), time.Month(int(month)), int(day), int(hour), int(minute), int(second), int(nsec), location)
\treturn t.UTC().Format("2006-01-02T15:04:05.000Z07:00")
}

`
                            : funcName === 'Add'
                              ? `func locutusTimeAdd(value string, durationMs float64) string {
\tt, err := time.Parse(time.RFC3339Nano, value)
\tif err != nil {
\t\treturn ""
\t}
\tduration := time.Duration(durationMs * float64(time.Millisecond))
\treturn t.Add(duration).UTC().Format("2006-01-02T15:04:05.000Z07:00")
}

`
                              : funcName === 'Equal'
                                ? `func locutusTimeEqual(left string, right string) bool {
\tl, leftErr := time.Parse(time.RFC3339Nano, left)
\tr, rightErr := time.Parse(time.RFC3339Nano, right)
\tif leftErr != nil || rightErr != nil {
\t\treturn false
\t}
\treturn l.Equal(r)
}

`
                                : funcName === 'Round'
                                  ? `func locutusTimeRound(value string, unitMs float64) string {
\tt, err := time.Parse(time.RFC3339Nano, value)
\tif err != nil || unitMs <= 0 {
\t\treturn ""
\t}
\tunit := time.Duration(unitMs * float64(time.Millisecond))
\treturn t.Round(unit).UTC().Format("2006-01-02T15:04:05.000Z07:00")
}

`
                                  : funcName === 'Truncate'
                                    ? `func locutusTimeTruncate(value string, unitMs float64) string {
\tt, err := time.Parse(time.RFC3339Nano, value)
\tif err != nil || unitMs <= 0 {
\t\treturn ""
\t}
\tunit := time.Duration(unitMs * float64(time.Millisecond))
\treturn t.Truncate(unit).UTC().Format("2006-01-02T15:04:05.000Z07:00")
}

`
                                    : funcName === 'AddDate'
                                      ? `func locutusTimeAddDate(value string, years float64, months float64, days float64) string {
\tt, err := time.Parse(time.RFC3339Nano, value)
\tif err != nil {
\t\treturn ""
\t}
\treturn t.AddDate(int(years), int(months), int(days)).UTC().Format("2006-01-02T15:04:05.000Z07:00")
}

`
                                      : funcName === 'Sub'
                                        ? `func locutusTimeSub(left string, right string) float64 {
\tl, leftErr := time.Parse(time.RFC3339Nano, left)
\tr, rightErr := time.Parse(time.RFC3339Nano, right)
\tif leftErr != nil || rightErr != nil {
\t\treturn 0
\t}
\treturn float64(l.Sub(r)) / float64(time.Millisecond)
}

`
                                        : funcName === 'Before'
                                          ? `func locutusTimeBefore(left string, right string) bool {
\tl, leftErr := time.Parse(time.RFC3339Nano, left)
\tr, rightErr := time.Parse(time.RFC3339Nano, right)
\tif leftErr != nil || rightErr != nil {
\t\treturn false
\t}
\treturn l.Before(r)
}

`
                                          : funcName === 'After'
                                            ? `func locutusTimeAfter(left string, right string) bool {
\tl, leftErr := time.Parse(time.RFC3339Nano, left)
\tr, rightErr := time.Parse(time.RFC3339Nano, right)
\tif leftErr != nil || rightErr != nil {
\t\treturn false
\t}
\treturn l.After(r)
}

`
                                            : funcName === 'Cut'
                                              ? `func locutusStringsCut(value string, sep string) []interface{} {
\tbefore, after, found := strings.Cut(value, sep)
\treturn []interface{}{before, after, found}
}

`
                                              : funcName === 'CutPrefix'
                                                ? `func locutusStringsCutPrefix(value string, prefix string) []interface{} {
\tafter, found := strings.CutPrefix(value, prefix)
\treturn []interface{}{after, found}
}

`
                                                : funcName === 'CutSuffix'
                                                  ? `func locutusStringsCutSuffix(value string, suffix string) []interface{} {
\tbefore, found := strings.CutSuffix(value, suffix)
\treturn []interface{}{before, found}
}

`
                                                  : funcName === 'ConstantTimeCompare'
                                                    ? `func locutusConstantTimeCompare(left string, right string) int {
\treturn subtle.ConstantTimeCompare([]byte(left), []byte(right))
}

`
                                                    : funcName === 'QueryUnescape'
                                                      ? `func locutusQueryUnescape(value string) string {
\tdecoded, err := url.QueryUnescape(value)
\tif err != nil {
\t\treturn ""
\t}
\treturn decoded
}

`
                                                      : funcName === 'ParseQuery'
                                                        ? `func locutusParseQuery(value string) map[string][]string {
\tparsed, err := url.ParseQuery(value)
\tif err != nil {
\t\treturn map[string][]string{}
\t}
\treturn parsed
}

`
                                                        : funcName === 'EncodeQuery'
                                                          ? `func locutusEncodeQuery(value string) string {
\tparsed, err := url.ParseQuery(value)
\tif err != nil {
\t\treturn ""
\t}
\treturn parsed.Encode()
}

`
                                                          : funcName === 'JoinPath'
                                                            ? `func locutusUrlJoinPath(base string, elems ...string) string {
\tjoined, err := url.JoinPath(base, elems...)
\tif err != nil {
\t\treturn ""
\t}
\treturn joined
}

`
                                                            : funcName === 'ResolveReference'
                                                              ? `func locutusResolveReference(base string, reference string) string {
\tbaseURL, baseErr := url.Parse(base)
\trefURL, refErr := url.Parse(reference)
\tif baseErr != nil || refErr != nil || baseURL == nil || refURL == nil {
\t\treturn ""
\t}
\treturn baseURL.ResolveReference(refURL).String()
}

`
                                                              : funcName === 'SplitHostPort'
                                                                ? `func locutusSplitHostPort(value string) []interface{} {
\thost, port, err := net.SplitHostPort(value)
\tif err != nil {
\t\treturn []interface{}{"", ""}
\t}
\treturn []interface{}{host, port}
}

`
                                                                : funcName === 'ParseIP'
                                                                  ? `func locutusParseIP(value string) interface{} {
\tparsed := net.ParseIP(value)
\tif parsed == nil {
\t\treturn nil
\t}
\treturn parsed.String()
}

`
                                                                  : funcName === 'ParseCIDR'
                                                                    ? `type locutusParsedCIDR struct {
\tIP       string \`json:"ip"\`
\tMaskBits int    \`json:"maskBits"\`
}

func locutusParseCIDR(value string) interface{} {
\tip, network, err := net.ParseCIDR(value)
\tif err != nil || ip == nil || network == nil {
\t\treturn nil
\t}
\tones, _ := network.Mask.Size()
\treturn locutusParsedCIDR{IP: ip.String(), MaskBits: ones}
}

`
                                                                    : funcName === 'Match'
                                                                      ? `func locutusPathMatch(pattern string, name string) bool {
\tmatched, err := path.Match(pattern, name)
\tif err != nil {
\t\treturn false
\t}
\treturn matched
}

`
                                                                      : funcName === 'Rel' && category === 'filepath'
                                                                        ? `func locutusFilepathRel(basePath string, targetPath string) string {
\trel, err := filepath.Rel(basePath, targetPath)
\tif err != nil {
\t\tpanic(err)
\t}
\treturn rel
}

`
                                                                        : ''

  return `package main

${importBlock}

${helperBlock}
func main() {
\t${mainBody}
}
`
}

/**
 * Normalize Go output for comparison
 */
function normalizeGoOutput(output: string, _expected?: string): string {
  let result = output.trim()
  // Go's encoding/json escapes HTML-sensitive characters by default.
  result = result
    .replace(/\\u003c/g, '<')
    .replace(/\\u003e/g, '>')
    .replace(/\\u0026/g, '&')
  // Strip trailing .0 from floats for integer comparison
  if (/^-?\d+\.0$/.test(result)) {
    result = result.replace(/\.0$/, '')
  }
  return result
}

export const golangHandler: LanguageHandler = {
  translate: jsToGo,
  normalize: normalizeGoOutput,
  skipList: GO_SKIP_LIST,
  dockerImage: GO_DOCKER_IMAGE,
  displayName: 'Go',
  version: '1.23',
  get parityValue() {
    return `${this.displayName} ${this.version}`
  },
  dockerCmd: (code: string) => [
    'sh',
    '-c',
    `echo '${code.replace(/'/g, "'\\''")}' > /tmp/main.go && go run /tmp/main.go`,
  ],
  mountRepo: false,
  upstreamSurface: {
    discover: discoverGoUpstreamSurface,
    getLocutusEntry: (func) => ({
      namespace: func.category,
      name: func.name === 'Index2' ? 'Index' : func.name === 'EncodeQuery' ? 'Encode' : func.name,
    }),
  },
}
