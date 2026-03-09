type ReFindallFlags = number | string

const PY_RE_IGNORECASE = 2
const PY_RE_MULTILINE = 8
const PY_RE_DOTALL = 16

export function findall(pattern: string | RegExp, source: string, flags: ReFindallFlags = 0): Array<string | string[]> {
  //      discuss at: https://locutus.io/python/re/findall/
  // parity verified: Python 3.12
  //     original by: Kevin van Zonneveld (https://kvz.io)
  //          note 1: Returns all regex matches, following Python re.findall capture-shape behavior.
  //          note 2: Supports a subset of numeric flags (IGNORECASE=2, MULTILINE=8, DOTALL=16).
  //       example 1: findall('\\d+', 'a1b22c333')
  //       returns 1: ['1', '22', '333']
  //       example 2: findall('(\\w+)-(\\d+)', 'x-1 y-20')
  //       returns 2: [['x', '1'], ['y', '20']]
  //       example 3: findall('abc', 'ABC abc', 2)
  //       returns 3: ['ABC', 'abc']

  const input = String(source)
  const regex = createGlobalRegex(pattern, flags)
  const out: Array<string | string[]> = []

  regex.lastIndex = 0
  while (true) {
    const match = regex.exec(input)
    if (!match) {
      break
    }

    if (match.length <= 1) {
      out.push(match[0] ?? '')
    } else if (match.length === 2) {
      out.push(match[1] ?? '')
    } else {
      out.push(match.slice(1).map((value) => value ?? ''))
    }

    // Advance zero-width matches manually so the global scan always makes progress.
    if ((match[0] ?? '') === '') {
      if (regex.lastIndex >= input.length) {
        break
      }
      regex.lastIndex += 1
    }
  }

  return out
}

function createGlobalRegex(pattern: string | RegExp, flags: ReFindallFlags): RegExp {
  const source = pattern instanceof RegExp ? pattern.source : String(pattern)
  const base = pattern instanceof RegExp ? pattern.flags : ''
  const extra = normalizeRegexFlags(flags)
  const combined = dedupeFlags((base + extra).replace(/g/g, '').replace(/y/g, ''))
  return new RegExp(source, `${combined}g`)
}

function normalizeRegexFlags(flags: ReFindallFlags): string {
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
