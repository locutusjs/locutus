export function ParseFloat(s: string, bitSize: number): [number, Error | null] {
  //      discuss at: https://locutus.io/golang/strconv/ParseFloat
  // parity verified: Go 1.23
  //     original by: Kevin van Zonneveld (https://kvz.io)
  //          note 1: Parses a floating-point number from string input.
  //          note 1: Returns [value, null] on success, [0, error] on invalid syntax.
  //          note 2: Includes edge cases adapted from Go's src/strconv/atof_test.go.
  //       example 1: ParseFloat('3.14159', 64)[0]
  //       returns 1: 3.14159
  //       example 2: ParseFloat('-1.5e2', 64)[0]
  //       returns 2: -150
  //       example 3: ParseFloat('bad', 64)[0]
  //       returns 3: 0
  //       example 4: ParseFloat('99999999999999974834176', 64)[0]
  //       returns 4: 9.999999999999997e+22

  const value = String(s).trim()
  const bits = Math.trunc(Number(bitSize))

  if (bits !== 32 && bits !== 64) {
    return [0, new Error('strconv.ParseFloat: invalid bitSize')]
  }

  if (/^[+-]?(?:inf(?:inity)?|nan)$/i.test(value)) {
    return [Number(value), null]
  }

  const isValidFloatLiteral = /^[+-]?(?:\d+(?:\.\d*)?|\.\d+)(?:[eE][+-]?\d+)?$/
  if (!isValidFloatLiteral.test(value)) {
    return [0, new Error(`strconv.ParseFloat: parsing "${value}": invalid syntax`)]
  }

  const parsed = Number.parseFloat(value)
  if (Number.isNaN(parsed)) {
    return [0, new Error(`strconv.ParseFloat: parsing "${value}": invalid syntax`)]
  }

  return [bits === 32 ? Math.fround(parsed) : parsed, null]
}
