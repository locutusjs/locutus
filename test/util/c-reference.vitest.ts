import { afterEach, describe, expect, it, vi } from 'vitest'

afterEach(() => {
  vi.unstubAllGlobals()
  vi.resetModules()
})

function apiPage(title: string, text: string) {
  return Response.json({ parse: { title, revid: 180431, text } })
}

describe('live C reference discovery', () => {
  it('discovers every current catalog header through the identified read-only API in series', async () => {
    const pages: Record<string, string> = {
      'c/header': '<a title="c/header/stdio">stdio</a><a title="c/header/future">future</a>',
      'c/header/stdio':
        '<h3><span class="mw-headline" id="Synopsis">Synopsis</span></h3><pre>int printf(const char *format, ...);</pre><h3>Notes</h3>',
      'c/header/future':
        '<h3><span class="mw-headline" id="Synopsis">Synopsis</span></h3><pre>int future_function(void);</pre><h3>Notes</h3>',
    }
    let active = 0
    let maxActive = 0
    const fetch = vi.fn(async (input: string | URL, init?: RequestInit) => {
      active++
      maxActive = Math.max(maxActive, active)
      await new Promise<void>((resolve) => setImmediate(resolve))
      active--
      const url = new URL(input)
      expect(url.origin + url.pathname).toBe('https://cppreference.com/api.php')
      expect(Object.fromEntries(url.searchParams)).toMatchObject({
        action: 'parse',
        prop: 'text|revid',
        format: 'json',
        formatversion: '2',
        disableeditsection: '1',
        maxlag: '5',
      })
      expect(new Headers(init?.headers).get('User-Agent')).toMatch(/Locutus.*https:\/\/github.com\/locutusjs\/locutus/)
      expect(init?.signal).toBeInstanceOf(AbortSignal)
      const page = url.searchParams.get('page') ?? ''
      expect(pages).toHaveProperty(page)
      return apiPage(page, pages[page] ?? '')
    })
    vi.stubGlobal('fetch', fetch)
    const { discoverCUpstreamSurface, discoverCUpstreamNamespaceCatalog } = await import(
      '../parity/lib/upstream-surface-canonical.ts'
    )
    const snapshot = await discoverCUpstreamSurface()

    expect(snapshot.catalog?.sourceRef).toBe('https://en.cppreference.com/w/c/header')
    expect(snapshot.namespaces).toEqual([
      expect.objectContaining({
        namespace: 'future',
        sourceRef: 'https://en.cppreference.com/w/c/header/future',
        entries: ['future_function'],
      }),
      expect.objectContaining({
        namespace: 'stdio',
        sourceRef: 'https://en.cppreference.com/w/c/header/stdio',
        entries: ['printf'],
      }),
    ])
    expect(maxActive).toBe(1)
    expect((await discoverCUpstreamNamespaceCatalog()).namespaces).toEqual(['future', 'stdio'])
    expect(fetch).toHaveBeenCalledTimes(3)
  })

  it.each([
    ['HTTP denial', () => new Response('Forbidden', { status: 403 }), /403/],
    ['API maxlag', () => Response.json({ error: { code: 'maxlag', info: 'Waiting for replication' } }), /maxlag/],
    ['invalid JSON', () => new Response('<html>challenge</html>'), /JSON|Unexpected token/],
    [
      'missing page',
      () => Response.json({ error: { code: 'missingtitle', info: 'Page does not exist' } }),
      /missingtitle/,
    ],
    ['wrong article', () => apiPage('cpp/header', '<a title="c/header/stdio">stdio</a>'), /Invalid cppreference/],
    ['empty content', () => apiPage('c/header', ''), /Invalid cppreference/],
    ['empty catalog', () => apiPage('c/header', '<p>No header links</p>'), /Invalid cppreference/],
    [
      'missing revision',
      () => Response.json({ parse: { title: 'c/header', text: '<p>content</p>' } }),
      /Invalid cppreference/,
    ],
  ])('fails visibly on %s without retrying or substituting saved snapshots', async (_name, response, message) => {
    const fetch = vi.fn(async () => response())
    vi.stubGlobal('fetch', fetch)
    const { discoverCUpstreamNamespaceCatalog } = await import('../parity/lib/upstream-surface-canonical.ts')

    await expect(discoverCUpstreamNamespaceCatalog()).rejects.toThrow(message)
    expect(fetch).toHaveBeenCalledTimes(1)
  })

  it('stops before requesting more headers after a header failure', async () => {
    const fetch = vi
      .fn()
      .mockResolvedValueOnce(
        apiPage('c/header', '<a title="c/header/assert">assert</a><a title="c/header/math">math</a>'),
      )
      .mockResolvedValueOnce(new Response('Forbidden', { status: 403 }))
    vi.stubGlobal('fetch', fetch)
    const { discoverCUpstreamSurface } = await import('../parity/lib/upstream-surface-canonical.ts')

    await expect(discoverCUpstreamSurface()).rejects.toThrow(/403/)
    expect(fetch).toHaveBeenCalledTimes(2)
  })
})
