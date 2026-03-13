import { describe, expect, it } from 'vitest'
import { extractReleaseNotes } from '../../scripts/extract-release-notes.ts'

describe('extractReleaseNotes', () => {
  it('returns the body under the requested release heading', () => {
    const changelog = [
      '# Changelog',
      '',
      '## main',
      '',
      'Released: TBA.',
      '',
      '## v1.2.3',
      '',
      'Released: 2026-03-13.',
      '',
      '### Fixes',
      '',
      '- Fixed a thing.',
      '',
      '## v1.2.2',
      '',
      'Released: 2026-03-12.',
      '',
    ].join('\n')

    expect(extractReleaseNotes(changelog, 'v1.2.3')).toBe(
      ['Released: 2026-03-13.', '', '### Fixes', '', '- Fixed a thing.'].join('\n'),
    )
  })

  it('throws when the requested release heading is missing', () => {
    expect(() => extractReleaseNotes('## v1.2.2\n\nReleased: 2026-03-12.\n', 'v1.2.3')).toThrow(/heading not found/i)
  })

  it('throws when the requested release heading is duplicated', () => {
    const changelog = ['## v1.2.3', '', 'First body', '', '## v1.2.3', '', 'Second body'].join('\n')

    expect(() => extractReleaseNotes(changelog, 'v1.2.3')).toThrow(/multiple times/i)
  })

  it('throws when the requested release heading has no notes', () => {
    const changelog = ['## v1.2.3', '', '## v1.2.2', '', 'Released: 2026-03-12.'].join('\n')

    expect(() => extractReleaseNotes(changelog, 'v1.2.3')).toThrow(/no notes/i)
  })
})
