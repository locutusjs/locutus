import {
  isPhpAssocObject,
  isPhpCallable,
  type PhpAssoc,
  type PhpCallable,
  type PhpInput,
  type PhpList,
} from './_phpTypes.ts'

interface IniEntry {
  local_value?: PhpInput
}

type LocaleEntry = PhpAssoc<PhpInput> & {
  sorting?: (left: PhpInput, right: PhpInput) => number
}
type LocaleCategoryMap = PhpAssoc<string | undefined>
interface LocutusRuntimeContainer {
  php?: PhpAssoc<PhpInput>
}

interface PhpRuntimeKnownEntryMap {
  ini: PhpAssoc<IniEntry | undefined>
  locales: PhpAssoc<LocaleEntry | undefined>
  localeCategories: LocaleCategoryMap
  pointers: PhpList<PhpInput>
  locale_default: string
  locale: string
  uniqidSeed: number
  timeoutStatus: boolean
  last_error_json: number
  strtokleftOver: string
}

type PhpRuntimeNumberKey = {
  [K in keyof PhpRuntimeKnownEntryMap]: PhpRuntimeKnownEntryMap[K] extends number ? K : never
}[keyof PhpRuntimeKnownEntryMap]
type PhpRuntimeBooleanKey = {
  [K in keyof PhpRuntimeKnownEntryMap]: PhpRuntimeKnownEntryMap[K] extends boolean ? K : never
}[keyof PhpRuntimeKnownEntryMap]
type PhpRuntimeStringKey = {
  [K in keyof PhpRuntimeKnownEntryMap]: PhpRuntimeKnownEntryMap[K] extends string ? K : never
}[keyof PhpRuntimeKnownEntryMap]

interface PhpGlobalProcessLike {
  env?: PhpAssoc<string | undefined>
}

interface PhpGlobalBufferLike {
  from?: (...args: PhpInput[]) => PhpInput
}

interface PhpGlobalKnownEntryMap {
  process: PhpGlobalProcessLike
  Buffer: PhpGlobalBufferLike
}

type GlobalWithLocutus = {
  $locutus?: LocutusRuntimeContainer
  [key: string]: PhpInput
}

type PhpObjectEntryContainer = object | PhpCallable

export interface PhpRuntimeState {
  ini: PhpAssoc<IniEntry | undefined>
  locales: PhpAssoc<LocaleEntry | undefined>
  localeCategories: LocaleCategoryMap
  pointers: PhpList<PhpInput>
  locale_default: string | undefined
}

const isIniBag = (value: PhpInput): value is PhpAssoc<IniEntry | undefined> =>
  isPhpAssocObject<IniEntry | undefined>(value)

const isLocaleBag = (value: PhpInput): value is PhpAssoc<LocaleEntry | undefined> =>
  isPhpAssocObject<LocaleEntry | undefined>(value)

const isLocaleCategoryBag = (value: PhpInput): value is LocaleCategoryMap => isPhpAssocObject<string | undefined>(value)

const globalContext: GlobalWithLocutus = globalThis

const ensurePhpRuntimeObject = (): PhpAssoc<PhpInput> => {
  let locutus = globalContext.$locutus
  if (typeof locutus !== 'object' || locutus === null) {
    locutus = {}
    globalContext.$locutus = locutus
  }

  let php = locutus.php
  if (typeof php !== 'object' || php === null) {
    php = {}
    locutus.php = php
  }

  return php
}

export function ensurePhpRuntimeState(): PhpRuntimeState {
  // discuss at: https://locutus.io/php/_helpers/ensurePhpRuntimeState/
  //     note 1: Ensures the mutable locutus PHP runtime bag exists on the shared runtime object.
  //  example 1: Array.isArray(ensurePhpRuntimeState().pointers)
  //  returns 1: true
  const php = ensurePhpRuntimeObject()
  const iniValue = php.ini
  const localesValue = php.locales
  const localeCategoriesValue = php.localeCategories
  const pointersValue = php.pointers

  const ini = isIniBag(iniValue) ? iniValue : {}
  const locales = isLocaleBag(localesValue) ? localesValue : {}
  const localeCategories = isLocaleCategoryBag(localeCategoriesValue) ? localeCategoriesValue : {}
  const pointers: PhpList<PhpInput> = Array.isArray(pointersValue) ? pointersValue : []

  if (iniValue !== ini) {
    php.ini = ini
  }
  if (localesValue !== locales) {
    php.locales = locales
  }
  if (localeCategoriesValue !== localeCategories) {
    php.localeCategories = localeCategories
  }
  if (pointersValue !== pointers) {
    php.pointers = pointers
  }

  const localeDefaultValue = php.locale_default
  const localeDefault = typeof localeDefaultValue === 'string' ? localeDefaultValue : undefined

  return {
    ini,
    locales,
    localeCategories,
    pointers,
    locale_default: localeDefault,
  }
}

export function setPhpLocaleDefault(localeDefault: string): void {
  const php = ensurePhpRuntimeObject()
  php.locale_default = localeDefault
}

export function getPhpRuntimeEntry<TKey extends keyof PhpRuntimeKnownEntryMap>(
  key: TKey,
): PhpRuntimeKnownEntryMap[TKey] | undefined
export function getPhpRuntimeEntry(key: string): PhpInput | undefined
export function getPhpRuntimeEntry(key: string): PhpInput | undefined {
  const php = ensurePhpRuntimeObject()
  const value = php[key]
  return typeof value === 'undefined' ? undefined : value
}

export function setPhpRuntimeEntry<TKey extends keyof PhpRuntimeKnownEntryMap>(
  key: TKey,
  value: PhpRuntimeKnownEntryMap[TKey],
): void
export function setPhpRuntimeEntry(key: string, value: PhpInput): void
export function setPhpRuntimeEntry(key: string, value: PhpInput): void {
  const php = ensurePhpRuntimeObject()
  php[key] = value
}

export function getPhpRuntimeNumber(key: PhpRuntimeNumberKey, fallback: number): number
export function getPhpRuntimeNumber(key: string, fallback: number): number
export function getPhpRuntimeNumber(key: string, fallback: number): number {
  const value = getPhpRuntimeEntry(key)
  return typeof value === 'number' ? value : fallback
}

export function getPhpRuntimeBoolean(key: PhpRuntimeBooleanKey, fallback: boolean): boolean
export function getPhpRuntimeBoolean(key: string, fallback: boolean): boolean
export function getPhpRuntimeBoolean(key: string, fallback: boolean): boolean {
  const value = getPhpRuntimeEntry(key)
  return typeof value === 'boolean' ? value : fallback
}

export function getPhpRuntimeString(key: PhpRuntimeStringKey, fallback: string): string
export function getPhpRuntimeString(key: string, fallback: string): string
export function getPhpRuntimeString(key: string, fallback: string): string {
  const value = getPhpRuntimeEntry(key)
  return typeof value === 'string' ? value : fallback
}

export function getPhpGlobalEntry<TKey extends keyof PhpGlobalKnownEntryMap>(
  key: TKey,
): PhpGlobalKnownEntryMap[TKey] | undefined
export function getPhpGlobalEntry(key: string): PhpInput | undefined
export function getPhpGlobalEntry(key: string): PhpInput | undefined {
  const value = globalContext[key]
  return typeof value === 'undefined' ? undefined : value
}

export function setPhpGlobalEntry(key: string, value: PhpInput): void {
  globalContext[key] = value
}

export function getPhpGlobalScope(): PhpAssoc<PhpInput> {
  return globalContext
}

export function getPhpGlobalCallable<TArgs extends PhpInput[] = PhpInput[], TResult = PhpInput>(
  key: string,
): PhpCallable<TArgs, TResult> | undefined {
  const value = getPhpGlobalEntry(key)
  return isPhpCallable<TArgs, TResult>(value) ? value : undefined
}

export function getPhpObjectEntry(value: PhpInput, key: string): PhpInput | undefined {
  if ((typeof value !== 'object' && typeof value !== 'function') || value === null) {
    return undefined
  }

  let current: object | null = value
  while (current) {
    const descriptor = Object.getOwnPropertyDescriptor(current, key)
    if (descriptor) {
      if (typeof descriptor.get === 'function') {
        const getterValue = descriptor.get.call(value)
        return typeof getterValue === 'undefined' ? undefined : getterValue
      }
      const directValue = descriptor.value
      return typeof directValue === 'undefined' ? undefined : directValue
    }
    current = Object.getPrototypeOf(current)
  }

  return undefined
}

export function setPhpObjectEntry(value: PhpInput, key: string, entry: PhpInput): boolean {
  if ((typeof value !== 'object' && typeof value !== 'function') || value === null) {
    return false
  }

  const container: PhpObjectEntryContainer = value
  let current: object | null = container
  while (current) {
    const descriptor = Object.getOwnPropertyDescriptor(current, key)
    if (descriptor) {
      if (typeof descriptor.set === 'function') {
        descriptor.set.call(container, entry)
        return true
      }
      if (descriptor.writable) {
        Object.defineProperty(container, key, {
          configurable: descriptor.configurable ?? true,
          enumerable: descriptor.enumerable ?? true,
          value: entry,
          writable: true,
        })
        return true
      }
      return false
    }
    current = Object.getPrototypeOf(current)
  }

  Object.defineProperty(container, key, {
    configurable: true,
    enumerable: true,
    value: entry,
    writable: true,
  })
  return true
}

function getPhpLocaleEntry(category: string): LocaleEntry | undefined {
  const runtime = ensurePhpRuntimeState()
  const localeName = runtime.localeCategories[category]
  if (typeof localeName !== 'string') {
    return undefined
  }
  const localeEntry = runtime.locales[localeName]
  return isPhpAssocObject(localeEntry) ? localeEntry : undefined
}

export function getPhpLocaleGroup(category: string, groupKey: string): PhpAssoc<PhpInput> | undefined {
  const localeEntry = getPhpLocaleEntry(category)
  if (!localeEntry) {
    return undefined
  }
  const group = localeEntry[groupKey]
  return isPhpAssocObject(group) ? group : undefined
}
