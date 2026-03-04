const expandTrSet = (pattern: string): string[] => {
  const chars = [...pattern]
  const expanded: string[] = []

  for (let i = 0; i < chars.length; i += 1) {
    const startChar = chars[i]
    if (startChar === undefined) {
      continue
    }

    if (i + 2 < chars.length && chars[i + 1] === '-') {
      const endChar = chars[i + 2]
      if (endChar !== undefined) {
        const startCode = startChar.codePointAt(0)
        const endCode = endChar.codePointAt(0)
        if (startCode !== undefined && endCode !== undefined) {
          const step = startCode <= endCode ? 1 : -1
          for (let code = startCode; step > 0 ? code <= endCode : code >= endCode; code += step) {
            expanded.push(String.fromCodePoint(code))
          }
          i += 2
          continue
        }
      }
    }

    expanded.push(startChar)
  }

  return expanded
}

export function tr(str: string, from: string, to: string): string {
  // parity verified: Ruby 3.3
  //      discuss at: https://locutus.io/ruby/String/tr/
  //     original by: Kevin van Zonneveld (https://kvz.io)
  //          note 1: Transliterate characters from `from` set to `to` set.
  //          note 2: Supports basic ranges like `a-z`; complement (`^`) is intentionally not implemented.
  //       example 1: tr('hello', 'el', 'ip')
  //       returns 1: 'hippo'
  //       example 2: tr('abcxyz', 'a-z', 'A-Z')
  //       returns 2: 'ABCXYZ'
  //       example 3: tr('banana', 'an', 'o')
  //       returns 3: 'booooo'

  const source = String(str)
  const fromChars = expandTrSet(String(from))
  if (fromChars.length === 0) {
    return source
  }

  const toChars = expandTrSet(String(to))
  const map = new Map<string, string>()
  for (let index = 0; index < fromChars.length; index += 1) {
    const key = fromChars[index]
    if (key === undefined) {
      continue
    }
    const replacement = toChars.length === 0 ? '' : (toChars[Math.min(index, toChars.length - 1)] ?? '')
    map.set(key, replacement)
  }

  let out = ''
  for (const char of source) {
    out += map.has(char) ? (map.get(char) ?? char) : char
  }

  return out
}
