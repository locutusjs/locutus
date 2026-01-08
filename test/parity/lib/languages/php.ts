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
 * Convert JS Unicode escape sequence to actual character
 * \uXXXX -> actual Unicode character
 */
function convertUnicodeEscape(hex: string): string {
  return String.fromCharCode(parseInt(hex, 16))
}

/**
 * Convert JS single-quoted strings with escape sequences to PHP double-quoted strings
 * In JS, 'hello\nworld' interprets \n as newline
 * In PHP, 'hello\nworld' is literal backslash-n (no escape interpretation)
 * So we need to convert to double quotes when escape sequences are present
 *
 * Also handles Unicode escapes like \uXXXX by converting to actual characters
 */
function convertJsStringsToPhp(code: string): string {
  let result = ''
  let i = 0

  while (i < code.length) {
    // Skip double-quoted strings (don't process them)
    if (code[i] === '"') {
      result += code[i]
      i++
      while (i < code.length && code[i] !== '"') {
        if (code[i] === '\\' && i + 1 < code.length) {
          result += code[i] + code[i + 1]
          i += 2
        } else {
          result += code[i]
          i++
        }
      }
      if (i < code.length) {
        result += code[i] // closing quote
        i++
      }
      continue
    }

    // Check for single-quoted string
    if (code[i] === "'") {
      let str = ''
      i++
      let hasEscapeSequence = false
      let hasUnicodeEscape = false

      while (i < code.length) {
        if (code[i] === '\\' && i + 1 < code.length) {
          const nextChar = code[i + 1]
          // Handle escaped single quote - don't end string
          if (nextChar === "'") {
            str += "\\'"
            i += 2
            continue
          }
          // Check for Unicode escape sequence \uXXXX
          if (nextChar === 'u' && i + 5 < code.length) {
            const hex = code.slice(i + 2, i + 6)
            if (/^[0-9A-Fa-f]{4}$/.test(hex)) {
              // Convert Unicode escape to actual character
              str += convertUnicodeEscape(hex)
              i += 6
              hasUnicodeEscape = true
              continue
            }
          }
          // Check for common escape sequences that need double quotes in PHP
          if ('nrtv0\\'.includes(nextChar)) {
            hasEscapeSequence = true
          }
          str += code[i] + code[i + 1]
          i += 2
        } else if (code[i] === "'") {
          // End of string
          break
        } else {
          str += code[i]
          i++
        }
      }
      i++ // skip closing quote

      // If the string has escape sequences, convert to double quotes
      if (hasEscapeSequence || hasUnicodeEscape) {
        // Escape any existing double quotes in content, and convert \' to just '
        let escapedContent = str.replace(/(?<!\\)"/g, '\\"')
        escapedContent = escapedContent.replace(/\\'/g, "'") // In double quotes, ' doesn't need escaping
        result += '"' + escapedContent + '"'
      } else {
        result += "'" + str + "'"
      }
    } else {
      result += code[i]
      i++
    }
  }

  return result
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

  // Convert JS single-quoted strings with escapes to PHP double-quoted
  php = convertJsStringsToPhp(php)

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
 *
 * Handles platform-dependent behavior of comparison functions like strcmp.
 * PHP's strcmp returns platform-dependent values (character difference on some
 * platforms, -1/0/1 on others) due to underlying C memcmp differences.
 * See: https://github.com/php/php-src/issues/17119
 *
 * When expected is -1, 0, or 1 (comparison result), we normalize PHP's output
 * to match by converting any positive to 1 and any negative to -1.
 */
function normalizePhpOutput(output: string, expected?: string): string {
  // Strip warnings first
  let result = stripPhpWarnings(output)
  // Unescape forward slashes (PHP's json_encode escapes / as \/)
  result = result.trim().replace(/\\\//g, '/')

  // Normalize strcmp-like results when expected is a comparison value (-1, 0, 1)
  // Only applies when expected is explicitly a comparison result
  if (expected === '1' || expected === '-1' || expected === '0') {
    const intMatch = result.match(/^-?\d+$/)
    if (intMatch) {
      const num = Number.parseInt(result, 10)
      if (num > 0) {
        return '1'
      }
      if (num < 0) {
        return '-1'
      }
      return '0'
    }
  }

  return result
}

export const phpHandler: LanguageHandler = {
  translate: jsToPhp,
  normalize: normalizePhpOutput,
  skipList: PHP_SKIP_LIST,
  dockerImage: 'php:8.3-cli',
  displayName: 'PHP',
  version: '8.3',
  get parityValue() {
    return `${this.displayName} ${this.version}`
  },
  dockerCmd: (code: string) => ['php', '-r', code],
  mountRepo: true,
}
