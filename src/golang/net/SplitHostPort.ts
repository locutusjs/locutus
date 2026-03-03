export function SplitHostPort(hostport: string): [string, string] {
  //      discuss at: https://locutus.io/golang/net/SplitHostPort
  // parity verified: Go 1.23
  //     original by: Kevin van Zonneveld (https://kvz.io)
  //       example 1: SplitHostPort('localhost:80')
  //       returns 1: ['localhost', '80']
  //       example 2: SplitHostPort('[2001:db8::1]:443')
  //       returns 2: ['2001:db8::1', '443']
  //       example 3: SplitHostPort(':8080')
  //       returns 3: ['', '8080']

  const value = String(hostport)
  if (value.startsWith('[')) {
    const close = value.indexOf(']')
    if (close < 0 || value[close + 1] !== ':') {
      throw new TypeError('SplitHostPort(): invalid host:port')
    }

    const host = value.slice(1, close)
    const port = value.slice(close + 2)
    if (port === '') {
      throw new TypeError('SplitHostPort(): missing port')
    }

    return [host, port]
  }

  const firstColon = value.indexOf(':')
  const lastColon = value.lastIndexOf(':')
  if (lastColon < 0) {
    throw new TypeError('SplitHostPort(): missing port')
  }
  if (firstColon !== lastColon) {
    throw new TypeError('SplitHostPort(): too many colons in address')
  }

  const host = value.slice(0, lastColon)
  const port = value.slice(lastColon + 1)
  if (port === '') {
    throw new TypeError('SplitHostPort(): missing port')
  }

  return [host, port]
}
