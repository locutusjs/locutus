type GoTimeInput = Date | string | number

const toTimeDate = (value: GoTimeInput): Date => {
  const date = value instanceof Date ? new Date(value.getTime()) : new Date(value)
  if (Number.isNaN(date.getTime())) {
    throw new TypeError('Equal(): invalid date input')
  }
  return date
}

export function Equal(left: GoTimeInput, right: GoTimeInput): boolean {
  //      discuss at: https://locutus.io/golang/time/Equal
  // parity verified: Go 1.23
  //     original by: Kevin van Zonneveld (https://kvz.io)
  //       example 1: Equal('2026-03-03T13:14:15.000Z', '2026-03-03T15:14:15.000+02:00')
  //       returns 1: true
  //       example 2: Equal('2026-03-03T13:14:15.001Z', '2026-03-03T13:14:15.000Z')
  //       returns 2: false

  return toTimeDate(left).getTime() === toTimeDate(right).getTime()
}
