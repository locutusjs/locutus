function escapeForCharClass(chars: string): string {
  return chars.replace(/[\\\]^/-]/g, '\\$&')
}

export function trimstart(str: string, chars?: string): string {
  //      discuss at: https://locutus.io/powershell/trimstart/
  // parity verified: PowerShell 7.4
  //     original by: Kevin van Zonneveld (https://kvz.io)
  //       example 1: trimstart('  hello  ')
  //       returns 1: 'hello  '
  //       example 2: trimstart('__hello__', '_')
  //       returns 2: 'hello__'

  const value = String(str)
  if (chars === undefined) {
    return value.trimStart()
  }
  if (chars === '') {
    return value
  }

  return value.replace(new RegExp(`^[${escapeForCharClass(chars)}]+`, 'g'), '')
}
