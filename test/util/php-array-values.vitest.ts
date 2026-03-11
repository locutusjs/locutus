import { execFileSync } from 'node:child_process'
import { describe, expect, it } from 'vitest'

import { array_values } from '../../src/php/array/array_values.ts'

const hasPhp = (() => {
  try {
    execFileSync('php', ['-v'], { encoding: 'utf8', stdio: 'pipe' })
    return true
  } catch {
    return false
  }
})()

const normalizePhpTypeErrorMessage = (message: string): string => {
  return message
    .replace(/^TypeError:\s*/, '')
    .replace(/\s+in Command line code:1$/, '')
    .trim()
}

const getPhpTypeErrorMessage = (expression: string): string => {
  try {
    execFileSync('php', ['-r', expression], { encoding: 'utf8', stdio: 'pipe' })
  } catch (error) {
    const stderr = error instanceof Error && 'stderr' in error ? String(error.stderr) : ''
    const typeErrorLine = stderr
      .split('\n')
      .map((line) => line.trim())
      .find((line) => line.includes('TypeError:'))

    if (!typeErrorLine) {
      throw error
    }

    return normalizePhpTypeErrorMessage(typeErrorLine.replace(/^PHP Fatal error:\s+Uncaught\s+/, ''))
  }

  throw new Error('Expected PHP to throw')
}

describe('php/array/array_values parity edge cases', () => {
  const itIfPhp = hasPhp ? it : it.skip

  itIfPhp('matches PHP type errors for string input', () => {
    const phpMessage = getPhpTypeErrorMessage('array_values("abc");')

    expect(() => array_values('abc' as never)).toThrow(phpMessage)
  })

  it('rejects boxed strings', () => {
    expect(() => array_values(Reflect.construct(String, ['abc']) as never)).toThrow(
      'array_values(): Argument #1 ($array) must be of type array, string given',
    )
  })

  it('keeps custom-prototype associative objects working', () => {
    const input = Object.assign(Object.create({ inherited: 'ignored' }), { first: 'a', second: 'b' })

    expect(array_values(input)).toEqual(['a', 'b'])
  })
})
