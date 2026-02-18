export type PhpValue = {} | null | undefined
export type PhpMixed = PhpValue

export type PhpNullish = null | undefined
export type PhpScalar = string | number | boolean
export type PhpKey = string | number
export type NumericLike = number | bigint | string
export type StringLike = string | number | boolean | bigint

export type PhpAssoc<T> = { [key: string]: T }
export type PhpArrayLike<T> = T[] | PhpAssoc<T>

export const entriesOfPhpAssoc = <T>(value: PhpAssoc<T>): Array<[string, T]> =>
  Object.entries(value) as Array<[string, T]>

export type PhpCallable<TArgs extends PhpValue[] = PhpValue[], TResult = PhpValue> = (...args: TArgs) => TResult
export type PhpCallableScope = PhpValue
export type PhpCallableDescriptor<TArgs extends PhpValue[] = PhpValue[], TResult = PhpValue> =
  | string
  | PhpCallable<TArgs, TResult>
  | readonly [PhpCallableScope, string | PhpCallable<TArgs, TResult>]

export function isObjectLike(value: PhpValue): value is object {
  // discuss at: https://locutus.io/php/_helpers/isObjectLike/
  //     note 1: Shared runtime guard for locutus helper typing.
  //  example 1: isObjectLike({})
  //  returns 1: true
  return typeof value === 'object' && value !== null
}

export function isPhpScalar(value: PhpValue): value is PhpScalar {
  return typeof value === 'string' || typeof value === 'number' || typeof value === 'boolean'
}

export function isNumericLike(value: PhpValue): value is NumericLike {
  if (typeof value === 'number') {
    return Number.isFinite(value)
  }

  if (typeof value === 'bigint') {
    return true
  }

  if (typeof value !== 'string') {
    return false
  }

  const trimmed = value.trim()
  if (trimmed === '') {
    return false
  }

  return Number.isFinite(Number(trimmed))
}

export function isPhpCallable<TArgs extends PhpValue[] = PhpValue[], TResult = PhpValue>(
  value: PhpValue,
): value is PhpCallable<TArgs, TResult> {
  return typeof value === 'function'
}

export function assertIsObjectLike(value: PhpValue, message = 'Expected object-like value'): asserts value is object {
  if (!isObjectLike(value)) {
    throw new TypeError(message)
  }
}

export function assertIsPhpCallable<TArgs extends PhpValue[] = PhpValue[], TResult = PhpValue>(
  value: PhpValue,
  message = 'Expected callable value',
): asserts value is PhpCallable<TArgs, TResult> {
  if (!isPhpCallable<TArgs, TResult>(value)) {
    throw new TypeError(message)
  }
}

export function isPhpArrayObject<T = PhpValue>(value: PhpValue): value is PhpAssoc<T> {
  return isObjectLike(value)
}

export function toPhpArrayObject<T = PhpValue>(value: PhpValue): PhpAssoc<T> {
  if (isPhpArrayObject<T>(value)) {
    return value
  }

  return {}
}
