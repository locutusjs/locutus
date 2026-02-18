type ParseUrlQueryMap = Record<string, string>
type ParseUrlValue = string | ParseUrlQueryMap

type ParseUrlResult = {
  source?: string
  scheme?: string
  authority?: string
  userInfo?: string
  user?: string
  pass?: string
  host?: string
  port?: string
  relative?: string
  path?: string
  directory?: string
  file?: string
  query?: string
  fragment?: string
  [key: string]: ParseUrlValue | undefined
}

export function parse_url(str: string, component?: string): ParseUrlResult | string {
  //       discuss at: https://locutus.io/php/parse_url/
  //      original by: Steven Levithan (https://blog.stevenlevithan.com)
  // reimplemented by: Brett Zamir (https://brett-zamir.me)
  //         input by: Lorenzo Pisani
  //         input by: Tony
  //      improved by: Brett Zamir (https://brett-zamir.me)
  //           note 1: original by https://stevenlevithan.com/demo/parseuri/js/assets/parseuri.js
  //           note 1: blog post at https://blog.stevenlevithan.com/archives/parseuri
  //           note 1: demo at https://stevenlevithan.com/demo/parseuri/js/assets/parseuri.js
  //           note 1: Does not replace invalid characters with '_' as in PHP,
  //           note 1: nor does it return false with
  //           note 1: a seriously malformed URL.
  //           note 1: Besides function name, is essentially the same as parseUri as
  //           note 1: well as our allowing
  //           note 1: an extra slash after the scheme/protocol (to allow file:/// as in PHP)
  //        example 1: parse_url('https://user:pass@host/path?a=v#a')
  //        returns 1: {scheme: 'https', host: 'host', user: 'user', pass: 'pass', path: '/path', query: 'a=v', fragment: 'a'}
  //        example 2: parse_url('https://en.wikipedia.org/wiki/%22@%22_%28album%29')
  //        returns 2: {scheme: 'https', host: 'en.wikipedia.org', path: '/wiki/%22@%22_%28album%29'}
  //        example 3: parse_url('https://host.domain.tld/a@b.c/folder')
  //        returns 3: {scheme: 'https', host: 'host.domain.tld', path: '/a@b.c/folder'}
  //        example 4: parse_url('https://gooduser:secretpassword@www.example.com/a@b.c/folder?foo=bar')
  //        returns 4: { scheme: 'https', host: 'www.example.com', path: '/a@b.c/folder', query: 'foo=bar', user: 'gooduser', pass: 'secretpassword' }

  let query: string

  const $loc = (
    globalThis as {
      $locutus?: { php?: { ini?: { [key: string]: { local_value?: unknown } | undefined } } }
    }
  ).$locutus
  const mode = String($loc?.php?.ini?.['locutus.parse_url.mode']?.local_value ?? '') || 'php'

  const key = [
    'source',
    'scheme',
    'authority',
    'userInfo',
    'user',
    'pass',
    'host',
    'port',
    'relative',
    'path',
    'directory',
    'file',
    'query',
    'fragment',
  ]

  // For loose we added one optional slash to post-scheme to catch file:/// (should restrict this)
  const parser = {
    php: new RegExp(
      [
        '(?:([^:\\/?#]+):)?',
        '(?:\\/\\/()(?:(?:()(?:([^:@\\/]*):?([^:@\\/]*))?@)?([^:\\/?#]*)(?::(\\d*))?))?',
        '()',
        '(?:(()(?:(?:[^?#\\/]*\\/)*)()(?:[^?#]*))(?:\\?([^#]*))?(?:#(.*))?)',
      ].join(''),
    ),
    strict: new RegExp(
      [
        '(?:([^:\\/?#]+):)?',
        '(?:\\/\\/((?:(([^:@\\/]*):?([^:@\\/]*))?@)?([^:\\/?#]*)(?::(\\d*))?))?',
        '((((?:[^?#\\/]*\\/)*)([^?#]*))(?:\\?([^#]*))?(?:#(.*))?)',
      ].join(''),
    ),
    loose: new RegExp(
      [
        '(?:(?![^:@]+:[^:@\\/]*@)([^:\\/?#.]+):)?',
        '(?:\\/\\/\\/?)?',
        '((?:(([^:@\\/]*):?([^:@\\/]*))?@)?([^:\\/?#]*)(?::(\\d*))?)',
        '(((\\/(?:[^?#](?![^?#\\/]*\\.[^?#\\/.]+(?:[?#]|$)))*\\/?)?([^?#\\/]*))',
        '(?:\\?([^#]*))?(?:#(.*))?)',
      ].join(''),
    ),
  }

  const selectedParser = parser[mode as keyof typeof parser] ?? parser.php
  const m = selectedParser.exec(str)
  const uri: ParseUrlResult = {}
  if (!m) {
    return uri
  }
  let i = 14

  while (i--) {
    const keyName = key[i]
    if (keyName && m[i]) {
      uri[keyName] = m[i]
    }
  }

  if (component) {
    return String(uri[component.replace('PHP_URL_', '').toLowerCase()] ?? '')
  }

  if (mode !== 'php') {
    const name = String($loc?.php?.ini?.['locutus.parse_url.queryKey']?.local_value ?? '') || 'queryKey'
    const queryParser = /(?:^|&)([^&=]*)=?([^&]*)/g
    const queryObj: ParseUrlQueryMap = {}
    uri[name] = queryObj
    const queryKeyName = key[12]
    query = String((queryKeyName ? uri[queryKeyName] : '') || '')
    query.replace(queryParser, function ($0: string, $1: string, $2: string): string {
      if ($1) {
        queryObj[$1] = $2
      }
      return $0
    })
  }

  delete uri.source
  return uri
}
