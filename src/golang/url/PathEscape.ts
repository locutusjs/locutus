const strictEncodeURIComponent = (value: string): string =>
  encodeURIComponent(value).replace(/[!'()*]/g, (char) => `%${char.charCodeAt(0).toString(16).toUpperCase()}`)

export function PathEscape(s: string): string {
  //      discuss at: https://locutus.io/golang/url/PathEscape
  // parity verified: Go 1.23
  //     original by: Kevin van Zonneveld (https://kvz.io)
  //          note 1: Encodes a URL path segment and preserves space as `%20` (not `+`).
  //       example 1: PathEscape('a b/c')
  //       returns 1: 'a%20b%2Fc'
  //       example 2: PathEscape('100%')
  //       returns 2: '100%25'
  //       example 3: PathEscape('こんにちは')
  //       returns 3: '%E3%81%93%E3%82%93%E3%81%AB%E3%81%A1%E3%81%AF'

  return strictEncodeURIComponent(String(s))
}
