/**
 * Ruby language handler for verification
 */

import { extractAssignedVar } from '../runner.ts'
import type { LanguageHandler } from '../types.ts'

// Ruby method mapping: JS function name → Ruby method name and category
interface RubyMethodInfo {
  rubyMethod: string
  category: 'String' | 'Array' | 'Math'
  isInstanceMethod: boolean // true for str.method, false for Module.method(arg)
}

const RUBY_METHODS: Record<string, RubyMethodInfo> = {
  // String methods (instance methods on String)
  capitalize: { rubyMethod: 'capitalize', category: 'String', isInstanceMethod: true },
  chomp: { rubyMethod: 'chomp', category: 'String', isInstanceMethod: true },
  chop: { rubyMethod: 'chop', category: 'String', isInstanceMethod: true },
  downcase: { rubyMethod: 'downcase', category: 'String', isInstanceMethod: true },
  end_with: { rubyMethod: 'end_with?', category: 'String', isInstanceMethod: true },
  include: { rubyMethod: 'include?', category: 'String', isInstanceMethod: true },
  length: { rubyMethod: 'length', category: 'String', isInstanceMethod: true },
  reverse: { rubyMethod: 'reverse', category: 'String', isInstanceMethod: true },
  start_with: { rubyMethod: 'start_with?', category: 'String', isInstanceMethod: true },
  strip: { rubyMethod: 'strip', category: 'String', isInstanceMethod: true },
  upcase: { rubyMethod: 'upcase', category: 'String', isInstanceMethod: true },
  // Array methods (instance methods on Array)
  compact: { rubyMethod: 'compact', category: 'Array', isInstanceMethod: true },
  first: { rubyMethod: 'first', category: 'Array', isInstanceMethod: true },
  flatten: { rubyMethod: 'flatten', category: 'Array', isInstanceMethod: true },
  last: { rubyMethod: 'last', category: 'Array', isInstanceMethod: true },
  sample: { rubyMethod: 'sample', category: 'Array', isInstanceMethod: true },
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

    const firstArg = args[0].trim()
    const restArgs = args.slice(1)

    if (methodInfo.isInstanceMethod) {
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
      const receiver = args[0].trim()
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
  dockerImage: 'ruby:3.3',
  displayName: 'Ruby',
  version: '3.3',
  get parityValue() {
    return `${this.displayName} ${this.version}`
  },
  dockerCmd: (code: string) => ['ruby', '-e', code],
  mountRepo: false,
}
