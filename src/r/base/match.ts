export function match(
  value: string | number | boolean | null,
  table: Array<string | number | boolean | null> | unknown,
  nomatch: number | null = null,
): number | null {
  //  discuss at: https://locutus.io/r/match/
  // original by: Kevin van Zonneveld (https://kvz.io)
  //      note 1: Returns the first 1-based match position, similar to R match.
  //      note 2: Returns nomatch when provided, otherwise null.
  //   example 1: match('b', ['a', 'b', 'c'])
  //   returns 1: 2
  //   example 2: match('z', ['a', 'b', 'c'])
  //   returns 2: null
  //   example 3: match(3, [1, 2, 3, 2], 0)
  //   returns 3: 3

  if (!Array.isArray(table)) {
    return nomatch
  }

  for (let i = 0; i < table.length; i++) {
    if (Object.is(table[i], value)) {
      return i + 1
    }
  }

  return nomatch
}
