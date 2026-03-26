import { describe, expect, it } from 'vitest'

import { isleap } from '../../src/python/calendar/isleap.ts'
import { leapdays } from '../../src/python/calendar/leapdays.ts'
import { monthcalendar } from '../../src/python/calendar/monthcalendar.ts'
import { monthrange } from '../../src/python/calendar/monthrange.ts'
import { timegm } from '../../src/python/calendar/timegm.ts'
import { weekday } from '../../src/python/calendar/weekday.ts'
import { weekheader } from '../../src/python/calendar/weekheader.ts'

describe('python calendar harvest 1', () => {
  it('matches leap-year helpers', () => {
    expect(isleap(2000)).toBe(true)
    expect(isleap(1900)).toBe(false)
    expect(leapdays(2000, 2021)).toBe(6)
    expect(leapdays(true, 5)).toBe(1)
  })

  it('matches Python weekday and month layout semantics', () => {
    expect(weekday(2024, 2, 29)).toBe(3)
    expect(weekday(0, 1, 1)).toBe(5)
    expect(monthrange(2024, 2)).toEqual([3, 29])
    expect(monthcalendar(2024, 2)).toEqual([
      [0, 0, 0, 1, 2, 3, 4],
      [5, 6, 7, 8, 9, 10, 11],
      [12, 13, 14, 15, 16, 17, 18],
      [19, 20, 21, 22, 23, 24, 25],
      [26, 27, 28, 29, 0, 0, 0],
    ])
  })

  it('matches Python week header formatting across narrow and negative widths', () => {
    expect(weekheader(2)).toBe('Mo Tu We Th Fr Sa Su')
    expect(weekheader(-1)).toBe('Mo Tu We Th Fr Sa Su')
    expect(weekheader(-2)).toBe('M T W T F S S')
    expect(weekheader(5)).toBe(' Mon   Tue   Wed   Thu   Fri   Sat   Sun ')
  })

  it('matches Python timegm normalization rules', () => {
    expect(timegm([1970, 1, 1, 0, 0, 0])).toBe(0)
    expect(timegm([1970, 1, 0, 0, 0, 0])).toBe(-86400)
    expect(timegm([1970, 2, 30, 0, 0, 0])).toBe(5184000)
    expect(timegm([1970, 1, 1, 0, 0, 0, 1, 2])).toBe(0)
  })
})
