type DateInput = Date | string | number

type GoLayoutToken = (typeof GO_LAYOUT_TOKENS)[number]

const GO_LAYOUT_TOKENS = [
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

const pad2 = (value: number): string => String(value).padStart(2, '0')

const formatToken = (token: GoLayoutToken, date: Date): string => {
  const year = date.getUTCFullYear()
  const month = date.getUTCMonth() + 1
  const day = date.getUTCDate()
  const hour24 = date.getUTCHours()
  const hour12 = hour24 % 12 || 12

  switch (token) {
    case '2006':
      return String(year)
    case '06':
      return pad2(year % 100)
    case '01':
      return pad2(month)
    case '1':
      return String(month)
    case '02':
      return pad2(day)
    case '2':
      return String(day)
    case '15':
      return pad2(hour24)
    case '03':
      return pad2(hour12)
    case '3':
      return String(hour12)
    case '04':
      return pad2(date.getUTCMinutes())
    case '05':
      return pad2(date.getUTCSeconds())
    case 'PM':
      return hour24 >= 12 ? 'PM' : 'AM'
    case 'pm':
      return hour24 >= 12 ? 'pm' : 'am'
    case '-0700':
      return '+0000'
    case '-07:00':
      return '+00:00'
    case 'Z07:00':
      return 'Z'
    default:
      return token
  }
}

const toUtcDate = (value: DateInput): Date => {
  const date = value instanceof Date ? new Date(value.getTime()) : new Date(value)

  if (Number.isNaN(date.getTime())) {
    throw new TypeError('Format(): invalid date input')
  }

  return date
}

const isTokenAt = (layout: string, index: number): GoLayoutToken | undefined =>
  GO_LAYOUT_TOKENS.find((token) => layout.startsWith(token, index))

export function Format(value: DateInput, layout: string): string {
  //      discuss at: https://locutus.io/golang/time/Format
  // parity verified: Go 1.23
  //     original by: Kevin van Zonneveld (https://kvz.io)
  //          note 1: Supports a focused subset of Go layout tokens and formats in UTC for deterministic output.
  //          note 1: Unsupported layout markers are treated as literals.
  //       example 1: Format('2026-03-03T13:14:15.000Z', '2006-01-02')
  //       returns 1: '2026-03-03'
  //       example 2: Format('2026-03-03T13:14:15.000Z', '15:04:05')
  //       returns 2: '13:14:15'
  //       example 3: Format('2026-03-03T13:14:15.000Z', '01/02/06 03:04 PM')
  //       returns 3: '03/03/26 01:14 PM'
  //       example 4: Format('2026-03-03T13:14:15.000Z', 'Z07:00')
  //       returns 4: 'Z'
  //       example 5: Format('2026-03-03T13:14:15.000Z', '-07:00')
  //       returns 5: '+00:00'

  const date = toUtcDate(value)
  const resolvedLayout = String(layout)
  let result = ''

  for (let i = 0; i < resolvedLayout.length; ) {
    const token = isTokenAt(resolvedLayout, i)
    if (token) {
      result += formatToken(token, date)
      i += token.length
      continue
    }

    const char = resolvedLayout[i]
    if (char === undefined) {
      break
    }
    result += char
    i += 1
  }

  return result
}
