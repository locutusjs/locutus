function escapeForCharClass(chars: string): string {
  return chars.replace(/[\\\]^/-]/g, '\\$&')
}

export function trimend(str: string, chars?: string): string {
  //      discuss at: https://locutus.io/powershell/trimend/
  // parity verified: PowerShell 7.4
  //     original by: Kevin van Zonneveld (https://kvz.io)
  //       example 1: trimend('  hello  ')
  //       returns 1: '  hello'
  //       example 2: trimend('__hello__', '_')
  //       returns 2: '__hello'

  const value = String(str)
  if (chars === undefined) {
    return value.trimEnd()
  }
  if (chars === '') {
    return value
  }

  return value.replace(new RegExp(`[${escapeForCharClass(chars)}]+$`, 'g'), '')
}
