import { getPhpRuntimeBoolean, setPhpRuntimeEntry } from '../_helpers/_phpRuntimeState.ts'

export function set_time_limit(seconds: number): void {
  //  discuss at: https://locutus.io/php/set_time_limit/
  // original by: Brett Zamir (https://brett-zamir.me)
  //        test: skip-all
  //   example 1: set_time_limit(4)
  //   returns 1: undefined

  setTimeout(function () {
    if (!getPhpRuntimeBoolean('timeoutStatus', false)) {
      setPhpRuntimeEntry('timeoutStatus', true)
    }
    throw new Error('Maximum execution time exceeded')
  }, seconds * 1000)
}
