export function hex(value: string | number): number {
  //      discuss at: https://locutus.io/perl/hex/
  // parity verified: Perl 5.40
  //     original by: Kevin van Zonneveld (https://kvz.io)
  //       example 1: hex('FF')
  //       returns 1: 255
  //       example 2: hex('0x10')
  //       returns 2: 16
  //       example 3: hex('zz')
  //       returns 3: 0

  const normalized = String(value).trim().replace(/^0x/i, '')
  const parsed = Number.parseInt(normalized, 16)
  return Number.isNaN(parsed) ? 0 : parsed
}
