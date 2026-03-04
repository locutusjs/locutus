export function ResolveReference(baseURL: string, refURL: string): string {
  //      discuss at: https://locutus.io/golang/url/ResolveReference
  // parity verified: Go 1.23
  //     original by: Kevin van Zonneveld (https://kvz.io)
  //          note 1: Resolves a reference URL against a base URL, following RFC 3986 path rules.
  //       example 1: ResolveReference('https://locutus.io/a/b/c', '../d?x=1')
  //       returns 1: 'https://locutus.io/a/d?x=1'
  //       example 2: ResolveReference('https://locutus.io/a/b/', './c#top')
  //       returns 2: 'https://locutus.io/a/b/c#top'
  //       example 3: ResolveReference('https://locutus.io/a/b/', 'http://example.com/x')
  //       returns 3: 'http://example.com/x'

  const baseRaw = String(baseURL)
  const refRaw = String(refURL)

  try {
    const base = new URL(baseRaw)
    return new URL(refRaw, base).toString()
  } catch {
    return ''
  }
}
