/**
 * Lua language handler for verification
 */

import { runInDocker } from '../docker.ts'
import { extractAssignedVar } from '../runner.ts'
import type { LanguageHandler } from '../types.ts'

// Functions to skip (implementation differences, etc.)
export const LUA_SKIP_LIST = new Set<string>([
  // None currently
])

const LUA_DOCKER_IMAGE = 'nickblah/lua:5.4-alpine'

function discoverLuaUpstreamSurface() {
  const discoverNamespace = (namespace: 'math' | 'string', title: string) => {
    const script = `for key, value in pairs(${namespace}) do if type(value) == "function" then print(key) end end`
    const result = runInDocker(LUA_DOCKER_IMAGE, ['lua', '-e', script])
    if (!result.success) {
      throw new Error(result.error || `Unable to discover Lua upstream surface for ${namespace}`)
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
      target: 'Lua 5.4',
      sourceKind: 'runtime' as const,
      sourceRef: LUA_DOCKER_IMAGE,
      entries,
    }
  }

  return {
    language: 'lua',
    namespaces: [discoverNamespace('math', 'math library'), discoverNamespace('string', 'string library')],
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
 * Convert a single JS line to Lua
 */
function convertJsLineToLua(line: string, funcName: string, module: string): string {
  let lua = line.trim()
  if (!lua) {
    return ''
  }

  lua = stripTrailingComment(lua)
  lua = lua.replace(/;+$/, '')

  // Convert var/let/const to local
  lua = lua.replace(/^\s*(var|let|const)\s+/, 'local ')

  // JS → Lua conversions
  lua = lua.replace(/\btrue\b/g, 'true')
  lua = lua.replace(/\bfalse\b/g, 'false')
  lua = lua.replace(/\bnull\b/g, 'nil')
  lua = lua.replace(/\bundefined\b/g, 'nil')

  // JS special values → Lua
  lua = lua.replace(/\bInfinity\b/g, 'math.huge')
  lua = lua.replace(/\bNaN\b/g, '(0/0)')

  // Handle function calls - prefix with module.
  lua = lua.replace(new RegExp(`\\b${funcName}\\s*\\(`, 'g'), `${module}.${funcName}(`)

  return lua
}

/**
 * Convert JS example code to Lua
 */
function jsToLua(jsCode: string[], funcName: string, category?: string): string {
  const module = category || 'math'
  const lines = jsCode.map((line) => convertJsLineToLua(line, funcName, module)).filter(Boolean)
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
 * Normalize Lua output for comparison
 */
function normalizeLuaOutput(output: string, expected?: string): string {
  let result = output.trim()
  // Strip trailing .0 from floats for integer comparison
  if (/^-?\d+\.0$/.test(result)) {
    result = result.replace(/\.0$/, '')
  }
  // Normalize float precision differences (Lua prints fewer digits)
  // If both are floats, round to 10 decimal places for comparison
  if (expected && /^-?\d+\.\d+$/.test(expected) && /^-?\d+\.\d+$/.test(result)) {
    const expectedNum = parseFloat(expected)
    const resultNum = parseFloat(result)
    if (Math.abs(expectedNum - resultNum) < 1e-10) {
      result = expected // Use expected if values match within precision
    }
  }
  // If expected is a quoted string, wrap the native output in quotes
  // Lua print() outputs strings without quotes, but JS JSON.stringify adds them
  if (expected && /^".*"$/.test(expected) && !/^".*"$/.test(result)) {
    result = `"${result}"`
  }
  return result
}

export const luaHandler: LanguageHandler = {
  translate: jsToLua,
  normalize: normalizeLuaOutput,
  skipList: LUA_SKIP_LIST,
  dockerImage: LUA_DOCKER_IMAGE,
  displayName: 'Lua',
  version: '5.4',
  get parityValue() {
    return `${this.displayName} ${this.version}`
  },
  dockerCmd: (code: string) => ['lua', '-e', code],
  mountRepo: false,
  upstreamSurface: {
    discover: discoverLuaUpstreamSurface,
    getLocutusEntry: (func) => ({
      namespace: func.category,
      name: func.name,
    }),
  },
}
