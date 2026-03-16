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

const LUA_PARITY_PRELUDE = `
local function locutus_escape_json_string(value)
  local replacements = {
    ['"'] = '\\"',
    ['\\\\'] = '\\\\\\\\',
    ['\\b'] = '\\\\b',
    ['\\f'] = '\\\\f',
    ['\\n'] = '\\\\n',
    ['\\r'] = '\\\\r',
    ['\\t'] = '\\\\t',
  }

  return '"' .. value:gsub('[%z\\1-\\31\\\\"]', function(char)
    return replacements[char] or string.format('\\\\u%04x', string.byte(char))
  end) .. '"'
end

local function locutus_json(value)
  local kind = type(value)

  if kind == "nil" then
    return "null"
  end

  if kind == "boolean" or kind == "number" then
    return tostring(value)
  end

  if kind == "string" then
    return locutus_escape_json_string(value)
  end

  if kind == "table" then
    local parts = {}
    for i = 1, #value do
      parts[#parts + 1] = locutus_json(value[i])
    end
    return "[" .. table.concat(parts, ",") .. "]"
  end

  return string.format("%q", tostring(value))
end
`.trim()

function normalizeLuaJsonValue(value: unknown, expected: unknown): unknown {
  if (typeof value === 'number' && typeof expected === 'number') {
    return Math.abs(value - expected) < 1e-10 ? expected : value
  }

  if (Array.isArray(value) && Array.isArray(expected) && value.length === expected.length) {
    return value.map((item, index) => normalizeLuaJsonValue(item, expected[index]))
  }

  if (
    value &&
    expected &&
    typeof value === 'object' &&
    typeof expected === 'object' &&
    !Array.isArray(value) &&
    !Array.isArray(expected)
  ) {
    const normalized: Record<string, unknown> = {}
    for (const key of Object.keys(value as Record<string, unknown>)) {
      normalized[key] = normalizeLuaJsonValue(
        (value as Record<string, unknown>)[key],
        (expected as Record<string, unknown>)[key],
      )
    }
    return normalized
  }

  return value
}

function discoverLuaUpstreamSurface() {
  const discoverNamespace = (namespace: 'math' | 'string' | 'table', title: string) => {
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
    namespaces: [
      discoverNamespace('math', 'math library'),
      discoverNamespace('string', 'string library'),
      discoverNamespace('table', 'table library'),
    ],
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
    const setup = lines.slice(0, -1)
    const lastLine = lines[lines.length - 1] ?? ''
    if (funcName === 'gsub') {
      const assignmentMatch = lastLine.match(/^(local\s+)?([A-Za-z_][\w]*)\s*=\s*(.+)$/)
      if (assignmentMatch?.[2] && assignmentMatch[3]) {
        const prefix = setup.length ? `${setup.join('\n')}\n` : ''
        result = `${prefix}local ${assignmentMatch[2]} = {${assignmentMatch[3]}}\nprint(locutus_json(${assignmentMatch[2]}))`
      } else {
        result = `${lines.join('\n')}\nprint(locutus_json(${assignedVar}))`
      }
    } else {
      result = `${lines.join('\n')}\nprint(locutus_json(${assignedVar}))`
    }
  } else {
    const setup = lines.slice(0, -1)
    const lastExpr = lines[lines.length - 1]
    const prefix = setup.length ? `${setup.join('\n')}\n` : ''
    const valueExpression = funcName === 'gsub' ? `{${lastExpr}}` : lastExpr
    result = `${prefix}print(locutus_json(${valueExpression}))`
  }

  return `${LUA_PARITY_PRELUDE}\n\n${result}`
}

/**
 * Normalize Lua output for comparison
 */
export function normalizeLuaOutput(output: string, expected?: string): string {
  let result = output.trim()
  try {
    const parsed = JSON.parse(result)
    if (expected) {
      try {
        const parsedExpected = JSON.parse(expected)
        return JSON.stringify(normalizeLuaJsonValue(parsed, parsedExpected))
      } catch {
        // Fall back to normalized parsed output when expected is not JSON-parseable.
      }
    }
    return JSON.stringify(parsed)
  } catch {
    const repaired = result.replace(/\\\r?\n/g, '\\n')
    if (repaired !== result) {
      try {
        const parsed = JSON.parse(repaired)
        if (expected) {
          try {
            const parsedExpected = JSON.parse(expected)
            return JSON.stringify(normalizeLuaJsonValue(parsed, parsedExpected))
          } catch {
            // Fall back to normalized parsed output when expected is not JSON-parseable.
          }
        }
        return JSON.stringify(parsed)
      } catch {
        // Keep legacy scalar normalization for non-JSON output.
      }
    }
  }
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
