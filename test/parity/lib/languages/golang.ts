/**
 * Go language handler for verification
 */

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
  Split: 'strings',
  ToLower: 'strings',
  ToUpper: 'strings',
  Trim: 'strings',
  TrimLeft: 'strings',
  TrimPrefix: 'strings',
  TrimRight: 'strings',
  TrimSpace: 'strings',
  TrimSuffix: 'strings',
  // strconv package
  Atoi: 'strconv',
  FormatBool: 'strconv',
  FormatInt: 'strconv',
  Itoa: 'strconv',
  ParseBool: 'strconv',
  ParseInt: 'strconv',
  // time package
  Format: 'time',
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
 * Convert a single JS line to Go
 */
function convertJsLineToGo(line: string, funcName: string): string {
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
  } else if (funcName === 'Parse') {
    go = convertParseCalls(go)
  }

  // Handle function calls - prefix with package
  const pkg = GO_PACKAGES[funcName]
  if (pkg && funcName !== 'Format' && funcName !== 'Parse') {
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

  if (goCode.includes('strings.')) {
    imports.add('strings')
  }
  if (goCode.includes('strconv.')) {
    imports.add('strconv')
  }
  if (goCode.includes('time.') || goCode.includes('locutusTimeFormat(') || goCode.includes('locutusTimeParse(')) {
    imports.add('time')
  }

  return Array.from(imports)
}

/**
 * Convert JS example code to Go
 */
function jsToGo(jsCode: string[], funcName: string): string {
  const lines = jsCode.map((line) => convertJsLineToGo(line, funcName)).filter(Boolean)
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
      : funcName === 'Parse'
        ? `func locutusTimeParse(layout string, value string) string {
\tt, err := time.Parse(layout, value)
\tif err != nil {
\t\treturn ""
\t}
\treturn t.UTC().Format("2006-01-02T15:04:05.000Z07:00")
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
  dockerImage: 'golang:1.23',
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
}
