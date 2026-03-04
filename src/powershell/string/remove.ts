export function remove(str: string, startIndex: number, count?: number): string {
  //      discuss at: https://locutus.io/powershell/remove/
  // parity verified: PowerShell 7.4
  //     original by: Kevin van Zonneveld (https://kvz.io)
  //       example 1: remove('Hello World', 5)
  //       returns 1: 'Hello'
  //       example 2: remove('Hello World', 5, 1)
  //       returns 2: 'HelloWorld'
  //       example 3: remove('abcdef', 2, 2)
  //       returns 3: 'abef'

  const source = String(str)
  const start = Math.trunc(Number(startIndex))
  if (!Number.isFinite(start) || start < 0 || start > source.length) {
    throw new RangeError('remove(): startIndex out of range')
  }

  if (count === undefined) {
    return source.slice(0, start)
  }

  const amount = Math.trunc(Number(count))
  if (!Number.isFinite(amount) || amount < 0 || start + amount > source.length) {
    throw new RangeError('remove(): count out of range')
  }

  return source.slice(0, start) + source.slice(start + amount)
}
