type GoParseToken = (typeof GO_PARSE_TOKENS)[number]

const GO_PARSE_TOKENS = [
  'Z07:00',
  '-07:00',
  '-0700',
  '2006',
  'PM',
  'pm',
  '15',
  '06',
  '01',
  '02',
  '03',
  '04',
  '05',
  '1',
  '2',
  '3',
] as const

const escapeRegex = (value: string): string => value.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')

const isTokenAt = (layout: string, index: number): GoParseToken | undefined =>
  GO_PARSE_TOKENS.find((token) => layout.startsWith(token, index))

const tokenRegex = (token: GoParseToken): string => {
  switch (token) {
    case '2006':
      return '(\\d{4})'
    case '06':
      return '(\\d{2})'
    case '01':
      return '(0[1-9]|1[0-2])'
    case '1':
      return '([1-9]|1[0-2])'
    case '02':
      return '(0[1-9]|[12]\\d|3[01])'
    case '2':
      return '([1-9]|[12]\\d|3[01])'
    case '15':
      return '([01]\\d|2[0-3])'
    case '03':
      return '(0[1-9]|1[0-2])'
    case '3':
      return '([1-9]|1[0-2])'
    case '04':
      return '([0-5]\\d)'
    case '05':
      return '([0-5]\\d)'
    case 'PM':
      return '(AM|PM)'
    case 'pm':
      return '(am|pm)'
    case '-0700':
      return '([+-]\\d{4})'
    case '-07:00':
      return '([+-]\\d{2}:\\d{2})'
    case 'Z07:00':
      return '(Z|[+-]\\d{2}:\\d{2})'
    default:
      return escapeRegex(token)
  }
}

const parseOffsetMinutes = (offset: string): number => {
  if (offset === 'Z') {
    return 0
  }

  const compact = offset.match(/^([+-])(\d{2})(\d{2})$/)
  if (compact?.[1] && compact[2] && compact[3]) {
    const sign = compact[1] === '-' ? -1 : 1
    const hours = Number.parseInt(compact[2], 10)
    const minutes = Number.parseInt(compact[3], 10)
    return sign * (hours * 60 + minutes)
  }

  const colon = offset.match(/^([+-])(\d{2}):(\d{2})$/)
  if (colon?.[1] && colon[2] && colon[3]) {
    const sign = colon[1] === '-' ? -1 : 1
    const hours = Number.parseInt(colon[2], 10)
    const minutes = Number.parseInt(colon[3], 10)
    return sign * (hours * 60 + minutes)
  }

  throw new TypeError('Parse(): invalid offset')
}

const resolveTwoDigitYear = (year: number): number => (year >= 69 ? 1900 + year : 2000 + year)

export function Parse(layout: string, value: string): Date {
  //      discuss at: https://locutus.io/golang/time/Parse
  // parity verified: Go 1.23
  //     original by: Kevin van Zonneveld (https://kvz.io)
  //          note 1: Supports a focused subset of Go layout tokens and parses into a JavaScript Date.
  //          note 1: Layout markers outside the supported subset are treated as literals.
  //          note 2: Returned Date is absolute time in UTC; timezone offsets in input are respected.
  //       example 1: Parse('2006-01-02', '2026-03-03')
  //       returns 1: new Date('2026-03-03T00:00:00.000Z')
  //       example 2: Parse('2006-01-02 15:04:05', '2026-03-03 13:14:15')
  //       returns 2: new Date('2026-03-03T13:14:15.000Z')
  //       example 3: Parse('01/02/06 03:04 PM', '03/03/26 01:14 PM')
  //       returns 3: new Date('2026-03-03T13:14:00.000Z')
  //       example 4: Parse('2006-01-02T15:04:05-07:00', '2026-03-03T13:14:15+02:30')
  //       returns 4: new Date('2026-03-03T10:44:15.000Z')
  //       example 5: Parse('2006-01-02T15:04:05Z07:00', '2026-03-03T13:14:15Z')
  //       returns 5: new Date('2026-03-03T13:14:15.000Z')

  const resolvedLayout = String(layout)
  const resolvedValue = String(value)

  const tokenOrder: GoParseToken[] = []
  let regexSource = '^'

  for (let i = 0; i < resolvedLayout.length; ) {
    const token = isTokenAt(resolvedLayout, i)
    if (token) {
      regexSource += tokenRegex(token)
      tokenOrder.push(token)
      i += token.length
      continue
    }

    const char = resolvedLayout[i]
    if (char === undefined) {
      break
    }

    regexSource += escapeRegex(char)
    i += 1
  }

  regexSource += '$'
  const match = new RegExp(regexSource).exec(resolvedValue)
  if (!match) {
    throw new TypeError('Parse(): input does not match layout')
  }

  let year = 1970
  let month = 1
  let day = 1
  let hour24 = 0
  let minute = 0
  let second = 0
  let hour12: number | undefined
  let ampm: 'AM' | 'PM' | undefined
  let offsetMinutes = 0
  let hasOffset = false

  let matchIndex = 1
  for (const token of tokenOrder) {
    const raw = match[matchIndex]
    matchIndex += 1
    if (!raw) {
      continue
    }

    switch (token) {
      case '2006':
        year = Number.parseInt(raw, 10)
        break
      case '06':
        year = resolveTwoDigitYear(Number.parseInt(raw, 10))
        break
      case '01':
      case '1':
        month = Number.parseInt(raw, 10)
        break
      case '02':
      case '2':
        day = Number.parseInt(raw, 10)
        break
      case '15':
        hour24 = Number.parseInt(raw, 10)
        break
      case '03':
      case '3':
        hour12 = Number.parseInt(raw, 10)
        break
      case '04':
        minute = Number.parseInt(raw, 10)
        break
      case '05':
        second = Number.parseInt(raw, 10)
        break
      case 'PM':
      case 'pm':
        ampm = raw.toUpperCase() === 'PM' ? 'PM' : 'AM'
        break
      case '-0700':
      case '-07:00':
      case 'Z07:00':
        offsetMinutes = parseOffsetMinutes(raw)
        hasOffset = true
        break
      default:
        break
    }
  }

  if (hour12 !== undefined) {
    if (ampm === 'PM' && hour12 < 12) {
      hour24 = hour12 + 12
    } else if (ampm === 'AM' && hour12 === 12) {
      hour24 = 0
    } else {
      hour24 = hour12
    }
  }

  if (month < 1 || month > 12 || day < 1 || day > 31 || hour24 < 0 || hour24 > 23 || minute < 0 || minute > 59) {
    throw new TypeError('Parse(): invalid datetime components')
  }

  const localMillis = Date.UTC(year, month - 1, day, hour24, minute, second)
  const localCheck = new Date(localMillis)
  if (
    localCheck.getUTCFullYear() !== year ||
    localCheck.getUTCMonth() + 1 !== month ||
    localCheck.getUTCDate() !== day ||
    localCheck.getUTCHours() !== hour24 ||
    localCheck.getUTCMinutes() !== minute ||
    localCheck.getUTCSeconds() !== second
  ) {
    throw new TypeError('Parse(): invalid datetime components')
  }

  const utcMillis = hasOffset ? localMillis - offsetMinutes * 60_000 : localMillis
  return new Date(utcMillis)
}
