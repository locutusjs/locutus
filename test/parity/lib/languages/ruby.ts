/**
 * Ruby language handler for verification
 */

import ts from 'typescript'
import { runInDocker } from '../docker.ts'

import { type JsExpression, parseJsArrowFunction, parseJsExpression } from '../jsCallbackAst.ts'
import { extractAssignedVar } from '../runner.ts'
import type { LanguageHandler } from '../types.ts'

// Ruby method mapping: JS function name → Ruby method name and category
interface RubyMethodInfo {
  rubyMethod: string
  category: 'String' | 'Array' | 'Math' | 'Integer' | 'Float'
  isInstanceMethod: boolean // true for str.method, false for Module.method(arg)
}

const RUBY_METHODS: Record<string, RubyMethodInfo> = {
  // String methods (instance methods on String)
  capitalize: { rubyMethod: 'capitalize', category: 'String', isInstanceMethod: true },
  chomp: { rubyMethod: 'chomp', category: 'String', isInstanceMethod: true },
  chop: { rubyMethod: 'chop', category: 'String', isInstanceMethod: true },
  downcase: { rubyMethod: 'downcase', category: 'String', isInstanceMethod: true },
  end_with: { rubyMethod: 'end_with?', category: 'String', isInstanceMethod: true },
  delete_prefix: { rubyMethod: 'delete_prefix', category: 'String', isInstanceMethod: true },
  delete_suffix: { rubyMethod: 'delete_suffix', category: 'String', isInstanceMethod: true },
  gsub: { rubyMethod: 'gsub', category: 'String', isInstanceMethod: true },
  include: { rubyMethod: 'include?', category: 'String', isInstanceMethod: true },
  length: { rubyMethod: 'length', category: 'String', isInstanceMethod: true },
  reverse: { rubyMethod: 'reverse', category: 'String', isInstanceMethod: true },
  start_with: { rubyMethod: 'start_with?', category: 'String', isInstanceMethod: true },
  strip: { rubyMethod: 'strip', category: 'String', isInstanceMethod: true },
  tr: { rubyMethod: 'tr', category: 'String', isInstanceMethod: true },
  upcase: { rubyMethod: 'upcase', category: 'String', isInstanceMethod: true },
  // Array methods (instance methods on Array)
  compact: { rubyMethod: 'compact', category: 'Array', isInstanceMethod: true },
  bsearch_index: { rubyMethod: 'bsearch_index', category: 'Array', isInstanceMethod: true },
  filter_map: { rubyMethod: 'filter_map', category: 'Array', isInstanceMethod: true },
  first: { rubyMethod: 'first', category: 'Array', isInstanceMethod: true },
  flatten: { rubyMethod: 'flatten', category: 'Array', isInstanceMethod: true },
  group_by: { rubyMethod: 'group_by', category: 'Array', isInstanceMethod: true },
  last: { rubyMethod: 'last', category: 'Array', isInstanceMethod: true },
  permutation: { rubyMethod: 'permutation', category: 'Array', isInstanceMethod: true },
  sample: { rubyMethod: 'sample', category: 'Array', isInstanceMethod: true },
  slice_when: { rubyMethod: 'slice_when', category: 'Array', isInstanceMethod: true },
  uniq: { rubyMethod: 'uniq', category: 'Array', isInstanceMethod: true },
  // Math methods (module methods)
  acos: { rubyMethod: 'acos', category: 'Math', isInstanceMethod: false },
  cos: { rubyMethod: 'cos', category: 'Math', isInstanceMethod: false },
  sin: { rubyMethod: 'sin', category: 'Math', isInstanceMethod: false },
  sqrt: { rubyMethod: 'sqrt', category: 'Math', isInstanceMethod: false },
}

// Functions to skip (implementation differences, non-deterministic, etc.)
export const RUBY_SKIP_LIST = new Set<string>([
  // sample() is random - can't verify deterministically
  'sample',
  // acos example uses JS string concatenation (float + '') which doesn't work in Ruby
  'acos',
])

const RUBY_DOCKER_IMAGE = 'ruby:3.3'

function discoverRubyUpstreamSurface() {
  const script = `
def owned_instance_entries(klass)
  generic = (
    BasicObject.public_instance_methods(true) +
    Object.public_instance_methods(true) +
    Kernel.public_instance_methods(true)
  ).map(&:to_s).uniq

  klass.public_instance_methods(true)
    .map(&:to_s)
    .uniq
    .reject { |entry| generic.include?(entry) }
    .sort
end

snapshots = [
  {
    namespace: 'Array',
    title: 'Array instance methods',
    target: 'Ruby 3.3',
    sourceKind: 'runtime',
    sourceRef: '${RUBY_DOCKER_IMAGE}',
    entries: owned_instance_entries(Array)
  },
  {
    namespace: 'String',
    title: 'String instance methods',
    target: 'Ruby 3.3',
    sourceKind: 'runtime',
    sourceRef: '${RUBY_DOCKER_IMAGE}',
    entries: owned_instance_entries(String)
  },
  {
    namespace: 'Enumerable',
    title: 'Enumerable instance methods',
    target: 'Ruby 3.3',
    sourceKind: 'runtime',
    sourceRef: '${RUBY_DOCKER_IMAGE}',
    entries: Enumerable.instance_methods(false).map(&:to_s).uniq.sort
  },
  {
    namespace: 'Hash',
    title: 'Hash instance methods',
    target: 'Ruby 3.3',
    sourceKind: 'runtime',
    sourceRef: '${RUBY_DOCKER_IMAGE}',
    entries: owned_instance_entries(Hash)
  },
  {
    namespace: 'Math',
    title: 'Math module methods',
    target: 'Ruby 3.3',
    sourceKind: 'runtime',
    sourceRef: '${RUBY_DOCKER_IMAGE}',
    entries: Math.singleton_methods(false).map(&:to_s).uniq.sort
  },
  {
    namespace: 'Integer',
    title: 'Integer instance methods',
    target: 'Ruby 3.3',
    sourceKind: 'runtime',
    sourceRef: '${RUBY_DOCKER_IMAGE}',
    entries: owned_instance_entries(Integer)
  },
  {
    namespace: 'Float',
    title: 'Float instance methods',
    target: 'Ruby 3.3',
    sourceKind: 'runtime',
    sourceRef: '${RUBY_DOCKER_IMAGE}',
    entries: owned_instance_entries(Float)
  }
]

require 'json'
puts JSON.generate({ language: 'ruby', namespaces: snapshots })
`.trim()

  const result = runInDocker(RUBY_DOCKER_IMAGE, ['ruby', '-e', script])
  if (!result.success) {
    throw new Error(result.error || 'Unable to discover Ruby upstream surface')
  }

  const parsed = JSON.parse(result.output) as unknown
  if (!parsed || typeof parsed !== 'object') {
    throw new Error('Ruby upstream surface output was not an object')
  }

  return parsed as {
    language: string
    namespaces: Array<{
      namespace: string
      title: string
      target: string
      sourceKind: 'runtime'
      sourceRef: string
      entries: string[]
    }>
  }
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
 * Convert a JS function call to Ruby method call
 * e.g., strip('  hello  ') → "  hello  ".strip
 * e.g., flatten([1, [2, 3]]) → [1, [2, 3]].flatten
 * e.g., end_with('hello', 'lo') → "hello".end_with?("lo")
 */
function convertFunctionCall(code: string, funcName: string, methodInfo: RubyMethodInfo): string {
  // Match function call pattern: funcName(arg1, arg2, ...)
  const funcCallRegex = new RegExp(`\\b${funcName}\\s*\\(([^)]+)\\)`, 'g')

  return code.replace(funcCallRegex, (match, argsStr) => {
    // Parse arguments (simple split, doesn't handle nested parens perfectly)
    const args = parseArguments(argsStr)
    if (args.length === 0) {
      return match
    }

    const rawFirstArg = args[0]
    if (rawFirstArg === undefined) {
      return match
    }
    const firstArg = rawFirstArg.trim()
    const restArgs = args.slice(1)

    if (methodInfo.isInstanceMethod) {
      if (methodInfo.rubyMethod === 'group_by' && restArgs.length === 0) {
        return `${firstArg}.group_by { |__locutus_v| __locutus_v }`
      }
      if (methodInfo.rubyMethod === 'permutation') {
        if (restArgs.length > 0) {
          return `${firstArg}.permutation(${restArgs.join(', ')}).to_a`
        }
        return `${firstArg}.permutation.to_a`
      }

      // Instance method: first arg becomes receiver
      // e.g., strip('str') → "str".strip
      // e.g., end_with('str', 'suffix') → "str".end_with?("suffix")
      if (restArgs.length > 0) {
        return `${firstArg}.${methodInfo.rubyMethod}(${restArgs.join(', ')})`
      }
      return `${firstArg}.${methodInfo.rubyMethod}`
    }
    // Module method: e.g., Math.acos(arg)
    return `Math.${methodInfo.rubyMethod}(${args.join(', ')})`
  })
}

/**
 * Parse function arguments, handling nested brackets and quoted strings
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

function emitRubyExpression(expression: JsExpression): string {
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
      return `[${expression.elements.map((element) => emitRubyExpression(element)).join(', ')}]`
    case 'object':
      return `{${expression.properties
        .map((property) => {
          if (property.kind === 'spread') {
            throw new Error('Ruby callback object spread is not supported')
          }
          if (property.computed || typeof property.key !== 'string') {
            throw new Error('Ruby callback computed object keys are not supported')
          }
          return `${JSON.stringify(property.key)} => ${emitRubyExpression(property.value)}`
        })
        .join(', ')}}`
    case 'property':
      if (expression.property === 'length') {
        return `${emitRubyExpression(expression.object)}.length`
      }
      return `${emitRubyExpression(expression.object)}.${expression.property}`
    case 'index':
      return `${emitRubyExpression(expression.object)}[${emitRubyExpression(expression.index)}]`
    case 'call':
      if (
        expression.callee.kind === 'identifier' &&
        expression.callee.name === 'Number' &&
        expression.args.length === 1
      ) {
        return `Float(${emitRubyExpression(expression.args[0] as JsExpression)})`
      }
      if (
        expression.callee.kind === 'identifier' &&
        expression.callee.name === 'String' &&
        expression.args.length === 1
      ) {
        return `${emitRubyExpression(expression.args[0] as JsExpression)}.to_s`
      }
      throw new Error('Unsupported Ruby callback call expression')
    case 'unary':
      return `${expression.operator}(${emitRubyExpression(expression.argument)})`
    case 'binary':
      if (expression.operator === '===') {
        return `(${emitRubyExpression(expression.left)} == ${emitRubyExpression(expression.right)})`
      }
      if (expression.operator === '!==') {
        return `(${emitRubyExpression(expression.left)} != ${emitRubyExpression(expression.right)})`
      }
      if (expression.operator === '&&' || expression.operator === '||') {
        return `(${emitRubyExpression(expression.left)} ${expression.operator} ${emitRubyExpression(expression.right)})`
      }
      return `(${emitRubyExpression(expression.left)} ${expression.operator} ${emitRubyExpression(expression.right)})`
    case 'conditional':
      return `(${emitRubyExpression(expression.test)} ? ${emitRubyExpression(expression.consequent)} : ${emitRubyExpression(
        expression.alternate,
      )})`
  }

  throw new Error(`Unsupported Ruby expression kind: ${(expression as { kind?: string }).kind ?? 'unknown'}`)
}

function emitRubyArrow(sourceText: string): string {
  const callback = parseJsArrowFunction(sourceText)
  return `|${callback.params.join(', ')}| ${emitRubyExpression(callback.body)}`
}

function translateBsearchLikeCall(line: string, funcName: 'bsearch' | 'bsearch_index'): string | null {
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

  const valuesArg = callExpression.arguments[0]
  const callbackArg = callExpression.arguments[1]
  if (!valuesArg || !callbackArg) {
    return null
  }

  const translated = `${emitRubyExpression(parseJsExpression(valuesArg.getText(sourceFile)))}.${funcName} { ${emitRubyArrow(
    callbackArg.getText(sourceFile),
  )} }`
  return assignmentName ? `${assignmentName} = ${translated}` : translated
}

function translateFilterMapCall(line: string): string | null {
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

  if (
    !callExpression ||
    !ts.isIdentifier(callExpression.expression) ||
    callExpression.expression.text !== 'filter_map'
  ) {
    return null
  }

  const valuesArg = callExpression.arguments[0]
  const callbackArg = callExpression.arguments[1]
  if (!valuesArg || !callbackArg) {
    return null
  }

  const translated = `${emitRubyExpression(parseJsExpression(valuesArg.getText(sourceFile)))}.filter_map { ${emitRubyArrow(
    callbackArg.getText(sourceFile),
  )} }`
  return assignmentName ? `${assignmentName} = ${translated}` : translated
}

function translateSliceWhenCall(line: string): string | null {
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

  if (
    !callExpression ||
    !ts.isIdentifier(callExpression.expression) ||
    callExpression.expression.text !== 'slice_when'
  ) {
    return null
  }

  const valuesArg = callExpression.arguments[0]
  const callbackArg = callExpression.arguments[1]
  if (!valuesArg || !callbackArg) {
    return null
  }

  const translated = `${emitRubyExpression(parseJsExpression(valuesArg.getText(sourceFile)))}.slice_when { ${emitRubyArrow(
    callbackArg.getText(sourceFile),
  )} }.to_a`
  return assignmentName ? `${assignmentName} = ${translated}` : translated
}

/**
 * Convert a single JS line to Ruby
 * Category is inferred from directory path (Math, String, Array)
 */
function convertJsLineToRuby(line: string, funcName: string, category: string): string {
  let ruby = line.trim()
  if (!ruby) {
    return ''
  }

  ruby = stripTrailingComment(ruby)
  ruby = ruby.replace(/;+$/, '')

  if (funcName === 'bsearch' || funcName === 'bsearch_index') {
    const translatedBsearch = translateBsearchLikeCall(ruby, funcName)
    if (translatedBsearch) {
      return translatedBsearch
    }
  }

  if (funcName === 'filter_map') {
    const translatedFilterMap = translateFilterMapCall(ruby)
    if (translatedFilterMap) {
      return translatedFilterMap
    }
  }

  if (funcName === 'slice_when') {
    const translatedSliceWhen = translateSliceWhenCall(ruby)
    if (translatedSliceWhen) {
      return translatedSliceWhen
    }
  }

  // var/let/const → nothing (Ruby doesn't need them)
  ruby = ruby.replace(/^\s*(var|let|const)\s+/, '')

  // JS → Ruby boolean/null conversions
  ruby = ruby.replace(/\btrue\b/g, 'true')
  ruby = ruby.replace(/\bfalse\b/g, 'false')
  ruby = ruby.replace(/\bnull\b/g, 'nil')
  ruby = ruby.replace(/\bundefined\b/g, 'nil')

  // Infinity → Float::INFINITY
  ruby = ruby.replace(/\bInfinity\b/g, 'Float::INFINITY')

  // Single quotes → double quotes (Ruby handles both, but let's be consistent)
  ruby = ruby.replace(/'([^'\\]*(\\.[^'\\]*)*)'/g, '"$1"')

  // Convert function calls to Ruby method calls
  // Category from directory determines the call style
  const methodInfo = RUBY_METHODS[funcName]
  if (methodInfo) {
    ruby = convertFunctionCall(ruby, funcName, methodInfo)
  } else if (category === 'Math') {
    // Math module methods: funcName(args) → Math.funcName(args)
    ruby = ruby.replace(new RegExp(`\\b${funcName}\\s*\\(`, 'g'), `Math.${funcName}(`)
  } else if (category === 'String' || category === 'Array') {
    // Instance methods: funcName(obj, ...) → obj.funcName(...)
    const funcCallRegex = new RegExp(`\\b${funcName}\\s*\\(([^)]+)\\)`, 'g')
    ruby = ruby.replace(funcCallRegex, (match, argsStr) => {
      const args = parseArguments(argsStr)
      if (args.length === 0) {
        return match
      }
      const rawReceiver = args[0]
      if (rawReceiver === undefined) {
        return match
      }
      const receiver = rawReceiver.trim()
      const restArgs = args.slice(1)
      if (restArgs.length > 0) {
        return `${receiver}.${funcName}(${restArgs.join(', ')})`
      }
      return `${receiver}.${funcName}`
    })
  }

  return ruby
}

/**
 * Convert JS example code to Ruby
 * Category is inferred from directory path (Math, String, Array)
 */
function jsToRuby(jsCode: string[], funcName: string, category?: string): string {
  const cat = category || 'String' // default to String for backward compat
  const lines = jsCode.map((line) => convertJsLineToRuby(line, funcName, cat)).filter(Boolean)
  if (!lines.length) {
    return ''
  }

  const originalLastLine = jsCode[jsCode.length - 1]
  const assignedVar = extractAssignedVar(originalLastLine)

  let mainBody: string
  if (assignedVar) {
    mainBody = `${lines.join('\n')}\nputs ${assignedVar}.to_json`
  } else {
    const setup = lines.slice(0, -1)
    const lastExpr = lines[lines.length - 1]
    const prefix = setup.length ? `${setup.join('\n')}\n` : ''
    mainBody = `${prefix}puts (${lastExpr}).to_json`
  }

  return `require 'json'

${mainBody}
`
}

/**
 * Normalize Ruby output for comparison
 *
 * Ruby's `nil` becomes `null` in JSON, but JS uses `undefined` for "no value".
 * We normalize `null` → `undefined` when expected is `undefined` since they're
 * semantically equivalent (both mean "nothing here").
 */
function normalizeRubyOutput(output: string, expected?: string): string {
  let result = output.trim()

  // Ruby nil → JS undefined equivalence
  // Ruby's nil serializes to JSON "null", but our JS returns undefined
  if (result === 'null' && expected === 'undefined') {
    return 'undefined'
  }

  // Strip trailing .0 from floats for integer comparison
  if (/^-?\d+\.0$/.test(result)) {
    result = result.replace(/\.0$/, '')
  }
  return result
}

export const rubyHandler: LanguageHandler = {
  translate: jsToRuby,
  normalize: normalizeRubyOutput,
  skipList: RUBY_SKIP_LIST,
  dockerImage: RUBY_DOCKER_IMAGE,
  displayName: 'Ruby',
  version: '3.3',
  get parityValue() {
    return `${this.displayName} ${this.version}`
  },
  dockerCmd: (code: string) => ['ruby', '-e', code],
  mountRepo: false,
  upstreamSurface: {
    discover: discoverRubyUpstreamSurface,
    getLocutusEntry: (func) => {
      const methodInfo = RUBY_METHODS[func.name]
      return methodInfo
        ? {
            namespace: methodInfo.category,
            name: methodInfo.rubyMethod,
          }
        : {
            namespace: func.category,
            name: func.name,
          }
    },
  },
}
