import { ParseIP } from './ParseIP.ts'

export type ParsedCIDR = {
  ip: string
  maskBits: number
}

export function ParseCIDR(value: string): ParsedCIDR | null {
  //      discuss at: https://locutus.io/golang/net/ParseCIDR/
  // parity verified: Go 1.23
  //     original by: Kevin van Zonneveld (https://kvz.io)
  //          note 1: Parses CIDR notation and returns normalized IP plus prefix length.
  //          note 2: Returns null when either the IP or mask width is invalid.
  //       example 1: ParseCIDR('192.168.0.1/24')
  //       returns 1: {ip: '192.168.0.1', maskBits: 24}
  //       example 2: ParseCIDR('2001:db8::1/64')
  //       returns 2: {ip: '2001:db8::1', maskBits: 64}
  //       example 3: ParseCIDR('192.168.0.1/99')
  //       returns 3: null

  const input = String(value)
  const slashIndex = input.indexOf('/')
  if (slashIndex <= 0 || slashIndex !== input.lastIndexOf('/')) {
    return null
  }

  const ipPart = input.slice(0, slashIndex)
  const maskPart = input.slice(slashIndex + 1)
  if (!/^\d+$/.test(maskPart)) {
    return null
  }

  const normalizedIp = ParseIP(ipPart)
  if (normalizedIp === null) {
    return null
  }

  const maxBits = normalizedIp.includes(':') ? 128 : 32
  const maskBits = Number(maskPart)
  if (!Number.isInteger(maskBits) || maskBits < 0 || maskBits > maxBits) {
    return null
  }

  return {
    ip: normalizedIp,
    maskBits,
  }
}
