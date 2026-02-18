import ts from 'typescript'
import { describe, expect, it } from 'vitest'
import { Util } from '../../src/_util/util.ts'

describe('util', function () {
  describe('_load', function () {
    it('should parse array_change_key_case correctly', async function () {
      const util = new Util()

      const relative = 'php/array/array_change_key_case.ts'

      const params = await util._load(relative, {})
      expect(params).not.toBeNull()
      expect(params?.headKeys.example?.[0]?.[0]).toEqual('array_change_key_case(42)')
    })
  })

  describe('_reindexOne', function () {
    it('should include all named exports from a multi-export function file', async function () {
      const util = new Util()

      const params = await util._load('php/_helpers/_arrayPointers.ts', {})
      expect(params).not.toBeNull()
      if (!params) {
        return
      }

      util._reindexBuffer = {}
      await util._reindexOne(params)

      const indexTs = util.__src + '/php/_helpers/index.ts'
      const exports = util._reindexBuffer[indexTs] || []
      expect(exports).toEqual(
        expect.arrayContaining([
          "export { getArrayLikeLength } from './_arrayPointers.ts'",
          "export { getEntryAtCursor } from './_arrayPointers.ts'",
          "export { getPointerState } from './_arrayPointers.ts'",
        ]),
      )
      expect(exports).toHaveLength(3)
    })
  })

  describe('_extractDependencies', function () {
    it('should ignore type-only imports when extracting runtime dependencies', function () {
      const util = new Util()
      const sourceText = [
        "import type { PhpMixed } from '../_helpers/_phpTypes.ts'",
        "import { echo } from '../strings/echo.ts'",
        "const dep = require('../array/array_values.ts')",
      ].join('\n')
      const sourceFile = ts.createSourceFile('php/strings/demo.ts', sourceText, ts.ScriptTarget.ES2022, true)

      const dependencies = util._extractDependencies(sourceFile, 'php/strings/demo.ts')

      expect(dependencies).toContain('php/strings/echo')
      expect(dependencies).toContain('php/array/array_values')
      expect(dependencies).not.toContain('php/_helpers/_phpTypes')
    })
  })
})
