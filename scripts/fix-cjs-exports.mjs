/**
 * Post-process tsc CommonJS output to fix default exports.
 *
 * tsc with module:CommonJS produces:
 *   Object.defineProperty(exports, "__esModule", { value: true });
 *   exports.default = foo;
 *
 * But require('./foo') returns { default: foo, __esModule: true }, not foo.
 * This script appends `module.exports = exports.default;` so require() works.
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

      // Fix compiled TS default exports: exports.default → module.exports
      // tsc produces: Object.defineProperty(exports, "__esModule", { value: true });
      if (content.includes('"__esModule"') && content.includes('exports.default')) {
        content = content + '\nmodule.exports = exports.default;\n'
        modified = true
      }

      // Fix index.js files: require('./foo.ts').default → require('./foo')
      // In dist, .ts files are compiled to .js, so we strip the .ts extension
      // and .default (since fix above makes module.exports = the function directly)
      if (entry.name === 'index.js' && content.includes(".ts').default")) {
        content = content.replace(/require\('([^']+)\.ts'\)\.default/g, "require('$1')")
        modified = true
      }

      if (modified) {
        fs.writeFileSync(full, content, 'utf-8')
      }
    }
  }
}

walk(distDir)
