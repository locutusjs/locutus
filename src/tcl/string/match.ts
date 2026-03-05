function globToRegExp(pattern: string): RegExp {
  let regex = '^'
  let i = 0

  while (i < pattern.length) {
    const char = pattern[i] as string

    if (char === '\\') {
      const next = pattern[i + 1]
      if (next) {
        regex += `\\${next}`
        i += 2
      } else {
        regex += '\\\\'
        i += 1
      }
      continue
    }

    if (char === '*') {
      regex += '.*'
      i += 1
      continue
    }

    if (char === '?') {
      regex += '.'
      i += 1
      continue
    }

    if (char === '[') {
      const end = pattern.indexOf(']', i + 1)
      if (end > i + 1) {
        let content = pattern.slice(i + 1, end)
        if (content.startsWith('!')) {
          content = `^${content.slice(1)}`
        }
        regex += `[${content}]`
        i = end + 1
        continue
      }
    }

    if ('\\.^$+{}()|'.includes(char)) {
      regex += `\\${char}`
    } else {
      regex += char
    }
    i += 1
  }

  regex += '$'
  return new RegExp(regex)
}

export function match(pattern: string, str: string): 1 | 0 {
  //      discuss at: https://locutus.io/tcl/match/
  // parity verified: Tcl 8.6
  //     original by: Kevin van Zonneveld (https://kvz.io)
  //          note 1: Uses Tcl-style glob pattern matching (`*`, `?`, and character classes like `[a-z]`).
  //       example 1: match('h*o', 'hello')
  //       returns 1: 1
  //       example 2: match('file?.txt', 'file1.txt')
  //       returns 2: 1
  //       example 3: match('a[0-9]', 'ab')
  //       returns 3: 0

  const regex = globToRegExp(String(pattern))
  return regex.test(String(str)) ? 1 : 0
}
