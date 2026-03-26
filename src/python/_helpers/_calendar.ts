const DAY_ABBR = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'] as const

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
  const leftPadding = Math.floor((width - value.length) / 2)
  const rightPadding = width - value.length - leftPadding
  return `${' '.repeat(leftPadding)}${value}${' '.repeat(rightPadding)}`
}

function positiveModulo(value: number, modulus: number): number {
  return ((value % modulus) + modulus) % modulus
}

class ValueError extends Error {
  constructor(message: string) {
    super(message)
    this.name = 'ValueError'
  }
}
