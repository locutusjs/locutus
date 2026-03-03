export function QueryUnescape(s: string): string {
  //      discuss at: https://locutus.io/golang/url/QueryUnescape
  // parity verified: Go 1.23
  //     original by: Kevin van Zonneveld (https://kvz.io)
  //          note 1: Decodes query-escaped strings where `+` maps to a space.
  //       example 1: QueryUnescape('a+b%2Bc')
  //       returns 1: 'a b+c'
  //       example 2: QueryUnescape('https%3A%2F%2Flocutus.io%2F%3Fq%3Dgo+lang')
  //       returns 2: 'https://locutus.io/?q=go lang'
  //       example 3: QueryUnescape('%2Bplus')
  //       returns 3: '+plus'

  const raw = String(s).replace(/\+/g, ' ')
  try {
    return decodeURIComponent(raw)
  } catch {
    throw new TypeError('QueryUnescape(): invalid query escape')
  }
}
