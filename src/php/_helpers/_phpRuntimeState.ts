interface IniEntry {
  local_value?: unknown
}

interface LocaleEntry {
  sorting: (left: unknown, right: unknown) => number
}

interface PhpRuntime {
  ini?: { [key: string]: IniEntry | undefined }
  locales?: { [key: string]: LocaleEntry | undefined }
  pointers?: Array<unknown | number>
}

type GlobalWithLocutus = typeof globalThis & {
  $locutus?: {
    php?: PhpRuntime
  }
}

export interface PhpRuntimeState {
  ini: { [key: string]: IniEntry | undefined }
  locales: { [key: string]: LocaleEntry | undefined }
  pointers: Array<unknown | number>
}

export function ensurePhpRuntimeState(): PhpRuntimeState {
  // discuss at: https://locutus.io/php/_helpers/ensurePhpRuntimeState/
  //     note 1: Ensures the mutable locutus PHP runtime bag exists on globalThis.
  //  example 1: Array.isArray(ensurePhpRuntimeState().pointers)
  //  returns 1: true
  const globalContext = globalThis as GlobalWithLocutus
  globalContext.$locutus = globalContext.$locutus || {}
  globalContext.$locutus.php = globalContext.$locutus.php || {}

  const php = globalContext.$locutus.php
  php.ini = php.ini || {}
  php.locales = php.locales || {}
  php.pointers = php.pointers || []

  return {
    ini: php.ini,
    locales: php.locales,
    pointers: php.pointers,
  }
}
