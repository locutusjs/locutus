type NumericLike = number | boolean | bigint
type PythonMapping = { [key: string]: unknown }

export function isNumericLike(value: unknown): value is NumericLike {
  return typeof value === 'number' || typeof value === 'boolean' || typeof value === 'bigint'
}

export function toPythonNumber(value: unknown, functionName: string): number {
  if (typeof value === 'number') {
    return value
  }

  if (typeof value === 'boolean') {
    return value ? 1 : 0
  }

  if (typeof value === 'bigint') {
    const numericValue = Number(value)
    if (!Number.isSafeInteger(numericValue)) {
      throw new RangeError(`${functionName}() bigint values must fit within JS safe integer precision`)
    }

    return numericValue
  }

  throw new TypeError(`${functionName}() expected a numeric value`)
}

export function toPythonInteger(value: unknown, functionName: string): bigint {
  if (typeof value === 'boolean') {
    return value ? 1n : 0n
  }

  if (typeof value === 'bigint') {
    return value
  }

  if (typeof value === 'number' && Number.isFinite(value) && Number.isSafeInteger(value)) {
    return BigInt(value)
  }

  throw new TypeError(`${functionName}() expected an integer value`)
}

export function fromPythonInteger(value: bigint, functionName: string): number {
  const numericValue = Number(value)
  if (!Number.isSafeInteger(numericValue)) {
    throw new RangeError(`${functionName}() result does not fit within JS safe integer precision`)
  }

  return numericValue
}

export function pythonAbs(value: unknown, functionName: string): number {
  return Math.abs(toPythonNumber(value, functionName))
}

export function pythonPos(value: unknown, functionName: string): number {
  return toPythonNumber(value, functionName)
}

export function pythonNeg(value: unknown, functionName: string): number {
  return -toPythonNumber(value, functionName)
}

export function pythonTruth(value: unknown): boolean {
  if (value === null || value === undefined) {
    return false
  }

  if (typeof value === 'boolean') {
    return value
  }

  if (typeof value === 'number') {
    return value !== 0
  }

  if (typeof value === 'bigint') {
    return value !== 0n
  }

  if (typeof value === 'string') {
    return value.length > 0
  }

  if (Array.isArray(value)) {
    return value.length > 0
  }

  if (value instanceof Set || value instanceof Map) {
    return value.size > 0
  }

  if (isPythonMapping(value)) {
    return Object.keys(value).length > 0
  }

  return true
}

export function pythonNot(value: unknown): boolean {
  return !pythonTruth(value)
}

export function pythonAdd(left: unknown, right: unknown, functionName: string): number | string | unknown[] {
  if (typeof left === 'string' && typeof right === 'string') {
    return left + right
  }

  if (Array.isArray(left) && Array.isArray(right)) {
    return [...left, ...right]
  }

  return toPythonNumber(left, functionName) + toPythonNumber(right, functionName)
}

export function pythonSub(left: unknown, right: unknown, functionName: string): number {
  return toPythonNumber(left, functionName) - toPythonNumber(right, functionName)
}

export function pythonMul(left: unknown, right: unknown, functionName: string): number | string | unknown[] {
  if (typeof left === 'string') {
    return repeatString(left, right, functionName)
  }

  if (typeof right === 'string') {
    return repeatString(right, left, functionName)
  }

  if (Array.isArray(left)) {
    return repeatArray(left, right, functionName)
  }

  if (Array.isArray(right)) {
    return repeatArray(right, left, functionName)
  }

  return toPythonNumber(left, functionName) * toPythonNumber(right, functionName)
}

export function pythonTrueDiv(left: unknown, right: unknown, functionName: string): number {
  const divisor = toPythonNumber(right, functionName)
  if (divisor === 0) {
    throw new Error('division by zero')
  }

  return toPythonNumber(left, functionName) / divisor
}

export function pythonFloorDiv(left: unknown, right: unknown, functionName: string): number {
  const divisor = toPythonNumber(right, functionName)
  if (divisor === 0) {
    throw new Error('integer division or modulo by zero')
  }

  return Math.floor(toPythonNumber(left, functionName) / divisor)
}

export function pythonMod(left: unknown, right: unknown, functionName: string): number {
  const dividend = toPythonNumber(left, functionName)
  const divisor = toPythonNumber(right, functionName)
  if (divisor === 0) {
    throw new Error('integer division or modulo by zero')
  }
  return dividend - Math.floor(dividend / divisor) * divisor
}

export function pythonPow(left: unknown, right: unknown, functionName: string): number {
  const base = toPythonNumber(left, functionName)
  const exponent = toPythonNumber(right, functionName)
  if (base === 0 && exponent < 0) {
    throw new Error('0.0 cannot be raised to a negative power')
  }

  return base ** exponent
}

export function pythonBitAnd(left: unknown, right: unknown, functionName: string): boolean | number {
  const leftInt = toPythonInteger(left, functionName)
  const rightInt = toPythonInteger(right, functionName)
  const result = leftInt & rightInt
  return typeof left === 'boolean' && typeof right === 'boolean'
    ? result !== 0n
    : fromPythonInteger(result, functionName)
}

export function pythonBitOr(left: unknown, right: unknown, functionName: string): boolean | number {
  const leftInt = toPythonInteger(left, functionName)
  const rightInt = toPythonInteger(right, functionName)
  const result = leftInt | rightInt
  return typeof left === 'boolean' && typeof right === 'boolean'
    ? result !== 0n
    : fromPythonInteger(result, functionName)
}

export function pythonBitXor(left: unknown, right: unknown, functionName: string): boolean | number {
  const leftInt = toPythonInteger(left, functionName)
  const rightInt = toPythonInteger(right, functionName)
  const result = leftInt ^ rightInt
  return typeof left === 'boolean' && typeof right === 'boolean'
    ? result !== 0n
    : fromPythonInteger(result, functionName)
}

export function pythonLShift(left: unknown, right: unknown, functionName: string): number {
  const shift = toPythonInteger(right, functionName)
  if (shift < 0n) {
    throw new Error('negative shift count')
  }

  return fromPythonInteger(toPythonInteger(left, functionName) << shift, functionName)
}

export function pythonRShift(left: unknown, right: unknown, functionName: string): number {
  const shift = toPythonInteger(right, functionName)
  if (shift < 0n) {
    throw new Error('negative shift count')
  }

  return fromPythonInteger(toPythonInteger(left, functionName) >> shift, functionName)
}

export function pythonInvert(value: unknown, functionName: string): number {
  return fromPythonInteger(~toPythonInteger(value, functionName), functionName)
}

export function pythonIndex(value: unknown, functionName: string): number {
  return fromPythonInteger(toPythonInteger(value, functionName), functionName)
}

export function pythonIdentity(left: unknown, right: unknown): boolean {
  return Object.is(left, right)
}

export function pythonEqual(left: unknown, right: unknown): boolean {
  if (isNumericLike(left) && isNumericLike(right)) {
    return numericEqual(left, right)
  }

  if (typeof left === 'string' && typeof right === 'string') {
    return left === right
  }

  if (Array.isArray(left) && Array.isArray(right)) {
    if (left.length !== right.length) {
      return false
    }

    return left.every((value, index) => pythonEqual(value, right[index]))
  }

  if (isPythonMapping(left) && isPythonMapping(right)) {
    const leftKeys = Object.keys(left)
    const rightKeys = Object.keys(right)
    if (leftKeys.length !== rightKeys.length) {
      return false
    }

    return leftKeys.every((key) => Object.hasOwn(right, key) && pythonEqual(left[key], right[key]))
  }

  return left === right
}

export function pythonCompare(left: unknown, right: unknown, functionName: string): number {
  if (isNumericLike(left) && isNumericLike(right)) {
    const leftNumber = toPythonNumber(left, functionName)
    const rightNumber = toPythonNumber(right, functionName)
    if (Number.isNaN(leftNumber) || Number.isNaN(rightNumber)) {
      return Number.NaN
    }
    return leftNumber === rightNumber ? 0 : leftNumber < rightNumber ? -1 : 1
  }

  if (typeof left === 'string' && typeof right === 'string') {
    return left === right ? 0 : left < right ? -1 : 1
  }

  throw new TypeError(`${functionName}() does not support comparing these values`)
}

export function pythonConcat(left: unknown, right: unknown): string | unknown[] {
  if (typeof left === 'string' && typeof right === 'string') {
    return left + right
  }

  if (Array.isArray(left) && Array.isArray(right)) {
    return [...left, ...right]
  }

  throw new TypeError('concat() expects two strings or two arrays')
}

export function pythonContains(container: unknown, item: unknown): boolean {
  if (typeof container === 'string') {
    if (typeof item !== 'string') {
      throw new TypeError('contains() string containers require a string search value')
    }

    return container.includes(item)
  }

  if (Array.isArray(container)) {
    return container.some((value) => pythonEqual(value, item))
  }

  if (isPythonMapping(container)) {
    return Object.hasOwn(container, String(item))
  }

  throw new TypeError('contains() expects a string, array, or plain object container')
}

export function pythonCountOf(sequence: unknown, item: unknown): number {
  if (typeof sequence === 'string') {
    if (typeof item !== 'string') {
      throw new TypeError('countOf() string sequences require a string search value')
    }

    return countSubstring(sequence, item)
  }

  if (Array.isArray(sequence)) {
    return sequence.filter((value) => pythonEqual(value, item)).length
  }

  throw new TypeError('countOf() expects a string or array sequence')
}

export function pythonIndexOf(sequence: unknown, item: unknown): number {
  if (typeof sequence === 'string') {
    if (typeof item !== 'string') {
      throw new TypeError('indexOf() string sequences require a string search value')
    }

    const index = sequence.indexOf(item)
    if (index === -1) {
      throw new Error('sequence.index(x): x not in sequence')
    }

    return index
  }

  if (Array.isArray(sequence)) {
    const index = sequence.findIndex((value) => pythonEqual(value, item))
    if (index === -1) {
      throw new Error('sequence.index(x): x not in sequence')
    }

    return index
  }

  throw new TypeError('indexOf() expects a string or array sequence')
}

export function pythonGetItem(target: unknown, key: unknown): unknown {
  if (typeof target === 'string' || Array.isArray(target)) {
    const index = normalizeIndex(target.length, pythonIndex(key, 'getitem'))
    if (index < 0 || index >= target.length) {
      throw new Error('sequence index out of range')
    }

    return target[index]
  }

  if (isPythonMapping(target)) {
    const propertyKey = String(key)
    if (!Object.hasOwn(target, propertyKey)) {
      throw new Error('key not found')
    }

    return target[propertyKey]
  }

  throw new TypeError('getitem() expects a string, array, or plain object target')
}

function repeatString(value: string, count: unknown, functionName: string): string {
  const normalized = normalizeRepeatCount(count, functionName)
  return value.repeat(normalized)
}

function repeatArray(value: unknown[], count: unknown, functionName: string): unknown[] {
  const normalized = normalizeRepeatCount(count, functionName)
  const out: unknown[] = []
  for (let index = 0; index < normalized; index += 1) {
    out.push(...value)
  }
  return out
}

function normalizeRepeatCount(count: unknown, functionName: string): number {
  const bigintCount = toPythonInteger(count, functionName)
  if (bigintCount <= 0n) {
    return 0
  }

  return fromPythonInteger(bigintCount, functionName)
}

function normalizeIndex(length: number, index: number): number {
  return index < 0 ? length + index : index
}

function countSubstring(haystack: string, needle: string): number {
  if (needle === '') {
    return haystack.length + 1
  }

  let count = 0
  let offset = 0

  while (offset <= haystack.length) {
    const next = haystack.indexOf(needle, offset)
    if (next === -1) {
      break
    }
    count += 1
    offset = next + needle.length
  }

  return count
}

function numericEqual(left: NumericLike, right: NumericLike): boolean {
  if (typeof left === 'bigint' || typeof right === 'bigint') {
    return bigintEqual(left, right)
  }

  const leftNumber = toComparableNumber(left)
  const rightNumber = toComparableNumber(right)
  return !Number.isNaN(leftNumber) && !Number.isNaN(rightNumber) && leftNumber === rightNumber
}

function toComparableNumber(value: NumericLike): number {
  return typeof value === 'boolean' ? (value ? 1 : 0) : typeof value === 'bigint' ? Number(value) : value
}

function bigintEqual(left: NumericLike, right: NumericLike): boolean {
  const leftBigint = toComparableBigint(left)
  const rightBigint = toComparableBigint(right)
  if (leftBigint === null || rightBigint === null) {
    return false
  }

  return leftBigint === rightBigint
}

function toComparableBigint(value: NumericLike): bigint | null {
  if (typeof value === 'bigint') {
    return value
  }

  if (typeof value === 'boolean') {
    return value ? 1n : 0n
  }

  if (Number.isFinite(value) && Number.isSafeInteger(value)) {
    return BigInt(value)
  }

  return null
}

function isPythonMapping(value: unknown): value is PythonMapping {
  if (typeof value !== 'object' || value === null || Array.isArray(value)) {
    return false
  }

  return Object.prototype.toString.call(value) === '[object Object]'
}
