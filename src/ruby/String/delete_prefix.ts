export function delete_prefix(str: string, prefix: string): string {
  // parity verified: Ruby 3.3
  //      discuss at: https://locutus.io/ruby/String/delete_prefix/
  //     original by: Kevin van Zonneveld (https://kvz.io)
  //          note 1: Removes prefix when present and otherwise returns the original string unchanged.
  //       example 1: delete_prefix('prefix-value', 'prefix-')
  //       returns 1: 'value'
  //       example 2: delete_prefix('value', 'x')
  //       returns 2: 'value'

  const input = str + ''
  const needle = prefix + ''

  return input.startsWith(needle) ? input.slice(needle.length) : input
}
