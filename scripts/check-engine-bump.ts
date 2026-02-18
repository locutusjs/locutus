import { execSync } from 'node:child_process'
import { readdirSync, readFileSync } from 'node:fs'
import path from 'node:path'

type Semver = [number, number, number]

interface PackageJsonShape {
  version?: string
  engines?: {
    node?: string
  }
}

const parseSemver = (input: unknown): Semver | null => {
  if (!input) {
    return null
  }

  const match = String(input).match(/(\d+)(?:\.(\d+))?(?:\.(\d+))?/)
  if (!match) {
    return null
  }

  return [Number(match[1]), Number(match[2] || 0), Number(match[3] || 0)]
}

const compareSemver = (left: Semver, right: Semver): number => {
  for (let i = 0; i < 3; i += 1) {
    if (left[i] > right[i]) {
      return 1
    }
    if (left[i] < right[i]) {
      return -1
    }
  }
  return 0
}

const readJson = (ref?: string): PackageJsonShape => {
  if (!ref) {
    return JSON.parse(readFileSync('package.json', 'utf8')) as PackageJsonShape
  }

  const content = execSync(`git show ${ref}:package.json`, { encoding: 'utf8' })
  return JSON.parse(content) as PackageJsonShape
}

const escapeRegex = (value: string): string => value.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')

const hasPendingMajorChangeset = (packageName: string): boolean => {
  const changesetDir = '.changeset'
  let entries: ReturnType<typeof readdirSync>

  try {
    entries = readdirSync(changesetDir, { withFileTypes: true })
  } catch {
    return false
  }

  const markdownFiles = entries
    .filter((entry) => entry.isFile() && entry.name.endsWith('.md'))
    .map((entry) => path.join(changesetDir, entry.name))

  for (const filePath of markdownFiles) {
    let content = ''
    try {
      content = readFileSync(filePath, 'utf8')
    } catch {
      continue
    }

    const frontmatterMatch = content.match(/^---\r?\n([\s\S]*?)\r?\n---\r?\n/)
    if (!frontmatterMatch) {
      continue
    }

    const frontmatter = frontmatterMatch[1]
    const packageRegex = new RegExp(
      String.raw`["']?${escapeRegex(packageName)}["']?\s*:\s*["']?(major|premajor)["']?\b`,
      'i',
    )
    if (packageRegex.test(frontmatter)) {
      return true
    }
  }

  return false
}

const baseRef = process.env.GITHUB_BASE_REF
if (!baseRef) {
  console.log('[engine-bump] GITHUB_BASE_REF not set; skipping check.')
  process.exit(0)
}

const basePkg = readJson(`origin/${baseRef}`)
const headPkg = readJson()

const baseEngine = basePkg.engines?.node
const headEngine = headPkg.engines?.node

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
  if (hasPendingMajorChangeset('locutus')) {
    console.log('[engine-bump] engines.node increased with pending major changeset for "locutus"; allowing.')
    process.exit(0)
  }

  console.error(
    `[engine-bump] engines.node increased from "${baseEngine}" to "${headEngine}" without a major version bump (${basePkg.version} -> ${headPkg.version}).`,
  )
  console.error('Engine bumps are treated as breaking changes. Bump the major version or revert engines.node.')
  process.exit(1)
}
