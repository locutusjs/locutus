type IniSetLocutusContext = {
  php?: {
    ini?: { [key: string]: { local_value?: unknown } }
  }
}

export function ini_set(varname: string, newvalue: unknown): unknown {
  //      discuss at: https://locutus.io/php/ini_set/
  // parity verified: PHP 8.3
  //     original by: Brett Zamir (https://brett-zamir.me)
  //          note 1: This will not set a global_value or access level for the ini item
  //       example 1: ini_set('date.timezone', 'Asia/Hong_Kong')
  //       example 1: ini_set('date.timezone', 'America/Chicago')
  //       returns 1: 'Asia/Hong_Kong'

  const globalContext = globalThis as typeof globalThis & { $locutus?: IniSetLocutusContext }
  globalContext.$locutus = globalContext.$locutus ?? {}
  const locutus = globalContext.$locutus
  locutus.php = locutus.php ?? {}
  locutus.php.ini = locutus.php.ini ?? {}
  locutus.php.ini[varname] = locutus.php.ini[varname] ?? {}

  const oldval = locutus.php.ini[varname].local_value

  let normalizedValue = newvalue
  const lowerStr = String(newvalue).toLowerCase().trim()
  if (newvalue === true || lowerStr === 'on' || lowerStr === '1') {
    normalizedValue = 'on'
  }
  if (newvalue === false || lowerStr === 'off' || lowerStr === '0') {
    normalizedValue = 'off'
  }

  const setArrayValue = () => {
    const ini = locutus.php?.ini
    if (!ini) {
      return
    }
    const entry = ini[varname] ?? (ini[varname] = {})

    // Although these are set individually, they are all accumulated.
    if (typeof entry.local_value === 'undefined') {
      entry.local_value = []
    }
    const currentValue = entry.local_value
    if (!Array.isArray(currentValue)) {
      entry.local_value = [currentValue]
    }
    ;(entry.local_value as unknown[]).push(normalizedValue)
  }

  switch (varname) {
    case 'extension':
      setArrayValue()
      break
    default:
      locutus.php.ini[varname].local_value = normalizedValue
      break
  }

  return oldval
}
