export function Ext(path: string): string {
  //      discuss at: https://locutus.io/golang/path/Ext
  // parity verified: Go 1.23
  //     original by: Kevin van Zonneveld (https://kvz.io)
  //       example 1: Ext('/a/b/c.txt')
  //       returns 1: '.txt'
  //       example 2: Ext('/a/b.tar.gz')
  //       returns 2: '.gz'
  //       example 3: Ext('/a/b')
  //       returns 3: ''
  //       example 4: Ext('.profile')
  //       returns 4: '.profile'

  const raw = String(path)

  let end = raw.length
  while (end > 0 && raw[end - 1] === '/') {
    end -= 1
  }

  if (end === 0) {
    return ''
  }

  const trimmed = raw.slice(0, end)
  const slash = trimmed.lastIndexOf('/')
  const base = trimmed.slice(slash + 1)
  const dot = base.lastIndexOf('.')

  if (dot < 0) {
    return ''
  }

  return base.slice(dot)
}
