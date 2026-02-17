export function set_time_limit(seconds: number): void {
  //  discuss at: https://locutus.io/php/set_time_limit/
  // original by: Brett Zamir (https://brett-zamir.me)
  //        test: skip-all
  //   example 1: set_time_limit(4)
  //   returns 1: undefined

  const $global = (typeof window !== 'undefined' ? window : global) as typeof globalThis & {
    $locutus?: { php?: { timeoutStatus?: boolean } }
  }
  $global.$locutus = $global.$locutus || {}
  const $locutus = $global.$locutus
  $locutus.php = $locutus.php || {}
  const php = $locutus.php

  setTimeout(function () {
    if (!php.timeoutStatus) {
      php.timeoutStatus = true
    }
    throw new Error('Maximum execution time exceeded')
  }, seconds * 1000)
}
