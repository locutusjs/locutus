const escapeForCharClass = (chars: string): string => chars.replace(/[\\\]^/-]/g, '\\$&')

export function trimleft(str: string, chars?: string): string {
  //  discuss at: https://locutus.io/tcl/trimleft/
  // original by: Kevin van Zonneveld (https://kvz.io)
  //   example 1: trimleft('  hello  ')
  //   returns 1: 'hello  '
  //   example 2: trimleft('__hello__', '_')
  //   returns 2: 'hello__'

  const value = String(str)
  if (chars === undefined) {
    return value.trimStart()
  }
  if (chars === '') {
    return value
  }

  const escaped = escapeForCharClass(chars)
  const pattern = new RegExp(`^[${escaped}]+`, 'g')
  return value.replace(pattern, '')
}
