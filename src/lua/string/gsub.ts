const LUA_PATTERN_ESCAPES: Record<string, string> = {
  a: '[A-Za-z]',
  A: '[^A-Za-z]',
  c: '[\\x00-\\x1F\\x7F]',
  C: '[^\\x00-\\x1F\\x7F]',
  d: '[0-9]',
  D: '[^0-9]',
  l: '[a-z]',
  L: '[^a-z]',
  p: '[!-/:-@[-`{-~]',
  P: '[^!-/:-@[-`{-~]',
  s: '\\s',
  S: '\\S',
  u: '[A-Z]',
  U: '[^A-Z]',
  w: '[A-Za-z0-9]',
  W: '[^A-Za-z0-9]',
  x: '[A-Fa-f0-9]',
  X: '[^A-Fa-f0-9]',
  z: '\\x00',
  Z: '[^\\x00]',
}

const LUA_CHAR_CLASS_ESCAPES: Record<string, string> = {
  a: 'A-Za-z',
  A: '^A-Za-z',
  c: '\\x00-\\x1F\\x7F',
  C: '^\\x00-\\x1F\\x7F',
  d: '0-9',
  D: '^0-9',
  l: 'a-z',
  L: '^a-z',
  p: '!-/:-@\\[-`\\{-~',
  P: '^!-/:-@\\[-`\\{-~',
  s: '\\s',
  S: '^\\s',
  u: 'A-Z',
  U: '^A-Z',
  w: 'A-Za-z0-9',
  W: '^A-Za-z0-9',
  x: 'A-Fa-f0-9',
  X: '^A-Fa-f0-9',
  z: '\\x00',
  Z: '^\\x00',
}

function escapeRegexLiteral(char: string): string {
  return /[\\^$.*+?()[\]{}|/]/.test(char) ? `\\${char}` : char
}

function escapeRegexClassLiteral(char: string): string {
  return char === '\\' || char === ']' || char === '^' ? `\\${char}` : char
}

function translateLuaCharClass(chars: string): string {
  let negate = false
  let source = chars
  if (source.startsWith('^')) {
    negate = true
    source = source.slice(1)
  }

  let out = ''

  for (let i = 0; i < source.length; i++) {
    const char = source[i] ?? ''
    if (char === '%') {
      const next = source[i + 1] ?? ''
      i++
      const mapped = LUA_CHAR_CLASS_ESCAPES[next]
      if (mapped) {
        out += mapped
        continue
      }
      out += escapeRegexLiteral(next)
      continue
    }

    if (char === '-') {
      out += i > 0 && i < source.length - 1 ? '-' : '\\-'
      continue
    }

    out += escapeRegexClassLiteral(char)
  }

  return negate ? `^${out}` : out
}

function canApplyLuaQuantifier(parts: string[]): boolean {
  if (parts.length === 0) {
    return false
  }

  const last = parts[parts.length - 1] ?? ''
  return last !== '(' && last !== '^' && last !== '$'
}

function translateLuaPattern(pattern: string): RegExp {
  const parts: string[] = []

  for (let i = 0; i < pattern.length; i++) {
    const char = pattern[i] ?? ''

    if (char === '%') {
      const next = pattern[i + 1] ?? ''
      if (next === '') {
        parts.push('%')
        continue
      }

      if (next === 'b' || next === 'f') {
        throw new Error('gsub(): unsupported Lua pattern feature')
      }

      i++
      parts.push(LUA_PATTERN_ESCAPES[next] ?? escapeRegexLiteral(next))
      continue
    }

    if (char === '[') {
      let classBody = ''
      let closed = false
      i++
      if (i < pattern.length && pattern[i] === '^') {
        classBody += '^'
        i++
      }
      if (i < pattern.length && pattern[i] === ']') {
        classBody += ']'
        i++
      }
      while (i < pattern.length && pattern[i] !== ']') {
        classBody += pattern[i] ?? ''
        i++
      }
      if (i < pattern.length && pattern[i] === ']') {
        closed = true
      }
      if (!closed) {
        throw new Error('gsub(): malformed Lua pattern')
      }
      parts.push(`[${translateLuaCharClass(classBody)}]`)
      continue
    }

    if (char === '.') {
      parts.push('[\\s\\S]')
      continue
    }

    if (char === '-' || char === '*' || char === '+' || char === '?') {
      if (canApplyLuaQuantifier(parts)) {
        parts[parts.length - 1] += char === '-' ? '*?' : char
      } else {
        parts.push(escapeRegexLiteral(char))
      }
      continue
    }

    if (char === '^') {
      parts.push(i === 0 ? '^' : '\\^')
      continue
    }

    if (char === '$') {
      parts.push(i === pattern.length - 1 ? '$' : '\\$')
      continue
    }

    if ('()'.includes(char)) {
      parts.push(char)
      continue
    }

    parts.push(escapeRegexLiteral(char))
  }

  return new RegExp(parts.join(''), 'g')
}

function applyLuaReplacement(template: string, match: string, captures: string[]): string {
  let out = ''

  for (let i = 0; i < template.length; i++) {
    const char = template[i] ?? ''
    if (char !== '%') {
      out += char
      continue
    }

    const next = template[i + 1] ?? ''
    if (next === '%') {
      out += '%'
      i++
      continue
    }

    if (/\d/.test(next)) {
      i++
      if (next === '0') {
        out += match
      } else {
        const capture = captures[Number(next) - 1]
        if (capture === undefined) {
          throw new Error(`invalid capture index %${next}`)
        }
        out += capture
      }
      continue
    }

    out += next
    i++
  }

  return out
}

export function gsub(source: string, pattern: string, replacement: string, limit?: number): [string, number] {
  //      discuss at: https://locutus.io/lua/gsub/
  // parity verified: Lua 5.4
  //     original by: Kevin van Zonneveld (https://kvz.io)
  //          note 1: Supports common Lua pattern classes and capture substitutions like %1 in replacement strings.
  //       example 1: gsub('hello world', 'l', 'L')
  //       returns 1: ['heLLo worLd', 3]
  //       example 2: gsub('123-456', '(%d+)', '[%1]', 1)
  //       returns 2: ['[123]-456', 1]
  //       example 3: gsub('abc', '%a', 'x')
  //       returns 3: ['xxx', 3]

  const value = String(source)
  const regex = translateLuaPattern(String(pattern))
  const maxReplacements = limit === undefined ? Number.POSITIVE_INFINITY : Math.max(0, Math.trunc(Number(limit)))
  let count = 0

  if (maxReplacements === 0) {
    return [value, 0]
  }

  const out = value.replace(regex, (...args) => {
    const match = String(args[0] ?? '')
    if (count >= maxReplacements) {
      return match
    }

    count++
    const captures = args.slice(1, -2).map((item) => String(item ?? ''))
    return applyLuaReplacement(String(replacement), match, captures)
  })

  return [out, count]
}
