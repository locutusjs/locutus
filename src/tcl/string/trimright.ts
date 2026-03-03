const escapeForCharClass = (chars: string): string => chars.replace(/[\\\]^/-]/g, '\\$&')

export function trimright(str: string, chars?: string): string {
  //  discuss at: https://locutus.io/tcl/trimright/
  // original by: Kevin van Zonneveld (https://kvz.io)
  //   example 1: trimright('  hello  ')
  //   returns 1: '  hello'
  //   example 2: trimright('__hello__', '_')
  //   returns 2: '__hello'

  const value = String(str)
  if (chars === undefined) {
    return value.trimEnd()
  }
  if (chars === '') {
    return value
  }

  const escaped = escapeForCharClass(chars)
  const pattern = new RegExp(`[${escaped}]+$`, 'g')
  return value.replace(pattern, '')
}
