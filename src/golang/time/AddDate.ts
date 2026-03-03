type GoTimeInput = Date | string | number

const toTimeDate = (value: GoTimeInput): Date => {
  const date = value instanceof Date ? new Date(value.getTime()) : new Date(value)
  if (Number.isNaN(date.getTime())) {
    throw new TypeError('AddDate(): invalid date input')
  }
  return date
}

export function AddDate(value: GoTimeInput, years: number, months: number, days: number): Date {
  //      discuss at: https://locutus.io/golang/time/AddDate
  // parity verified: Go 1.23
  //     original by: Kevin van Zonneveld (https://kvz.io)
  //          note 1: Adds years/months/days to a date using Go-like normalization behavior.
  //       example 1: AddDate('2011-11-18T15:56:35.000Z', 1, 2, 3).toISOString()
  //       returns 1: '2013-01-21T15:56:35.000Z'
  //       example 2: AddDate('2020-10-31T00:00:00.000Z', 0, 1, 0).toISOString()
  //       returns 2: '2020-12-01T00:00:00.000Z'
  //       example 3: AddDate('2024-02-29T00:00:00.000Z', 1, 0, 0).toISOString()
  //       returns 3: '2025-03-01T00:00:00.000Z'

  const date = toTimeDate(value)
  const year = date.getUTCFullYear() + Math.trunc(Number(years))
  const monthIndex = date.getUTCMonth() + Math.trunc(Number(months))
  const day = date.getUTCDate() + Math.trunc(Number(days))
  const hour = date.getUTCHours()
  const minute = date.getUTCMinutes()
  const second = date.getUTCSeconds()
  const millis = date.getUTCMilliseconds()

  return new Date(Date.UTC(year, monthIndex, day, hour, minute, second, millis))
}
