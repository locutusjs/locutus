export function padding(str: string, toLength: number, withPad: string = ' ', startingAt: number = 0): string {
  //  discuss at: https://locutus.io/swift/String/padding/
  // original by: Kevin van Zonneveld (https://kvz.io)
  //      note 1: Mirrors Swift's padding(toLength:withPad:startingAt:) behavior for truncation and pad-fill.
  //   example 1: padding('abc', 8, 'xy', 0)
  //   returns 1: 'abcxyxyx'
  //   example 2: padding('abcdef', 4, 'xy', 0)
  //   returns 2: 'abcd'
  //   example 3: padding('go', 7, '123', 1)
  //   returns 3: 'go23123'

  const source = String(str)
  const targetLength = Math.trunc(Number(toLength))
  const pad = String(withPad)

  if (!Number.isFinite(targetLength) || targetLength <= 0) {
    return ''
  }
  if (source.length >= targetLength) {
    return source.slice(0, targetLength)
  }
  if (pad.length === 0) {
    return source
  }

  const start = Math.max(0, Math.trunc(Number(startingAt))) % pad.length
  const needed = targetLength - source.length

  let repeated = ''
  while (repeated.length < needed + start) {
    repeated += pad
  }

  return source + repeated.slice(start, start + needed)
}
