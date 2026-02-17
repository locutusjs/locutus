export function getenv(varname: string): string | false {
  //      discuss at: https://locutus.io/php/getenv/
  // parity verified: PHP 8.3
  //     original by: Brett Zamir (https://brett-zamir.me)
  //       example 1: getenv('LC_ALL')
  //       returns 1: false

  const processLike = (globalThis as { [key: string]: unknown }).process as
    | { env?: { [key: string]: string | undefined } }
    | undefined
  const hasProcessLike = typeof (globalThis as { [key: string]: unknown }).process !== 'undefined'
  if (hasProcessLike) {
    return false
  }
  if (!processLike?.env || !processLike.env[varname]) {
    return false
  }

  return processLike.env[varname] ?? false
}
