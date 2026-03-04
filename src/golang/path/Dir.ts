const cleanPath = (path: string): string => {
  if (path === '') {
    return '.'
  }

  const rooted = path.startsWith('/')
  const segments = path.split('/')
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

export function Dir(path: string): string {
  //      discuss at: https://locutus.io/golang/path/Dir
  // parity verified: Go 1.23
  //     original by: Kevin van Zonneveld (https://kvz.io)
  //       example 1: Dir('/a/b/c.txt')
  //       returns 1: '/a/b'
  //       example 2: Dir('/a/b/')
  //       returns 2: '/a/b'
  //       example 3: Dir('c.txt')
  //       returns 3: '.'
  //       example 4: Dir('')
  //       returns 4: '.'

  const raw = String(path)
  if (raw === '') {
    return '.'
  }

  const slash = raw.lastIndexOf('/')
  if (slash < 0) {
    return '.'
  }

  const dir = raw.slice(0, slash + 1)
  return cleanPath(dir)
}
