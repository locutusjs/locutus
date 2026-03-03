export function SplitN(s: string, sep: string, n: number): string[] {
  //      discuss at: https://locutus.io/golang/strings/SplitN
  // parity verified: Go 1.23
  //     original by: Kevin van Zonneveld (https://kvz.io)
  //          note 1: Splits into at most n parts. n < 0 means no limit, n == 0 returns [].
  //       example 1: SplitN('a,b,c', ',', 2)
  //       returns 1: ['a', 'b,c']
  //       example 2: SplitN('a,b,c', ',', -1)
  //       returns 2: ['a', 'b', 'c']
  //       example 3: SplitN('hello', '', 3)
  //       returns 3: ['h', 'e', 'llo']

  const value = String(s)
  const delimiter = String(sep)
  const limit = Math.trunc(Number(n))

  if (limit === 0) {
    return []
  }

  if (delimiter === '') {
    const chars = Array.from(value)

    if (limit < 0) {
      return chars
    }

    if (limit === 1) {
      return [value]
    }

    if (chars.length < limit) {
      return chars
    }

    return [...chars.slice(0, limit - 1), chars.slice(limit - 1).join('')]
  }

  if (limit < 0) {
    return value.split(delimiter)
  }

  if (limit === 1) {
    return [value]
  }

  const out: string[] = []
  let remainder = value

  for (let i = 0; i < limit - 1; i += 1) {
    const index = remainder.indexOf(delimiter)
    if (index < 0) {
      break
    }

    out.push(remainder.slice(0, index))
    remainder = remainder.slice(index + delimiter.length)
  }

  out.push(remainder)
  return out
}
