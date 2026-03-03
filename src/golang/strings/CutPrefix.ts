export function CutPrefix(s: string, prefix: string): [string, boolean] {
  //      discuss at: https://locutus.io/golang/strings/CutPrefix
  // parity verified: Go 1.23
  //     original by: Kevin van Zonneveld (https://kvz.io)
  //          note 1: Returns [after, found] and mirrors Go strings.CutPrefix behavior.
  //       example 1: CutPrefix('abc', 'a')
  //       returns 1: ['bc', true]
  //       example 2: CutPrefix('abc', '')
  //       returns 2: ['abc', true]
  //       example 3: CutPrefix('abc', 'd')
  //       returns 3: ['abc', false]

  const value = String(s)
  const candidatePrefix = String(prefix)

  if (value.startsWith(candidatePrefix)) {
    return [value.slice(candidatePrefix.length), true]
  }

  return [value, false]
}
