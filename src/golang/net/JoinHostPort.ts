export function JoinHostPort(host: string, port: string): string {
  //      discuss at: https://locutus.io/golang/net/JoinHostPort
  // parity verified: Go 1.23
  //     original by: Kevin van Zonneveld (https://kvz.io)
  //       example 1: JoinHostPort('localhost', '80')
  //       returns 1: 'localhost:80'
  //       example 2: JoinHostPort('2001:db8::1', '443')
  //       returns 2: '[2001:db8::1]:443'
  //       example 3: JoinHostPort('[2001:db8::1]', '443')
  //       returns 3: '[[2001:db8::1]]:443'

  const hostValue = String(host)
  const portValue = String(port)
  const needsBrackets = hostValue.includes(':')
  const normalizedHost = needsBrackets ? `[${hostValue}]` : hostValue

  return `${normalizedHost}:${portValue}`
}
