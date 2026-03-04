export function split(str: string, delimiter: string, limit?: number): string[] {
  //      discuss at: https://locutus.io/powershell/split/
  // parity verified: PowerShell 7.4
  //     original by: Kevin van Zonneveld (https://kvz.io)
  //          note 1: Splits a string by literal delimiter and supports optional max item count.
  //       example 1: split('a,b,c', ',')
  //       returns 1: ['a', 'b', 'c']
  //       example 2: split('a,b,c', ',', 2)
  //       returns 2: ['a', 'b']
  //       example 3: split('hello-world', '-')
  //       returns 3: ['hello', 'world']

  const source = String(str)
  const separator = String(delimiter)

  if (limit === undefined) {
    return source.split(separator)
  }

  const maxItems = Math.trunc(Number(limit))
  if (!Number.isFinite(maxItems) || maxItems < 0) {
    throw new RangeError('split(): limit must be a non-negative integer')
  }
  if (maxItems === 0) {
    return []
  }

  return source.split(separator).slice(0, maxItems)
}
