import { isPhpAssocObject, type PhpAssoc, type PhpList, type PhpValue } from './_phpTypes.ts'

interface IniEntry {
  local_value?: PhpValue
}

interface LocaleEntry {
  sorting: (left: PhpValue, right: PhpValue) => number
}

export interface PhpRuntimeState {
  ini: PhpAssoc<IniEntry | undefined>
  locales: PhpAssoc<LocaleEntry | undefined>
  pointers: PhpList<PhpValue>
  locale_default: string | undefined
}

const isIniBag = (value: PhpValue): value is PhpAssoc<IniEntry | undefined> =>
  isPhpAssocObject<IniEntry | undefined>(value)

const isLocaleBag = (value: PhpValue): value is PhpAssoc<LocaleEntry | undefined> =>
  isPhpAssocObject<LocaleEntry | undefined>(value)

const ensurePhpRuntimeObject = (): object => {
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

  return php
}

export function ensurePhpRuntimeState(): PhpRuntimeState {
  // discuss at: https://locutus.io/php/_helpers/ensurePhpRuntimeState/
  //     note 1: Ensures the mutable locutus PHP runtime bag exists on globalThis.
  //  example 1: Array.isArray(ensurePhpRuntimeState().pointers)
  //  returns 1: true
  const php = ensurePhpRuntimeObject()
  const iniValue = Reflect.get(php, 'ini')
  const localesValue = Reflect.get(php, 'locales')
  const pointersValue = Reflect.get(php, 'pointers')

  const ini = isIniBag(iniValue) ? iniValue : {}
  const locales = isLocaleBag(localesValue) ? localesValue : {}
  const pointers: PhpList<PhpValue> = Array.isArray(pointersValue) ? pointersValue : []

  if (iniValue !== ini) {
    Reflect.set(php, 'ini', ini)
  }
  if (localesValue !== locales) {
    Reflect.set(php, 'locales', locales)
  }
  if (pointersValue !== pointers) {
    Reflect.set(php, 'pointers', pointers)
  }

  const localeDefaultValue = Reflect.get(php, 'locale_default')
  const localeDefault = typeof localeDefaultValue === 'string' ? localeDefaultValue : undefined

  return {
    ini,
    locales,
    pointers,
    locale_default: localeDefault,
  }
}

export function setPhpLocaleDefault(localeDefault: string): void {
  const php = ensurePhpRuntimeObject()
  Reflect.set(php, 'locale_default', localeDefault)
}
