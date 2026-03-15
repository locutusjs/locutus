export function Join(...elem: string[]): string {
  //      discuss at: https://locutus.io/golang/filepath/Join
  // parity verified: Go 1.23
  //     original by: Kevin van Zonneveld (https://kvz.io)
  //          note 1: Mirrors path/filepath.Join for slash-separated paths on the Go parity target.
  //       example 1: Join('a', 'b', 'c')
  //       returns 1: 'a/b/c'
  //       example 2: Join('/a/', '/b/', 'c')
  //       returns 2: '/a/b/c'
  //       example 3: Join('a', '..', 'b')
  //       returns 3: 'b'
  //       example 4: Join('', '')
  //       returns 4: ''

  const parts = elem.map((value) => String(value)).filter((value) => value !== '')
  if (parts.every((value) => value === '')) {
    return ''
  }

  const raw = parts.join('/')
  const rooted = raw.startsWith('/')
  const segments = raw.split('/')
  const stack: string[] = []

  for (const segment of segments) {
    if (segment === '' || segment === '.') {
      continue
    }

    if (segment === '..') {
      const top = stack.at(-1)
      if (top && top !== '..') {
        stack.pop()
      } else if (!rooted) {
        stack.push('..')
      }
      continue
    }

    stack.push(segment)
  }

  const cleaned = `${rooted ? '/' : ''}${stack.join('/')}`
  if (cleaned === '') {
    return rooted ? '/' : '.'
  }

  return cleaned
}
