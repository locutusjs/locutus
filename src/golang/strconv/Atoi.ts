export function Atoi(s: unknown): [number, Error | null] {
  //      discuss at: https://locutus.io/golang/strconv/Atoi
  // parity verified: Go 1.23
  //     original by: Kevin van Zonneveld (https://kvz.io)
  //          note 1: Parses a decimal string and returns the integer value.
  //          note 1: Returns [value, null] on success, [0, error] on failure.
  //       example 1: Atoi('42')[0]
  //       returns 1: 42
  //       example 2: Atoi('-123')[0]
  //       returns 2: -123
  //       example 3: Atoi('abc')[0]
  //       returns 3: 0

  const normalized = String(s).trim()

  if (!/^-?\d+$/.test(normalized)) {
    return [0, new Error('strconv.Atoi: parsing "' + normalized + '": invalid syntax')]
  }

  const result = parseInt(normalized, 10)
  if (isNaN(result)) {
    return [0, new Error('strconv.Atoi: parsing "' + normalized + '": invalid syntax')]
  }

  return [result, null]
}
