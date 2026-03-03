const padExponent = (value: string, upper = false): string => {
  const replaced = value.replace(/e([+-]?)(\d+)$/i, (_m, signRaw: string, expDigits: string) => {
    const sign = signRaw === '-' ? '-' : '+'
    return `e${sign}${expDigits.padStart(2, '0')}`
  })
  return upper ? replaced.replace('e', 'E') : replaced
}

const trimTrailingZeroFraction = (value: string): string =>
  value.replace(/(\.\d*?[1-9])0+$/u, '$1').replace(/\.0+$/u, '')

export function FormatFloat(f: number, fmt: string, prec: number, _bitSize: number): string {
  //      discuss at: https://locutus.io/golang/strconv/FormatFloat
  // parity verified: Go 1.23
  //     original by: Kevin van Zonneveld (https://kvz.io)
  //          note 1: Supports common Go format verbs f/e/E/g/G.
  //          note 2: For unsupported verbs this implementation throws.
  //       example 1: FormatFloat(3.1415926, 'f', 2, 64)
  //       returns 1: '3.14'
  //       example 2: FormatFloat(1200, 'e', 2, 64)
  //       returns 2: '1.20e+03'
  //       example 3: FormatFloat(1200, 'E', 2, 64)
  //       returns 3: '1.20E+03'

  const value = Number(f)
  const format = String(fmt)
  const precision = Math.trunc(Number(prec))

  if (!Number.isFinite(value)) {
    return String(value)
  }

  switch (format) {
    case 'f': {
      if (precision < 0) {
        return trimTrailingZeroFraction(value.toString())
      }
      return value.toFixed(precision)
    }
    case 'e': {
      const rendered = precision < 0 ? value.toExponential() : value.toExponential(precision)
      return padExponent(rendered, false)
    }
    case 'E': {
      const rendered = precision < 0 ? value.toExponential() : value.toExponential(precision)
      return padExponent(rendered, true)
    }
    case 'g':
    case 'G': {
      const rendered = precision < 0 ? value.toString() : value.toPrecision(Math.max(1, precision))
      const normalized =
        rendered.includes('e') || rendered.includes('E')
          ? padExponent(rendered, format === 'G')
          : trimTrailingZeroFraction(rendered)
      return format === 'G' ? normalized.replace('e', 'E') : normalized.replace('E', 'e')
    }
    default:
      throw new Error(`strconv.FormatFloat: unsupported format ${format}`)
  }
}
