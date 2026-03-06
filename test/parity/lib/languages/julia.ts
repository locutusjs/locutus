/**
 * Julia language handler for verification
 */

import ts from 'typescript'

import { type JsExpression, parseJsArrowFunction, parseJsExpression } from '../jsCallbackAst.ts'
import { extractAssignedVar } from '../runner.ts'
import type { LanguageHandler } from '../types.ts'

// Functions to skip (implementation differences, etc.)
export const JULIA_SKIP_LIST = new Set<string>([])

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
        return code.slice(0, i).trim()
      }
    }
  }

  return code
}

/**
 * Convert a single JS line to Julia
 */
function emitJuliaExpression(expression: JsExpression): string {
  switch (expression.kind) {
    case 'identifier':
      if (expression.name === 'undefined') {
        return 'nothing'
      }
      return expression.name
    case 'number':
      return expression.value
    case 'string':
      return JSON.stringify(expression.value)
    case 'boolean':
      return expression.value ? 'true' : 'false'
    case 'null':
      return 'nothing'
    case 'array':
      return `[${expression.elements.map((element) => emitJuliaExpression(element)).join(', ')}]`
    case 'call':
      if (
        expression.callee.kind === 'identifier' &&
        expression.callee.name === 'Number' &&
        expression.args.length === 1
      ) {
        return `parse(Float64, string(${emitJuliaExpression(expression.args[0] as JsExpression)}))`
      }
      throw new Error('Unsupported Julia callback call expression')
    case 'property':
      if (expression.property === 'length') {
        return `length(${emitJuliaExpression(expression.object)})`
      }
      throw new Error(`Unsupported Julia property access: .${expression.property}`)
    case 'index':
      return `${emitJuliaExpression(expression.object)}[${emitJuliaExpression(expression.index)} + 1]`
    case 'unary':
      return `${expression.operator}(${emitJuliaExpression(expression.argument)})`
    case 'binary':
      if (expression.operator === '===') {
        return `(${emitJuliaExpression(expression.left)} == ${emitJuliaExpression(expression.right)})`
      }
      if (expression.operator === '!==') {
        return `(${emitJuliaExpression(expression.left)} != ${emitJuliaExpression(expression.right)})`
      }
      if (expression.operator === '&&' || expression.operator === '||') {
        return `(${emitJuliaExpression(expression.left)} ${expression.operator} ${emitJuliaExpression(expression.right)})`
      }
      return `(${emitJuliaExpression(expression.left)} ${expression.operator} ${emitJuliaExpression(expression.right)})`
    case 'conditional':
      return `(${emitJuliaExpression(expression.test)} ? ${emitJuliaExpression(expression.consequent)} : ${emitJuliaExpression(
        expression.alternate,
      )})`
    case 'object':
      throw new Error('Object literals are not supported in Julia parity callbacks')
  }

  throw new Error(`Unsupported Julia expression kind: ${(expression as { kind?: string }).kind ?? 'unknown'}`)
}

function emitJuliaArrow(sourceText: string): string {
  const callback = parseJsArrowFunction(sourceText)
  if (callback.params.length === 0) {
    throw new Error('Julia predicate callback requires at least one parameter')
  }
  return `${callback.params[0]} -> ${emitJuliaExpression(callback.body)}`
}

function translateFindallCall(line: string): string | null {
  const sourceFile = ts.createSourceFile('example.ts', line, ts.ScriptTarget.ES2022, true, ts.ScriptKind.TS)
  const statement = sourceFile.statements[0]
  if (!statement) {
    return null
  }

  let assignmentName: string | null = null
  let callExpression: ts.CallExpression | null = null

  if (ts.isVariableStatement(statement)) {
    const declaration = statement.declarationList.declarations[0]
    if (
      declaration &&
      ts.isIdentifier(declaration.name) &&
      declaration.initializer &&
      ts.isCallExpression(declaration.initializer)
    ) {
      assignmentName = declaration.name.text
      callExpression = declaration.initializer
    }
  } else if (ts.isExpressionStatement(statement)) {
    if (ts.isCallExpression(statement.expression)) {
      callExpression = statement.expression
    } else if (
      ts.isBinaryExpression(statement.expression) &&
      statement.expression.operatorToken.kind === ts.SyntaxKind.EqualsToken &&
      ts.isIdentifier(statement.expression.left) &&
      ts.isCallExpression(statement.expression.right)
    ) {
      assignmentName = statement.expression.left.text
      callExpression = statement.expression.right
    }
  }

  if (!callExpression || !ts.isIdentifier(callExpression.expression) || callExpression.expression.text !== 'findall') {
    return null
  }

  const matcherArg = callExpression.arguments[0]
  const valuesArg = callExpression.arguments[1]
  if (!matcherArg || !valuesArg) {
    return null
  }

  const matcherText = matcherArg.getText(sourceFile)
  const valuesText = emitJuliaExpression(parseJsExpression(valuesArg.getText(sourceFile)))
  const matcherExpression = ts.isArrowFunction(matcherArg)
    ? emitJuliaArrow(matcherText)
    : `(value -> value == ${emitJuliaExpression(parseJsExpression(matcherText))})`

  const translated = `findall(${matcherExpression}, ${valuesText})`
  return assignmentName ? `${assignmentName} = ${translated}` : translated
}

function convertJsLineToJulia(line: string, funcName: string): string {
  let jl = line.trim()
  if (!jl) {
    return ''
  }

  jl = stripTrailingComment(jl)
  jl = jl.replace(/;+$/, '')

  if (funcName === 'findall') {
    const translatedFindall = translateFindallCall(jl)
    if (translatedFindall) {
      return translatedFindall
    }
  }

  // Remove var/let/const - Julia just uses name = value
  jl = jl.replace(/^\s*(var|let|const)\s+/, '')

  // Convert single-quoted strings to double-quoted (Julia uses single quotes only for chars)
  jl = jl.replace(/'([^'\\]*(\\.[^'\\]*)*)'/g, '"$1"')

  // JS → Julia conversions
  jl = jl.replace(/\btrue\b/g, 'true')
  jl = jl.replace(/\bfalse\b/g, 'false')
  jl = jl.replace(/\bnull\b/g, 'nothing')
  jl = jl.replace(/\bundefined\b/g, 'nothing')

  // JS special values → Julia
  jl = jl.replace(/\bInfinity\b/g, 'Inf')
  jl = jl.replace(/\bNaN\b/g, 'NaN')

  // sortperm uses keyword arguments in Julia (`rev=true`) instead of positional booleans.
  if (funcName === 'sortperm') {
    jl = jl.replace(/sortperm\s*\(([\s\S]*)\)$/g, (_match: string, argsText: string) => {
      const args = splitArgs(argsText)
      if (args.length === 2) {
        return `sortperm(${args[0]}; rev=${args[1]})`
      }
      return `sortperm(${argsText})`
    })
  }

  // partialsortperm(v, k[, rev]) in locutus maps to partialsortperm(v, 1:k; rev=...)
  if (funcName === 'partialsortperm') {
    jl = jl.replace(/partialsortperm\s*\(([\s\S]*)\)$/g, (_match: string, argsText: string) => {
      const args = splitArgs(argsText)
      if (args.length >= 2) {
        const base = `partialsortperm(${args[0]}, 1:${args[1]}`
        if (args.length >= 3) {
          return `${base}; rev=${args[2]})`
        }
        return `${base})`
      }
      return `partialsortperm(${argsText})`
    })
  }

  return jl
}

/**
 * Convert JS example code to Julia
 */
function jsToJulia(jsCode: string[], funcName: string, _category?: string): string {
  const lines = jsCode.map((line) => convertJsLineToJulia(line, funcName)).filter(Boolean)
  if (!lines.length) {
    return ''
  }

  const originalLastLine = jsCode[jsCode.length - 1]
  const assignedVar = extractAssignedVar(originalLastLine)

  let result: string
  if (assignedVar) {
    result = `${lines.join('\n')}\nprint(${assignedVar})`
  } else {
    const setup = lines.slice(0, -1)
    const lastExpr = lines[lines.length - 1]
    const prefix = setup.length ? `${setup.join('\n')}\n` : ''
    result = `${prefix}print(${lastExpr})`
  }

  return result
}

/**
 * Normalize Julia output for comparison
 */
function normalizeJuliaOutput(output: string, expected?: string): string {
  let result = output.trim()

  if (expected && /^\{"start":-?\d+,"end":-?\d+\}$/.test(expected)) {
    const rangeMatch = result.match(/^(-?\d+):(-?\d+)$/)
    if (rangeMatch?.[1] && rangeMatch[2]) {
      return `{"start":${rangeMatch[1]},"end":${rangeMatch[2]}}`
    }
  }

  // Handle -0 -> 0 conversion (for ceil(-0.5) which returns -0 in Julia)
  if ((result === '-0' || result === '-0.0') && (expected === '0' || expected === '0.0')) {
    return expected || '0'
  }

  // Strip trailing .0 from floats for integer comparison
  if (expected && /^-?\d+$/.test(expected) && /^-?\d+\.0$/.test(result)) {
    result = result.replace(/\.0$/, '')
  }

  // Normalize Julia array rendering spacing: `[1, 2, 3]` -> `[1,2,3]`.
  if (expected && /^\[.*\]$/.test(expected) && /^\[.*\]$/.test(result)) {
    result = result.replace(/,\s+/g, ',')
  }

  // String quoting: Julia's print() doesn't add quotes, but expected values have them
  if (expected && /^".*"$/.test(expected) && !/^".*"$/.test(result)) {
    result = `"${result}"`
  }

  return result
}

export const juliaHandler: LanguageHandler = {
  translate: jsToJulia,
  normalize: normalizeJuliaOutput,
  skipList: JULIA_SKIP_LIST,
  dockerImage: 'julia:1.11',
  displayName: 'Julia',
  version: '1.11',
  get parityValue() {
    return `${this.displayName} ${this.version}`
  },
  dockerCmd: (code: string) => ['julia', '-e', code],
  mountRepo: false,
}
