const DAY_ABBR = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'] as const
const MONTH_NAMES = [
  '',
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December',
] as const

export function toCalendarInteger(value: unknown, functionName: string): number {
  if (typeof value === 'boolean') {
    return value ? 1 : 0
  }

  if (typeof value === 'bigint') {
    const numericValue = Number(value)
    if (!Number.isSafeInteger(numericValue)) {
      throw new RangeError(`${functionName}() integer arguments must fit within JS safe integer precision`)
    }

    return numericValue
  }

  if (typeof value === 'number' && Number.isFinite(value) && Number.isSafeInteger(value)) {
    return value
  }

  throw new TypeError(`${functionName}() requires integer arguments`)
}

export function normalizeCalendarYear(value: unknown, functionName: string): number {
  return toCalendarInteger(value, functionName)
}

export function normalizeCalendarMonth(value: unknown, functionName: string): number {
  const month = toCalendarInteger(value, functionName)
  if (month < 1 || month > 12) {
    throw new RangeError('bad month number')
  }

  return month
}

export function normalizeCalendarDay(year: number, month: number, value: unknown, functionName: string): number {
  const day = toCalendarInteger(value, functionName)
  const maxDay = daysInMonth(year, month)
  if (day < 1 || day > maxDay) {
    throw new RangeError('day is out of range for month')
  }

  return day
}

export function normalizeWeekWidth(value: unknown, functionName: string): number {
  return toCalendarInteger(value, functionName)
}

export function normalizeFormatColumnWidth(value: unknown, functionName: string): number {
  return toCalendarInteger(value, functionName)
}

export function normalizeFormatSpacing(value: unknown, functionName: string): number {
  return toCalendarInteger(value, functionName)
}

export function normalizeMonthWidth(value: unknown, functionName: string): number {
  return Math.max(toCalendarInteger(value, functionName), 2)
}

export function normalizeLineSpacing(value: unknown, functionName: string): number {
  return Math.max(toCalendarInteger(value, functionName), 1)
}

export function normalizeColumnSpacing(value: unknown, functionName: string): number {
  return Math.max(toCalendarInteger(value, functionName), 2)
}

export function normalizeMonthsPerRow(value: unknown, functionName: string): number {
  return Math.max(toCalendarInteger(value, functionName), 1)
}

export function normalizeTimeTuple(
  value: unknown,
  functionName: string,
): [number, number, number, number, number, number] {
  if (!Array.isArray(value) || value.length < 6) {
    throw new ValueError(`not enough values to unpack (expected 6, got ${Array.isArray(value) ? value.length : 0})`)
  }

  const [yearRaw, monthRaw, dayRaw, hourRaw, minuteRaw, secondRaw] = value
  const year = normalizeCalendarYear(yearRaw, functionName)
  const month = normalizeCalendarMonth(monthRaw, functionName)
  const day = toCalendarInteger(dayRaw, functionName)
  const hour = toCalendarInteger(hourRaw, functionName)
  const minute = toCalendarInteger(minuteRaw, functionName)
  const second = toCalendarInteger(secondRaw, functionName)

  return [year, month, day, hour, minute, second]
}

export function isLeapYear(year: number): boolean {
  return year % 4 === 0 && (year % 100 !== 0 || year % 400 === 0)
}

export function daysInMonth(year: number, month: number): number {
  if (month === 2) {
    return isLeapYear(year) ? 29 : 28
  }

  return [4, 6, 9, 11].includes(month) ? 30 : 31
}

export function pythonWeekday(year: number, month: number, day: number): number {
  const ordinal = daysBeforeYear(year) + daysBeforeMonth(year, month) + day
  return positiveModulo(ordinal - 1, 7)
}

export function countLeapYearsBetween(startYear: number, endYear: number): number {
  return countLeapYearsBefore(endYear) - countLeapYearsBefore(startYear)
}

export function buildWeekHeader(width: number): string {
  return DAY_ABBR.map((name) => {
    const truncated = name.slice(0, width)
    return width > truncated.length ? centerText(truncated, width) : truncated
  }).join(' ')
}

export function buildMonthCalendar(year: number, month: number): number[][] {
  const totalDays = daysInMonth(year, month)
  const firstWeekday = pythonWeekday(year, month, 1)
  const weeks: number[][] = []

  let currentWeek = new Array<number>(7).fill(0)
  let weekdayIndex = firstWeekday

  for (let day = 1; day <= totalDays; day += 1) {
    currentWeek[weekdayIndex] = day
    weekdayIndex += 1

    if (weekdayIndex === 7) {
      weeks.push(currentWeek)
      currentWeek = new Array<number>(7).fill(0)
      weekdayIndex = 0
    }
  }

  if (weekdayIndex !== 0) {
    weeks.push(currentWeek)
  }

  return weeks
}

export function formatWeek(theweek: unknown, width: unknown): string {
  if (!Array.isArray(theweek)) {
    throw new TypeError("'int' object is not iterable")
  }

  const rawWidth = toCalendarInteger(width, 'week')
  return theweek
    .map((entry) => {
      if (!Array.isArray(entry)) {
        throw new TypeError("'int' object is not iterable")
      }

      const day = entry[0]
      if (typeof day !== 'number' || !Number.isInteger(day)) {
        throw new TypeError("'int' object is not iterable")
      }

      if (day === 0) {
        return centerText('', rawWidth)
      }

      return centerText(String(day).padStart(2, ' '), rawWidth)
    })
    .join(' ')
}

export function formatString(items: unknown, cols = 20, spacing = 6): string {
  if (!isIterable(items)) {
    throw new TypeError("'object' object is not iterable")
  }

  const values = [...items]
  return values.map((value) => centerMethodString(value, cols)).join(' '.repeat(spacing))
}

export function formatMonth(year: number, month: number, width: number, lineSpacing: number): string {
  const monthWidth = 7 * (width + 1) - 1
  const header = centerText(`${MONTH_NAMES[month]} ${year}`, monthWidth)
  const weekHeader = buildWeekHeader(width)
  const weeks = formatMonthWeeks(year, month, width)

  return joinCalendarLines([header, weekHeader, ...weeks], lineSpacing)
}

export function formatYear(
  year: number,
  width: number,
  lineSpacing: number,
  columnSpacing: number,
  monthsPerRow: number,
): string {
  const monthWidth = 7 * (width + 1) - 1
  const yearWidth = monthWidth * monthsPerRow + columnSpacing * (monthsPerRow - 1)
  const lines: string[] = [centerText(String(year), yearWidth).replace(/\s+$/, ''), '\n'.repeat(lineSpacing)]
  const header = buildWeekHeader(width)
  const monthRows = Array.from({ length: Math.ceil(12 / monthsPerRow) }, (_, rowIndex) =>
    Array.from({ length: monthsPerRow }, (_, columnIndex) => rowIndex * monthsPerRow + columnIndex + 1).filter(
      (month) => month <= 12,
    ),
  )

  for (const months of monthRows) {
    lines.push('\n'.repeat(lineSpacing))
    lines.push(
      formatString(
        months.map((month) => centerText(MONTH_NAMES[month] ?? '', monthWidth)),
        monthWidth,
        columnSpacing,
      ).replace(/\s+$/, ''),
    )
    lines.push('\n'.repeat(lineSpacing))
    lines.push(
      formatString(
        months.map(() => header),
        monthWidth,
        columnSpacing,
      ).replace(/\s+$/, ''),
    )
    lines.push('\n'.repeat(lineSpacing))

    const weeks = months.map((month) => buildMonthCalendar(year, month))
    const height = Math.max(...weeks.map((calendarRows) => calendarRows.length))

    for (let weekIndex = 0; weekIndex < height; weekIndex += 1) {
      lines.push(
        formatString(
          weeks.map((calendarRows) =>
            weekIndex >= calendarRows.length
              ? ''
              : formatWeek(
                  (calendarRows[weekIndex] ?? []).map((day, weekday) => [day, weekday]),
                  width,
                ),
          ),
          monthWidth,
          columnSpacing,
        ).replace(/\s+$/, ''),
      )
      lines.push('\n'.repeat(lineSpacing))
    }
  }

  return lines.join('')
}

function countLeapYearsBefore(yearExclusive: number): number {
  const adjusted = yearExclusive - 1
  return Math.floor(adjusted / 4) - Math.floor(adjusted / 100) + Math.floor(adjusted / 400)
}

export function timeTupleToUnixSeconds(
  year: number,
  month: number,
  day: number,
  hour: number,
  minute: number,
  second: number,
): number {
  const epochOrdinal = daysBeforeYear(1970) + 1
  const ordinal = daysBeforeYear(year) + daysBeforeMonth(year, month) + day
  const daysSinceEpoch = ordinal - epochOrdinal
  return daysSinceEpoch * 86400 + hour * 3600 + minute * 60 + second
}

function daysBeforeYear(year: number): number {
  const adjusted = year - 1
  return adjusted * 365 + Math.floor(adjusted / 4) - Math.floor(adjusted / 100) + Math.floor(adjusted / 400)
}

function daysBeforeMonth(year: number, month: number): number {
  const offsets = isLeapYear(year)
    ? [0, 31, 60, 91, 121, 152, 182, 213, 244, 274, 305, 335]
    : [0, 31, 59, 90, 120, 151, 181, 212, 243, 273, 304, 334]
  return offsets[month - 1] ?? 0
}

function centerText(value: string, width: number): string {
  if (width <= value.length) {
    return value
  }

  const leftPadding = Math.floor((width - value.length) / 2)
  const rightPadding = width - value.length - leftPadding
  return `${' '.repeat(leftPadding)}${value}${' '.repeat(rightPadding)}`
}

function positiveModulo(value: number, modulus: number): number {
  return ((value % modulus) + modulus) % modulus
}

function isIterable(value: unknown): value is Iterable<unknown> {
  return (
    value !== null &&
    value !== undefined &&
    typeof (value as { [Symbol.iterator]?: unknown })[Symbol.iterator] === 'function'
  )
}

function centerMethodString(value: unknown, width: number): string {
  if (typeof value !== 'string') {
    throw new AttributeError(`${value === null ? 'NoneType' : typeof value} object has no attribute 'center'`)
  }

  return centerText(value, width)
}

function joinCalendarLines(lines: string[], lineSpacing: number): string {
  return `${lines.map((line) => line.replace(/\s+$/, '')).join('\n'.repeat(lineSpacing))}\n`
}

function formatMonthWeeks(year: number, month: number, width: number): string[] {
  return buildMonthCalendar(year, month).map((week) =>
    formatWeek(
      week.map((day, weekday) => [day, weekday]),
      width,
    ),
  )
}

class ValueError extends Error {
  constructor(message: string) {
    super(message)
    this.name = 'ValueError'
  }
}

class AttributeError extends Error {
  constructor(message: string) {
    super(message)
    this.name = 'AttributeError'
  }
}
