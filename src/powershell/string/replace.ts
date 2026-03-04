export function replace(str: string, search: string, replacement: string): string {
  //      discuss at: https://locutus.io/powershell/replace/
  // parity verified: PowerShell 7.4
  //     original by: Kevin van Zonneveld (https://kvz.io)
  //       example 1: replace('Hello World World', 'World', 'Locutus')
  //       returns 1: 'Hello Locutus Locutus'
  //       example 2: replace('a+b+c', '+', '-')
  //       returns 2: 'a-b-c'

  const source = String(str)
  const from = String(search)
  const to = String(replacement)
  if (!from) {
    return source
  }

  return source.replaceAll(from, to)
}
