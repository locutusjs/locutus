/**
 * JavaScript execution utilities for verification
 */

import { createRequire } from 'node:module'
import vm from 'node:vm'
import type { Example } from './types.ts'

const require = createRequire(import.meta.url)

/**
 * Normalize JS value to JSON string for comparison
 */
export function normalizeJsResult(value: unknown): string {
  const json = JSON.stringify(value)
  return json === undefined ? 'undefined' : json
}

/**
 * Create a VM context with common globals
 */
export function createBaseContext(extra: Record<string, unknown> = {}): vm.Context {
  return vm.createContext({
    JSON,
    Math,
    Date,
    RegExp,
    Number,
    String,
    Boolean,
    Array,
    Object,
    Buffer,
    ...extra,
  })
}

/**
 * Extract variable name from assignment (e.g., "var foo = ..." → "foo")
 */
export function extractAssignedVar(line: string): string | null {
  const match = line.match(/^\s*(?:var|let|const)?\s*(\$?[A-Za-z_][\w$]*)\s*=/)
  return match ? match[1] : null
}

/**
 * Evaluate expected value expression
 */
export function evaluateExpected(expectedRaw: string): { success: boolean; result: string; error?: string } {
  try {
    const context = createBaseContext()
    // Wrap object literals in parentheses to make them expressions, not blocks
    // e.g., {key: value} -> ({key: value})
    let code = expectedRaw.trim()
    if (code.startsWith('{') && !code.startsWith('{"')) {
      code = `(${code})`
    }
    const value = vm.runInContext(code, context)
    return { success: true, result: normalizeJsResult(value) }
  } catch (e) {
    return { success: false, result: '', error: String(e) }
  }
}

/**
 * Run JS implementation and get result
 */
export function runJs(
  filePath: string,
  funcName: string,
  example: Example,
): { success: boolean; result: string; error?: string } {
  try {
    // Dynamic import the function
    const func = require(filePath)
    const context = createBaseContext({ [funcName]: func })

    const lastLine = example.code[example.code.length - 1] || ''
    const assignedVar = extractAssignedVar(lastLine)

    if (assignedVar) {
      vm.runInContext(example.code.join('\n'), context)
      return { success: true, result: normalizeJsResult(context[assignedVar]) }
    }

    const setup = example.code.slice(0, -1).join('\n')
    if (setup.trim()) {
      vm.runInContext(setup, context)
    }
    const result = vm.runInContext(lastLine, context)
    return { success: true, result: normalizeJsResult(result) }
  } catch (e) {
    return { success: false, result: '', error: String(e) }
  }
}
