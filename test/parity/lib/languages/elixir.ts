/**
 * Elixir language handler for verification
 */

import ts from 'typescript'

import { parseJsArrowFunction, parseJsExpression, type JsExpression } from '../jsCallbackAst.ts'
import { extractAssignedVar } from '../runner.ts'
import type { LanguageHandler } from '../types.ts'

// Functions to skip (implementation differences, etc.)
export const ELIXIR_SKIP_LIST = new Set<string>([])

const ELIXIR_PARITY_MODULE = `
defmodule LocutusParity do
  def json(nil), do: "null"
  def json(value) when is_boolean(value) or is_integer(value) or is_float(value), do: inspect(value)
  def json(value) when is_binary(value), do: inspect(value)

  def json(value) when is_list(value) do
    "[" <> Enum.map_join(value, ",", &json/1) <> "]"
  end

  def json(value) when is_map(value) do
    entries =
      value
      |> Enum.map(fn {key, item} -> {to_string(key), item} end)
      |> Enum.sort_by(fn {key, _item} -> key end)

    "{" <> Enum.map_join(entries, ",", fn {key, item} -> inspect(key) <> ":" <> json(item) end) <> "}"
  end

  def json(value) when is_atom(value), do: inspect(Atom.to_string(value))
  def json(value), do: inspect(to_string(value))

  def length(value) when is_binary(value), do: String.length(value)
  def length(value) when is_list(value), do: Kernel.length(value)
  def length(value) when is_map(value), do: map_size(value)

  def to_number(value) when is_integer(value) or is_float(value), do: value

  def to_number(value) when is_binary(value) do
    case Integer.parse(value) do
      {number, ""} ->
        number

      _ ->
        case Float.parse(value) do
          {number, ""} -> number
          _ -> raise ArgumentError, "Cannot coerce value to number"
        end
    end
  end
end
`.trim()

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

function emitElixirExpression(expression: JsExpression): string {
  switch (expression.kind) {
    case 'identifier':
      return expression.name
    case 'number':
      return expression.value
    case 'string':
      return JSON.stringify(expression.value)
    case 'boolean':
      return expression.value ? 'true' : 'false'
    case 'null':
      return 'nil'
    case 'array':
      return `[${expression.elements.map((element) => emitElixirExpression(element)).join(', ')}]`
    case 'property':
      if (expression.property === 'length') {
        return `LocutusParity.length(${emitElixirExpression(expression.object)})`
      }
      throw new Error(`Unsupported Elixir property access: .${expression.property}`)
    case 'index':
      return `Enum.at(${emitElixirExpression(expression.object)}, ${emitElixirExpression(expression.index)})`
    case 'call':
      if (expression.callee.kind === 'identifier') {
        if (expression.callee.name === 'Number' && expression.args.length === 1) {
          return `LocutusParity.to_number(${emitElixirExpression(expression.args[0] as JsExpression)})`
        }
        if (expression.callee.name === 'String' && expression.args.length === 1) {
          return `to_string(${emitElixirExpression(expression.args[0] as JsExpression)})`
        }
      }

      if (
        expression.callee.kind === 'property' &&
        expression.callee.property === 'charAt' &&
        expression.args.length === 1
      ) {
        return `String.at(${emitElixirExpression(expression.callee.object)}, ${emitElixirExpression(
          expression.args[0] as JsExpression,
        )})`
      }

      throw new Error('Unsupported Elixir callback call expression')
    case 'unary':
      return `${expression.operator}(${emitElixirExpression(expression.argument)})`
    case 'binary':
      if (expression.operator === '%') {
        return `rem(${emitElixirExpression(expression.left)}, ${emitElixirExpression(expression.right)})`
      }
      return `(${emitElixirExpression(expression.left)} ${expression.operator} ${emitElixirExpression(expression.right)})`
    case 'conditional':
      return `(if ${emitElixirExpression(expression.test)}, do: ${emitElixirExpression(
        expression.consequent,
      )}, else: ${emitElixirExpression(expression.alternate)})`
  }

  throw new Error(`Unsupported Elixir expression kind: ${(expression as { kind?: string }).kind ?? 'unknown'}`)
}

function emitElixirArrow(sourceText: string): string {
  const callback = parseJsArrowFunction(sourceText)
  return `fn ${callback.params.join(', ')} -> ${emitElixirExpression(callback.body)} end`
}

function translateHigherOrderCall(line: string, funcName: string): string | null {
  if (funcName !== 'frequencies_by' && funcName !== 'group_by' && funcName !== 'scan') {
    return null
  }

  const sourceFile = ts.createSourceFile('example.ts', line, ts.ScriptTarget.ES2022, true, ts.ScriptKind.TS)
  const statement = sourceFile.statements[0]
  if (!statement) {
    return null
  }

  let assignmentName: string | null = null
  let callExpression: ts.CallExpression | null = null

  if (ts.isVariableStatement(statement)) {
    const declaration = statement.declarationList.declarations[0]
    if (declaration && ts.isIdentifier(declaration.name) && declaration.initializer && ts.isCallExpression(declaration.initializer)) {
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

  if (!callExpression || !ts.isIdentifier(callExpression.expression) || callExpression.expression.text !== funcName) {
    return null
  }

  const args = callExpression.arguments
  let translatedCall: string | null = null

  if (funcName === 'frequencies_by' && args.length === 2) {
    translatedCall = `Enum.frequencies_by(${emitElixirExpression(parseJsExpression(args[0]?.getText(sourceFile) ?? 'undefined'))}, ${emitElixirArrow(args[1]?.getText(sourceFile) ?? '')})`
  } else if (funcName === 'group_by' && args.length === 2) {
    translatedCall = `Enum.group_by(${emitElixirExpression(parseJsExpression(args[0]?.getText(sourceFile) ?? 'undefined'))}, ${emitElixirArrow(args[1]?.getText(sourceFile) ?? '')})`
  } else if (funcName === 'group_by' && args.length === 3) {
    translatedCall = `Enum.group_by(${emitElixirExpression(parseJsExpression(args[0]?.getText(sourceFile) ?? 'undefined'))}, ${emitElixirArrow(args[1]?.getText(sourceFile) ?? '')}, ${emitElixirArrow(args[2]?.getText(sourceFile) ?? '')})`
  } else if (funcName === 'scan' && args.length === 2) {
    translatedCall = `Enum.scan(${emitElixirExpression(parseJsExpression(args[0]?.getText(sourceFile) ?? 'undefined'))}, ${emitElixirArrow(args[1]?.getText(sourceFile) ?? '')})`
  } else if (funcName === 'scan' && args.length === 3) {
    translatedCall = `Enum.scan(${emitElixirExpression(parseJsExpression(args[0]?.getText(sourceFile) ?? 'undefined'))}, ${emitElixirExpression(parseJsExpression(args[1]?.getText(sourceFile) ?? 'undefined'))}, ${emitElixirArrow(args[2]?.getText(sourceFile) ?? '')})`
  }

  if (!translatedCall) {
    return null
  }

  return assignmentName ? `${assignmentName} = ${translatedCall}` : translatedCall
}

/**
 * Convert a single JS line to Elixir
 */
function convertJsLineToElixir(line: string, funcName: string, module: string): string {
  let ex = line.trim()
  if (!ex) {
    return ''
  }

  ex = stripTrailingComment(ex)
  ex = ex.replace(/;+$/, '')

  const higherOrderTranslation = translateHigherOrderCall(ex, funcName)
  if (higherOrderTranslation) {
    return higherOrderTranslation
  }

  // Remove var/let/const - Elixir just uses name = value
  ex = ex.replace(/^\s*(var|let|const)\s+/, '')

  // Convert single-quoted strings to double-quoted (Elixir uses single quotes for charlists)
  ex = ex.replace(/'([^'\\]*(\\.[^'\\]*)*)'/g, '"$1"')

  // JS → Elixir conversions
  ex = ex.replace(/\btrue\b/g, 'true')
  ex = ex.replace(/\bfalse\b/g, 'false')
  ex = ex.replace(/\bnull\b/g, 'nil')
  ex = ex.replace(/\bundefined\b/g, 'nil')

  // JS special values → Elixir (Elixir doesn't have native Infinity)
  ex = ex.replace(/\bInfinity\b/g, ':infinity')
  ex = ex.replace(/\bNaN\b/g, ':nan')

  // Handle function calls - for Float functions, ensure inputs are floats
  // Float.ceil(3) fails in Elixir (needs Float.ceil(3.0)), so use Float.ceil(x / 1)
  // Kernel functions are auto-imported, so no prefix needed
  if (module === 'Float') {
    ex = ex.replace(new RegExp(`\\b${funcName}\\s*\\(([^)]+)\\)`, 'g'), `${module}.${funcName}($1 / 1)`)
  } else if (module === 'Kernel') {
    // Kernel is auto-imported, so just use bare function name
    // No transformation needed - function name stays as is
  } else {
    ex = ex.replace(new RegExp(`\\b${funcName}\\s*\\(`, 'g'), `${module}.${funcName}(`)
  }

  return ex
}

/**
 * Convert JS example code to Elixir
 */
function jsToElixir(jsCode: string[], funcName: string, category?: string): string {
  const module = category || 'Float'
  const lines = jsCode.map((line) => convertJsLineToElixir(line, funcName, module)).filter(Boolean)
  if (!lines.length) {
    return ''
  }

  const originalLastLine = jsCode[jsCode.length - 1]
  const assignedVar = extractAssignedVar(originalLastLine)

  let mainBody: string
  if (assignedVar) {
    mainBody = `${lines.join('\n')}\nIO.puts(LocutusParity.json(${assignedVar}))`
  } else {
    const setup = lines.slice(0, -1)
    const lastExpr = lines[lines.length - 1]
    const prefix = setup.length ? `${setup.join('\n')}\n` : ''
    mainBody = `${prefix}IO.puts(LocutusParity.json(${lastExpr}))`
  }

  return `${ELIXIR_PARITY_MODULE}\n\n${mainBody}`
}

function stringifyJsonLikeExpected(value: unknown, expectedShape: unknown): string {
  if (Array.isArray(value)) {
    return `[${value
      .map((item, index) =>
        stringifyJsonLikeExpected(item, Array.isArray(expectedShape) ? (expectedShape[index] as unknown) : undefined),
      )
      .join(',')}]`
  }

  if (value && typeof value === 'object') {
    const record = value as Record<string, unknown>
    const expectedRecord =
      expectedShape && typeof expectedShape === 'object' && !Array.isArray(expectedShape)
        ? (expectedShape as Record<string, unknown>)
        : undefined

    const expectedKeys = expectedRecord ? Object.keys(expectedRecord) : []
    const remainingKeys = Object.keys(record)
      .filter((key) => !expectedKeys.includes(key))
      .sort()
    const orderedKeys = [...expectedKeys.filter((key) => Object.hasOwn(record, key)), ...remainingKeys]

    return `{${orderedKeys
      .map((key) => `${JSON.stringify(key)}:${stringifyJsonLikeExpected(record[key], expectedRecord?.[key])}`)
      .join(',')}}`
  }

  return JSON.stringify(value)
}

/**
 * Normalize Elixir output for comparison
 */
function normalizeElixirOutput(output: string, expected?: string): string {
  let result = output.trim()

  try {
    const parsed = JSON.parse(result)
    const expectedParsed = expected ? JSON.parse(expected) : undefined
    result = stringifyJsonLikeExpected(parsed, expectedParsed)
  } catch {
    // Non-JSON output: keep prior normalization behavior.
  }

  // Strip trailing .0 from floats for integer comparison
  if (expected && /^-?\d+$/.test(expected)) {
    if (result === '-0.0') {
      result = '0'
    } else if (/^-?\d+\.0$/.test(result)) {
      result = result.replace(/\.0$/, '')
    }
  }

  // String quoting: Elixir's IO.puts doesn't add quotes, but expected values have them
  if (expected && /^".*"$/.test(expected) && !/^".*"$/.test(result)) {
    result = `"${result}"`
  }
  return result
}

export const elixirHandler: LanguageHandler = {
  translate: jsToElixir,
  normalize: normalizeElixirOutput,
  skipList: ELIXIR_SKIP_LIST,
  dockerImage: 'elixir:1.18',
  displayName: 'Elixir',
  version: '1.18',
  get parityValue() {
    return `${this.displayName} ${this.version}`
  },
  dockerCmd: (code: string) => ['elixir', '-e', code],
  mountRepo: false,
}
