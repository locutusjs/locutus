export function chunked(str: string, size: number): string[] {
  //  discuss at: https://locutus.io/kotlin/text/chunked/
  // original by: Kevin van Zonneveld (https://kvz.io)
  //      note 1: Splits a string into consecutive chunks of at most size, like Kotlin text chunked.
  //   example 1: chunked('kotlin', 2)
  //   returns 1: ['ko', 'tl', 'in']
  //   example 2: chunked('abcdefg', 3)
  //   returns 2: ['abc', 'def', 'g']
  //   example 3: chunked('', 4)
  //   returns 3: []

  const source = String(str)
  const width = Math.trunc(Number(size))
  if (!Number.isFinite(width) || width <= 0) {
    throw new RangeError('chunked(): size must be a positive integer')
  }

  const out: string[] = []
  for (let i = 0; i < source.length; i += width) {
    out.push(source.slice(i, i + width))
  }
  return out
}
