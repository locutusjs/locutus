/**
 * Lua language handler for verification
 */

import { extractAssignedVar } from '../runner.ts'
import type { LanguageHandler } from '../types.ts'

// Functions to skip (implementation differences, etc.)
export const LUA_SKIP_LIST = new Set<string>([
  // None currently
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
function normalizeLuaOutput(output: string, _expected?: string): string {
  let result = output.trim()
  // Strip trailing .0 from floats for integer comparison
  if (/^-?\d+\.0$/.test(result)) {
    result = result.replace(/\.0$/, '')
  }
  return result
}

export const luaHandler: LanguageHandler = {
  translate: jsToLua,
  normalize: normalizeLuaOutput,
  skipList: LUA_SKIP_LIST,
  dockerImage: 'nickblah/lua:5.4-alpine',
  displayName: 'Lua',
  version: '5.4',
  get parityValue() {
    return `${this.displayName} ${this.version}`
  },
  dockerCmd: (code: string) => ['lua', '-e', code],
  mountRepo: false,
}
