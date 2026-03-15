import { describe, expect, it } from 'vitest'

import { golangHandler } from '../parity/lib/languages/golang.ts'

describe('golang parity translation', () => {
  it('rewrites ParseInLocation calls when a string argument ends in a backslash escape', () => {
    const translated = golangHandler.translate(["ParseInLocation('2006', 'foo\\\\', 'UTC')"], 'ParseInLocation', 'time')

    expect(translated).toContain('locutusTimeParseInLocation(')
  })

  it('rewrites filepath Rel calls to the parity helper', () => {
    const translated = golangHandler.translate(["Rel('/a', '/b')"], 'Rel', 'filepath')

    expect(translated).toContain('locutusFilepathRel(')
  })

  it('rewrites filepath Rel calls with nested expressions', () => {
    const translated = golangHandler.translate(["Rel(Clean('/a'), '/b')"], 'Rel', 'filepath')

    expect(translated).toContain(`locutusFilepathRel(Clean("/a"), "/b")`)
  })
})
