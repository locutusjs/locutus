export function componentsSeparatedBy(str: string, separator: string): string[] {
  //  discuss at: https://locutus.io/swift/String/componentsSeparatedBy/
  // original by: Kevin van Zonneveld (https://kvz.io)
  //      note 1: Splits a string into components by separator, similar to Swift components(separatedBy:).
  //   example 1: componentsSeparatedBy('a,b,c', ',')
  //   returns 1: ['a', 'b', 'c']
  //   example 2: componentsSeparatedBy('a,,b,', ',')
  //   returns 2: ['a', '', 'b', '']
  //   example 3: componentsSeparatedBy('abc', '')
  //   returns 3: ['a', 'b', 'c']

  const source = String(str)
  const needle = String(separator)

  if (needle === '') {
    return Array.from(source)
  }

  return source.split(needle)
}
