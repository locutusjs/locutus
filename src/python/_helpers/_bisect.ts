import { isNumericLike, toPythonInteger, toPythonNumber } from './_operator.ts'

type BisectSequence = unknown[] | string

export function pythonBisect(sequence: unknown, item: unknown, lo?: unknown, hi?: unknown): number {
  return bisectCore(sequence, item, lo, hi, 'bisect', 'right')
}

export function pythonBisectLeft(sequence: unknown, item: unknown, lo?: unknown, hi?: unknown): number {
  return bisectCore(sequence, item, lo, hi, 'bisect_left', 'left')
}

export function pythonBisectRight(sequence: unknown, item: unknown, lo?: unknown, hi?: unknown): number {
  return bisectCore(sequence, item, lo, hi, 'bisect_right', 'right')
}

function bisectCore(
  sequence: unknown,
  item: unknown,
  lo: unknown,
  hi: unknown,
  functionName: string,
  side: 'left' | 'right',
): number {
  const values = toBisectSequence(sequence, functionName)
  let left = normalizeLo(lo, functionName)
  let right = normalizeHi(hi, values.length, functionName)

  while (left < right) {
    const middle = Math.floor((left + right) / 2)
    const candidate = getSequenceItem(values, middle)

    if (
      side === 'left' ? pythonLessThan(candidate, item, functionName) : !pythonLessThan(item, candidate, functionName)
    ) {
      left = middle + 1
    } else {
      right = middle
    }
  }

  return left
}

function toBisectSequence(sequence: unknown, functionName: string): BisectSequence {
  if (Array.isArray(sequence) || typeof sequence === 'string') {
    return sequence
  }

  throw new TypeError(`${functionName}() expected an indexable sequence`)
}

function normalizeLo(value: unknown, functionName: string): number {
  if (value === undefined) {
    return 0
  }

  const index = toSequenceIndex(value, functionName)
  if (index < 0) {
    throw new RangeError('lo must be non-negative')
  }

  return index
}

function normalizeHi(value: unknown, sequenceLength: number, functionName: string): number {
  if (value === undefined || value === null) {
    return sequenceLength
  }

  return toSequenceIndex(value, functionName)
}

function toSequenceIndex(value: unknown, functionName: string): number {
  const index = Number(toPythonInteger(value, functionName))
  if (!Number.isSafeInteger(index)) {
    throw new RangeError(`${functionName}() index must fit within JS safe integer precision`)
  }

  return index
}

function getSequenceItem(sequence: BisectSequence, index: number): unknown {
  if (index < 0 || index >= sequence.length) {
    throw new Error(Array.isArray(sequence) ? 'list index out of range' : 'string index out of range')
  }

  return sequence[index]
}

function pythonLessThan(left: unknown, right: unknown, functionName: string): boolean {
  if (isNumericLike(left) && isNumericLike(right)) {
    const leftNumber = toPythonNumber(left, functionName)
    const rightNumber = toPythonNumber(right, functionName)
    if (Number.isNaN(leftNumber) || Number.isNaN(rightNumber)) {
      return false
    }

    return leftNumber < rightNumber
  }

  if (typeof left === 'string' && typeof right === 'string') {
    return left < right
  }

  throw new TypeError(`'<' not supported between instances of '${pythonTypeName(left)}' and '${pythonTypeName(right)}'`)
}

function pythonTypeName(value: unknown): string {
  if (typeof value === 'string') {
    return 'str'
  }

  if (typeof value === 'boolean') {
    return 'bool'
  }

  if (typeof value === 'bigint' || typeof value === 'number') {
    return 'int'
  }

  if (Array.isArray(value)) {
    return 'list'
  }

  if (value === null) {
    return 'NoneType'
  }

  if (value === undefined) {
    return 'undefined'
  }

  return typeof value
}
