const escapeRegExp = (value: string): string => value.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')

export function replacingOccurrences(
  str: string,
  target: string,
  replacement: string,
  caseInsensitive: boolean = false,
): string {
  //      discuss at: https://locutus.io/swift/String/replacingOccurrences/
  //     original by: Kevin van Zonneveld (https://kvz.io)
  //          note 1: Replaces every occurrence of target in str, similar to Swift replacingOccurrences(of:with:options:).
  //       example 1: replacingOccurrences('hello world', 'l', 'L')
  //       returns 1: 'heLLo worLd'
  //       example 2: replacingOccurrences('Swift swift SWIFT', 'swift', 'ts', true)
  //       returns 2: 'ts ts ts'
  //       example 3: replacingOccurrences('abcabc', 'ab', '#')
  //       returns 3: '#c#c'

  const source = String(str)
  const needle = String(target)
  const nextValue = String(replacement)

  if (needle === '') {
    return source
  }

  if (caseInsensitive) {
    return source.replace(new RegExp(escapeRegExp(needle), 'gi'), nextValue)
  }

  return source.split(needle).join(nextValue)
}
