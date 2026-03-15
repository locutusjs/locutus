type ReSubnReplacement = string | ((match: string, ...groups: Array<string | undefined>) => string)
type ReSubnFlags = number | string

const PY_RE_IGNORECASE = 2
const PY_RE_MULTILINE = 8
const PY_RE_DOTALL = 16

export function subn(
  pattern: string | RegExp,
  replacement: ReSubnReplacement,
  source: string,
  count: number = 0,
  flags: ReSubnFlags = 0,
): [string, number] {
  //      discuss at: https://locutus.io/python/re/subn/
  // parity verified: Python 3.12
  //     original by: Kevin van Zonneveld (https://kvz.io)
  //          note 1: Returns the substituted string together with the number of replacements applied.
  //          note 2: Supports a subset of numeric flags (IGNORECASE=2, MULTILINE=8, DOTALL=16).
  //       example 1: subn('a+', '-', 'caaab')
  //       returns 1: ['c-b', 1]
  //       example 2: subn('(\\d+)', '#', 'a1b22c333')
  //       returns 2: ['a#b#c#', 3]
  //       example 3: subn('x', 'y', 'xxx', 2)
  //       returns 3: ['yyx', 2]
  //       example 4: subn('abc', 'X', 'ABC abc', 0, 2)
  //       returns 4: ['X X', 2]

  const input = String(source)
  const maxCount = normalizeCount(count)
  const regex = createGlobalRegex(pattern, flags)
  const replacementFn = typeof replacement === 'function' ? replacement : null
  const replacementTemplate = typeof replacement === 'string' ? replacement : ''

  let out = ''
  let lastIndex = 0
  let replaced = 0
  regex.lastIndex = 0

  while (maxCount === 0 || replaced < maxCount) {
    const match = regex.exec(input)
    if (!match) {
      break
    }

    const full = match[0] ?? ''
    const start = match.index
    const end = start + full.length

    out += input.slice(lastIndex, start)
    out +=
      replacementFn !== null
        ? String(replacementFn(full, ...match.slice(1)))
        : applyPythonReplacementTemplate(replacementTemplate, full, match.slice(1), match.groups)
    lastIndex = end
    replaced += 1

    if (full === '') {
      if (regex.lastIndex >= input.length) {
        break
      }
      regex.lastIndex += 1
    }
  }

  out += input.slice(lastIndex)
  return [replaced > 0 ? out : input, replaced]
}

function normalizeCount(count: number): number {
  const n = Number(count)
  if (!Number.isFinite(n) || n <= 0) {
    return 0
  }
  return Math.floor(n)
}

function createGlobalRegex(pattern: string | RegExp, flags: ReSubnFlags): RegExp {
  const source = pattern instanceof RegExp ? pattern.source : String(pattern)
  const base = pattern instanceof RegExp ? pattern.flags : ''
  const extra = normalizeRegexFlags(flags)
  const combined = dedupeFlags((base + extra).replace(/g/g, '').replace(/y/g, ''))
  return new RegExp(source, `${combined}g`)
}

function normalizeRegexFlags(flags: ReSubnFlags): string {
  if (typeof flags === 'string') {
    return dedupeFlags(flags.replace(/[^dgimsuvy]/g, ''))
  }

  let out = ''
  if (flags & PY_RE_IGNORECASE) {
    out += 'i'
  }
  if (flags & PY_RE_MULTILINE) {
    out += 'm'
  }
  if (flags & PY_RE_DOTALL) {
    out += 's'
  }
  return out
}

function dedupeFlags(flags: string): string {
  const seen = new Set<string>()
  let out = ''
  for (const flag of flags) {
    if (!seen.has(flag)) {
      seen.add(flag)
      out += flag
    }
  }
  return out
}

function applyPythonReplacementTemplate(
  template: string,
  full: string,
  groups: Array<string | undefined>,
  named?: Record<string, string>,
): string {
  let out = ''

  for (let i = 0; i < template.length; i++) {
    const char = template[i]
    if (char !== '\\') {
      out += char
      continue
    }

    const next = template[i + 1]
    if (!next) {
      out += '\\'
      continue
    }

    if (next === '0') {
      let token = '0'
      let j = i + 2
      while (j < template.length && /[0-7]/.test(template[j] ?? '') && token.length < 3) {
        token += template[j]
        j += 1
      }
      out += String.fromCharCode(Number.parseInt(token, 8))
      i = j - 1
      continue
    }

    if (/\d/.test(next)) {
      let token = next
      let j = i + 2
      while (j < template.length && /\d/.test(template[j] ?? '') && token.length < 2) {
        token += template[j]
        j += 1
      }
      out += groups[Number.parseInt(token, 10) - 1] ?? ''
      i = j - 1
      continue
    }

    if (next === 'g' && template[i + 2] === '<') {
      const close = template.indexOf('>', i + 3)
      if (close > -1) {
        const token = template.slice(i + 3, close)
        if (/^\d+$/.test(token)) {
          const index = Number.parseInt(token, 10)
          out += index === 0 ? full : (groups[index - 1] ?? '')
        } else {
          out += named?.[token] ?? ''
        }
        i = close
        continue
      }
    }

    const simpleEscapes: Record<string, string> = {
      '\\': '\\',
      n: '\n',
      r: '\r',
      t: '\t',
      f: '\f',
      v: '\v',
      a: '\x07',
      b: '\b',
    }
    if (simpleEscapes[next] !== undefined) {
      out += simpleEscapes[next]
      i += 1
      continue
    }

    out += next
    i += 1
  }

  return out
}
