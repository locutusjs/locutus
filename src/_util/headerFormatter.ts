/**
 * Header formatter for locutus function files
 *
 * Ensures all header comment keys are vertically aligned with colons at a consistent position.
 */

import fs from 'node:fs'
import path from 'node:path'
import { isValidHeaderKey } from './headerSchema.ts'

type ParsedLine = { isHeader: false } | { isHeader: true; key: string; value: string }

interface FormatResult {
  formatted: string
  changed: boolean
}

interface CheckResult {
  ok: boolean
  filepath: string
}

interface FormatFileResult {
  changed: boolean
  filepath: string
}

interface CheckAllResult {
  ok: boolean
  badFiles: string[]
}

interface FormatAllResult {
  formattedCount: number
  files: string[]
}

function globFiles(patterns: string | string[]): string[] {
  const patternList = Array.isArray(patterns) ? patterns : [patterns]
  const includes = patternList.filter((pattern) => !pattern.startsWith('!'))
  const excludes = patternList.filter((pattern) => pattern.startsWith('!')).map((pattern) => pattern.slice(1))
  const files = new Set<string>()

  for (const pattern of includes) {
    for (const file of fs.globSync(pattern)) {
      if (excludes.some((exclude) => path.matchesGlob(file, exclude))) {
        continue
      }
      files.add(file)
    }
  }

  return Array.from(files).sort()
}

/**
 * Parse a header line to extract key and value
 */
export function parseHeaderLine(line: string): ParsedLine {
  const match = line.match(/^ {2}\/\/\s*([a-z][a-z 0-9]*?):\s*(.*)$/)
  if (!match) {
    return { isHeader: false }
  }

  const [, key, value] = match
  if (typeof key === 'undefined' || typeof value === 'undefined') {
    return { isHeader: false }
  }
  const keyLower = key.toLowerCase().trim()

  if (!isValidHeaderKey(keyLower)) {
    return { isHeader: false }
  }

  return {
    isHeader: true,
    key: keyLower,
    value: value.trim(),
  }
}

/**
 * Format a header line with proper alignment
 */
export function formatHeaderLine(key: string, value: string, longestKeyLength: number): string {
  const padding = ' '.repeat(longestKeyLength - key.length + 1)
  return `  //${padding}${key}: ${value}`
}

/**
 * Format all headers in a file's content
 */
export function formatHeaders(content: string): FormatResult {
  const lines = content.split('\n')

  const parsedLines = lines.map((line) => parseHeaderLine(line))
  const headerKeys = parsedLines
    .filter((p): p is Extract<ParsedLine, { isHeader: true }> => p.isHeader)
    .map((p) => p.key)
  const longestKeyLength = headerKeys.length > 0 ? Math.max(...headerKeys.map((k) => k.length)) : 0

  let changed = false
  const formattedLines: string[] = []

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i]
    if (typeof line === 'undefined') {
      continue
    }
    const parsed = parsedLines[i]

    if (parsed && parsed.isHeader) {
      const formatted = formatHeaderLine(parsed.key, parsed.value, longestKeyLength)
      if (formatted !== line) {
        changed = true
      }
      formattedLines.push(formatted)
    } else {
      formattedLines.push(line)
    }
  }

  return {
    formatted: formattedLines.join('\n'),
    changed,
  }
}

/**
 * Check if a file's headers are properly formatted
 */
export function checkFile(filepath: string): CheckResult {
  const content = fs.readFileSync(filepath, 'utf-8')
  const { changed } = formatHeaders(content)
  return {
    ok: !changed,
    filepath,
  }
}

/**
 * Format a file's headers in place
 */
export function formatFile(filepath: string): FormatFileResult {
  const content = fs.readFileSync(filepath, 'utf-8')
  const { formatted, changed } = formatHeaders(content)

  if (changed) {
    fs.writeFileSync(filepath, formatted, 'utf-8')
  }

  return { changed, filepath }
}

/**
 * Check all function files for proper header formatting
 */
export function checkAll(srcDir: string): CheckAllResult {
  const pattern = [path.join(srcDir, '**/*.{js,ts}'), '!**/index.{js,ts}', '!**/_util/**', '!**/*.vitest.ts']
  const files = globFiles(pattern)
  const badFiles: string[] = []

  for (const file of files) {
    const result = checkFile(file)
    if (!result.ok) {
      badFiles.push(path.relative(srcDir, file))
    }
  }

  return {
    ok: badFiles.length === 0,
    badFiles,
  }
}

/**
 * Format all function files
 */
export function formatAll(srcDir: string): FormatAllResult {
  const pattern = [path.join(srcDir, '**/*.{js,ts}'), '!**/index.{js,ts}', '!**/_util/**', '!**/*.vitest.ts']
  const files = globFiles(pattern)
  const formattedFiles: string[] = []

  for (const file of files) {
    const result = formatFile(file)
    if (result.changed) {
      formattedFiles.push(path.relative(srcDir, file))
    }
  }

  return {
    formattedCount: formattedFiles.length,
    files: formattedFiles,
  }
}
