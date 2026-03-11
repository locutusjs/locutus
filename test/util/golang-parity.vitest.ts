import { describe, expect, it } from 'vitest'

import { golangHandler } from '../parity/lib/languages/golang.ts'

describe('golang parity translation', () => {
  it('rewrites ParseInLocation calls when a string argument ends in a backslash escape', () => {
    const translated = golangHandler.translate(["ParseInLocation('2006', 'foo\\\\', 'UTC')"], 'ParseInLocation', 'time')

    expect(translated).toContain('locutusTimeParseInLocation(')
  })
})
