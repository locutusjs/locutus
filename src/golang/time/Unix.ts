export function Unix(sec: number, nsec = 0): Date {
  //      discuss at: https://locutus.io/golang/time/Unix
  // parity verified: Go 1.23
  //     original by: Kevin van Zonneveld (https://kvz.io)
  //          note 1: Returns a JavaScript Date representing sec + nsec nanoseconds since Unix epoch.
  //       example 1: Unix(0, 0).toISOString()
  //       returns 1: '1970-01-01T00:00:00.000Z'
  //       example 2: Unix(1700000000, 0).toISOString()
  //       returns 2: '2023-11-14T22:13:20.000Z'
  //       example 3: Unix(1700000000, 500000000).toISOString()
  //       returns 3: '2023-11-14T22:13:20.500Z'

  const seconds = Math.trunc(Number(sec))
  const nanos = Math.trunc(Number(nsec))

  if (!Number.isFinite(seconds) || !Number.isFinite(nanos)) {
    throw new TypeError('Unix(): invalid timestamp components')
  }

  const millis = seconds * 1_000 + nanos / 1_000_000
  return new Date(millis)
}
