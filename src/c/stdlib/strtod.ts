export function strtod(str: string): number {
  //  discuss at: https://locutus.io/c/stdlib/strtod/
  // original by: Kevin van Zonneveld (https://kvz.io)
  //      note 1: Parses a floating-point number from the start of the string.
  //      note 2: Stops at the first invalid trailing character, similar to C strtod.
  //   example 1: strtod('3.14')
  //   returns 1: 3.14
  //   example 2: strtod('  -2.5e2xyz')
  //   returns 2: -250
  //   example 3: strtod('abc')
  //   returns 3: 0

  const input = String(str).replace(/^\s+/, '')
  const match = input.match(/^[+-]?(?:\d+\.?\d*|\.\d+)(?:[eE][+-]?\d+)?/)
  if (!match || !match[0]) {
    return 0
  }

  const parsed = Number.parseFloat(match[0])
  return Number.isNaN(parsed) ? 0 : parsed
}
