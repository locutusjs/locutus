function normalizeRegExp(pattern: string | RegExp, all: boolean, caseInsensitive: boolean): RegExp {
  const source = typeof pattern === 'string' ? pattern : pattern.source
  let flags = typeof pattern === 'string' ? '' : pattern.flags

  flags = all ? (flags.includes('g') ? flags : `${flags}g`) : flags.replaceAll('g', '')
  flags = caseInsensitive ? (flags.includes('i') ? flags : `${flags}i`) : flags

  const uniqueFlags = Array.from(new Set(flags.split(''))).join('')
  return new RegExp(source, uniqueFlags)
}

export function regsub(
  pattern: string | RegExp,
  str: string,
  replacement: string,
  all: boolean = false,
  caseInsensitive: boolean = false,
): string {
  //      discuss at: https://locutus.io/tcl/regsub/
  // parity verified: Tcl 8.6
  //     original by: Kevin van Zonneveld (https://kvz.io)
  //          note 1: Mirrors Tcl string regsub single/`-all` replacement and optional case-insensitive matching.
  //       example 1: regsub('[aeiou]', 'hello world', '*')
  //       returns 1: 'h*llo world'
  //       example 2: regsub('[aeiou]', 'hello world', '*', true)
  //       returns 2: 'h*ll* w*rld'
  //       example 3: regsub('foo', 'Foo foo FOO', 'bar', true, true)
  //       returns 3: 'bar bar bar'

  const source = String(str)
  const nextValue = String(replacement)
  const regex = normalizeRegExp(pattern, all, caseInsensitive)
  return source.replace(regex, nextValue)
}
