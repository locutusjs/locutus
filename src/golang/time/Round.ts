type GoTimeInput = Date | string | number

const toTimeDate = (value: GoTimeInput): Date => {
  const date = value instanceof Date ? new Date(value.getTime()) : new Date(value)
  if (Number.isNaN(date.getTime())) {
    throw new TypeError('Round(): invalid date input')
  }
  return date
}

export function Round(value: GoTimeInput, unitMs: number): Date {
  //      discuss at: https://locutus.io/golang/time/Round
  // parity verified: Go 1.23
  //     original by: Kevin van Zonneveld (https://kvz.io)
  //          note 1: Rounds an instant to the nearest multiple of `unitMs`.
  //       example 1: Round('2026-03-03T13:14:15.600Z', 1000).toISOString()
  //       returns 1: '2026-03-03T13:14:16.000Z'
  //       example 2: Round('2026-03-03T13:14:15.400Z', 1000).toISOString()
  //       returns 2: '2026-03-03T13:14:15.000Z'
  //       example 3: Round('2026-03-03T13:14:44.900Z', 60000).toISOString()
  //       returns 3: '2026-03-03T13:15:00.000Z'

  const date = toTimeDate(value)
  const unit = Number(unitMs)

  if (!Number.isFinite(unit) || unit <= 0) {
    throw new TypeError('Round(): invalid unit')
  }

  return new Date(Math.round(date.getTime() / unit) * unit)
}
