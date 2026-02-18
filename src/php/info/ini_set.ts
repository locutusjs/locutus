import { ensurePhpRuntimeState } from '../_helpers/_phpRuntimeState.ts'

type IniScalar = string | number | boolean | null
export type IniValue = IniScalar | {} | Array<IniScalar | {}> | undefined

export function ini_set(varname: string, newvalue: IniValue): IniValue | undefined {
  //      discuss at: https://locutus.io/php/ini_set/
  // parity verified: PHP 8.3
  //     original by: Brett Zamir (https://brett-zamir.me)
  //          note 1: This will not set a global_value or access level for the ini item
  //       example 1: ini_set('date.timezone', 'Asia/Hong_Kong')
  //       example 1: ini_set('date.timezone', 'America/Chicago')
  //       returns 1: 'Asia/Hong_Kong'

  const runtime = ensurePhpRuntimeState()
  const entry = runtime.ini[varname] ?? (runtime.ini[varname] = {})
  const oldval = entry.local_value as IniValue | undefined

  let normalizedValue = newvalue
  const lowerStr = String(newvalue).toLowerCase().trim()
  if (newvalue === true || lowerStr === 'on' || lowerStr === '1') {
    normalizedValue = 'on'
  }
  if (newvalue === false || lowerStr === 'off' || lowerStr === '0') {
    normalizedValue = 'off'
  }

  const setArrayValue = () => {
    // Although these are set individually, they are all accumulated.
    if (typeof entry.local_value === 'undefined') {
      entry.local_value = [normalizedValue]
      return
    }

    if (Array.isArray(entry.local_value)) {
      entry.local_value.push(normalizedValue)
      return
    }

    entry.local_value = [entry.local_value, normalizedValue]
  }

  switch (varname) {
    case 'extension':
      setArrayValue()
      break
    default:
      entry.local_value = normalizedValue
      break
  }

  return oldval
}
