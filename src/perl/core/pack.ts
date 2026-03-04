const toByte = (value: number): number => ((Math.trunc(value) % 256) + 256) % 256
const toChar = (value: number): string => String.fromCharCode(toByte(value))

function writeUInt16BE(value: number): string {
  const n = Math.trunc(value) >>> 0
  return toChar((n >>> 8) & 0xff) + toChar(n & 0xff)
}

function writeUInt16LE(value: number): string {
  const n = Math.trunc(value) >>> 0
  return toChar(n & 0xff) + toChar((n >>> 8) & 0xff)
}

function writeUInt32BE(value: number): string {
  const n = Math.trunc(value) >>> 0
  return toChar((n >>> 24) & 0xff) + toChar((n >>> 16) & 0xff) + toChar((n >>> 8) & 0xff) + toChar(n & 0xff)
}

function writeUInt32LE(value: number): string {
  const n = Math.trunc(value) >>> 0
  return toChar(n & 0xff) + toChar((n >>> 8) & 0xff) + toChar((n >>> 16) & 0xff) + toChar((n >>> 24) & 0xff)
}

function nibble(char: string): number {
  const lower = char.toLowerCase()
  if (lower >= '0' && lower <= '9') {
    return lower.charCodeAt(0) - 48
  }
  if (lower >= 'a' && lower <= 'f') {
    return lower.charCodeAt(0) - 87
  }
  return 0
}

function packHex(hex: string, highFirst: boolean, nybbles: number): string {
  const normalized = hex.replace(/[^0-9a-fA-F]/g, '')
  const take = nybbles === -1 ? normalized.length : Math.max(0, nybbles)
  const input = normalized.slice(0, take)

  let out = ''
  for (let i = 0; i < input.length; i += 2) {
    const a = nibble(input[i] ?? '0')
    const b = nibble(input[i + 1] ?? '0')
    const byte = highFirst ? (a << 4) | b : (b << 4) | a
    out += toChar(byte)
  }

  if (input.length % 2 === 1) {
    const last = nibble(input.at(-1) ?? '0')
    out += toChar(highFirst ? last << 4 : last)
  }

  return out
}

export function pack(template: string, ...values: unknown[]): string {
  //  discuss at: https://locutus.io/perl/pack/
  // original by: Kevin van Zonneveld (https://kvz.io)
  //      note 1: Implements a practical subset: A, a, C, n, N, v, V, H, h with optional counts and *.
  //      note 2: Output is a binary JavaScript string (char codes 0-255).
  //   example 1: pack('A5', 'hi')
  //   returns 1: 'hi   '
  //   example 2: pack('C*', 72, 105, 33)
  //   returns 2: 'Hi!'
  //   example 3: pack('n', 258).split('').map((ch) => ch.charCodeAt(0))
  //   returns 3: [1, 2]

  const format = String(template).replace(/\s+/g, '')
  let cursor = 0
  let argIndex = 0
  let out = ''

  while (cursor < format.length) {
    const directive = format[cursor]
    if (!directive) {
      break
    }
    cursor += 1

    let countToken = ''
    while (cursor < format.length && /[0-9*]/.test(format[cursor] ?? '')) {
      countToken += format[cursor]
      cursor += 1
    }

    const count = countToken === '' ? 1 : countToken === '*' ? -1 : Number.parseInt(countToken, 10)

    const nextString = (): string => String(values[argIndex++] ?? '')
    const nextNumber = (): number => Number(values[argIndex++] ?? 0)

    switch (directive) {
      case 'A':
      case 'a': {
        const value = nextString()
        const width = count === -1 ? value.length : Math.max(0, count)
        const padded = directive === 'A' ? value.padEnd(width, ' ') : value.padEnd(width, '\0')
        out += padded.slice(0, width)
        break
      }

      case 'C': {
        const repeat = count === -1 ? values.length - argIndex : Math.max(0, count)
        for (let i = 0; i < repeat; i++) {
          out += toChar(nextNumber())
        }
        break
      }

      case 'n': {
        const repeat = count === -1 ? values.length - argIndex : Math.max(0, count)
        for (let i = 0; i < repeat; i++) {
          out += writeUInt16BE(nextNumber())
        }
        break
      }

      case 'v': {
        const repeat = count === -1 ? values.length - argIndex : Math.max(0, count)
        for (let i = 0; i < repeat; i++) {
          out += writeUInt16LE(nextNumber())
        }
        break
      }

      case 'N': {
        const repeat = count === -1 ? values.length - argIndex : Math.max(0, count)
        for (let i = 0; i < repeat; i++) {
          out += writeUInt32BE(nextNumber())
        }
        break
      }

      case 'V': {
        const repeat = count === -1 ? values.length - argIndex : Math.max(0, count)
        for (let i = 0; i < repeat; i++) {
          out += writeUInt32LE(nextNumber())
        }
        break
      }

      case 'H':
      case 'h': {
        const value = nextString()
        out += packHex(value, directive === 'H', count)
        break
      }

      default:
        break
    }
  }

  return out
}
