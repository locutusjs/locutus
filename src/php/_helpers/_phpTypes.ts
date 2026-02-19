export type PhpNullish = null | undefined
export type PhpValue = {} | PhpNullish
export type PhpMixed = PhpValue

export type PhpScalar = string | number | boolean
export type PhpPrimitive = PhpScalar | bigint
export type PhpKey = string | number
export type NumericLike = number | bigint | string
export type StringLike = string | number | boolean | bigint

export type PhpList<T = PhpValue> = T[]
export type PhpAssoc<T = PhpValue> = { [key: string]: T }
export type PhpArrayLike<T = PhpValue> = PhpList<T> | PhpAssoc<T>
export type PhpReadonlyList<T = PhpValue> = readonly T[]
export type PhpReadonlyAssoc<T = PhpValue> = Readonly<PhpAssoc<T>>
export type PhpReadonlyArrayLike<T = PhpValue> = PhpReadonlyList<T> | PhpReadonlyAssoc<T>

export const entriesOfPhpAssoc = <T>(value: PhpAssoc<T>): Array<[string, T]> => {
  return Object.entries(value)
}

export type PhpCallableArgs = PhpValue[]
export type PhpCallable<TArgs extends PhpCallableArgs = PhpCallableArgs, TResult = PhpValue> = (
  ...args: TArgs
) => TResult
export type PhpCallableScope = PhpValue
export type PhpCallableTuple<TArgs extends PhpCallableArgs = PhpCallableArgs, TResult = PhpValue> = readonly [
  PhpCallableScope,
  string | PhpCallable<TArgs, TResult>,
]
export type PhpCallableDescriptor<TArgs extends PhpCallableArgs = PhpCallableArgs, TResult = PhpValue> =
  | string
  | PhpCallable<TArgs, TResult>
  | PhpCallableTuple<TArgs, TResult>

export function isPhpNullish(value: PhpValue): value is PhpNullish {
  // discuss at: https://locutus.io/php/_helpers/isPhpNullish/
  //     note 1: Shared helper guard to narrow null/undefined unions.
  //  example 1: isPhpNullish(null)
  //  returns 1: true
  return typeof value === 'undefined' || value === null
}

export function isPhpList<T = PhpValue>(value: PhpValue): value is PhpList<T> {
  // discuss at: https://locutus.io/php/_helpers/isPhpList/
  //     note 1: Shared helper guard for PHP list-like array values.
  //  example 1: isPhpList([1, 2, 3])
  //  returns 1: true
  return Array.isArray(value)
}

export function isObjectLike(value: PhpValue): value is PhpArrayLike<PhpValue> {
  // discuss at: https://locutus.io/php/_helpers/isObjectLike/
  //     note 1: Shared runtime guard for locutus helper typing.
  //  example 1: isObjectLike({})
  //  returns 1: true
  return typeof value === 'object' && value !== null
}

export function isPhpAssocObject<T = PhpValue>(value: PhpValue): value is PhpAssoc<T> {
  return isObjectLike(value) && !isPhpList(value)
}

export function isPhpScalar(value: PhpValue): value is PhpScalar {
  return typeof value === 'string' || typeof value === 'number' || typeof value === 'boolean'
}

export function isPhpKey(value: PhpValue): value is PhpKey {
  return typeof value === 'string' || typeof value === 'number'
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

export function isPhpCallable<TArgs extends PhpCallableArgs = PhpCallableArgs, TResult = PhpValue>(
  value: PhpValue,
): value is PhpCallable<TArgs, TResult> {
  return typeof value === 'function'
}

export function isPhpCallableDescriptor<TArgs extends PhpCallableArgs = PhpCallableArgs, TResult = PhpValue>(
  value: PhpValue,
): value is PhpCallableDescriptor<TArgs, TResult> {
  if (typeof value === 'string') {
    return true
  }

  if (isPhpCallable<TArgs, TResult>(value)) {
    return true
  }

  if (!Array.isArray(value) || value.length < 2) {
    return false
  }

  const callableDescriptor = value[1]
  return typeof callableDescriptor === 'string' || isPhpCallable<TArgs, TResult>(callableDescriptor)
}

export function assertIsObjectLike(
  value: PhpValue,
  message = 'Expected object-like value',
): asserts value is PhpArrayLike<PhpValue> {
  if (!isObjectLike(value)) {
    throw new TypeError(message)
  }
}

export function assertIsPhpAssocObject(
  value: PhpValue,
  message = 'Expected associative object value',
): asserts value is PhpAssoc<PhpValue> {
  if (!isPhpAssocObject(value)) {
    throw new TypeError(message)
  }
}

export function assertIsPhpCallable<TArgs extends PhpCallableArgs = PhpCallableArgs, TResult = PhpValue>(
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
