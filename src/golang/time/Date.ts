// biome-ignore lint/suspicious/noShadowRestrictedNames: Go API compatibility requires exported Date symbol.
export function Date(
  year: number,
  month: number,
  day: number,
  hour: number,
  minute: number,
  second: number,
  nsec: number,
  offsetMinutes = 0,
): Date {
  //      discuss at: https://locutus.io/golang/time/Date
  // parity verified: Go 1.23
  //     original by: Kevin van Zonneveld (https://kvz.io)
  //          note 1: Builds an absolute JavaScript Date from Go-style date parts.
  //          note 2: `offsetMinutes` is east-of-UTC, matching Go FixedZone offset behavior.
  //       example 1: Date(2026, 3, 3, 13, 14, 15, 0, 0).toISOString()
  //       returns 1: '2026-03-03T13:14:15.000Z'
  //       example 2: Date(2026, 3, 3, 13, 14, 15, 500000000, 0).toISOString()
  //       returns 2: '2026-03-03T13:14:15.500Z'
  //       example 3: Date(2026, 3, 3, 13, 14, 15, 0, 150).toISOString()
  //       returns 3: '2026-03-03T10:44:15.000Z'

  const resolvedYear = Math.trunc(Number(year))
  const resolvedMonth = Math.trunc(Number(month))
  const resolvedDay = Math.trunc(Number(day))
  const resolvedHour = Math.trunc(Number(hour))
  const resolvedMinute = Math.trunc(Number(minute))
  const resolvedSecond = Math.trunc(Number(second))
  const resolvedNsec = Math.trunc(Number(nsec))
  const resolvedOffsetMinutes = Math.trunc(Number(offsetMinutes))

  if (
    !Number.isFinite(resolvedYear) ||
    !Number.isFinite(resolvedMonth) ||
    !Number.isFinite(resolvedDay) ||
    !Number.isFinite(resolvedHour) ||
    !Number.isFinite(resolvedMinute) ||
    !Number.isFinite(resolvedSecond) ||
    !Number.isFinite(resolvedNsec) ||
    !Number.isFinite(resolvedOffsetMinutes)
  ) {
    throw new TypeError('Date(): invalid datetime components')
  }

  const millis = Math.trunc(resolvedNsec / 1_000_000)
  const utcMillis =
    globalThis.Date.UTC(
      resolvedYear,
      resolvedMonth - 1,
      resolvedDay,
      resolvedHour,
      resolvedMinute,
      resolvedSecond,
      millis,
    ) -
    resolvedOffsetMinutes * 60_000

  return new globalThis.Date(utcMillis)
}
