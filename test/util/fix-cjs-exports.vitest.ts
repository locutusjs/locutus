import { execFileSync } from 'node:child_process'
import fs from 'node:fs'
import os from 'node:os'
import path from 'node:path'
import { describe, expect, it } from 'vitest'

describe('fix-cjs-exports script', function () {
  it('rewrites index require() calls with .js/.ts suffixes to extensionless paths', function () {
    const tmpDir = fs.mkdtempSync(path.join(os.tmpdir(), 'locutus-fix-cjs-'))

    try {
      const targetDir = path.join(tmpDir, 'php', 'strings')
      fs.mkdirSync(targetDir, { recursive: true })
      const indexJsPath = path.join(targetDir, 'index.js')

      fs.writeFileSync(
        indexJsPath,
        [
          "const a = require('./foo.js').foo",
          'const b = require("./bar.ts").bar',
          'module.exports = { a, b }',
          '',
        ].join('\n'),
        'utf-8',
      )

      execFileSync(process.execPath, [path.resolve('scripts/fix-cjs-exports.ts'), tmpDir], { stdio: 'pipe' })

      const updated = fs.readFileSync(indexJsPath, 'utf-8')
      expect(updated).toContain("const a = require('./foo')")
      expect(updated).toContain("const b = require('./bar')")
      expect(updated).not.toContain(".js').foo")
      expect(updated).not.toContain('.ts").bar')
    } finally {
      fs.rmSync(tmpDir, { recursive: true, force: true })
    }
  })
})
