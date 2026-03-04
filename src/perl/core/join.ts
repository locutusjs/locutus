export function join(separator: string, ...parts: Array<string | unknown[]>): string {
  //      discuss at: https://locutus.io/perl/join/
  // parity verified: Perl 5.40
  //     original by: Kevin van Zonneveld (https://kvz.io)
  //          note 1: Joins list values with separator (Perl-style list semantics).
  //       example 1: join('-', 'a', 'b', 'c')
  //       returns 1: 'a-b-c'
  //       example 2: join(' / ', 'usr', 'local', 'bin')
  //       returns 2: 'usr / local / bin'
  //       example 3: join('', 'a', 'b', 'c')
  //       returns 3: 'abc'

  const glue = String(separator)
  const values = parts.length === 1 && Array.isArray(parts[0]) ? (parts[0] as unknown[]) : (parts as unknown[])

  return values.map((value) => String(value)).join(glue)
}
