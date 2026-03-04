export function substring(str: string, startIndex: number, length?: number): string {
  //      discuss at: https://locutus.io/powershell/substring/
  // parity verified: PowerShell 7.4
  //     original by: Kevin van Zonneveld (https://kvz.io)
  //       example 1: substring('Hello World', 6)
  //       returns 1: 'World'
  //       example 2: substring('Hello World', 0, 5)
  //       returns 2: 'Hello'
  //       example 3: substring('abcdef', 2, 2)
  //       returns 3: 'cd'

  const source = String(str)
  const start = Math.trunc(Number(startIndex))
  if (!Number.isFinite(start) || start < 0 || start > source.length) {
    throw new RangeError('substring(): startIndex out of range')
  }

  if (length === undefined) {
    return source.slice(start)
  }

  const count = Math.trunc(Number(length))
  if (!Number.isFinite(count) || count < 0 || start + count > source.length) {
    throw new RangeError('substring(): length out of range')
  }

  return source.slice(start, start + count)
}
