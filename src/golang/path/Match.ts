const escapeRegexChar = (char: string): string => {
  return /[\\^$.*+?()[\]{}|]/.test(char) ? `\\${char}` : char
}

const toPathRegex = (pattern: string): RegExp | null => {
  let regex = '^'
  let index = 0

  while (index < pattern.length) {
    const char = pattern[index] ?? ''

    if (char === '*') {
      regex += '[^/]*'
      index += 1
      continue
    }

    if (char === '?') {
      regex += '[^/]'
      index += 1
      continue
    }

    if (char === '[') {
      let cursor = index + 1
      let negate = false

      const firstClassChar = pattern[cursor]
      if (firstClassChar === '!' || firstClassChar === '^') {
        negate = true
        cursor += 1
      }

      if (cursor >= pattern.length) {
        return null
      }

      let content = ''
      let sawAny = false
      for (; cursor < pattern.length; cursor += 1) {
        const classChar = pattern[cursor] ?? ''
        if (classChar === ']' && sawAny) {
          break
        }
        sawAny = true

        if (classChar === '\\') {
          const escaped = pattern[cursor + 1]
          if (escaped === undefined) {
            return null
          }
          content += escapeRegexChar(escaped)
          cursor += 1
          continue
        }

        if (classChar === ']') {
          content += '\\]'
        } else {
          content += classChar
        }
      }

      if (cursor >= pattern.length || pattern[cursor] !== ']') {
        return null
      }

      regex += `[${negate ? '^' : ''}${content}]`
      index = cursor + 1
      continue
    }

    if (char === '\\') {
      const escaped = pattern[index + 1]
      if (escaped === undefined) {
        return null
      }
      regex += escapeRegexChar(escaped)
      index += 2
      continue
    }

    regex += char === '/' ? '/' : escapeRegexChar(char)
    index += 1
  }

  regex += '$'
  return new RegExp(regex)
}

export function Match(pattern: string, name: string): boolean {
  //      discuss at: https://locutus.io/golang/path/Match
  // parity verified: Go 1.23
  //     original by: Kevin van Zonneveld (https://kvz.io)
  //          note 1: Supports Go-style wildcards *, ?, and character classes [].
  //          note 2: Returns false for malformed patterns.
  //       example 1: Match('*.go', 'main.go')
  //       returns 1: true
  //       example 2: Match('a/?/c', 'a/b/c')
  //       returns 2: true
  //       example 3: Match('a/*.go', 'a/b/main.go')
  //       returns 3: false
  //       example 4: Match('[a-c]at', 'bat')
  //       returns 4: true

  const expression = toPathRegex(String(pattern))
  if (!expression) {
    return false
  }

  return expression.test(String(name))
}
