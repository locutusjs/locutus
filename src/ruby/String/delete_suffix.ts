export function delete_suffix(str: string, suffix: string): string {
  // parity verified: Ruby 3.3
  //      discuss at: https://locutus.io/ruby/String/delete_suffix/
  //     original by: Kevin van Zonneveld (https://kvz.io)
  //          note 1: Removes suffix when present and otherwise returns the original string unchanged.
  //       example 1: delete_suffix('value-suffix', '-suffix')
  //       returns 1: 'value'
  //       example 2: delete_suffix('value', 'x')
  //       returns 2: 'value'

  const input = str + ''
  const needle = suffix + ''

  if (needle === '') {
    return input
  }

  return input.endsWith(needle) ? input.slice(0, -needle.length) : input
}
