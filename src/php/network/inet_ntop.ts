export function inet_ntop(a: string | number): string | false {
  //  discuss at: https://locutus.io/php/inet_ntop/
  // original by: Theriault (https://github.com/Theriault)
  //   example 1: inet_ntop('\x7F\x00\x00\x01')
  //   returns 1: '127.0.0.1'
  //   _example 2: inet_ntop('\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\1')
  //   _returns 2: '::1'

  let i = 0
  let m = ''
  const c: string[] = []
  const address = String(a)

  if (address.length === 4) {
    // IPv4
    return [address.charCodeAt(0), address.charCodeAt(1), address.charCodeAt(2), address.charCodeAt(3)].join('.')
  } else if (address.length === 16) {
    // IPv6
    for (i = 0; i < 16; i++) {
      c.push(((address.charCodeAt(i++) << 8) + address.charCodeAt(i)).toString(16))
    }
    return c
      .join(':')
      .replace(/((^|:)0(?=:|$))+:?/g, function (t) {
        m = t.length > m.length ? t : m
        return t
      })
      .replace(m || ' ', '::')
  } else {
    // Invalid length
    return false
  }
}
