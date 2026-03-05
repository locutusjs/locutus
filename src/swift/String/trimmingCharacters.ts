const escapeForCharacterClass = (value: string): string => value.replace(/[\\[\]-]/g, '\\$&')

export function trimmingCharacters(str: string, characters: string = ' \n\r\t'): string {
  //  discuss at: https://locutus.io/swift/String/trimmingCharacters/
  // original by: Kevin van Zonneveld (https://kvz.io)
  //      note 1: Trims leading and trailing characters found in the provided character set, similar to Swift trimmingCharacters(in:).
  //   example 1: trimmingCharacters('  hello \n')
  //   returns 1: 'hello'
  //   example 2: trimmingCharacters('--swift--', '-')
  //   returns 2: 'swift'
  //   example 3: trimmingCharacters('xyxhelloxy', 'xy')
  //   returns 3: 'hello'

  const source = String(str)
  const set = String(characters)

  if (set === '') {
    return source
  }

  const escapedSet = escapeForCharacterClass(set)
  const pattern = new RegExp(`^[${escapedSet}]+|[${escapedSet}]+$`, 'g')

  return source.replace(pattern, '')
}
