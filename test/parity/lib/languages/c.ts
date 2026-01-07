/**
 * C language handler for verification
 */

import { extractAssignedVar } from '../runner.ts'
import type { LanguageHandler } from '../types.ts'

// C function mapping: JS function name → C function info
interface CFunctionInfo {
  header: string // e.g., 'ctype.h', 'string.h'
  cFunc: string // C function name
  returnType: 'bool' | 'int' | 'double' | 'string' | 'char'
}

const C_FUNCTIONS: Record<string, CFunctionInfo> = {
  // ctype.h functions (return int, non-zero = true)
  isalnum: { header: 'ctype.h', cFunc: 'isalnum', returnType: 'bool' },
  isalpha: { header: 'ctype.h', cFunc: 'isalpha', returnType: 'bool' },
  isdigit: { header: 'ctype.h', cFunc: 'isdigit', returnType: 'bool' },
  islower: { header: 'ctype.h', cFunc: 'islower', returnType: 'bool' },
  isupper: { header: 'ctype.h', cFunc: 'isupper', returnType: 'bool' },
  isspace: { header: 'ctype.h', cFunc: 'isspace', returnType: 'bool' },
  tolower: { header: 'ctype.h', cFunc: 'tolower', returnType: 'char' },
  toupper: { header: 'ctype.h', cFunc: 'toupper', returnType: 'char' },
  // stdlib.h functions
  atoi: { header: 'stdlib.h', cFunc: 'atoi', returnType: 'int' },
  atof: { header: 'stdlib.h', cFunc: 'atof', returnType: 'double' },
  abs: { header: 'stdlib.h', cFunc: 'abs', returnType: 'int' },
  // string.h functions
  strlen: { header: 'string.h', cFunc: 'strlen', returnType: 'int' },
  strcmp: { header: 'string.h', cFunc: 'strcmp', returnType: 'int' },
  strchr: { header: 'string.h', cFunc: 'strchr', returnType: 'string' },
  strstr: { header: 'string.h', cFunc: 'strstr', returnType: 'string' },
  strcat: { header: 'string.h', cFunc: 'strcat', returnType: 'string' },
  // math.h functions
  frexp: { header: 'math.h', cFunc: 'frexp', returnType: 'double' },
}

// Functions to skip
export const C_SKIP_LIST = new Set<string>([
  // sprintf has complex format string handling that differs between JS and C
  'sprintf',
  // strchr returns pointer or NULL - complex to map to JS null
  'strchr',
  // strstr returns pointer or NULL - complex to map to JS null
  'strstr',
  // strcat modifies in place, needs buffer setup
  'strcat',
  // frexp returns multiple values (via pointer) - complex to test
  'frexp',
  // JS isspace handles strings, C only handles single char
  'isspace',
  // JS abs handles strings and floats, C abs only handles int
  'abs',
  // atof output format differs (scientific notation vs decimal)
  'atof',
])

/**
 * Convert JS string literal to C - handles single to double quotes
 */
function convertString(str: string): string {
  // If it's a single-quoted string, convert to double quotes for C
  if (str.startsWith("'") && str.endsWith("'")) {
    const inner = str.slice(1, -1)
    // For single character strings in ctype functions, use character literal
    if (inner.length === 1 && !inner.includes('\\')) {
      return `'${inner}'`
    }
    return `"${inner.replace(/"/g, '\\"')}"`
  }
  return str
}

/**
 * Parse function arguments
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
 * Convert a JS function call to C
 */
function convertFunctionCall(code: string, funcName: string, funcInfo: CFunctionInfo): string {
  const funcCallRegex = new RegExp(`\\b${funcName}\\s*\\(([^)]+)\\)`, 'g')

  return code.replace(funcCallRegex, (_match, argsStr) => {
    const args = parseArguments(argsStr)
    const convertedArgs = args.map((arg) => convertString(arg.trim()))
    return `${funcInfo.cFunc}(${convertedArgs.join(', ')})`
  })
}

/**
 * Strip trailing JS comments
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
 * Convert JS example code to C program
 */
function jsToC(jsCode: string[], funcName: string): string {
  const funcInfo = C_FUNCTIONS[funcName]
  if (!funcInfo) {
    return ''
  }

  // Collect needed headers
  const headers = new Set<string>(['stdio.h', funcInfo.header])
  if (funcInfo.returnType === 'bool') {
    headers.add('stdbool.h')
  }

  // Process lines
  const processedLines: string[] = []
  let lastExpr = ''

  for (const line of jsCode) {
    let processed = line.trim()
    if (!processed) {
      continue
    }

    processed = stripTrailingComment(processed)
    processed = processed.replace(/;+$/, '')
    processed = processed.replace(/^\s*(var|let|const)\s+/, '')

    // Convert function calls
    processed = convertFunctionCall(processed, funcName, funcInfo)

    // Convert JS true/false to C
    processed = processed.replace(/\btrue\b/g, '1')
    processed = processed.replace(/\bfalse\b/g, '0')

    processedLines.push(processed)
    lastExpr = processed
  }

  const assignedVar = extractAssignedVar(jsCode[jsCode.length - 1])

  // Build the main body lines
  const bodyLines: string[] = []
  const setup = processedLines.slice(0, -1)
  for (const line of setup) {
    bodyLines.push(`  ${line};`)
  }

  if (assignedVar) {
    // Has assignment - declare variable and print it
    let varType: string
    if (funcInfo.returnType === 'bool' || funcInfo.returnType === 'int' || funcInfo.returnType === 'char') {
      varType = 'int'
    } else if (funcInfo.returnType === 'double') {
      varType = 'double'
    } else {
      varType = 'char*'
    }
    bodyLines.push(`  ${varType} ${lastExpr};`)

    // Print based on type - char is quoted to match JS string output
    if (funcInfo.returnType === 'bool') {
      bodyLines.push(`  printf(${assignedVar} ? "true" : "false");`)
    } else if (funcInfo.returnType === 'int') {
      bodyLines.push(`  printf("%d", ${assignedVar});`)
    } else if (funcInfo.returnType === 'double') {
      bodyLines.push(`  printf("%g", ${assignedVar});`)
    } else if (funcInfo.returnType === 'char') {
      // JS returns a quoted string like "a", so we print with quotes
      bodyLines.push(`  printf("\\"%c\\"", ${assignedVar});`)
    } else {
      bodyLines.push(`  printf("%s", ${assignedVar});`)
    }
  } else {
    // Direct expression - print it
    if (funcInfo.returnType === 'bool') {
      bodyLines.push(`  printf((${lastExpr}) ? "true" : "false");`)
    } else if (funcInfo.returnType === 'int') {
      bodyLines.push(`  printf("%d", ${lastExpr});`)
    } else if (funcInfo.returnType === 'double') {
      bodyLines.push(`  printf("%g", ${lastExpr});`)
    } else if (funcInfo.returnType === 'char') {
      // JS returns a quoted string like "a", so we print with quotes
      bodyLines.push(`  printf("\\"%c\\"", ${lastExpr});`)
    } else {
      bodyLines.push(`  printf("%s", ${lastExpr});`)
    }
  }

  bodyLines.push('  return 0;')

  const includeLines = Array.from(headers).map((h) => `#include <${h}>`)

  return [...includeLines, '', 'int main() {', ...bodyLines, '}', ''].join('\n')
}

/**
 * Normalize C output for comparison
 */
function normalizeCOutput(output: string, expected?: string): string {
  const result = output.trim()

  // C strcmp returns platform-dependent values for ordering
  // Normalize to -1/0/1 like our JS implementation
  if (expected === '-1' || expected === '0' || expected === '1') {
    const num = parseInt(result, 10)
    if (!isNaN(num)) {
      if (num < 0) {
        return '-1'
      }
      if (num > 0) {
        return '1'
      }
      return '0'
    }
  }

  return result
}

export const cHandler: LanguageHandler = {
  translate: jsToC,
  normalize: normalizeCOutput,
  skipList: C_SKIP_LIST,
  dockerImage: 'gcc:14',
  displayName: 'C',
  version: '23',
  get parityValue() {
    return `${this.displayName} ${this.version}`
  },
  dockerCmd: (code: string) => {
    // Use base64 to safely pass code with special characters
    const base64Code = Buffer.from(code).toString('base64')
    return [
      'sh',
      '-c',
      `echo '${base64Code}' | base64 -d > /tmp/test.c && gcc -std=c23 -o /tmp/test /tmp/test.c -lm 2>&1 && /tmp/test`,
    ]
  },
  mountRepo: false,
}
