import { describe, expect, it } from 'vitest'

import { calendar } from '../../src/python/calendar/calendar.ts'
import { formatstring } from '../../src/python/calendar/formatstring.ts'
import { month } from '../../src/python/calendar/month.ts'
import { week } from '../../src/python/calendar/week.ts'

describe('python calendar harvest 2', () => {
  it('formats calendar weeks with Python spacing rules', () => {
    expect(
      week(
        [
          [26, 0],
          [27, 1],
          [28, 2],
          [29, 3],
          [0, 4],
          [0, 5],
          [0, 6],
        ],
        2,
      ),
    ).toBe('26 27 28 29         ')
    expect(week(new Array(7).fill([0, 0]), 0)).toBe('      ')
  })

  it('formats string columns like Python TextCalendar helpers', () => {
    expect(formatstring(['a', 'bb', 'ccc'])).toBe(
      '         a                         bb                       ccc         ',
    )
    expect(formatstring(['a', 'bb', 'ccc'], 2, 0)).toBe('a bbccc')
    expect(formatstring('abc', 2)).toBe('a       b       c ')
  })

  it('formats month output with width and line-spacing controls', () => {
    expect(month(2024, 2)).toBe(
      '   February 2024\nMo Tu We Th Fr Sa Su\n          1  2  3  4\n 5  6  7  8  9 10 11\n12 13 14 15 16 17 18\n19 20 21 22 23 24 25\n26 27 28 29\n',
    )
    expect(month(2024, 2, 3)).toContain('Mon Tue Wed Thu Fri Sat Sun')
    expect(month(2024, 2, 1, 2)).toContain('\n\nMo Tu We Th Fr Sa Su\n\n')
  })

  it('formats full-year calendar blocks', () => {
    const year = calendar(2024, 2, 1, 3)
    expect(year).toContain('                               2024\n')
    expect(year).toContain('      January                February                March')
    expect(year).toContain('Mo Tu We Th Fr Sa Su   Mo Tu We Th Fr Sa Su   Mo Tu We Th Fr Sa Su')
  })
})
