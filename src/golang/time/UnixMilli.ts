export function UnixMilli(msec: number): Date {
  //      discuss at: https://locutus.io/golang/time/UnixMilli
  // parity verified: Go 1.23
  //     original by: Kevin van Zonneveld (https://kvz.io)
  //          note 1: Returns a JavaScript Date for milliseconds since Unix epoch.
  //       example 1: UnixMilli(0).toISOString()
  //       returns 1: '1970-01-01T00:00:00.000Z'
  //       example 2: UnixMilli(1700000000123).toISOString()
  //       returns 2: '2023-11-14T22:13:20.123Z'
  //       example 3: UnixMilli(-1).toISOString()
  //       returns 3: '1969-12-31T23:59:59.999Z'

  const millis = Math.trunc(Number(msec))
  if (!Number.isFinite(millis)) {
    throw new TypeError('UnixMilli(): invalid timestamp')
  }

  return new Date(millis)
}
