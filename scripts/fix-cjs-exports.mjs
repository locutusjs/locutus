/**
 * Post-process tsc CommonJS output so require() returns the function directly.
 *
 * For named exports, tsc produces:
 *   Object.defineProperty(exports, "__esModule", { value: true });
 *   exports.foo = foo;
 *
 * But require('./foo') returns { foo: fn, __esModule: true }, not fn.
 * This script appends `module.exports = exports.foo;` (using the filename
 * as the export name) so require() works as expected.
 *
 * Also fixes index.js files that reference .ts extensions and .funcName
 * suffixes, since in dist everything is compiled to .js.
 */

import fs from 'node:fs'
import path from 'node:path'

const distDir = process.argv[2] || 'dist'
const PATCH_MARKER = '// locutus-cjs-export-fix'

function extractMainExportName(content, fallbackName) {
  const names = new Set()

  for (const match of content.matchAll(/exports\.([A-Za-z_$][\w$]*)\s*=/g)) {
    const name = match[1]
    if (name !== '__esModule' && name !== 'default') {
      names.add(name)
    }
  }

  for (const match of content.matchAll(/Object\.defineProperty\(exports,\s*['"]([^'"]+)['"]/g)) {
    const name = match[1]
    if (name !== '__esModule' && name !== 'default') {
      names.add(name)
    }
  }

  if (names.size === 1) {
    return names.values().next().value
  }
  if (fallbackName && names.has(fallbackName)) {
    return fallbackName
  }
  if (content.includes('exports.default')) {
    return 'default'
  }

  return null
}

function walk(dir) {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name)
    if (entry.isDirectory()) {
      walk(full)
    } else if (entry.name.endsWith('.js')) {
      let content = fs.readFileSync(full, 'utf-8')
      let modified = false

      if (content.includes('"__esModule"') && entry.name !== 'index.js' && !content.includes(PATCH_MARKER)) {
        const basename = path.basename(entry.name, '.js')
        const exportName = extractMainExportName(content, basename)
        if (exportName) {
          const exportAccessor = exportName === 'default' ? 'exports.default' : `exports.${exportName}`
          content =
            content +
            `\n${PATCH_MARKER}\n` +
            `const __locutusExport = ${exportAccessor};\n` +
            `if (typeof __locutusExport !== 'undefined') {\n` +
            `  module.exports = __locutusExport;\n` +
            `  module.exports.default = __locutusExport;\n` +
            `  try {\n` +
            `    module.exports[${JSON.stringify(exportName)}] = __locutusExport;\n` +
            `  } catch {\n` +
            `    Object.defineProperty(module.exports, ${JSON.stringify(exportName)}, {\n` +
            `      value: __locutusExport,\n` +
            `      configurable: true,\n` +
            `      enumerable: true,\n` +
            `      writable: true,\n` +
            `    });\n` +
            `  }\n` +
            `}\n`
          modified = true
        }
      }

      // Fix index.js files: require('./foo.ts').funcName → require('./foo')
      // In dist, .ts files are compiled to .js, so we strip the .ts extension
      // and the .funcName suffix (since the fix above makes module.exports = fn)
      if (entry.name === 'index.js') {
        const before = content
        content = content.replace(/require\('([^']+)\.ts'\)\.\w+/g, "require('$1')")
        if (content !== before) {
          modified = true
        }
      }

      if (modified) {
        fs.writeFileSync(full, content, 'utf-8')
      }
    }
  }
}

function writeGolangIndexCompatShim(rootDir) {
  const golangStringsDir = path.join(rootDir, 'golang', 'strings')
  const index2JsPath = path.join(golangStringsDir, 'Index2.js')
  const indexJsPath = path.join(golangStringsDir, 'Index.js')
  const index2DtsPath = path.join(golangStringsDir, 'Index2.d.ts')
  const indexDtsPath = path.join(golangStringsDir, 'Index.d.ts')

  if (fs.existsSync(index2JsPath) && !fs.existsSync(indexJsPath)) {
    const shim =
      "// Backward-compatible deep import shim for 'locutus/golang/strings/Index'.\n" +
      "const mod = require('./Index2.js');\n" +
      'const fn = mod.Index || mod.default || mod;\n' +
      'module.exports = fn;\n' +
      'module.exports.Index = fn;\n' +
      'module.exports.default = fn;\n'
    fs.writeFileSync(indexJsPath, shim, 'utf-8')
  }

  if (fs.existsSync(index2DtsPath) && !fs.existsSync(indexDtsPath)) {
    fs.writeFileSync(indexDtsPath, "export { Index } from './Index2'\n", 'utf-8')
  }
}

walk(distDir)
writeGolangIndexCompatShim(distDir)
