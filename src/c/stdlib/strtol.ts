export function strtol(str: string, base: number = 10): number {
  //      discuss at: https://locutus.io/c/stdlib/strtol/
  // parity verified: C 23
  //     original by: Kevin van Zonneveld (https://kvz.io)
  //          note 1: Parses a string as a signed integer with optional radix support.
  //          note 2: Supports base 0 auto-detection (0x => 16, leading 0 => 8, otherwise 10).
  //       example 1: strtol('42', 10)
  //       returns 1: 42
  //       example 2: strtol('   -0x2a', 0)
  //       returns 2: -42
  //       example 3: strtol('077', 0)
  //       returns 3: 63

  const input = String(str)
  let index = 0

  while (index < input.length && /\s/.test(input[index] ?? '')) {
    index += 1
  }

  let sign = 1
  if (input[index] === '+' || input[index] === '-') {
    if (input[index] === '-') {
      sign = -1
    }
    index += 1
  }

  const normalizedBase = normalizeBase(base, input, index)
  if (normalizedBase === 0) {
    return 0
  }

  if (normalizedBase === 16 && (input.slice(index, index + 2) === '0x' || input.slice(index, index + 2) === '0X')) {
    index += 2
  }

  let value = 0
  let digits = 0

  while (index < input.length) {
    const digit = charToDigit(input[index] ?? '')
    if (digit < 0 || digit >= normalizedBase) {
      break
    }
    value = value * normalizedBase + digit
    digits += 1
    index += 1
  }

  if (digits === 0) {
    return 0
  }

  return sign * value
}

function normalizeBase(base: number, input: string, index: number): number {
  const raw = Number(base)
  if (!Number.isFinite(raw)) {
    return 0
  }

  if (raw === 0) {
    if (input.slice(index, index + 2) === '0x' || input.slice(index, index + 2) === '0X') {
      return 16
    }
    if (input[index] === '0') {
      return 8
    }
    return 10
  }

  const radix = Math.trunc(raw)
  if (radix < 2 || radix > 36) {
    return 0
  }
  return radix
}

function charToDigit(char: string): number {
  if (char >= '0' && char <= '9') {
    return char.charCodeAt(0) - 48
  }

  const lower = char.toLowerCase()
  if (lower >= 'a' && lower <= 'z') {
    return lower.charCodeAt(0) - 87
  }

  return -1
}
