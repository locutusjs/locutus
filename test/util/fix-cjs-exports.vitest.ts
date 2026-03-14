import { execFileSync } from 'node:child_process'
import fs from 'node:fs'
import os from 'node:os'
import path from 'node:path'
import { describe, expect, it } from 'vitest'

describe('fix-cjs-exports script', function () {
  it('writes cjs/esm index shims and dual export package metadata', function () {
    const tmpDir = fs.mkdtempSync(path.join(os.tmpdir(), 'locutus-fix-cjs-'))

    try {
      const cjsTargetDir = path.join(tmpDir, 'golang', 'strings')
      const esmTargetDir = path.join(tmpDir, 'esm', 'golang', 'strings')
      fs.mkdirSync(cjsTargetDir, { recursive: true })
      fs.mkdirSync(esmTargetDir, { recursive: true })
      const cjsIndex2JsPath = path.join(cjsTargetDir, 'Index2.js')
      const cjsIndex2DtsPath = path.join(cjsTargetDir, 'Index2.d.ts')
      const esmIndex2JsPath = path.join(esmTargetDir, 'Index2.js')
      const packageJsonPath = path.join(tmpDir, 'package.json')

      fs.writeFileSync(
        cjsIndex2JsPath,
        "Object.defineProperty(exports, '__esModule', { value: true });\nexports.Index = void 0;\nconst Index = () => 1;\nexports.Index = Index;\n",
        'utf-8',
      )
      fs.writeFileSync(cjsIndex2DtsPath, 'export declare function Index(): number\n', 'utf-8')
      fs.writeFileSync(esmIndex2JsPath, 'export function Index() { return 1 }\n', 'utf-8')
      fs.writeFileSync(
        packageJsonPath,
        JSON.stringify(
          {
            name: 'locutus-dist-test',
            type: 'module',
            browser: {
              child_process: false,
              crypto: false,
              fs: false,
              tls: false,
            },
          },
          null,
          2,
        ),
        'utf-8',
      )

      execFileSync(process.execPath, [path.resolve('scripts/fix-cjs-exports.ts'), tmpDir], { stdio: 'pipe' })

      const cjsCompatShimPath = path.join(cjsTargetDir, 'Index.js')
      const esmCompatShimPath = path.join(esmTargetDir, 'Index.js')
      const compatDtsPath = path.join(cjsTargetDir, 'Index.d.ts')
      const esmPackageJsonPath = path.join(tmpDir, 'esm', 'package.json')
      const updatedPackage = JSON.parse(fs.readFileSync(packageJsonPath, 'utf-8')) as {
        type?: string
        main?: string
        browser?: Record<string, boolean>
      }
      const cjsShim = fs.readFileSync(cjsCompatShimPath, 'utf-8')
      const esmShim = fs.readFileSync(esmCompatShimPath, 'utf-8')
      const shimDts = fs.readFileSync(compatDtsPath, 'utf-8')
      const esmPackage = JSON.parse(fs.readFileSync(esmPackageJsonPath, 'utf-8')) as {
        type?: string
        browser?: Record<string, boolean>
      }

      expect(cjsShim).toContain("const mod = require('./Index2.js')")
      expect(cjsShim).toContain('exports.Index = mod.Index')
      expect(cjsShim).not.toContain('module.exports =')
      expect(esmShim).toContain("export { Index } from './Index2.js'")
      expect(shimDts).toContain("export { Index } from './Index2'")
      expect(updatedPackage.type).toBe('commonjs')
      expect(updatedPackage.main).toBe('./index.js')
      expect(updatedPackage).toMatchObject({
        module: './esm/index.js',
        types: './index.d.ts',
      })
      expect(updatedPackage.browser).toEqual({
        child_process: false,
        crypto: false,
        fs: false,
        tls: false,
      })
      expect(esmPackage.type).toBe('module')
      expect(esmPackage.browser).toEqual(updatedPackage.browser)
    } finally {
      fs.rmSync(tmpDir, { recursive: true, force: true })
    }
  })
})
