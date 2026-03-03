type GoTimeInput = Date | string | number

const toTimeDate = (value: GoTimeInput): Date => {
  const date = value instanceof Date ? new Date(value.getTime()) : new Date(value)
  if (Number.isNaN(date.getTime())) {
    throw new TypeError('Truncate(): invalid date input')
  }
  return date
}

export function Truncate(value: GoTimeInput, unitMs: number): Date {
  //      discuss at: https://locutus.io/golang/time/Truncate
  // parity verified: Go 1.23
  //     original by: Kevin van Zonneveld (https://kvz.io)
  //          note 1: Truncates an instant to a lower multiple of `unitMs`.
  //       example 1: Truncate('2026-03-03T13:14:15.600Z', 1000).toISOString()
  //       returns 1: '2026-03-03T13:14:15.000Z'
  //       example 2: Truncate('2026-03-03T13:14:15.999Z', 1000).toISOString()
  //       returns 2: '2026-03-03T13:14:15.000Z'
  //       example 3: Truncate('2026-03-03T13:14:44.900Z', 60000).toISOString()
  //       returns 3: '2026-03-03T13:14:00.000Z'

  const date = toTimeDate(value)
  const unit = Number(unitMs)

  if (!Number.isFinite(unit) || unit <= 0) {
    throw new TypeError('Truncate(): invalid unit')
  }

  return new Date(Math.trunc(date.getTime() / unit) * unit)
}
