import { strftime } from '../datetime/strftime.ts'

export function gmstrftime(format: string, timestamp?: number | Date): string {
  //      discuss at: https://locutus.io/php/gmstrftime/
  // parity verified: PHP 8.3
  //     original by: Brett Zamir (https://brett-zamir.me)
  //        input by: Alex
  //     bugfixed by: Brett Zamir (https://brett-zamir.me)
  //       example 1: gmstrftime("%A", 1062462400)
  //       returns 1: 'Tuesday'

  const date =
    typeof timestamp === 'undefined'
      ? new Date()
      : timestamp instanceof Date
        ? new Date(timestamp)
        : new Date(timestamp * 1000)

  const utcTimestamp = Date.parse(date.toUTCString().slice(0, -4)) / 1000

  return strftime(format, utcTimestamp)
}
