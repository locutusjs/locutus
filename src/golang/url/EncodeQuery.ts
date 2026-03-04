import { ParseQuery } from './ParseQuery.ts'
import { QueryEscape } from './QueryEscape.ts'

type QueryValue = string | string[]
type QueryValues = Record<string, QueryValue>

const normalizeValues = (input: QueryValues): Record<string, string[]> => {
  const out: Record<string, string[]> = {}

  for (const key of Object.keys(input)) {
    const raw = input[key]
    if (Array.isArray(raw)) {
      out[key] = raw.map((value) => String(value))
      continue
    }
    out[key] = [String(raw)]
  }

  return out
}

export function EncodeQuery(values: QueryValues | string): string {
  //      discuss at: https://locutus.io/golang/url/EncodeQuery
  // parity verified: Go 1.23
  //     original by: Kevin van Zonneveld (https://kvz.io)
  //          note 1: Encodes query values with deterministic key ordering, mirroring Go's url.Values.Encode.
  //       example 1: EncodeQuery('b=2&b=3&a=1')
  //       returns 1: 'a=1&b=2&b=3'
  //       example 2: EncodeQuery('z=last&a=first')
  //       returns 2: 'a=first&z=last'
  //       example 3: EncodeQuery('flag&empty=')
  //       returns 3: 'empty=&flag='

  const parsed: Record<string, string[]> =
    typeof values === 'string' ? ParseQuery(values) : normalizeValues(values as QueryValues)

  const pairs: string[] = []
  const keys = Object.keys(parsed).sort()

  for (const key of keys) {
    const entries = parsed[key] ?? []
    if (entries.length === 0) {
      pairs.push(`${QueryEscape(key)}=`)
      continue
    }

    for (const value of entries) {
      pairs.push(`${QueryEscape(key)}=${QueryEscape(value)}`)
    }
  }

  return pairs.join('&')
}
