import fs from 'node:fs'
import os from 'node:os'
import path from 'node:path'
import { describe, expect, it } from 'vitest'
import { checkAll } from '../../src/_util/headerFormatter.ts'

describe('header formatter', function () {
  it('ignores index.ts barrel files during header checks', function () {
    const tmpDir = fs.mkdtempSync(path.join(os.tmpdir(), 'locutus-header-'))

    try {
      const srcDir = path.join(tmpDir, 'src')
      const barrelDir = path.join(srcDir, 'php', 'strings')
      fs.mkdirSync(barrelDir, { recursive: true })

      fs.writeFileSync(
        path.join(barrelDir, 'index.ts'),
        ["export { sprintf } from './sprintf.ts'", '  //discuss at: https://locutus.io/php/strings/sprintf/', ''].join(
          '\n',
        ),
        'utf-8',
      )

      const result = checkAll(srcDir)
      expect(result.ok).toBe(true)
      expect(result.badFiles).toEqual([])
    } finally {
      fs.rmSync(tmpDir, { recursive: true, force: true })
    }
  })
})
