type GoTimeInput = Date | string | number

const toTimeDate = (value: GoTimeInput): Date => {
  const date = value instanceof Date ? new Date(value.getTime()) : new Date(value)
  if (Number.isNaN(date.getTime())) {
    throw new TypeError('Sub(): invalid date input')
  }
  return date
}

export function Sub(left: GoTimeInput, right: GoTimeInput): number {
  //      discuss at: https://locutus.io/golang/time/Sub
  // parity verified: Go 1.23
  //     original by: Kevin van Zonneveld (https://kvz.io)
  //          note 1: Returns the duration in milliseconds between two instants (left - right).
  //       example 1: Sub('2026-03-03T13:14:15.500Z', '2026-03-03T13:14:15.000Z')
  //       returns 1: 500
  //       example 2: Sub('2026-03-03T13:14:10.000Z', '2026-03-03T13:14:15.000Z')
  //       returns 2: -5000

  return toTimeDate(left).getTime() - toTimeDate(right).getTime()
}
