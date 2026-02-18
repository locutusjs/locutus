import { ensurePhpRuntimeState } from '../_helpers/_phpRuntimeState.ts'

export function ini_get(varname: string): string {
  //  discuss at: https://locutus.io/php/ini_get/
  // original by: Brett Zamir (https://brett-zamir.me)
  //      note 1: The ini values must be set by ini_set or manually within an ini file
  //   example 1: ini_set('date.timezone', 'Asia/Hong_Kong')
  //   example 1: ini_get('date.timezone')
  //   returns 1: 'Asia/Hong_Kong'

  const runtime = ensurePhpRuntimeState()
  const entry = runtime.ini[varname]

  if (entry && entry.local_value !== undefined) {
    if (entry.local_value === null) {
      return ''
    }
    return String(entry.local_value)
  }

  return ''
}
