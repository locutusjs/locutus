/**
 * Clojure language handler for verification
 */

import ts from 'typescript'
import { runInDocker } from '../docker.ts'

import { type JsExpression, type JsObjectProperty, parseJsArrowFunction, parseJsExpression } from '../jsCallbackAst.ts'
import { extractAssignedVar } from '../runner.ts'
import type { LanguageHandler } from '../types.ts'

// Functions to skip (implementation differences, etc.)
export const CLOJURE_SKIP_LIST = new Set<string>([
  // partition emits lazy seqs/lists; parity translator currently compares scalar/string-style outputs only.
  'partition',
])

const CLOJURE_DOCKER_IMAGE = 'clojure:temurin-21-tools-deps'

function discoverClojureUpstreamSurface() {
  const discoverNamespace = (namespace: string, title: string, form: string) => {
    const result = runInDocker(CLOJURE_DOCKER_IMAGE, ['clojure', '-M', '-e', form])
    if (!result.success) {
      throw new Error(result.error || `Unable to discover Clojure upstream surface for ${namespace}`)
    }

    const entries = result.output
      .trim()
      .split('\n')
      .map((line) => line.trim())
      .filter(Boolean)
      .sort()

    return {
      namespace,
      title,
      target: 'Clojure 1.12',
      sourceKind: 'runtime' as const,
      sourceRef: CLOJURE_DOCKER_IMAGE,
      entries,
    }
  }

  return {
    language: 'clojure',
    namespaces: [
      discoverNamespace(
        'core',
        'clojure.core',
        '(doseq [s (sort (map name (keys (ns-publics (quote clojure.core)))))] (println s))',
      ),
      discoverNamespace(
        'edn',
        'clojure.edn',
        "(require '[clojure.edn]) (doseq [s (sort (map name (keys (ns-publics (quote clojure.edn)))))] (println s))",
      ),
      discoverNamespace(
        'set',
        'clojure.set',
        "(require '[clojure.set]) (doseq [s (sort (map name (keys (ns-publics (quote clojure.set)))))] (println s))",
      ),
      discoverNamespace(
        'string',
        'clojure.string',
        "(require '[clojure.string]) (doseq [s (sort (map name (keys (ns-publics (quote clojure.string)))))] (println s))",
      ),
      discoverNamespace(
        'Math',
        'java.lang.Math',
        '(doseq [s (sort (map #(.getName %) (filter #(java.lang.reflect.Modifier/isStatic (.getModifiers %)) (.getMethods java.lang.Math))))] (println s))',
      ),
    ],
  }
}

const CLOJURE_PARITY_PRELUDE = `
(require '[clojure.string :as clojure-string])

(defn locutus-json [value]
  (cond
    (nil? value) "null"
    (string? value) (pr-str value)
    (boolean? value) (if value "true" "false")
    (number? value) (str value)
    (vector? value) (str "[" (clojure-string/join "," (map locutus-json value)) "]")
    (sequential? value) (str "[" (clojure-string/join "," (map locutus-json value)) "]")
    (map? value) (let [entries (sort-by first (for [[k v] value] [(str k) v]))]
                   (str "{"
                        (clojure-string/join
                          ","
                          (map (fn [[k v]] (str (pr-str k) ":" (locutus-json v))) entries))
                        "}"))
    :else (pr-str (str value))))

(defn locutus-to-number [value]
  (cond
    (number? value) value
    (string? value) (try
                      (Long/parseLong value)
                      (catch Exception _
                        (Double/parseDouble value)))
    :else (throw (ex-info "Cannot coerce value to number" {:value value}))))

(defn locutus-add [left right]
  (if (and (number? left) (number? right))
    (+ left right)
    (str left right)))

(defn locutus-strict-eq [left right]
  (= left right))
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

function emitClojureMap(properties: JsObjectProperty[]): string {
  const hasSpecialProperties = properties.some(
    (property) => property.kind === 'spread' || (property.kind === 'property' && property.computed),
  )

  if (!hasSpecialProperties) {
    const pairs = properties
      .map((property) => {
        if (property.kind !== 'property' || property.computed || typeof property.key !== 'string') {
          throw new Error('Unsupported simple Clojure map property')
        }
        return `${JSON.stringify(property.key)} ${emitClojureExpression(property.value)}`
      })
      .join(', ')

    return `{${pairs}}`
  }

  let current = '{}'
  for (const property of properties) {
    if (property.kind === 'spread') {
      current = `(merge ${current} ${emitClojureExpression(property.expression)})`
      continue
    }

    const keyExpression =
      property.computed && typeof property.key !== 'string'
        ? emitClojureExpression(property.key)
        : JSON.stringify(String(property.key))
    current = `(assoc ${current} ${keyExpression} ${emitClojureExpression(property.value)})`
  }

  return current
}

function emitClojureExpression(expression: JsExpression): string {
  switch (expression.kind) {
    case 'identifier':
      if (expression.name === 'undefined') {
        return 'nil'
      }
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
      return `[${expression.elements.map((element) => emitClojureExpression(element)).join(' ')}]`
    case 'object':
      return emitClojureMap(expression.properties)
    case 'property':
      if (expression.property === 'length') {
        return `(count ${emitClojureExpression(expression.object)})`
      }
      return `(${expression.property} ${emitClojureExpression(expression.object)})`
    case 'index':
      return `(nth ${emitClojureExpression(expression.object)} ${emitClojureExpression(expression.index)})`
    case 'call':
      if (expression.callee.kind === 'identifier') {
        if (expression.callee.name === 'Number' && expression.args.length === 1) {
          return `(locutus-to-number ${emitClojureExpression(expression.args[0] as JsExpression)})`
        }
        if (expression.callee.name === 'String' && expression.args.length === 1) {
          return `(str ${emitClojureExpression(expression.args[0] as JsExpression)})`
        }
      }

      if (expression.callee.kind === 'property' && expression.args.length === 1) {
        if (expression.callee.property === 'charAt') {
          return `(str (nth ${emitClojureExpression(expression.callee.object)} ${emitClojureExpression(
            expression.args[0] as JsExpression,
          )}))`
        }
        if (expression.callee.property === 'join') {
          return `(clojure-string/join ${emitClojureExpression(expression.args[0] as JsExpression)} ${emitClojureExpression(expression.callee.object)})`
        }
      }

      throw new Error('Unsupported Clojure callback call expression')
    case 'unary':
      if (expression.operator === '!') {
        return `(not ${emitClojureExpression(expression.argument)})`
      }
      if (expression.operator === '+') {
        return `(locutus-to-number ${emitClojureExpression(expression.argument)})`
      }
      return `(- ${emitClojureExpression(expression.argument)})`
    case 'binary':
      if (expression.operator === '+') {
        return `(locutus-add ${emitClojureExpression(expression.left)} ${emitClojureExpression(expression.right)})`
      }
      if (expression.operator === '%') {
        return `(mod ${emitClojureExpression(expression.left)} ${emitClojureExpression(expression.right)})`
      }
      if (expression.operator === '===') {
        return `(locutus-strict-eq ${emitClojureExpression(expression.left)} ${emitClojureExpression(expression.right)})`
      }
      if (expression.operator === '!==') {
        return `(not (locutus-strict-eq ${emitClojureExpression(expression.left)} ${emitClojureExpression(
          expression.right,
        )}))`
      }
      if (expression.operator === '&&') {
        return `(and ${emitClojureExpression(expression.left)} ${emitClojureExpression(expression.right)})`
      }
      if (expression.operator === '||') {
        return `(or ${emitClojureExpression(expression.left)} ${emitClojureExpression(expression.right)})`
      }
      return `(${expression.operator} ${emitClojureExpression(expression.left)} ${emitClojureExpression(expression.right)})`
    case 'conditional':
      return `(if ${emitClojureExpression(expression.test)} ${emitClojureExpression(
        expression.consequent,
      )} ${emitClojureExpression(expression.alternate)})`
  }

  throw new Error(`Unsupported Clojure expression kind: ${(expression as { kind?: string }).kind ?? 'unknown'}`)
}

function emitClojureArrow(sourceText: string): string {
  const callback = parseJsArrowFunction(sourceText)
  return `(fn [${callback.params.join(' ')}] ${emitClojureExpression(callback.body)})`
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
 * Convert function call to Clojure S-expression
 */
function convertFunctionCall(code: string, funcName: string, category?: string): string {
  const regex = new RegExp(`${funcName}\\s*\\(([^)]*)\\)`, 'g')

  if (category === 'string') {
    let cljFuncName = funcName.replace(/_/g, '-')
    if (funcName === 'blank') {
      cljFuncName = 'blank?'
    }
    return code.replace(regex, `(clojure.string/${cljFuncName} $1)`)
  }
  if (category === 'core') {
    const cljFuncName = funcName.replace(/_/g, '-')
    return code.replace(regex, `(${cljFuncName} $1)`)
  }
  return code.replace(regex, `(Math/${funcName} $1)`)
}

function translateHigherOrderCall(line: string, funcName: string): string | null {
  if (
    funcName !== 'merge_with' &&
    funcName !== 'reduce_kv' &&
    funcName !== 'update_in' &&
    funcName !== 'partition_by'
  ) {
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

  if (!callExpression || !ts.isIdentifier(callExpression.expression) || callExpression.expression.text !== funcName) {
    return null
  }

  const args = callExpression.arguments
  let translatedCall: string | null = null

  if (funcName === 'merge_with' && args.length >= 1) {
    const translatedArgs = args.map((arg, index) =>
      index === 0
        ? emitClojureArrow(arg.getText(sourceFile))
        : emitClojureExpression(parseJsExpression(arg.getText(sourceFile))),
    )
    translatedCall = `(merge-with ${translatedArgs.join(' ')})`
  } else if (funcName === 'reduce_kv' && args.length === 3) {
    translatedCall = `(reduce-kv ${emitClojureArrow(args[0]?.getText(sourceFile) ?? '')} ${emitClojureExpression(
      parseJsExpression(args[1]?.getText(sourceFile) ?? 'undefined'),
    )} ${emitClojureExpression(parseJsExpression(args[2]?.getText(sourceFile) ?? 'undefined'))})`
  } else if (funcName === 'update_in' && args.length >= 3) {
    const headArgs = args
      .slice(0, 3)
      .map((arg, index) =>
        index === 2
          ? emitClojureArrow(arg.getText(sourceFile))
          : emitClojureExpression(parseJsExpression(arg.getText(sourceFile))),
      )
    const tailArgs = args.slice(3).map((arg) => emitClojureExpression(parseJsExpression(arg.getText(sourceFile))))
    translatedCall = `(update-in ${[...headArgs, ...tailArgs].join(' ')})`
  } else if (funcName === 'partition_by' && args.length === 2) {
    translatedCall = `(mapv vec (partition-by ${emitClojureArrow(args[0]?.getText(sourceFile) ?? '')} ${emitClojureExpression(
      parseJsExpression(args[1]?.getText(sourceFile) ?? 'undefined'),
    )}))`
  }

  if (!translatedCall) {
    return null
  }

  return assignmentName ? `(let [${assignmentName} ${translatedCall}] ${assignmentName})` : translatedCall
}

function translateStructuredCoreCall(line: string, funcName: string): string | null {
  if (funcName !== 'assoc_in' && funcName !== 'get_in') {
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

  if (!callExpression || !ts.isIdentifier(callExpression.expression) || callExpression.expression.text !== funcName) {
    return null
  }

  const translatedArgs = callExpression.arguments.map((arg) =>
    emitClojureExpression(parseJsExpression(arg.getText(sourceFile))),
  )
  const cljFuncName = funcName.replace(/_/g, '-')
  const translatedCall = `(${cljFuncName} ${translatedArgs.join(' ')})`
  return assignmentName ? `(let [${assignmentName} ${translatedCall}] ${assignmentName})` : translatedCall
}

/**
 * Convert a single JS line to Clojure
 */
function convertJsLineToClojure(line: string, funcName: string, category?: string): string {
  let clj = line.trim()
  if (!clj) {
    return ''
  }

  clj = stripTrailingComment(clj)
  clj = clj.replace(/;+$/, '')

  const higherOrderTranslation = translateHigherOrderCall(clj, funcName)
  if (higherOrderTranslation) {
    return higherOrderTranslation
  }

  const structuredCoreTranslation = translateStructuredCoreCall(clj, funcName)
  if (structuredCoreTranslation) {
    return structuredCoreTranslation
  }

  // Convert single-quoted strings to double-quoted (Clojure uses double quotes for strings)
  clj = clj.replace(/'([^'\\]*(\\.[^'\\]*)*)'/g, '"$1"')

  // JS → Clojure conversions
  clj = clj.replace(/\btrue\b/g, 'true')
  clj = clj.replace(/\bfalse\b/g, 'false')
  clj = clj.replace(/\bnull\b/g, 'nil')
  clj = clj.replace(/\bundefined\b/g, 'nil')

  // JS special values → Clojure
  clj = clj.replace(/\bInfinity\b/g, 'Double/POSITIVE_INFINITY')
  clj = clj.replace(/\bNaN\b/g, 'Double/NaN')

  clj = convertFunctionCall(clj, funcName, category)

  return clj
}

/**
 * Convert JS example code to Clojure
 */
function jsToClojure(jsCode: string[], funcName: string, category?: string): string {
  const lines = jsCode.map((line) => convertJsLineToClojure(line, funcName, category)).filter(Boolean)
  if (!lines.length) {
    return ''
  }

  const originalLastLine = jsCode[jsCode.length - 1]
  const assignedVar = extractAssignedVar(originalLastLine)

  let mainBody: string
  if (assignedVar) {
    const lastLine = lines[lines.length - 1] ?? ''
    const assignMatch = lastLine.match(/(\w+)\s*=\s*(.+)/)
    if (assignMatch) {
      const setup = lines.slice(0, -1)
      const prefix = setup.length ? setup.join('\n') + '\n' : ''
      mainBody = `${prefix}(println (locutus-json ${assignMatch[2]}))`
    } else {
      const setup = lines.slice(0, -1)
      const prefix = setup.length ? `${setup.join('\n')}\n` : ''
      mainBody = `${prefix}(println (locutus-json ${lastLine}))`
    }
  } else {
    const setup = lines.slice(0, -1)
    const lastExpr = lines[lines.length - 1]
    const prefix = setup.length ? `${setup.join('\n')}\n` : ''
    mainBody = `${prefix}(println (locutus-json ${lastExpr}))`
  }

  return `(do\n${CLOJURE_PARITY_PRELUDE}\n\n${mainBody}\n)`
}

/**
 * Normalize Clojure output for comparison
 */
function normalizeClojureOutput(output: string, expected?: string): string {
  let result = output.trim()

  try {
    const parsed = JSON.parse(result)
    const expectedParsed = expected ? JSON.parse(expected) : undefined
    result = stringifyJsonLikeExpected(parsed, expectedParsed)
  } catch {
    // Non-JSON output: keep fallback behavior below.
  }

  if (expected && /^-?\d+$/.test(expected)) {
    if (result === '-0.0') {
      result = '0'
    } else if (/^-?\d+\.0$/.test(result)) {
      result = result.replace(/\.0$/, '')
    }
  }

  if (expected && /^".*"$/.test(expected) && !/^".*"$/.test(result)) {
    result = `"${result}"`
  }

  return result
}

export const clojureHandler: LanguageHandler = {
  translate: jsToClojure,
  normalize: normalizeClojureOutput,
  skipList: CLOJURE_SKIP_LIST,
  dockerImage: CLOJURE_DOCKER_IMAGE,
  displayName: 'Clojure',
  version: '1.12',
  get parityValue() {
    return `${this.displayName} ${this.version}`
  },
  dockerCmd: (code: string) => ['clojure', '-M', '-e', code],
  mountRepo: false,
  upstreamSurface: {
    discover: discoverClojureUpstreamSurface,
    getLocutusEntry: (func) => {
      const translated = func.category === 'string' && func.name === 'blank' ? 'blank?' : func.name.replaceAll('_', '-')
      return {
        namespace: func.category,
        name: translated,
      }
    },
  },
}
