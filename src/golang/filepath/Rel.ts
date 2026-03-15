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

const toSegments = (cleanedPath: string): string[] => {
  if (cleanedPath === '.' || cleanedPath === '/') {
    return []
  }

  return cleanedPath.split('/').filter(Boolean)
}

export function Rel(basePath: string, targetPath: string): string {
  //      discuss at: https://locutus.io/golang/filepath/Rel
  // parity verified: Go 1.23
  //     original by: Kevin van Zonneveld (https://kvz.io)
  //          note 1: Computes a lexical relative path for slash-separated inputs without consulting the current working directory.
  //          note 2: Throws when one path is rooted and the other is relative, matching Go's error case.
  //       example 1: Rel('a/b', 'a/b/c')
  //       returns 1: 'c'
  //       example 2: Rel('/a/b', '/a/c')
  //       returns 2: '../c'
  //       example 3: Rel('a/.', 'a/b/..')
  //       returns 3: '.'

  const baseValue = String(basePath)
  const targetValue = String(targetPath)
  const cleanBase = cleanPath(baseValue)
  const cleanTarget = cleanPath(targetValue)
  const baseRooted = cleanBase.startsWith('/')
  const targetRooted = cleanTarget.startsWith('/')

  if (baseRooted !== targetRooted) {
    throw new TypeError(`Rel(): can't make ${targetValue} relative to ${baseValue}`)
  }

  const baseSegments = toSegments(cleanBase)
  const targetSegments = toSegments(cleanTarget)
  let shared = 0

  while (
    shared < baseSegments.length &&
    shared < targetSegments.length &&
    baseSegments[shared] === targetSegments[shared]
  ) {
    shared += 1
  }

  if (baseSegments.slice(shared).includes('..')) {
    throw new TypeError(`Rel(): can't make ${targetValue} relative to ${baseValue}`)
  }

  const relativeSegments = [
    ...Array.from({ length: baseSegments.length - shared }, () => '..'),
    ...targetSegments.slice(shared),
  ]

  return relativeSegments.length > 0 ? relativeSegments.join('/') : '.'
}
