const padLeft = (value: string, width: number): string =>
  width > value.length ? `${' '.repeat(width - value.length)}${value}` : value

export function sprintf(format: string, ...values: unknown[]): string {
  //      discuss at: https://locutus.io/perl/sprintf/
  // parity verified: Perl 5.40
  //     original by: Kevin van Zonneveld (https://kvz.io)
  //          note 1: Supports a pragmatic subset of Perl sprintf specifiers: %s, %d, %i, %f, %x, %X and %%.
  //       example 1: sprintf('Hello %s', 'Locutus')
  //       returns 1: 'Hello Locutus'
  //       example 2: sprintf('%d + %d = %d', 2, 3, 5)
  //       returns 2: '2 + 3 = 5'
  //       example 3: sprintf('%.2f', 3.14159)
  //       returns 3: '3.14'

  const source = String(format)
  let argIndex = 0

  return source.replace(/%([0-9]*)(?:\.([0-9]+))?([%sdifxX])/g, (_match, widthRaw, precisionRaw, specifier) => {
    if (specifier === '%') {
      return '%'
    }

    const raw = values[argIndex]
    argIndex += 1
    const width = widthRaw ? Number(widthRaw) : 0
    const precision = precisionRaw ? Number(precisionRaw) : undefined

    let rendered = ''
    switch (specifier) {
      case 's':
        rendered = String(raw)
        break
      case 'd':
      case 'i':
        rendered = String(Math.trunc(Number(raw)))
        break
      case 'f': {
        const num = Number(raw)
        rendered = precision === undefined ? String(num) : num.toFixed(precision)
        break
      }
      case 'x':
        rendered = Math.trunc(Number(raw)).toString(16)
        break
      case 'X':
        rendered = Math.trunc(Number(raw)).toString(16).toUpperCase()
        break
      default:
        rendered = String(raw)
    }

    return padLeft(rendered, width)
  })
}
