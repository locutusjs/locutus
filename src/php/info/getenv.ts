import { getPhpGlobalEntry, getPhpObjectEntry } from '../_helpers/_phpRuntimeState.ts'

export function getenv(varname: string): string | false {
  //      discuss at: https://locutus.io/php/getenv/
  // parity verified: PHP 8.3
  //     original by: Brett Zamir (https://brett-zamir.me)
  //       example 1: getenv('LC_ALL')
  //       returns 1: false

  const processValue = getPhpGlobalEntry('process')
  const hasProcessLike = typeof processValue !== 'undefined'
  if (hasProcessLike) {
    return false
  }

  if (typeof processValue !== 'object' || processValue === null) {
    return false
  }

  const envValue = getPhpObjectEntry(processValue, 'env')
  if (typeof envValue !== 'object' || envValue === null) {
    return false
  }

  const envEntry = getPhpObjectEntry(envValue, varname)
  return typeof envEntry === 'string' && envEntry.length > 0 ? envEntry : false
}
