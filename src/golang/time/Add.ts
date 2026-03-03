type GoTimeInput = Date | string | number

const toTimeDate = (value: GoTimeInput): Date => {
  const date = value instanceof Date ? new Date(value.getTime()) : new Date(value)
  if (Number.isNaN(date.getTime())) {
    throw new TypeError('Add(): invalid date input')
  }
  return date
}

export function Add(value: GoTimeInput, durationMs: number): Date {
  //      discuss at: https://locutus.io/golang/time/Add
  // parity verified: Go 1.23
  //     original by: Kevin van Zonneveld (https://kvz.io)
  //          note 1: Adds milliseconds duration to an instant and returns a new Date.
  //       example 1: Add('2026-03-03T13:14:15.000Z', 1500).toISOString()
  //       returns 1: '2026-03-03T13:14:16.500Z'
  //       example 2: Add('2026-03-03T13:14:15.000Z', -5000).toISOString()
  //       returns 2: '2026-03-03T13:14:10.000Z'
  //       example 3: Add('2024-02-29T23:00:00.000Z', 7200000).toISOString()
  //       returns 3: '2024-03-01T01:00:00.000Z'

  const date = toTimeDate(value)
  const duration = Number(durationMs)

  if (!Number.isFinite(duration)) {
    throw new TypeError('Add(): invalid duration')
  }

  return new Date(date.getTime() + duration)
}
