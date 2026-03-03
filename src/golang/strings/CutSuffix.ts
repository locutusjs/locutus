export function CutSuffix(s: string, suffix: string): [string, boolean] {
  //      discuss at: https://locutus.io/golang/strings/CutSuffix
  // parity verified: Go 1.23
  //     original by: Kevin van Zonneveld (https://kvz.io)
  //          note 1: Returns [before, found] and mirrors Go strings.CutSuffix behavior.
  //       example 1: CutSuffix('abc', 'bc')
  //       returns 1: ['a', true]
  //       example 2: CutSuffix('abc', '')
  //       returns 2: ['abc', true]
  //       example 3: CutSuffix('abc', 'd')
  //       returns 3: ['abc', false]

  const value = String(s)
  const candidateSuffix = String(suffix)

  if (value.endsWith(candidateSuffix)) {
    return [value.slice(0, value.length - candidateSuffix.length), true]
  }

  return [value, false]
}
