type TclMapInput = Record<string, string> | Array<[string, string]> | string[]

function normalizeMapEntries(mappings: TclMapInput): Array<[string, string]> {
  if (Array.isArray(mappings)) {
    if (mappings.every((entry) => Array.isArray(entry) && entry.length === 2)) {
      return mappings.map((entry) => [String(entry[0]), String(entry[1])])
    }

    const out: Array<[string, string]> = []
    for (let i = 0; i + 1 < mappings.length; i += 2) {
      out.push([String(mappings[i]), String(mappings[i + 1])])
    }
    return out
  }

  return Object.entries(mappings).map(([key, value]) => [String(key), String(value)])
}

export function map(mappings: TclMapInput, str: string): string {
  //      discuss at: https://locutus.io/tcl/map/
  // parity verified: Tcl 8.6
  //     original by: Kevin van Zonneveld (https://kvz.io)
  //          note 1: Applies key/value replacements in left-to-right single-pass order like Tcl string map.
  //       example 1: map({abc: 'X', a: 'Y'}, 'abc abca')
  //       returns 1: 'X XY'
  //       example 2: map([['cat', 'dog'], [' ', '_']], 'cat cat')
  //       returns 2: 'dog_dog'
  //       example 3: map(['ab', 'X', 'a', 'Y'], 'ababa')
  //       returns 3: 'XXY'

  const source = String(str)
  const entries = normalizeMapEntries(mappings).filter(([key]) => key.length > 0)
  if (entries.length === 0) {
    return source
  }

  let out = ''
  let cursor = 0

  while (cursor < source.length) {
    let matched = false
    for (const [key, value] of entries) {
      if (source.startsWith(key, cursor)) {
        out += value
        cursor += key.length
        matched = true
        break
      }
    }

    if (!matched) {
      out += source[cursor]
      cursor += 1
    }
  }

  return out
}
