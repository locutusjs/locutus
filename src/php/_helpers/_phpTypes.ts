export type PhpNullish = null | undefined
export type PhpInput = {} | PhpNullish

export type PhpScalar = string | number | boolean
export type PhpLiteral = PhpScalar | null
export type PhpPrimitive = PhpScalar | bigint
export type PhpKey = string | number
export type NumericLike = number | bigint | string
export type StringLike = string | number | boolean | bigint
export type PhpStringish = StringLike | PhpNullish

export type PhpList<T = PhpInput> = T[]
export type PhpAssoc<T = PhpInput> = { [key: string]: T }
export type PhpContainer<T = PhpInput> = PhpList<T> | PhpAssoc<T>
export type PhpArrayLike<T = PhpInput> = PhpList<T> | PhpAssoc<T>
export interface PhpRecursiveAssoc {
  [key: string]: PhpRecursiveValue
}
export interface PhpRecursiveList extends Array<PhpRecursiveValue> {}
export type PhpRecursiveValue = PhpPrimitive | PhpNullish | PhpRecursiveList | PhpRecursiveAssoc
export type PhpFunctionValue = (...args: PhpInput[]) => PhpInput
export interface PhpRuntimeAssoc {
  [key: string]: PhpRuntimeValue
}
export interface PhpRuntimeList extends Array<PhpRuntimeValue> {}
export type PhpRuntimeValue = PhpPrimitive | PhpNullish | PhpRuntimeList | PhpRuntimeAssoc | PhpFunctionValue
export type PhpReadonlyList<T = PhpInput> = readonly T[]
export type PhpReadonlyAssoc<T = PhpInput> = Readonly<PhpAssoc<T>>
export type PhpReadonlyArrayLike<T = PhpInput> = PhpReadonlyList<T> | PhpReadonlyAssoc<T>

export const entriesOfPhpAssoc = <T>(value: PhpAssoc<T>): Array<[string, T]> => {
  return Object.entries(value)
}

export type PhpCallableArgs = PhpInput[]
export type PhpCallable<TArgs extends PhpCallableArgs = PhpCallableArgs, TResult = PhpInput> = (
  ...args: TArgs
) => TResult
export type PhpCallableScope = PhpInput
export type PhpCallableTuple<TArgs extends PhpCallableArgs = PhpCallableArgs, TResult = PhpInput> = readonly [
  PhpCallableScope,
  string | PhpCallable<TArgs, TResult>,
]
export type PhpCallableDescriptor<TArgs extends PhpCallableArgs = PhpCallableArgs, TResult = PhpInput> =
  | string
  | PhpCallable<TArgs, TResult>
  | PhpCallableTuple<TArgs, TResult>
export type PhpComparatorDescriptor<T> = PhpCallableDescriptor<[T, T], NumericLike>
export type PhpKeyComparatorDescriptor = PhpCallableDescriptor<[string, string], NumericLike>

export function isPhpNullish(value: PhpInput): value is PhpNullish {
  return typeof value === 'undefined' || value === null
}

export function isPhpList<T = PhpInput>(value: PhpInput): value is PhpList<T> {
  return Array.isArray(value)
}

export function isObjectLike(value: PhpInput): value is PhpArrayLike<PhpInput> {
  return typeof value === 'object' && value !== null
}

export function isPhpAssocObject<T = PhpInput>(value: PhpInput): value is PhpAssoc<T> {
  return isObjectLike(value) && !isPhpList(value)
}

export function isPhpScalar(value: PhpInput): value is PhpScalar {
  return typeof value === 'string' || typeof value === 'number' || typeof value === 'boolean'
}

export function isPhpKey(value: PhpInput): value is PhpKey {
  return typeof value === 'string' || typeof value === 'number'
}

export function isNumericLike(value: PhpInput): value is NumericLike {
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

export function isPhpCallable<TArgs extends PhpCallableArgs = PhpCallableArgs, TResult = PhpInput>(
  value: PhpInput,
): value is PhpCallable<TArgs, TResult> {
  return typeof value === 'function'
}

export function isPhpCallableDescriptor<TArgs extends PhpCallableArgs = PhpCallableArgs, TResult = PhpInput>(
  value: PhpInput,
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
  value: PhpInput,
  message = 'Expected object-like value',
): asserts value is PhpArrayLike<PhpInput> {
  if (!isObjectLike(value)) {
    throw new TypeError(message)
  }
}

export function assertIsPhpAssocObject(
  value: PhpInput,
  message = 'Expected associative object value',
): asserts value is PhpAssoc<PhpInput> {
  if (!isPhpAssocObject(value)) {
    throw new TypeError(message)
  }
}

export function assertIsPhpList(value: PhpInput, message = 'Expected list value'): asserts value is PhpList<PhpInput> {
  if (!isPhpList(value)) {
    throw new TypeError(message)
  }
}

export function assertIsPhpKey(value: PhpInput, message = 'Expected key value'): asserts value is PhpKey {
  if (!isPhpKey(value)) {
    throw new TypeError(message)
  }
}

export function assertIsNumericLike(
  value: PhpInput,
  message = 'Expected numeric-like value',
): asserts value is NumericLike {
  if (!isNumericLike(value)) {
    throw new TypeError(message)
  }
}

export function assertIsPhpCallable<TArgs extends PhpCallableArgs = PhpCallableArgs, TResult = PhpInput>(
  value: PhpInput,
  message = 'Expected callable value',
): asserts value is PhpCallable<TArgs, TResult> {
  if (!isPhpCallable<TArgs, TResult>(value)) {
    throw new TypeError(message)
  }
}

export function isPhpArrayObject<T = PhpInput>(value: PhpInput): value is PhpAssoc<T> {
  return isObjectLike(value)
}

export function toPhpArrayObject<T = PhpInput>(value: PhpInput): PhpAssoc<T> {
  if (isPhpArrayObject<T>(value)) {
    return value
  }

  return {}
}
