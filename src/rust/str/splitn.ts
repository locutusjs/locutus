export function splitn(n: number, delimiter: string, str: string): string[] {
  //      discuss at: https://locutus.io/rust/splitn/
  // parity verified: Rust 1.85
  //     original by: Kevin van Zonneveld (https://kvz.io)
  //          note 1: Produces at most n fields; the last field contains the unsplit remainder.
  //       example 1: splitn(3, ' ', 'Mary had a little lamb')
  //       returns 1: ['Mary', 'had', 'a little lamb']
  //       example 2: splitn(1, 'X', 'abcXdef')
  //       returns 2: ['abcXdef']
  //       example 3: splitn(3, 'X', 'lionXXtigerXleopard')
  //       returns 3: ['lion', '', 'tigerXleopard']

  const limit = Math.trunc(Number(n))
  if (!Number.isFinite(limit) || limit <= 0) {
    return []
  }

  const source = String(str)
  const value = String(delimiter)
  if (limit === 1) {
    return [source]
  }

  if (value === '') {
    const parts = ['', ...Array.from(source), '']
    if (parts.length <= limit) {
      return parts
    }
    return [...parts.slice(0, limit - 1), parts.slice(limit - 1).join('')]
  }

  const out: string[] = []
  let remainder = source

  for (let i = 0; i < limit - 1; i += 1) {
    const index = remainder.indexOf(value)
    if (index < 0) {
      break
    }

    out.push(remainder.slice(0, index))
    remainder = remainder.slice(index + value.length)
  }

  out.push(remainder)
  return out
}
