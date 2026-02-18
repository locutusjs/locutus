export function set_time_limit(seconds: number): void {
  //  discuss at: https://locutus.io/php/set_time_limit/
  // original by: Brett Zamir (https://brett-zamir.me)
  //        test: skip-all
  //   example 1: set_time_limit(4)
  //   returns 1: undefined

  const locutusValue = Reflect.get(globalThis, '$locutus')
  const locutus = typeof locutusValue === 'object' && locutusValue !== null ? locutusValue : {}
  if (locutusValue !== locutus) {
    Reflect.set(globalThis, '$locutus', locutus)
  }

  const phpValue = Reflect.get(locutus, 'php')
  const php = typeof phpValue === 'object' && phpValue !== null ? phpValue : {}
  if (phpValue !== php) {
    Reflect.set(locutus, 'php', php)
  }

  setTimeout(function () {
    if (Reflect.get(php, 'timeoutStatus') !== true) {
      Reflect.set(php, 'timeoutStatus', true)
    }
    throw new Error('Maximum execution time exceeded')
  }, seconds * 1000)
}
