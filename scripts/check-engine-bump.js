#!/usr/bin/env node

const { execSync } = require('node:child_process')
const { readFileSync } = require('node:fs')

function parseSemver(input) {
  if (!input) {
    return null
  }

  const match = String(input).match(/(\d+)(?:\.(\d+))?(?:\.(\d+))?/)
  if (!match) {
    return null
  }

  return [Number(match[1]), Number(match[2] || 0), Number(match[3] || 0)]
}

function compareSemver(a, b) {
  for (let i = 0; i < 3; i += 1) {
    if (a[i] > b[i]) {
      return 1
    }
    if (a[i] < b[i]) {
      return -1
    }
  }
  return 0
}

function readJson(ref) {
  if (!ref) {
    return JSON.parse(readFileSync('package.json', 'utf8'))
  }

  const content = execSync(`git show ${ref}:package.json`, { encoding: 'utf8' })
  return JSON.parse(content)
}

const baseRef = process.env.GITHUB_BASE_REF
if (!baseRef) {
  console.log('[engine-bump] GITHUB_BASE_REF not set; skipping check.')
  process.exit(0)
}

const basePkg = readJson(`origin/${baseRef}`)
const headPkg = readJson(null)

const baseEngine = basePkg.engines && basePkg.engines.node
const headEngine = headPkg.engines && headPkg.engines.node

if (baseEngine === headEngine) {
  process.exit(0)
}

if (!headEngine) {
  console.log('[engine-bump] engines.node removed or unset; skipping check.')
  process.exit(0)
}

const baseMin = parseSemver(baseEngine)
const headMin = parseSemver(headEngine)

let raised = true
if (baseMin && headMin) {
  raised = compareSemver(headMin, baseMin) > 0
}

if (!raised) {
  process.exit(0)
}

const baseVersion = parseSemver(basePkg.version) || [0, 0, 0]
const headVersion = parseSemver(headPkg.version) || [0, 0, 0]

if (headVersion[0] <= baseVersion[0]) {
  console.error(
    `[engine-bump] engines.node increased from "${baseEngine}" to "${headEngine}" without a major version bump (${basePkg.version} -> ${headPkg.version}).`,
  )
  console.error('Engine bumps are treated as breaking changes. Bump the major version or revert engines.node.')
  process.exit(1)
}
