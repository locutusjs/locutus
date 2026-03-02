import { ensurePhpRuntimeState } from '../_helpers/_phpRuntimeState.ts'
import type { PhpRuntimeValue } from '../_helpers/_phpTypes.ts'

type IniScalar = string | number | boolean | null
type IniEntryValue = IniScalar | IniObject | IniEntryValue[]
type IniObject = { [key: string]: IniEntryValue }
export type IniValue = IniEntryValue | undefined

type IniCandidate = PhpRuntimeValue | undefined

const isIniScalar = (value: IniCandidate): value is IniScalar =>
  typeof value === 'string' || typeof value === 'number' || typeof value === 'boolean' || value === null

const isIniObject = (value: IniCandidate): value is IniObject =>
  typeof value === 'object' && value !== null && !Array.isArray(value)

const isIniArray = (value: IniCandidate): value is IniEntryValue[] =>
  Array.isArray(value) && value.every((item: IniCandidate) => isIniEntryValue(item))

const isIniEntryValue = (value: IniCandidate): value is IniEntryValue =>
  isIniScalar(value) || isIniObject(value) || isIniArray(value)

const isIniValue = (value: IniCandidate): value is Exclude<IniValue, undefined> => isIniEntryValue(value)

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
  const currentValue = entry.local_value
  const oldval: IniValue | undefined =
    typeof currentValue === 'undefined' ? undefined : isIniValue(currentValue) ? currentValue : undefined

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
