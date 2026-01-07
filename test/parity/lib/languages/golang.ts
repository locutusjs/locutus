/**
 * Go language handler for verification
 */

import { extractAssignedVar } from '../runner.ts'
import type { LanguageHandler } from '../types.ts'

// Go package mapping: function name → Go package
const GO_PACKAGES: Record<string, string> = {
  // strings package
  Contains: 'strings',
  Count: 'strings',
  HasPrefix: 'strings',
  HasSuffix: 'strings',
  Index: 'strings',
  Index2: 'strings', // Our alias for Index
  Join: 'strings',
  LastIndex: 'strings',
  Repeat: 'strings',
  Replace: 'strings',
  Split: 'strings',
  ToLower: 'strings',
  ToUpper: 'strings',
  Trim: 'strings',
  TrimSpace: 'strings',
  // strconv package
  Atoi: 'strconv',
  FormatBool: 'strconv',
  FormatInt: 'strconv',
  Itoa: 'strconv',
  ParseBool: 'strconv',
  ParseInt: 'strconv',
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

  // Handle function calls - prefix with package
  const pkg = GO_PACKAGES[funcName]
  if (pkg) {
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

  if (goCode.includes('strings.')) imports.add('strings')
  if (goCode.includes('strconv.')) imports.add('strconv')

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
  const importBlock =
    imports.length === 1 ? `import "${imports[0]}"` : `import (\n\t"${imports.join('"\n\t"')}"\n)`

  return `package main

${importBlock}

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
  version: '1.23',
  dockerCmd: (code: string) => ['sh', '-c', `echo '${code.replace(/'/g, "'\\''")}' > /tmp/main.go && go run /tmp/main.go`],
  mountRepo: false,
}
