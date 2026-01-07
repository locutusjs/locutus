#!/usr/bin/env node

/**
 * CLI for header formatter
 *
 * Usage:
 *   node formatHeaders.ts check  - Check if all headers are properly formatted
 *   node formatHeaders.ts fix    - Fix all header formatting issues
 */

import path from 'node:path'
import { fileURLToPath } from 'node:url'
import { checkAll, formatAll } from './headerFormatter.ts'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const srcDir = path.dirname(__dirname)
const command = process.argv[2]

if (command === 'check') {
  const result = checkAll(srcDir)

  if (result.ok) {
    console.log('\x1b[32m\u2713\x1b[0m All headers properly formatted')
    process.exit(0)
  } else {
    console.log('\x1b[31m\u2717\x1b[0m Found', result.badFiles.length, 'files with misaligned headers:')
    for (const file of result.badFiles.slice(0, 10)) {
      console.log('  -', file)
    }
    if (result.badFiles.length > 10) {
      console.log('  ... and', result.badFiles.length - 10, 'more')
    }
    console.log('\nRun "yarn fix:headers" to fix them automatically.')
    process.exit(1)
  }
} else if (command === 'fix') {
  const result = formatAll(srcDir)

  if (result.formattedCount === 0) {
    console.log('\x1b[32m\u2713\x1b[0m All headers already properly formatted')
  } else {
    console.log('\x1b[32m\u2713\x1b[0m Formatted', result.formattedCount, 'files:')
    for (const file of result.files.slice(0, 10)) {
      console.log('  -', file)
    }
    if (result.files.length > 10) {
      console.log('  ... and', result.files.length - 10, 'more')
    }
  }
  process.exit(0)
} else {
  console.error('Usage: node formatHeaders.ts [check|fix]')
  process.exit(1)
}
