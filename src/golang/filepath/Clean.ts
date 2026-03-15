export function Clean(path: string): string {
  //      discuss at: https://locutus.io/golang/filepath/Clean
  // parity verified: Go 1.23
  //     original by: Kevin van Zonneveld (https://kvz.io)
  //          note 1: Mirrors path/filepath.Clean for slash-separated paths on the Go parity target.
  //       example 1: Clean('/a//b/../c/.')
  //       returns 1: '/a/c'
  //       example 2: Clean('a/../../b')
  //       returns 2: '../b'
  //       example 3: Clean('')
  //       returns 3: '.'

  const raw = String(path)
  if (raw === '') {
    return '.'
  }

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
