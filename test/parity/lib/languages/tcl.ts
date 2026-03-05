/**
 * Tcl language handler for verification
 */

import { extractAssignedVar } from '../runner.ts'
import type { LanguageHandler } from '../types.ts'

export const TCL_SKIP_LIST = new Set<string>([
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
  dockerImage: 'python:3.12',
  displayName: 'Tcl',
  version: '8.6',
  get parityValue() {
    return `${this.displayName} ${this.version}`
  },
  dockerCmd: (code: string) => ['sh', '-lc', `cat <<'__LOCUTUS_TCL__' | tclsh\n${code}\n__LOCUTUS_TCL__`],
  mountRepo: false,
}
