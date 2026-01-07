/**
 * Header formatter for locutus function files
 *
 * Ensures all header comment keys are vertically aligned with colons at a consistent position.
 */

const fs = require('fs')
const path = require('path')
const globby = require('globby')
const { isValidHeaderKey } = require('./headerSchema')

/**
 * Parse a header line to extract key and value
 * @param {string} line - A line from the file
 * @returns {{ isHeader: boolean, key?: string, value?: string }}
 */
function parseHeaderLine(line) {
  // Match header comment pattern: exactly 2-space indent, //, optional whitespace, key: value
  // This ensures we only match function header comments, not comments inside the code
  const match = line.match(/^ {2}\/\/\s*([a-z][a-z 0-9]*?):\s*(.*)$/)
  if (!match) {
    return { isHeader: false }
  }

  const [, key, value] = match
  const keyLower = key.toLowerCase().trim()

  // Only format recognized header keys
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
 * @param {string} key - The header key
 * @param {string} value - The header value
 * @param {number} longestKeyLength - Length of longest key in this file
 * @returns {string} - Formatted line
 */
function formatHeaderLine(key, value, longestKeyLength) {
  // Padding = longest_key_length - current_key_length + 1 (minimum 1 space)
  const padding = ' '.repeat(longestKeyLength - key.length + 1)
  return `  //${padding}${key}: ${value}`
}

/**
 * Format all headers in a file's content
 * @param {string} content - File content
 * @returns {{ formatted: string, changed: boolean }}
 */
function formatHeaders(content) {
  const lines = content.split('\n')

  // First pass: find all header keys and determine the longest one in this file
  const parsedLines = lines.map((line) => parseHeaderLine(line))
  const headerKeys = parsedLines.filter((p) => p.isHeader).map((p) => p.key)
  const longestKeyLength = headerKeys.length > 0 ? Math.max(...headerKeys.map((k) => k.length)) : 0

  // Second pass: format with proper alignment
  let changed = false
  const formattedLines = []

  for (let i = 0; i < lines.length; i++) {
    const parsed = parsedLines[i]

    if (parsed.isHeader) {
      const formatted = formatHeaderLine(parsed.key, parsed.value, longestKeyLength)
      if (formatted !== lines[i]) {
        changed = true
      }
      formattedLines.push(formatted)
    } else {
      formattedLines.push(lines[i])
    }
  }

  return {
    formatted: formattedLines.join('\n'),
    changed,
  }
}

/**
 * Check if a file's headers are properly formatted
 * @param {string} filepath - Path to file
 * @returns {{ ok: boolean, filepath: string }}
 */
function checkFile(filepath) {
  const content = fs.readFileSync(filepath, 'utf-8')
  const { changed } = formatHeaders(content)
  return {
    ok: !changed,
    filepath,
  }
}

/**
 * Format a file's headers in place
 * @param {string} filepath - Path to file
 * @returns {{ changed: boolean, filepath: string }}
 */
function formatFile(filepath) {
  const content = fs.readFileSync(filepath, 'utf-8')
  const { formatted, changed } = formatHeaders(content)

  if (changed) {
    fs.writeFileSync(filepath, formatted, 'utf-8')
  }

  return { changed, filepath }
}

/**
 * Check all function files for proper header formatting
 * @param {string} srcDir - Source directory
 * @returns {{ ok: boolean, badFiles: string[] }}
 */
function checkAll(srcDir) {
  const pattern = [path.join(srcDir, '**/*.js'), '!**/index.js', '!**/_util/**']
  const files = globby.sync(pattern)
  const badFiles = []

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
 * @param {string} srcDir - Source directory
 * @returns {{ formattedCount: number, files: string[] }}
 */
function formatAll(srcDir) {
  const pattern = [path.join(srcDir, '**/*.js'), '!**/index.js', '!**/_util/**']
  const files = globby.sync(pattern)
  const formattedFiles = []

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

module.exports = {
  parseHeaderLine,
  formatHeaderLine,
  formatHeaders,
  checkFile,
  formatFile,
  checkAll,
  formatAll,
}
