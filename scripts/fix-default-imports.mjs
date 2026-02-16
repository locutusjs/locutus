#!/usr/bin/env node

// Fixes default imports to named imports
// import foo from './path.ts' → import { actualExportName as foo } from './path.ts'
// If foo === actualExportName, just: import { foo } from './path.ts'

import { execSync } from 'child_process'
import { existsSync, readFileSync, writeFileSync } from 'fs'
import { basename, dirname, join, resolve } from 'path'

// Get all .ts source files (excluding _util, index files, test files)
const allTs = execSync(
  'find src -name "*.ts" -not -path "src/_util/*" -not -name "index.ts" -not -name "*.vitest.ts"',
  {
    encoding: 'utf8',
  },
)
  .trim()
  .split('\n')
  .filter(Boolean)

// Build a map: absolute file path → exported function name
const exportMap = new Map()
for (const f of allTs) {
  const code = readFileSync(f, 'utf8')
  const match = code.match(/^export function (\w+)/m)
  if (match) {
    const absPath = resolve(f)
    exportMap.set(absPath, match[1])
  }
}

let fixCount = 0

for (const f of allTs) {
  let code = readFileSync(f, 'utf8')
  let modified = false

  // Match: import localName from './relative/path.ts'
  code = code.replace(/^(import)\s+(\w+)\s+from\s+'(\.\.?\/[^']+\.ts)'/gm, (match, imp, localName, relPath) => {
    // Resolve the target file
    const targetFile = resolve(dirname(f), relPath)
    const exportName = exportMap.get(targetFile)

    if (!exportName) {
      // Can't determine export name, skip
      return match
    }

    modified = true
    if (localName === exportName) {
      return `import { ${localName} } from '${relPath}'`
    } else {
      return `import { ${exportName} as ${localName} } from '${relPath}'`
    }
  })

  if (modified) {
    writeFileSync(f, code)
    fixCount++
  }
}

console.log(`Fixed ${fixCount} files`)
