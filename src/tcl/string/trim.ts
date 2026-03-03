const escapeForCharClass = (chars: string): string => chars.replace(/[\\\]^/-]/g, '\\$&')

export function trim(str: string, chars?: string): string {
  //  discuss at: https://locutus.io/tcl/trim/
  // original by: Kevin van Zonneveld (https://kvz.io)
  //   example 1: trim('  hello  ')
  //   returns 1: 'hello'
  //   example 2: trim('__hello__', '_')
  //   returns 2: 'hello'

  const value = String(str)
  if (chars === undefined) {
    return value.trim()
  }
  if (chars === '') {
    return value
  }

  const escaped = escapeForCharClass(chars)
  const pattern = new RegExp(`^[${escaped}]+|[${escaped}]+$`, 'g')
  return value.replace(pattern, '')
}
