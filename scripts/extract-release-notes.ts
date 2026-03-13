#!/usr/bin/env node

import { readFileSync } from 'node:fs'
import { join } from 'node:path'
import { fileURLToPath } from 'node:url'

const CHANGELOG_HEADING_PREFIX = '## '
const THIS_FILE_PATH = fileURLToPath(import.meta.url)

export function extractReleaseNotes(changelog: string, version: string): string {
  const normalizedChangelog = changelog.replace(/\r\n/g, '\n')
  const lines = normalizedChangelog.split('\n')
  const targetHeading = `${CHANGELOG_HEADING_PREFIX}${version}`
  const matches = lines.reduce<number[]>((indexes, line, index) => {
    if (line.trim() === targetHeading) {
      indexes.push(index)
    }
    return indexes
  }, [])

  if (matches.length === 0) {
    throw new Error(`Release heading not found in CHANGELOG.md: ${targetHeading}`)
  }

  if (matches.length > 1) {
    throw new Error(`Release heading appears multiple times in CHANGELOG.md: ${targetHeading}`)
  }

  const startHeadingIndex = matches.at(0)
  if (startHeadingIndex === undefined) {
    throw new Error(`Release heading not found in CHANGELOG.md: ${targetHeading}`)
  }

  const startIndex = startHeadingIndex + 1
  let endIndex = lines.length

  for (let index = startIndex; index < lines.length; index += 1) {
    const line = lines[index]
    if (line !== undefined && line.startsWith(CHANGELOG_HEADING_PREFIX)) {
      endIndex = index
      break
    }
  }

  const notes = lines.slice(startIndex, endIndex).join('\n').trim()

  if (!notes) {
    throw new Error(`Release heading has no notes in CHANGELOG.md: ${targetHeading}`)
  }

  return notes
}

function parseArgs(args: string[]): { changelogPath: string; version: string } {
  const parsed = {
    changelogPath: join(fileURLToPath(new URL('..', import.meta.url)), 'CHANGELOG.md'),
    version: '',
  }

  for (let index = 0; index < args.length; index += 1) {
    const arg = args[index]
    if (arg === '--version') {
      parsed.version = args[index + 1] ?? ''
      index += 1
      continue
    }
    if (arg === '--changelog') {
      parsed.changelogPath = args[index + 1] ?? ''
      index += 1
      continue
    }
    throw new Error(`Unknown argument: ${arg}`)
  }

  if (!parsed.version) {
    throw new Error('Missing required --version argument')
  }

  if (!parsed.changelogPath) {
    throw new Error('Missing required --changelog argument')
  }

  return parsed
}

function main(): void {
  const { changelogPath, version } = parseArgs(process.argv.slice(2))
  const changelog = readFileSync(changelogPath, 'utf8')
  const notes = extractReleaseNotes(changelog, version)
  process.stdout.write(`${notes}\n`)
}

if (process.argv[1] === THIS_FILE_PATH) {
  main()
}
