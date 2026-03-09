export function rsplitn(n: number, delimiter: string, str: string): string[] {
  //      discuss at: https://locutus.io/rust/rsplitn/
  // parity verified: Rust 1.85
  //     original by: Kevin van Zonneveld (https://kvz.io)
  //          note 1: Reverse-order variant of splitn.
  //       example 1: rsplitn(3, ' ', 'Mary had a little lamb')
  //       returns 1: ['lamb', 'little', 'Mary had a']
  //       example 2: rsplitn(2, '::', 'lion::tiger::leopard')
  //       returns 2: ['leopard', 'lion::tiger']
  //       example 3: rsplitn(3, 'X', 'lionXXtigerXleopard')
  //       returns 3: ['leopard', 'tiger', 'lionX']

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
    const parts = ['', ...Array.from(source), ''].reverse()
    if (parts.length <= limit) {
      return parts
    }
    return [
      ...parts.slice(0, limit - 1),
      parts
        .slice(limit - 1)
        .reverse()
        .join(''),
    ]
  }

  const out: string[] = []
  let remainder = source

  for (let i = 0; i < limit - 1; i += 1) {
    const index = remainder.lastIndexOf(value)
    if (index < 0) {
      break
    }

    out.push(remainder.slice(index + value.length))
    remainder = remainder.slice(0, index)
  }

  out.push(remainder)
  return out
}
