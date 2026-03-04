export function padright(str: string, totalWidth: number, paddingChar?: string): string {
  //      discuss at: https://locutus.io/powershell/padright/
  // parity verified: PowerShell 7.4
  //     original by: Kevin van Zonneveld (https://kvz.io)
  //       example 1: padright('42', 5)
  //       returns 1: '42   '
  //       example 2: padright('42', 5, '0')
  //       returns 2: '42000'
  //       example 3: padright('hello', 3)
  //       returns 3: 'hello'

  const source = String(str)
  const width = Math.trunc(Number(totalWidth))
  if (!Number.isFinite(width) || width < 0) {
    throw new RangeError('padright(): totalWidth must be a non-negative integer')
  }

  const fill = paddingChar === undefined ? ' ' : String(paddingChar)
  if (fill === '') {
    return source
  }

  return source.padEnd(width, fill[0] ?? ' ')
}
