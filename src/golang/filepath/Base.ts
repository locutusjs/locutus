export function Base(path: string): string {
  //      discuss at: https://locutus.io/golang/filepath/Base
  // parity verified: Go 1.23
  //     original by: Kevin van Zonneveld (https://kvz.io)
  //          note 1: Mirrors path/filepath.Base for slash-separated paths on the Go parity target.
  //       example 1: Base('/a/b/c.txt')
  //       returns 1: 'c.txt'
  //       example 2: Base('/a/b/')
  //       returns 2: 'b'
  //       example 3: Base('')
  //       returns 3: '.'
  //       example 4: Base('////')
  //       returns 4: '/'

  const raw = String(path)
  if (raw === '') {
    return '.'
  }

  let end = raw.length
  while (end > 0 && raw[end - 1] === '/') {
    end -= 1
  }

  if (end === 0) {
    return '/'
  }

  const trimmed = raw.slice(0, end)
  const slash = trimmed.lastIndexOf('/')
  if (slash < 0) {
    return trimmed
  }

  return trimmed.slice(slash + 1)
}
