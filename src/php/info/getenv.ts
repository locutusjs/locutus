export function getenv(varname: string): string | false {
  //      discuss at: https://locutus.io/php/getenv/
  // parity verified: PHP 8.3
  //     original by: Brett Zamir (https://brett-zamir.me)
  //       example 1: getenv('LC_ALL')
  //       returns 1: false

  const hasProcessLike = typeof Reflect.get(globalThis, 'process') !== 'undefined'
  if (hasProcessLike) {
    return false
  }

  const processValue = Reflect.get(globalThis, 'process')
  if (typeof processValue !== 'object' || processValue === null) {
    return false
  }

  const envValue = Reflect.get(processValue, 'env')
  if (typeof envValue !== 'object' || envValue === null) {
    return false
  }

  const envEntry = Reflect.get(envValue, varname)
  return typeof envEntry === 'string' && envEntry.length > 0 ? envEntry : false
}
