import { execFileSync } from 'node:child_process'
import fs from 'node:fs'
import os from 'node:os'
import path from 'node:path'
import { describe, expect, it } from 'vitest'

describe('fix-cjs-exports script', function () {
  it('writes named-export golang Index shim and keeps dist package commonjs', function () {
    const tmpDir = fs.mkdtempSync(path.join(os.tmpdir(), 'locutus-fix-cjs-'))

    try {
      const targetDir = path.join(tmpDir, 'golang', 'strings')
      fs.mkdirSync(targetDir, { recursive: true })
      const indexJsPath = path.join(targetDir, 'Index2.js')
      const indexDtsPath = path.join(targetDir, 'Index2.d.ts')
      const packageJsonPath = path.join(tmpDir, 'package.json')

      fs.writeFileSync(
        indexJsPath,
        "Object.defineProperty(exports, '__esModule', { value: true });\nexports.Index = void 0;\nconst Index = () => 1;\nexports.Index = Index;\n",
        'utf-8',
      )
      fs.writeFileSync(indexDtsPath, 'export declare function Index(): number\n', 'utf-8')
      fs.writeFileSync(packageJsonPath, JSON.stringify({ name: 'locutus-dist-test', type: 'module' }, null, 2), 'utf-8')

      execFileSync(process.execPath, [path.resolve('scripts/fix-cjs-exports.ts'), tmpDir], { stdio: 'pipe' })

      const compatShimPath = path.join(targetDir, 'Index.js')
      const compatDtsPath = path.join(targetDir, 'Index.d.ts')
      const updatedPackage = JSON.parse(fs.readFileSync(packageJsonPath, 'utf-8')) as { type?: string; main?: string }
      const shim = fs.readFileSync(compatShimPath, 'utf-8')
      const shimDts = fs.readFileSync(compatDtsPath, 'utf-8')

      expect(shim).toContain("const mod = require('./Index2.js')")
      expect(shim).toContain('exports.Index = mod.Index')
      expect(shim).not.toContain('module.exports =')
      expect(shimDts).toContain("export { Index } from './Index2'")
      expect(updatedPackage.type).toBe('commonjs')
      expect(updatedPackage.main).toBe('index.js')
    } finally {
      fs.rmSync(tmpDir, { recursive: true, force: true })
    }
  })
})
