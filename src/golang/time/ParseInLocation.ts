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

type ParsedGoTime = {
  localMillis: number
  hasOffset: boolean
  offsetMinutes: number
}

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
    if (hours > 23 || minutes > 59) {
      throw new TypeError('ParseInLocation(): invalid offset')
    }
    return sign * (hours * 60 + minutes)
  }

  const colon = offset.match(/^([+-])(\d{2}):(\d{2})$/)
  if (colon?.[1] && colon[2] && colon[3]) {
    const sign = colon[1] === '-' ? -1 : 1
    const hours = Number.parseInt(colon[2], 10)
    const minutes = Number.parseInt(colon[3], 10)
    if (hours > 23 || minutes > 59) {
      throw new TypeError('ParseInLocation(): invalid offset')
    }
    return sign * (hours * 60 + minutes)
  }

  throw new TypeError('ParseInLocation(): invalid offset')
}

const resolveTwoDigitYear = (year: number): number => (year >= 69 ? 1900 + year : 2000 + year)

const createUtcDate = (
  year: number,
  month: number,
  day: number,
  hour: number,
  minute: number,
  second: number,
): Date => {
  const date = new Date(0)
  date.setUTCFullYear(year, month - 1, day)
  date.setUTCHours(hour, minute, second, 0)
  return date
}

const parseGoTime = (layout: string, value: string): ParsedGoTime => {
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
    throw new TypeError('ParseInLocation(): input does not match layout')
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

  if (
    month < 1 ||
    month > 12 ||
    day < 1 ||
    day > 31 ||
    hour24 < 0 ||
    hour24 > 23 ||
    minute < 0 ||
    minute > 59 ||
    second < 0 ||
    second > 59
  ) {
    throw new TypeError('ParseInLocation(): invalid datetime components')
  }

  const localCheck = createUtcDate(year, month, day, hour24, minute, second)
  if (
    localCheck.getUTCFullYear() !== year ||
    localCheck.getUTCMonth() + 1 !== month ||
    localCheck.getUTCDate() !== day ||
    localCheck.getUTCHours() !== hour24 ||
    localCheck.getUTCMinutes() !== minute ||
    localCheck.getUTCSeconds() !== second
  ) {
    throw new TypeError('ParseInLocation(): invalid datetime components')
  }

  const localMillis = localCheck.getTime()

  return {
    localMillis,
    hasOffset,
    offsetMinutes,
  }
}

const zonedFormatterCache = new Map<string, Intl.DateTimeFormat>()

const getZonedFormatter = (timeZone: string): Intl.DateTimeFormat => {
  let formatter = zonedFormatterCache.get(timeZone)
  if (!formatter) {
    formatter = new Intl.DateTimeFormat('en-CA', {
      timeZone,
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      hourCycle: 'h23',
    })
    zonedFormatterCache.set(timeZone, formatter)
  }
  return formatter
}

const assertValidLocation = (location: string): void => {
  try {
    getZonedFormatter(location).format(new Date(0))
  } catch {
    throw new TypeError('ParseInLocation(): invalid location')
  }
}

const getOffsetMinutesAt = (timeZone: string, utcMillis: number): number => {
  const formatter = getZonedFormatter(timeZone)
  const parts = formatter.formatToParts(new Date(utcMillis))

  let year = 0
  let month = 1
  let day = 1
  let hour = 0
  let minute = 0
  let second = 0

  for (const part of parts) {
    switch (part.type) {
      case 'year':
        year = Number.parseInt(part.value, 10)
        break
      case 'month':
        month = Number.parseInt(part.value, 10)
        break
      case 'day':
        day = Number.parseInt(part.value, 10)
        break
      case 'hour':
        hour = Number.parseInt(part.value, 10)
        break
      case 'minute':
        minute = Number.parseInt(part.value, 10)
        break
      case 'second':
        second = Number.parseInt(part.value, 10)
        break
      default:
        break
    }
  }

  const zonedAsUtcMillis = createUtcDate(year, month, day, hour, minute, second).getTime()
  return Math.round((zonedAsUtcMillis - utcMillis) / 60_000)
}

const resolveWallTimeInLocation = (timeZone: string, localMillis: number): number => {
  let offsetMinutes = getOffsetMinutesAt(timeZone, localMillis)

  if (offsetMinutes !== 0) {
    const utcMillis = localMillis - offsetMinutes * 60_000
    const correctedOffsetMinutes = getOffsetMinutesAt(timeZone, utcMillis)
    if (correctedOffsetMinutes !== offsetMinutes) {
      offsetMinutes = correctedOffsetMinutes
    }
  }

  return localMillis - offsetMinutes * 60_000
}

export function ParseInLocation(layout: string, value: string, location: string): Date {
  //      discuss at: https://locutus.io/golang/time/ParseInLocation
  // parity verified: Go 1.23
  //     original by: Kevin van Zonneveld (https://kvz.io)
  //          note 1: Supports the same focused layout-token subset as Parse.
  //          note 2: Inputs without an explicit numeric offset are interpreted in the supplied IANA time zone.
  //          note 3: Explicit numeric offsets still take precedence over the supplied location, matching Go's absolute-time result.
  //       example 1: ParseInLocation('2006-01-02 15:04:05', '2026-03-03 13:14:15', 'America/New_York')
  //       returns 1: new Date('2026-03-03T18:14:15.000Z')
  //       example 2: ParseInLocation('2006-01-02 15:04:05', '2026-07-03 13:14:15', 'America/New_York')
  //       returns 2: new Date('2026-07-03T17:14:15.000Z')
  //       example 3: ParseInLocation('2006-01-02 15:04:05', '2024-11-03 01:30:00', 'America/New_York')
  //       returns 3: new Date('2024-11-03T05:30:00.000Z')
  //       example 4: ParseInLocation('2006-01-02 15:04:05', '2024-03-10 02:30:00', 'America/New_York')
  //       returns 4: new Date('2024-03-10T06:30:00.000Z')
  //       example 5: ParseInLocation('2006-01-02T15:04:05-07:00', '2026-03-03T13:14:15+02:30', 'America/New_York')
  //       returns 5: new Date('2026-03-03T10:44:15.000Z')
  //       example 6: ParseInLocation('2006-01-02 15:04:05', '2026-03-03 13:14:15', ('America' + '/New_York'))
  //       returns 6: new Date('2026-03-03T18:14:15.000Z')

  const resolvedLocation = String(location)
  assertValidLocation(resolvedLocation)

  const parsed = parseGoTime(layout, value)
  const utcMillis = parsed.hasOffset
    ? parsed.localMillis - parsed.offsetMinutes * 60_000
    : resolveWallTimeInLocation(resolvedLocation, parsed.localMillis)

  return new Date(utcMillis)
}
