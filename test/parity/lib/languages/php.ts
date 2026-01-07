/**
 * PHP language handler for verification
 */

import { extractAssignedVar } from '../runner.ts'
import type { LanguageHandler } from '../types.ts'

// Functions removed, deprecated, or unavailable in PHP 8.3 Docker image
export const PHP_SKIP_LIST = new Set([
  // Removed in PHP 8.0
  'convert_cyr_string',
  'money_format',
  // Removed in PHP 7.0
  'split',
  'spliti',
  'ereg',
  'eregi',
  'ereg_replace',
  'eregi_replace',
  // Deprecated in PHP 8.2 (emit warnings that pollute output)
  'utf8_encode',
  'utf8_decode',
  // PECL extensions not available in standard PHP Docker image
  'xdiff_string_diff',
  'xdiff_string_patch',
  // PHP language constructs (not callable as functions)
  'echo',
])

// PHP constants that should not be quoted when passed as string arguments
const PHP_CONSTANTS = new Set([
  'ENT_QUOTES',
  'ENT_COMPAT',
  'ENT_NOQUOTES',
  'ENT_HTML401',
  'ENT_HTML5',
  'ENT_XHTML',
  'ENT_XML1',
  'ENT_DISALLOWED',
  'ENT_SUBSTITUTE',
  'ENT_IGNORE',
  'HTML_ENTITIES',
  'HTML_SPECIALCHARS',
  'SORT_REGULAR',
  'SORT_NUMERIC',
  'SORT_STRING',
  'SORT_LOCALE_STRING',
  'SORT_NATURAL',
  'SORT_FLAG_CASE',
  'STR_PAD_LEFT',
  'STR_PAD_RIGHT',
  'STR_PAD_BOTH',
  'CASE_LOWER',
  'CASE_UPPER',
  'PREG_PATTERN_ORDER',
  'PREG_SET_ORDER',
  'PREG_OFFSET_CAPTURE',
  'PREG_SPLIT_NO_EMPTY',
  'PREG_SPLIT_DELIM_CAPTURE',
])

// JS globals that have static methods (should not be converted to $var['prop'])
const JS_STATIC_CLASSES = new Set(['String', 'Array', 'Object', 'Number', 'Math', 'Date', 'JSON', 'RegExp', 'Boolean'])

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
 * Convert object literal to PHP array syntax
 */
function convertObjectLiteral(segment: string): string {
  let converted = segment
  // Match object literals and convert to PHP arrays
  converted = converted.replace(/\{([\s\S]*?)\}/g, (_full, inner) => {
    let body = inner.trim()
    // Quote unquoted object keys: key: value -> 'key' => value
    // Handle keys at start of object or after comma
    body = body.replace(/(?:^|,)\s*([A-Za-z_][\w]*)\s*:/g, (match, key) => {
      const prefix = match.startsWith(',') ? ', ' : ''
      return `${prefix}'${key}' =>`
    })
    // Convert remaining colons to arrows (for already quoted keys)
    body = body.replace(/(['"])\s*:/g, '$1 =>')
    return `[${body}]`
  })
  return converted
}

/**
 * Convert property access outside of string literals
 */
function convertPropertyAccess(line: string): string {
  // Split into string and non-string segments
  const segments: { text: string; isString: boolean }[] = []
  let current = ''
  let inString: string | null = null
  let escaped = false

  for (let i = 0; i < line.length; i++) {
    const char = line[i]

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
        segments.push({ text: current, isString: true })
        current = ''
        inString = null
      }
    } else {
      if (char === '"' || char === "'") {
        if (current) {
          segments.push({ text: current, isString: false })
        }
        current = char
        inString = char
      } else {
        current += char
      }
    }
  }
  if (current) {
    segments.push({ text: current, isString: !!inString })
  }

  // Only convert property access in non-string segments
  return segments
    .map((seg) => {
      if (seg.isString) {
        return seg.text
      }
      return seg.text.replace(/\b([A-Za-z_][\w$]*)\.([\w]+)\b/g, (_m, obj, prop) => {
        if (JS_STATIC_CLASSES.has(obj)) {
          return _m
        }
        const varName = obj.startsWith('$') ? obj : `$${obj}`
        return `${varName}['${prop}']`
      })
    })
    .join('')
}

/**
 * Convert a single JS line to PHP
 */
function convertJsLineToPhp(line: string): string {
  let php = line.trim()
  if (!php) {
    return ''
  }

  // Strip trailing JS comments before conversion
  php = stripTrailingComment(php)

  // Strip trailing semicolons (we add them when building the full PHP)
  php = php.replace(/;+$/, '')

  php = php.replace(/^\s*(var|let|const)\s+/, '')

  // JS static method conversions to PHP equivalents
  php = php.replace(/String\.fromCharCode\s*\(/g, 'chr(')
  php = php.replace(/Array\.isArray\s*\(/g, 'is_array(')
  php = php.replace(/Math\.floor\s*\(/g, 'floor(')
  php = php.replace(/Math\.ceil\s*\(/g, 'ceil(')
  php = php.replace(/Math\.round\s*\(/g, 'round(')
  php = php.replace(/Math\.abs\s*\(/g, 'abs(')
  php = php.replace(/Math\.min\s*\(/g, 'min(')
  php = php.replace(/Math\.max\s*\(/g, 'max(')
  php = php.replace(/Math\.pow\s*\(/g, 'pow(')
  php = php.replace(/Math\.sqrt\s*\(/g, 'sqrt(')
  php = php.replace(/parseInt\s*\(/g, 'intval(')
  php = php.replace(/parseFloat\s*\(/g, 'floatval(')

  php = php.replace(/(\$?[A-Za-z_][\w$]*)\.length\b/g, (_m, name) => `count(${name})`)
  php = php.replace(/\bundefined\b/g, 'null')
  php = php.replace(/\bnull\b/g, 'null')
  php = php.replace(/\btrue\b/g, 'true')
  php = php.replace(/\bfalse\b/g, 'false')

  // Convert quoted PHP constants to bare constants
  // e.g., 'ENT_QUOTES' or "ENT_QUOTES" → ENT_QUOTES
  php = php.replace(/(['"])([A-Z][A-Z0-9_]+)\1/g, (_m, _q, name) => {
    if (PHP_CONSTANTS.has(name)) {
      return name
    }
    return _m
  })

  php = convertPropertyAccess(php)
  php = convertObjectLiteral(php)
  php = php.replace(/\$([A-Za-z_][\w]*)\s*=>/g, "'$1' =>")
  php = php.replace(/\{\s*\}/g, '[]')
  // biome-ignore lint/suspicious/noControlCharactersInRegex: intentional CR/LF matching
  php = php.replace(/\u000d/g, '\\r').replace(/\u000a/g, '\\n')

  return php
}

/**
 * Convert JS example code to PHP
 */
function jsToPhp(jsCode: string[], _funcName: string): string {
  const lines = jsCode.map((line) => convertJsLineToPhp(line)).filter(Boolean)
  if (!lines.length) {
    return ''
  }

  const originalLastLine = jsCode[jsCode.length - 1]
  const assignedVar = extractAssignedVar(originalLastLine)

  let result: string
  if (assignedVar) {
    result = `${lines.join(';\n')};\necho json_encode(${assignedVar});`
  } else {
    const setup = lines.slice(0, -1)
    const lastExpr = lines[lines.length - 1]
    const prefix = setup.length ? `${setup.join(';\n')};\n` : ''
    result = `${prefix}echo json_encode(${lastExpr});`
  }

  return result
}

/**
 * Strip PHP warnings, notices, and deprecation messages from output
 */
function stripPhpWarnings(output: string): string {
  const lines = output.split('\n')
  const cleanLines = lines.filter((line) => {
    const trimmed = line.trim()
    // Skip warning/notice/deprecated lines
    if (trimmed.startsWith('Warning:')) {
      return false
    }
    if (trimmed.startsWith('Notice:')) {
      return false
    }
    if (trimmed.startsWith('Deprecated:')) {
      return false
    }
    if (trimmed.startsWith('PHP Warning:')) {
      return false
    }
    if (trimmed.startsWith('PHP Notice:')) {
      return false
    }
    if (trimmed.startsWith('PHP Deprecated:')) {
      return false
    }
    return true
  })
  return cleanLines.join('\n').trim()
}

/**
 * Normalize PHP output for comparison
 */
function normalizePhpOutput(output: string): string {
  // Strip warnings first
  let result = stripPhpWarnings(output)
  // Unescape forward slashes (PHP's json_encode escapes / as \/)
  result = result.trim().replace(/\\\//g, '/')
  return result
}

export const phpHandler: LanguageHandler = {
  translate: jsToPhp,
  normalize: normalizePhpOutput,
  skipList: PHP_SKIP_LIST,
  // Pin to specific digest to ensure consistent PHP version across all environments
  // PHP 8.3.29 - strcmp returns -1/0/1 (changed in PHP 8.0)
  dockerImage: 'php@sha256:923d8c7f348a16137f879b6f49589f00e104bf3b2bbf7d22f03430fea0fc5f67',
  version: '8.3',
  dockerCmd: (code: string) => ['php', '-r', code],
  mountRepo: true,
}
