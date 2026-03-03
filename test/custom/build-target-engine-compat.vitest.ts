import fs from 'node:fs'
import path from 'node:path'
import { describe, expect, it } from 'vitest'

function readJson<T>(relativePath: string): T {
  const absolutePath = path.join(process.cwd(), relativePath)
  return JSON.parse(fs.readFileSync(absolutePath, 'utf-8')) as T
}

function parseMinNodeVersion(range: string): number {
  const match = range.match(/(\d+)/)
  return match ? Number(match[1]) : 0
}

describe('build target vs engines', () => {
  it('declares a Node engine compatible with the emitted target', () => {
    const packageJson = readJson<{
      engines?: {
        node?: string
      }
    }>('package.json')
    const tsconfigBuild = readJson<{
      compilerOptions?: {
        target?: string
      }
    }>('tsconfig.build.json')
    const target = String(tsconfigBuild?.compilerOptions?.target || '').toUpperCase()
    const nodeRange = String(packageJson?.engines?.node || '')
    const nodeMin = parseMinNodeVersion(nodeRange)
    const minNodeByTarget: Record<string, number> = {
      ES2018: 10,
      ES2019: 12,
      ES2020: 14,
      ES2021: 16,
      ES2022: 18,
      ES2023: 20,
      ES2024: 22,
    }
    const requiredMin = minNodeByTarget[target] ?? 0

    expect(nodeMin).toBeGreaterThanOrEqual(requiredMin)
  })
})
