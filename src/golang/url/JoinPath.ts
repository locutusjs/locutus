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
      const top = stack[stack.length - 1]
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

const joinPathParts = (parts: string[]): string => {
  if (parts.every((part) => part === '')) {
    return ''
  }

  return cleanPath(parts.join('/'))
}

export function JoinPath(base: string, ...elem: string[]): string {
  //      discuss at: https://locutus.io/golang/url/JoinPath
  // parity verified: Go 1.23
  //     original by: Kevin van Zonneveld (https://kvz.io)
  //          note 1: Joins and cleans URL path elements while preserving query/fragment for absolute URLs.
  //       example 1: JoinPath('https://locutus.io/api/', 'v1', 'users')
  //       returns 1: 'https://locutus.io/api/v1/users'
  //       example 2: JoinPath('https://locutus.io/api/v1?x=1', '..', 'v2')
  //       returns 2: 'https://locutus.io/api/v2?x=1'
  //       example 3: JoinPath('/a/b/', '../c')
  //       returns 3: '/a/c'

  const baseValue = String(base)
  const parts = [baseValue, ...elem.map((part) => String(part))]

  try {
    const url = new URL(baseValue)
    const joinedPath = joinPathParts([url.pathname, ...elem.map((part) => String(part))])
    url.pathname = joinedPath === '' ? '/' : joinedPath.startsWith('/') ? joinedPath : `/${joinedPath}`
    return url.toString()
  } catch {
    return joinPathParts(parts)
  }
}
