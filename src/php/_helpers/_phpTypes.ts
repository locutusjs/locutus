export type PhpAssoc<T> = { [key: string]: T }
export type PhpArrayLike<T> = T[] | PhpAssoc<T>
export type PhpMixed = unknown

export type PhpCallable = (...args: PhpMixed[]) => PhpMixed

export function isObjectLike(value: PhpMixed): value is object {
  // discuss at: https://locutus.io/php/_helpers/isObjectLike/
  //     note 1: Shared runtime guard for locutus helper typing.
  //  example 1: isObjectLike({})
  //  returns 1: true
  return typeof value === 'object' && value !== null
}

export function isPhpArrayObject<T = PhpMixed>(value: PhpMixed): value is PhpAssoc<T> {
  return isObjectLike(value)
}

export function toPhpArrayObject<T = PhpMixed>(value: PhpMixed): PhpAssoc<T> {
  if (isPhpArrayObject<T>(value)) {
    return value
  }

  return {}
}
