export function gsub(str: string, pattern: string | RegExp, replacement: string): string {
  // parity verified: Ruby 3.3
  //      discuss at: https://locutus.io/ruby/String/gsub/
  //     original by: Kevin van Zonneveld (https://kvz.io)
  //          note 1: Global substitution across the entire string.
  //       example 1: gsub('hello world', 'l', 'L')
  //       returns 1: 'heLLo worLd'
  //       example 2: gsub('abcabc', 'ab', '#')
  //       returns 2: '#c#c'
  //       example 3: gsub('foo', 'x', 'y')
  //       returns 3: 'foo'

  const source = String(str)
  const replacementText = String(replacement)

  if (pattern instanceof RegExp) {
    const flags = pattern.flags.includes('g') ? pattern.flags : `${pattern.flags}g`
    return source.replace(new RegExp(pattern.source, flags), replacementText)
  }

  const needle = String(pattern)
  if (needle === '') {
    return source
  }

  return source.replaceAll(needle, replacementText)
}
