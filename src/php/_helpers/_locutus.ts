interface LocutusLocale {
  sorting?: (a: unknown, b: unknown) => number
  [key: string]: unknown
}

interface LocutusPhpState {
  ini?: Record<string, { local_value?: unknown }>
  locales?: Record<string, LocutusLocale>
  pointers?: unknown[]
  [key: string]: unknown
}

interface LocutusState {
  php?: LocutusPhpState
  [key: string]: unknown
}

interface LocutusPhpContext {
  ini: Record<string, { local_value?: unknown }>
  locales: Record<string, LocutusLocale>
  pointers: unknown[]
  php: LocutusPhpState
}

type LocutusGlobal = typeof globalThis & { $locutus?: LocutusState }

export function getLocutusPhpContext(): LocutusPhpContext {
  //  discuss at: https://locutus.io/php/getLocutusPhpContext/
  // original by: Locutus TypeScript Migration
  //      note 1: Internal helper to initialize and return the locutus php runtime bag
  //   example 1: typeof getLocutusPhpContext().ini
  //   returns 1: 'object'
  const runtimeGlobal = (typeof window !== 'undefined' ? window : globalThis) as LocutusGlobal
  runtimeGlobal.$locutus = runtimeGlobal.$locutus || {}

  const php = runtimeGlobal.$locutus.php || {}
  php.ini = php.ini || {}
  php.locales = php.locales || {}
  php.pointers = php.pointers || []

  runtimeGlobal.$locutus.php = php

  return {
    ini: php.ini,
    locales: php.locales,
    pointers: php.pointers,
    php,
  }
}
