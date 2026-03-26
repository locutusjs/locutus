import {
  formatYear,
  normalizeCalendarYear,
  normalizeColumnSpacing,
  normalizeLineSpacing,
  normalizeMonthsPerRow,
  normalizeMonthWidth,
} from '../_helpers/_calendar.ts'

export function calendar(theyear: unknown, w = 2, l = 1, c = 6, m = 3): string {
  //      discuss at: https://locutus.io/python/calendar/calendar/
  // parity verified: Python 3.12
  //     original by: Kevin van Zonneveld (https://kvz.io)
  //       example 1: calendar(2024)
  //       returns 1: '                                  2024\n\n      January                   February                   March\nMo Tu We Th Fr Sa Su      Mo Tu We Th Fr Sa Su      Mo Tu We Th Fr Sa Su\n 1  2  3  4  5  6  7                1  2  3  4                   1  2  3\n 8  9 10 11 12 13 14       5  6  7  8  9 10 11       4  5  6  7  8  9 10\n15 16 17 18 19 20 21      12 13 14 15 16 17 18      11 12 13 14 15 16 17\n22 23 24 25 26 27 28      19 20 21 22 23 24 25      18 19 20 21 22 23 24\n29 30 31                  26 27 28 29               25 26 27 28 29 30 31\n\n       April                      May                       June\nMo Tu We Th Fr Sa Su      Mo Tu We Th Fr Sa Su      Mo Tu We Th Fr Sa Su\n 1  2  3  4  5  6  7             1  2  3  4  5                      1  2\n 8  9 10 11 12 13 14       6  7  8  9 10 11 12       3  4  5  6  7  8  9\n15 16 17 18 19 20 21      13 14 15 16 17 18 19      10 11 12 13 14 15 16\n22 23 24 25 26 27 28      20 21 22 23 24 25 26      17 18 19 20 21 22 23\n29 30                     27 28 29 30 31            24 25 26 27 28 29 30\n\n        July                     August                  September\nMo Tu We Th Fr Sa Su      Mo Tu We Th Fr Sa Su      Mo Tu We Th Fr Sa Su\n 1  2  3  4  5  6  7                1  2  3  4                         1\n 8  9 10 11 12 13 14       5  6  7  8  9 10 11       2  3  4  5  6  7  8\n15 16 17 18 19 20 21      12 13 14 15 16 17 18       9 10 11 12 13 14 15\n22 23 24 25 26 27 28      19 20 21 22 23 24 25      16 17 18 19 20 21 22\n29 30 31                  26 27 28 29 30 31         23 24 25 26 27 28 29\n                                                    30\n\n      October                   November                  December\nMo Tu We Th Fr Sa Su      Mo Tu We Th Fr Sa Su      Mo Tu We Th Fr Sa Su\n    1  2  3  4  5  6                   1  2  3                         1\n 7  8  9 10 11 12 13       4  5  6  7  8  9 10       2  3  4  5  6  7  8\n14 15 16 17 18 19 20      11 12 13 14 15 16 17       9 10 11 12 13 14 15\n21 22 23 24 25 26 27      18 19 20 21 22 23 24      16 17 18 19 20 21 22\n28 29 30 31               25 26 27 28 29 30         23 24 25 26 27 28 29\n                                                    30 31\n'

  if (arguments.length === 0) {
    throw new TypeError("TextCalendar.formatyear() missing 1 required positional argument: 'theyear'")
  }

  return formatYear(
    normalizeCalendarYear(theyear, 'calendar'),
    normalizeMonthWidth(w, 'calendar'),
    normalizeLineSpacing(l, 'calendar'),
    normalizeColumnSpacing(c, 'calendar'),
    normalizeMonthsPerRow(m, 'calendar'),
  )
}
