#!/usr/bin/env node

// Bulk-converts remaining .js source files to .ts
// Handles: module.exports → export, require() → import, git mv

import { execSync } from 'child_process'
import { existsSync, readFileSync, renameSync, writeFileSync } from 'fs'
import { basename, dirname, join, relative } from 'path'

const DRY_RUN = process.argv.includes('--dry-run')

// Get all .js files under src/ (excluding _util/)
const allJs = execSync('find src -name "*.js" -not -path "src/_util/*"', { encoding: 'utf8' })
  .trim()
  .split('\n')
  .filter(Boolean)

const indexFiles = allJs.filter((f) => basename(f) === 'index.js')
const funcFiles = allJs.filter((f) => basename(f) !== 'index.js')

console.log(`Found ${funcFiles.length} function files and ${indexFiles.length} index files`)

let converted = 0
const errors = []

// Phase 1: Convert function files
for (const jsPath of funcFiles) {
  try {
    const code = readFileSync(jsPath, 'utf8')
    const tsPath = jsPath.replace(/\.js$/, '.ts')
    let result = code

    // 1. Convert module.exports = function name(...) { → export function name(...) {
    result = result.replace(/module\.exports\s*=\s*function\s+(\w+)\s*\(/, 'export function $1(')

    // 2. Convert require() calls to imports
    // Pattern A: const name = require('./path')
    // Pattern B: const name = require('./path.ts').name
    // Pattern C: require('./path') used inline

    // Collect top-of-function requires to hoist as imports
    const importLines = []

    // Handle: const name = require('../path/mod')
    result = result.replace(
      /^\s*const\s+(\w+)\s*=\s*require\(\s*'([^']+?)(?:\.ts)?'\s*\)(?:\.(\w+))?\s*$/gm,
      (match, varName, reqPath, prop) => {
        // Determine the new extension: everything becomes .ts since we're converting all
        const newPath = reqPath.replace(/\.js$/, '') + '.ts'
        if (prop) {
          importLines.push(`import { ${prop} as ${varName} } from '${newPath}'`)
        } else {
          importLines.push(`import ${varName} from '${newPath}'`)
        }
        return '' // remove the line
      },
    )

    // Handle inline require() calls like: return require('../path')(args)
    // or: require('../path')(value)
    // These are trickier - convert to import + usage
    result = result.replace(/require\(\s*'([^']+?)(?:\.ts)?'\s*\)/g, (match, reqPath) => {
      // Generate a variable name from the path
      const modName = '_' + basename(reqPath).replace(/[^a-zA-Z0-9]/g, '_')
      const newPath = reqPath.replace(/\.js$/, '') + '.ts'
      // Check if we already have this import
      const existing = importLines.find((l) => l.includes(`from '${newPath}'`))
      if (!existing) {
        importLines.push(`import ${modName} from '${newPath}'`)
      }
      const actualName = existing ? existing.match(/import\s+(\w+)/)?.[1] || modName : modName
      return actualName
    })

    // Place imports at the top, before the export function
    if (importLines.length > 0) {
      const importBlock = importLines.join('\n') + '\n\n'
      // Insert before the export function line
      result = result.replace(/^(export function)/m, importBlock + '$1')
    }

    // Clean up blank lines left by removed require statements
    result = result.replace(/\n{3,}/g, '\n\n')

    if (DRY_RUN) {
      if (code !== result) {
        console.log(`[DRY] Would convert: ${jsPath}`)
      }
    } else {
      // Write the .ts file
      writeFileSync(jsPath, result)
      // Git mv
      execSync(`git mv "${jsPath}" "${tsPath}"`, { stdio: 'pipe' })
      converted++
    }
  } catch (err) {
    errors.push({ file: jsPath, error: err.message })
  }
}

// Phase 2: Convert index.js barrel files
for (const jsPath of indexFiles) {
  try {
    const code = readFileSync(jsPath, 'utf8')
    const tsPath = jsPath.replace(/\.js$/, '.ts')
    let result = code

    // Convert: module.exports.Name = require('./Name')
    // To: export { Name } from './Name.ts'
    // But some have: module.exports.Name = require('./ActualFile')
    result = result.replace(
      /module\.exports\.(\w+)\s*=\s*require\(\s*'([^']+?)'\s*\)/g,
      (match, exportName, reqPath) => {
        const newPath = reqPath.replace(/\.js$/, '') + '.ts'
        const modBasename = basename(reqPath.replace(/\.js$/, ''))
        if (exportName === modBasename) {
          return `export { ${exportName} } from '${newPath}'`
        } else {
          // Different export name from file name
          return `export { ${modBasename} as ${exportName} } from '${newPath}'`
        }
      },
    )

    // Also handle: module.exports = require('./something')
    result = result.replace(/module\.exports\s*=\s*require\(\s*'([^']+?)'\s*\)/g, (match, reqPath) => {
      const newPath = reqPath.replace(/\.js$/, '') + '.ts'
      return `export { default } from '${newPath}'`
    })

    if (DRY_RUN) {
      console.log(`[DRY] Would convert index: ${jsPath}`)
    } else {
      writeFileSync(jsPath, result)
      execSync(`git mv "${jsPath}" "${tsPath}"`, { stdio: 'pipe' })
      converted++
    }
  } catch (err) {
    errors.push({ file: jsPath, error: err.message })
  }
}

console.log(`\nConverted: ${converted} files`)
if (errors.length) {
  console.log(`\nErrors (${errors.length}):`)
  for (const e of errors) {
    console.log(`  ${e.file}: ${e.error}`)
  }
}
