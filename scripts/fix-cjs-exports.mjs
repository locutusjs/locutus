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

function walk(dir) {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name)
    if (entry.isDirectory()) {
      walk(full)
    } else if (entry.name.endsWith('.js')) {
      let content = fs.readFileSync(full, 'utf-8')
      let modified = false

      if (content.includes('"__esModule"') && entry.name !== 'index.js') {
        const name = path.basename(entry.name, '.js')
        if (content.includes('exports.' + name)) {
          // Named export: exports.foo = foo → module.exports = exports.foo
          content = content + '\nmodule.exports = exports.' + name + ';\n'
          modified = true
        } else if (content.includes('exports.default')) {
          // Legacy default export (not yet migrated)
          content = content + '\nmodule.exports = exports.default;\n'
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

walk(distDir)
