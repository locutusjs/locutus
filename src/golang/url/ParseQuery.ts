import { QueryUnescape } from './QueryUnescape.ts'

type QueryValues = Record<string, string[]>

export function ParseQuery(query: string): QueryValues {
  //      discuss at: https://locutus.io/golang/url/ParseQuery
  // parity verified: Go 1.23
  //     original by: Kevin van Zonneveld (https://kvz.io)
  //          note 1: Parses URL-encoded key/value pairs into arrays per key.
  //       example 1: ParseQuery('a=1&b=2&b=3')
  //       returns 1: {a: ['1'], b: ['2', '3']}
  //       example 2: ParseQuery('q=go+lang&x=%2B')
  //       returns 2: {q: ['go lang'], x: ['+']}
  //       example 3: ParseQuery('empty=&flag')
  //       returns 3: {empty: [''], flag: ['']}

  const raw = String(query)
  if (raw === '') {
    return {}
  }

  const out: QueryValues = {}
  const pairs = raw.split('&')

  for (const pair of pairs) {
    if (pair === '') {
      continue
    }

    const separator = pair.indexOf('=')
    const keyRaw = separator >= 0 ? pair.slice(0, separator) : pair
    const valueRaw = separator >= 0 ? pair.slice(separator + 1) : ''
    const key = QueryUnescape(keyRaw)
    const value = QueryUnescape(valueRaw)

    const existing = out[key]
    if (existing) {
      existing.push(value)
    } else {
      out[key] = [value]
    }
  }

  return out
}
