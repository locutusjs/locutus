import { createRequire } from 'node:module'
import { describe, expect, it } from 'vitest'

type FeedConfig = {
  feed?: {
    path?: string | string[]
    type?: string | string[]
  }
}

type AtomHtmlTypeModule = {
  patchAtomHtmlTypes: (xml: string) => string
  resolveAtomFeedPath: (config: FeedConfig) => string | null
}

const require = createRequire(import.meta.url)
const { patchAtomHtmlTypes, resolveAtomFeedPath } =
  require('../../website/scripts/fix-atom-html-type.cjs') as AtomHtmlTypeModule

describe('patchAtomHtmlTypes', () => {
  it('adds html type attributes to Atom content and summary elements', () => {
    const xml = '<entry><summary><![CDATA[test]]></summary><content><![CDATA[body]]></content></entry>'

    expect(patchAtomHtmlTypes(xml)).toBe(
      '<entry><summary type="html"><![CDATA[test]]></summary><content type="html"><![CDATA[body]]></content></entry>',
    )
  })

  it('does not mutate literal summary or content tags inside CDATA payloads', () => {
    const xml = [
      '<entry>',
      '<summary><![CDATA[example <summary>snippet</summary>]]></summary>',
      '<content><![CDATA[code <content>body</content>]]></content>',
      '</entry>',
    ].join('')

    expect(patchAtomHtmlTypes(xml)).toBe(
      [
        '<entry>',
        '<summary type="html"><![CDATA[example <summary>snippet</summary>]]></summary>',
        '<content type="html"><![CDATA[code <content>body</content>]]></content>',
        '</entry>',
      ].join(''),
    )
  })
})

describe('resolveAtomFeedPath', () => {
  it('handles array feed config', () => {
    expect(resolveAtomFeedPath({ feed: { type: ['rss2', 'atom'], path: ['rss.xml', '/atom.xml'] } })).toBe('atom.xml')
  })
})
