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

type PackageJson = {
  browser?: Record<string, boolean>
  exports?: Record<string, unknown>
  main?: string
  module?: string
  type?: string
  types?: string
}

const readPackageJson = (rootDir: string): PackageJson | undefined => {
  const packageJsonPath = path.join(rootDir, 'package.json')
  if (!fs.existsSync(packageJsonPath)) {
    return undefined
  }

  return JSON.parse(fs.readFileSync(packageJsonPath, 'utf-8')) as PackageJson
}

const writeGolangIndexCompatShim = (rootDir: string): void => {
  const cjsStringsDir = path.join(rootDir, 'golang', 'strings')
  const cjsIndex2JsPath = path.join(cjsStringsDir, 'Index2.js')
  const cjsIndexJsPath = path.join(cjsStringsDir, 'Index.js')
  const cjsIndex2DtsPath = path.join(cjsStringsDir, 'Index2.d.ts')
  const cjsIndexDtsPath = path.join(cjsStringsDir, 'Index.d.ts')

  if (fs.existsSync(cjsIndex2JsPath) && !fs.existsSync(cjsIndexJsPath)) {
    const cjsShim =
      "// Backward-compatible deep import shim for 'locutus/golang/strings/Index'.\n" +
      "const mod = require('./Index2.js');\n" +
      'exports.Index = mod.Index;\n'
    fs.writeFileSync(cjsIndexJsPath, cjsShim, 'utf-8')
  }

  if (fs.existsSync(cjsIndex2DtsPath) && !fs.existsSync(cjsIndexDtsPath)) {
    fs.writeFileSync(cjsIndexDtsPath, "export { Index } from './Index2'\n", 'utf-8')
  }

  const esmStringsDir = path.join(rootDir, 'esm', 'golang', 'strings')
  const esmIndex2JsPath = path.join(esmStringsDir, 'Index2.js')
  const esmIndexJsPath = path.join(esmStringsDir, 'Index.js')
  if (fs.existsSync(esmIndex2JsPath) && !fs.existsSync(esmIndexJsPath)) {
    const esmShim =
      "// Backward-compatible deep import shim for 'locutus/golang/strings/Index'.\n" +
      "export { Index } from './Index2.js'\n"
    fs.writeFileSync(esmIndexJsPath, esmShim, 'utf-8')
  }
}

const writeEsmPackageJson = (rootDir: string): void => {
  const esmDir = path.join(rootDir, 'esm')
  if (!fs.existsSync(esmDir)) {
    return
  }

  const esmPackageJsonPath = path.join(esmDir, 'package.json')
  const rootPackageJson = readPackageJson(rootDir)
  const esmPackageJson: { type: 'module'; browser?: Record<string, boolean> } = {
    type: 'module',
  }

  if (rootPackageJson?.browser) {
    esmPackageJson.browser = rootPackageJson.browser
  }

  fs.writeFileSync(esmPackageJsonPath, `${JSON.stringify(esmPackageJson, null, 2)}\n`, 'utf-8')
}

const patchDistPackageJson = (rootDir: string): void => {
  const packageJson = readPackageJson(rootDir)
  if (!packageJson) {
    return
  }
  const packageJsonPath = path.join(rootDir, 'package.json')

  packageJson.type = 'commonjs'
  packageJson.main = './index.js'
  packageJson.module = './esm/index.js'
  packageJson.types = './index.d.ts'
  packageJson.exports = {
    '.': {
      types: './index.d.ts',
      import: './esm/index.js',
      require: './index.js',
      default: './index.js',
    },
    './*': {
      types: './*.d.ts',
      import: './esm/*.js',
      require: './*.js',
      default: './*.js',
    },
    './package.json': './package.json',
  }

  fs.writeFileSync(packageJsonPath, `${JSON.stringify(packageJson, null, 2)}\n`, 'utf-8')
}

writeGolangIndexCompatShim(distDir)
writeEsmPackageJson(distDir)
patchDistPackageJson(distDir)
