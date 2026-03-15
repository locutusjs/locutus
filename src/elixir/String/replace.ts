function escapeRegExp(value: string): string {
  return value.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
}

export function replace(string: string, pattern: string, replacement: string): string {
  //      discuss at: https://locutus.io/elixir/replace/
  // parity verified: Elixir 1.18
  //     original by: Kevin van Zonneveld (https://kvz.io)
  //       example 1: replace('hello world', 'l', 'L')
  //       returns 1: 'heLLo worLd'
  //       example 2: replace('abcabc', 'ab', 'x')
  //       returns 2: 'xcxc'

  const source = String(string)
  const needle = String(pattern)
  const replacementText = String(replacement)

  if (needle === '') {
    return `${replacementText}${Array.from(source).join(replacementText)}${replacementText}`
  }

  return source.replace(new RegExp(escapeRegExp(needle), 'g'), () => replacementText)
}
