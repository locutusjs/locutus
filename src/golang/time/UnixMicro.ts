export function UnixMicro(usec: number): Date {
  //      discuss at: https://locutus.io/golang/time/UnixMicro
  // parity verified: Go 1.23
  //     original by: Kevin van Zonneveld (https://kvz.io)
  //          note 1: Returns a JavaScript Date for microseconds since Unix epoch.
  //       example 1: UnixMicro(0).toISOString()
  //       returns 1: '1970-01-01T00:00:00.000Z'
  //       example 2: UnixMicro(1700000000123456).toISOString()
  //       returns 2: '2023-11-14T22:13:20.123Z'
  //       example 3: UnixMicro(-1000).toISOString()
  //       returns 3: '1969-12-31T23:59:59.999Z'

  const micros = Math.trunc(Number(usec))
  if (!Number.isFinite(micros)) {
    throw new TypeError('UnixMicro(): invalid timestamp')
  }

  return new Date(micros / 1_000)
}
