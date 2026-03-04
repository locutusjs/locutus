type ParsedURL = {
  scheme: string
  host: string
  path: string
  rawQuery: string
  fragment: string
}

const parseAuthorityAndPath = (value: string): { host: string; path: string } => {
  const slashIndex = value.indexOf('/')
  if (slashIndex < 0) {
    return { host: value, path: '' }
  }

  return {
    host: value.slice(0, slashIndex),
    path: value.slice(slashIndex),
  }
}

export function Parse(rawurl: string): ParsedURL {
  //      discuss at: https://locutus.io/golang/url/Parse
  // parity verified: Go 1.23
  //     original by: Kevin van Zonneveld (https://kvz.io)
  //          note 1: Returns core URL parts from Go's net/url.Parse model.
  //       example 1: Parse('https://locutus.io:443/a/b?x=1#top')
  //       returns 1: {scheme: 'https', host: 'locutus.io:443', path: '/a/b', rawQuery: 'x=1', fragment: 'top'}
  //       example 2: Parse('/a/b?x=1')
  //       returns 2: {scheme: '', host: '', path: '/a/b', rawQuery: 'x=1', fragment: ''}
  //       example 3: Parse('//locutus.io/path')
  //       returns 3: {scheme: '', host: 'locutus.io', path: '/path', rawQuery: '', fragment: ''}

  let rest = String(rawurl)
  let fragment = ''
  let rawQuery = ''

  const hashIndex = rest.indexOf('#')
  if (hashIndex >= 0) {
    fragment = rest.slice(hashIndex + 1)
    rest = rest.slice(0, hashIndex)
  }

  const queryIndex = rest.indexOf('?')
  if (queryIndex >= 0) {
    rawQuery = rest.slice(queryIndex + 1)
    rest = rest.slice(0, queryIndex)
  }

  let scheme = ''
  let host = ''
  let path = ''

  const schemeMatch = rest.match(/^([A-Za-z][A-Za-z0-9+.-]*):(.*)$/)
  if (schemeMatch?.[1] !== undefined) {
    scheme = schemeMatch[1]
    const afterScheme = schemeMatch[2] ?? ''
    if (afterScheme.startsWith('//')) {
      const authority = parseAuthorityAndPath(afterScheme.slice(2))
      host = authority.host
      path = authority.path
    } else {
      path = afterScheme
    }
  } else if (rest.startsWith('//')) {
    const authority = parseAuthorityAndPath(rest.slice(2))
    host = authority.host
    path = authority.path
  } else {
    path = rest
  }

  return {
    scheme,
    host,
    path,
    rawQuery,
    fragment,
  }
}
