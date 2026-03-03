/**
 * Rust language handler for verification
 */

import { extractAssignedVar } from '../runner.ts'
import type { LanguageHandler } from '../types.ts'

export const RUST_SKIP_LIST = new Set<string>([
  // None currently
])

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

function quoteRustString(value: string): string {
  return `"${value
    .replace(/\\/g, '\\\\')
    .replace(/\n/g, '\\n')
    .replace(/\r/g, '\\r')
    .replace(/\t/g, '\\t')
    .replace(/"/g, '\\"')}"`
}

function buildRustCall(funcName: string, args: string[]): string {
  switch (funcName) {
    case 'contains': {
      const needle = args[0] ?? '""'
      const haystack = args[1] ?? '""'
      return `${haystack}.contains(${needle})`
    }
    case 'starts_with': {
      const prefix = args[0] ?? '""'
      const source = args[1] ?? '""'
      return `${source}.starts_with(${prefix})`
    }
    case 'ends_with': {
      const suffix = args[0] ?? '""'
      const source = args[1] ?? '""'
      return `${source}.ends_with(${suffix})`
    }
    case 'find': {
      const needle = args[0] ?? '""'
      const source = args[1] ?? '""'
      return `match ${source}.find(${needle}) { Some(i) => i as i64, None => -1 }`
    }
    case 'rfind': {
      const needle = args[0] ?? '""'
      const source = args[1] ?? '""'
      return `match ${source}.rfind(${needle}) { Some(i) => i as i64, None => -1 }`
    }
    case 'len': {
      const value = args[0] ?? '""'
      return `${value}.len() as i64`
    }
    case 'replace': {
      const source = args[0] ?? '""'
      const from = args[1] ?? '""'
      const to = args[2] ?? '""'
      return `${source}.replace(${from}, ${to})`
    }
    case 'to_lowercase': {
      const value = args[0] ?? '""'
      return `${value}.to_lowercase()`
    }
    case 'to_uppercase': {
      const value = args[0] ?? '""'
      return `${value}.to_uppercase()`
    }
    case 'trim': {
      const value = args[0] ?? '""'
      return `${value}.trim().to_string()`
    }
    default: {
      return `${funcName}(${args.join(', ')})`
    }
  }
}

function convertArgument(arg: string, funcName: string): string {
  const trimmed = arg.trim()

  if ((trimmed.startsWith("'") && trimmed.endsWith("'")) || (trimmed.startsWith('"') && trimmed.endsWith('"'))) {
    return quoteRustString(decodeJsString(trimmed))
  }

  if (trimmed === 'null' || trimmed === 'undefined') {
    return '""'
  }
  if (trimmed === 'true' || trimmed === 'false') {
    return trimmed
  }
  if (/^-?\d+(?:\.\d+)?$/.test(trimmed)) {
    return trimmed
  }

  const lengthMatch = trimmed.match(/^([A-Za-z_][\w$]*)\.length$/)
  if (lengthMatch?.[1]) {
    return `${lengthMatch[1]}.len() as i64`
  }

  const nestedCallMatch = trimmed.match(/^([A-Za-z_]\w*)\s*\(([\s\S]*)\)$/)
  if (nestedCallMatch?.[1] && nestedCallMatch[1] === funcName) {
    const nestedArgs = splitArgs(nestedCallMatch[2] ?? '').map((item) => convertArgument(item, funcName))
    return buildRustCall(funcName, nestedArgs)
  }

  if (/^[A-Za-z_][\w$]*$/.test(trimmed)) {
    return trimmed
  }

  return trimmed
}

function convertExpression(expr: string, funcName: string): string {
  const trimmed = expr.trim()
  const callMatch = trimmed.match(/^([A-Za-z_]\w*)\s*\(([\s\S]*)\)$/)
  if (callMatch?.[1] && callMatch[1] === funcName) {
    const args = splitArgs(callMatch[2] ?? '').map((arg) => convertArgument(arg, funcName))
    return buildRustCall(funcName, args)
  }

  return convertArgument(trimmed, funcName)
}

function convertJsLineToRust(line: string, funcName: string): string {
  let rust = line.trim()
  if (!rust) {
    return ''
  }

  rust = stripTrailingComment(rust)
  rust = rust.replace(/;+$/, '')
  if (!rust) {
    return ''
  }

  const declarationMatch = rust.match(/^(?:var|let|const)\s+([A-Za-z_][\w$]*)\s*=\s*([\s\S]+)$/)
  if (declarationMatch?.[1] && declarationMatch[2]) {
    return `let ${declarationMatch[1]} = ${convertExpression(declarationMatch[2], funcName)};`
  }

  const assignmentMatch = rust.match(/^([A-Za-z_][\w$]*)\s*=\s*([\s\S]+)$/)
  if (assignmentMatch?.[1] && assignmentMatch[2]) {
    return `${assignmentMatch[1]} = ${convertExpression(assignmentMatch[2], funcName)};`
  }

  return `${convertExpression(rust, funcName)};`
}

function jsToRust(jsCode: string[], funcName: string, _category?: string): string {
  const cleanedLines = jsCode
    .map((line) => stripTrailingComment(line).replace(/;+$/, '').trim())
    .filter((line) => line.length > 0)

  if (!cleanedLines.length) {
    return ''
  }

  const originalLastLine = jsCode[jsCode.length - 1]
  const assignedVar = extractAssignedVar(originalLastLine)

  let rustLines: string[]
  if (assignedVar) {
    rustLines = cleanedLines.map((line) => convertJsLineToRust(line, funcName))
    rustLines.push(`println!("{:?}", ${assignedVar});`)
  } else {
    const setupLines = cleanedLines.slice(0, -1).map((line) => convertJsLineToRust(line, funcName))
    const lastExpr = convertExpression(cleanedLines[cleanedLines.length - 1] ?? '', funcName)
    rustLines = [...setupLines, `println!("{:?}", ${lastExpr});`]
  }

  const body = rustLines.map((line) => `    ${line}`).join('\n')
  return `fn main() {\n${body}\n}`
}

function normalizeRustOutput(output: string): string {
  return output.trim()
}

export const rustHandler: LanguageHandler = {
  translate: jsToRust,
  normalize: normalizeRustOutput,
  skipList: RUST_SKIP_LIST,
  dockerImage: 'rust:1.85',
  displayName: 'Rust',
  version: '1.85',
  get parityValue() {
    return `${this.displayName} ${this.version}`
  },
  dockerCmd: (code: string) => [
    'sh',
    '-lc',
    `cat <<'__LOCUTUS_RS__' > /tmp/main.rs\n${code}\n__LOCUTUS_RS__\n/usr/local/cargo/bin/rustc /tmp/main.rs -O -o /tmp/main && /tmp/main`,
  ],
  mountRepo: false,
}
