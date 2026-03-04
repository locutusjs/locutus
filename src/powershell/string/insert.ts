export function insert(str: string, startIndex: number, value: string): string {
  //      discuss at: https://locutus.io/powershell/insert/
  // parity verified: PowerShell 7.4
  //     original by: Kevin van Zonneveld (https://kvz.io)
  //       example 1: insert('HelloWorld', 5, ' ')
  //       returns 1: 'Hello World'
  //       example 2: insert('abcd', 0, 'X')
  //       returns 2: 'Xabcd'
  //       example 3: insert('abcd', 4, '!')
  //       returns 3: 'abcd!'

  const source = String(str)
  const start = Math.trunc(Number(startIndex))
  if (!Number.isFinite(start) || start < 0 || start > source.length) {
    throw new RangeError('insert(): startIndex out of range')
  }

  return source.slice(0, start) + String(value) + source.slice(start)
}
