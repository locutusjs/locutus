/**
 * Post-process dist output for publication while preserving named exports.
 *
 * We intentionally do not collapse CJS modules into direct callable defaults.
 * Consumers should use named imports/exports in both ESM and CJS:
 *   - ESM: import { fn } from '...'
 *   - CJS: const { fn } = require('...')
 */

import fs from 'node:fs'
import path from 'node:path'

const distDir = process.argv[2] || 'dist'
const writeGolangIndexCompatShim = (rootDir: string): void => {
  const golangStringsDir = path.join(rootDir, 'golang', 'strings')
  const index2JsPath = path.join(golangStringsDir, 'Index2.js')
  const indexJsPath = path.join(golangStringsDir, 'Index.js')
  const index2DtsPath = path.join(golangStringsDir, 'Index2.d.ts')
  const indexDtsPath = path.join(golangStringsDir, 'Index.d.ts')

  if (fs.existsSync(index2JsPath) && !fs.existsSync(indexJsPath)) {
    const shim =
      "// Backward-compatible deep import shim for 'locutus/golang/strings/Index'.\n" +
      "const mod = require('./Index2.js');\n" +
      'exports.Index = mod.Index;\n'
    fs.writeFileSync(indexJsPath, shim, 'utf-8')
  }

  if (fs.existsSync(index2DtsPath) && !fs.existsSync(indexDtsPath)) {
    fs.writeFileSync(indexDtsPath, "export { Index } from './Index2'\n", 'utf-8')
  }
}

const patchDistPackageJson = (rootDir: string): void => {
  const packageJsonPath = path.join(rootDir, 'package.json')
  if (!fs.existsSync(packageJsonPath)) {
    return
  }

  const packageJson = JSON.parse(fs.readFileSync(packageJsonPath, 'utf-8')) as {
    type?: string
    main?: string
  }
  packageJson.type = 'commonjs'
  if (!packageJson.main) {
    packageJson.main = 'index.js'
  }

  fs.writeFileSync(packageJsonPath, `${JSON.stringify(packageJson, null, 2)}\n`, 'utf-8')
}

writeGolangIndexCompatShim(distDir)
patchDistPackageJson(distDir)
