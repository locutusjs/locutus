/**
 * Perl language handler for verification
 */

import { extractAssignedVar } from '../runner.ts'
import type { LanguageHandler } from '../types.ts'

// Functions to skip (implementation differences, etc.)
export const PERL_SKIP_LIST = new Set<string>([
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
        // Found // outside of string - strip from here
        return code.slice(0, i).trim()
      }
    }
  }

  return code
}

/**
 * Convert a single JS line to Perl
 * @param line - The JS line to convert
 * @param funcName - The function name (e.g., "ceil")
 * @param module - The Perl module (inferred from category, e.g., "POSIX")
 */
function convertJsLineToPerl(line: string, funcName: string, module: string): string {
  let pl = line.trim()
  if (!pl) {
    return ''
  }

  pl = stripTrailingComment(pl)
  pl = pl.replace(/;+$/, '')

  // Convert var/let/const to my
  pl = pl.replace(/^\s*(var|let|const)\s+/, 'my $')

  // JS → Perl boolean/null conversions
  pl = pl.replace(/\btrue\b/g, '1')
  pl = pl.replace(/\bfalse\b/g, '0')
  pl = pl.replace(/\bnull\b/g, 'undef')
  pl = pl.replace(/\bundefined\b/g, 'undef')

  // JS special values → Perl
  pl = pl.replace(/\bInfinity\b/g, '9**9**9')
  pl = pl.replace(/\bNaN\b/g, "'NaN'")

  // Handle function calls - prefix with module (unless core built-in)
  // Core built-ins like length don't need module prefix
  if (module !== 'core') {
    pl = pl.replace(new RegExp(`\\b${funcName}\\s*\\(`, 'g'), `${module}::${funcName}(`)
  }

  return pl
}

/**
 * Convert JS example code to Perl
 * @param jsCode - Array of JS code lines
 * @param funcName - The function name (e.g., "ceil")
 * @param category - The category/directory (e.g., "POSIX") - used as Perl module name
 */
function jsToPerl(jsCode: string[], funcName: string, category?: string): string {
  const module = category || 'POSIX'
  const lines = jsCode.map((line) => convertJsLineToPerl(line, funcName, module)).filter(Boolean)
  if (!lines.length) {
    return ''
  }

  // Use the module - no JSON needed for simple values
  // Core built-ins don't need a use statement
  const imports = module !== 'core' ? `use ${module};\n` : ''

  const originalLastLine = jsCode[jsCode.length - 1]
  const assignedVar = extractAssignedVar(originalLastLine)

  let result: string
  if (assignedVar) {
    result = `${imports}${lines.join(';\n')};\nprint $${assignedVar};`
  } else {
    const setup = lines.slice(0, -1)
    const lastExpr = lines[lines.length - 1]
    const prefix = setup.length ? `${setup.join(';\n')};\n` : ''
    result = `${prefix}${imports}print ${lastExpr};`
  }

  return result
}

/**
 * Normalize Perl output for comparison
 */
function normalizePerlOutput(output: string, _expected?: string): string {
  let result = output.trim()
  // Strip trailing .0 from floats for integer comparison
  if (/^-?\d+\.0*$/.test(result)) {
    result = result.replace(/\.0*$/, '')
  }
  return result
}

export const perlHandler: LanguageHandler = {
  translate: jsToPerl,
  normalize: normalizePerlOutput,
  skipList: PERL_SKIP_LIST,
  dockerImage: 'perl:5.40',
  displayName: 'Perl',
  version: '5.40',
  get parityValue() {
    return `${this.displayName} ${this.version}`
  },
  dockerCmd: (code: string) => ['perl', '-e', code],
  mountRepo: false,
}
